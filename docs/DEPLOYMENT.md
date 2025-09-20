# UBeU Deployment Guide

## Overview

This guide covers the deployment of UBeU across different environments: development, staging, and production. UBeU is designed for cloud-native deployment using Kubernetes and modern DevOps practices.

## Prerequisites

### System Requirements

- **Kubernetes**: 1.24+ cluster
- **PostgreSQL**: 15+ with streaming replication
- **Redis**: 7+ cluster for high availability
- **Hedera Account**: Testnet for staging, mainnet for production
- **Domain**: Registered domain for production deployment
- **SSL Certificate**: Wildcard certificate for production

### Cloud Providers

UBeU can be deployed on:
- **AWS EKS**: Recommended for production
- **Google Cloud GKE**: Alternative production option
- **Azure AKS**: Enterprise customers
- **DigitalOcean Kubernetes**: Cost-effective staging

## Environment Configuration

### Environment Variables

Create environment-specific configuration files:

```bash
# .env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@postgres-cluster:5432/ubeu_prod
REDIS_URL=redis://redis-cluster:6379
HEDERA_NETWORK=mainnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
TREASURY_ACCOUNT_ID=0.0.xxxxx
TREASURY_PRIVATE_KEY=302e020100300506032b657004220420...
JWT_SECRET=your-jwt-secret-here
ENCRYPTION_KEY=your-encryption-key-here
BASE_URL=https://api.ubeu.io
FRONTEND_URL=https://app.ubeu.io
```

### Secrets Management

Use Kubernetes secrets for sensitive data:

```yaml
# secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: ubeu-secrets
type: Opaque
data:
  hedera-private-key: <base64-encoded-key>
  treasury-private-key: <base64-encoded-key>
  jwt-secret: <base64-encoded-secret>
  encryption-key: <base64-encoded-key>
  database-password: <base64-encoded-password>
```

## Database Setup

### PostgreSQL Cluster

```yaml
# postgres-cluster.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          value: ubeu_prod
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: database-user
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: database-password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
    name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi
```

### Database Migration

Run migrations on deployment:

```bash
# Migration job
kubectl apply -f k8s/jobs/migration.yaml

# Migration script
npx typeorm migration:run
```

## Redis Setup

### Redis Cluster

```yaml
# redis-cluster.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
spec:
  serviceName: redis
  replicas: 6
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        command: ["redis-server", "/etc/redis/redis.conf"]
        volumeMounts:
        - name: redis-config
          mountPath: /etc/redis
        - name: redis-storage
          mountPath: /data
      volumes:
      - name: redis-config
        configMap:
          name: redis-config
  volumeClaimTemplates:
  - metadata:
    name: redis-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 50Gi
```

## Application Deployment

### API Gateway Deployment

```yaml
# api-gateway-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ubeu-api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ubeu-api-gateway
  template:
    metadata:
      labels:
        app: ubeu-api-gateway
    spec:
      containers:
      - name: api-gateway
        image: ubeu/api-gateway:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: database-url
        - name: REDIS_URL
          value: redis://redis-cluster:6379
        - name: HEDERA_NETWORK
          value: mainnet
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Service Deployment

```yaml
# identity-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ubeu-identity-service
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ubeu-identity-service
  template:
    metadata:
      labels:
        app: ubeu-identity-service
    spec:
      containers:
      - name: identity-service
        image: ubeu/identity-service:latest
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: database-url
        - name: REDIS_URL
          value: redis://redis-cluster:6379
```

### Ingress Configuration

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ubeu-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
  - hosts:
    - api.ubeu.io
    - app.ubeu.io
    secretName: ubeu-tls
  rules:
  - host: api.ubeu.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ubeu-api-gateway
            port:
              number: 3000
  - host: app.ubeu.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ubeu-frontend
            port:
              number: 3000
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'yarn'

      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn test:unit
      - run: yarn test:integration
      - run: yarn build

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: yarn audit
      - uses: securecodewarrior/github-action-add-sarif@v1
        with:
          sarif-file: 'security-scan-results.sarif'

  build-and-push:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push API Gateway
        uses: docker/build-push-action@v4
        with:
          context: ./packages/api-gateway
          push: true
          tags: ubeu/api-gateway:latest,ubeu/api-gateway:${{ github.sha }}

      - name: Build and push Identity Service
        uses: docker/build-push-action@v4
        with:
          context: ./packages/identity-service
          push: true
          tags: ubeu/identity-service:latest,ubeu/identity-service:${{ github.sha }}

  deploy-staging:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v3
      - uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/staging/
          images: |
            ubeu/api-gateway:${{ github.sha }}
            ubeu/identity-service:${{ github.sha }}
          kubectl-version: latest

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/production/
          images: |
            ubeu/api-gateway:${{ github.sha }}
            ubeu/identity-service:${{ github.sha }}
          kubectl-version: latest
```

## Monitoring Setup

### Prometheus Configuration

```yaml
# prometheus.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: prometheus-config
          mountPath: /etc/prometheus
        - name: prometheus-storage
          mountPath: /prometheus
      volumes:
      - name: prometheus-config
        configMap:
          name: prometheus-config
      - name: prometheus-storage
        persistentVolumeClaim:
          claimName: prometheus-pvc
```

### Grafana Dashboard

```yaml
# grafana-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:latest
        ports:
        - containerPort: 3000
        env:
        - name: GF_SECURITY_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: grafana-password
        volumeMounts:
        - name: grafana-storage
          mountPath: /var/lib/grafana
      volumes:
      - name: grafana-storage
        persistentVolumeClaim:
          claimName: grafana-pvc
```

## Backup Strategy

### Database Backup

```yaml
# backup-job.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: postgres-backup
            image: postgres:15
            command:
            - /bin/bash
            - -c
            - |
              pg_dump -h postgres-cluster -U ubeu ubeu_prod > /backup/ubeu_$(date +%Y%m%d_%H%M%S).sql
            env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: ubeu-secrets
                  key: database-password
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            persistentVolumeClaim:
              claimName: backup-pvc
          restartPolicy: OnFailure
```

### Configuration Backup

```bash
# Backup Kubernetes configurations
kubectl get all -o yaml > k8s-backup-$(date +%Y%m%d).yaml

# Backup secrets (be careful with sensitive data)
kubectl get secrets -o yaml > secrets-backup-$(date +%Y%m%d).yaml
```

## Scaling Configuration

### Horizontal Pod Autoscaling

```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ubeu-api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ubeu-api-gateway
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Cluster Autoscaling

```yaml
# cluster-autoscaler.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - name: cluster-autoscaler
        image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.24.0
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --nodes=3:10:ubeu-node-group
```

## Security Configuration

### Network Policies

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ubeu-network-policy
spec:
  podSelector:
    matchLabels:
      app: ubeu-api-gateway
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: ubeu-frontend
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: ubeu-identity-service
    ports:
    - protocol: TCP
      port: 3001
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
```

### Pod Security Standards

```yaml
# pod-security.yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: ubeu-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  supplementalGroups:
    rule: 'MustRunAs'
    ranges:
    - min: 1
      max: 65535
  fsGroup:
    rule: 'MustRunAs'
    ranges:
    - min: 1
      max: 65535
```

## Performance Optimization

### Database Optimization

```sql
-- Create indexes for performance
CREATE INDEX CONCURRENTLY idx_credentials_subject_did_issued_at
ON credentials(subject_did, issued_at DESC);

CREATE INDEX CONCURRENTLY idx_subscriptions_user_id_status
ON subscriptions(user_id, status);

-- Partition large tables
CREATE TABLE credentials_y2025 PARTITION OF credentials
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

### Caching Configuration

```yaml
# redis-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-config
data:
  redis.conf: |
    maxmemory 512mb
    maxmemory-policy allkeys-lru
    tcp-keepalive 300
    timeout 300
    appendonly yes
    appendfsync everysec
```

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check database connectivity
kubectl exec -it postgres-0 -- psql -U ubeu -d ubeu_prod -c "SELECT 1;"

# Check connection pool
kubectl logs -f deployment/ubeu-api-gateway | grep "database"
```

#### High Memory Usage
```bash
# Check memory usage
kubectl top pods

# Check application metrics
kubectl port-forward svc/prometheus 9090:9090
# Visit http://localhost:9090
```

#### Slow Response Times
```bash
# Check Redis connectivity
kubectl exec -it redis-0 -- redis-cli ping

# Check application logs
kubectl logs -f deployment/ubeu-api-gateway --tail=100
```

### Health Checks

```yaml
# health-check.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: health-checks
data:
  readiness.sh: |
    #!/bin/bash
    # Check database connectivity
    if ! pg_isready -h postgres-cluster -U ubeu; then
      exit 1
    fi

    # Check Redis connectivity
    if ! redis-cli -h redis-cluster ping | grep -q PONG; then
      exit 1
    fi

    # Check Hedera connectivity (simplified)
    if ! curl -f https://mainnet-public.mirrornode.hedera.com/api/v1/network/nodes; then
      exit 1
    fi

    exit 0

  liveness.sh: |
    #!/bin/bash
    # Check if application is responding
    if ! curl -f http://localhost:3000/health; then
      exit 1
    fi

    # Check memory usage
    if [ $(ps aux --no-headers -o pmem -C node | awk '{sum+=$1} END {print sum}') -gt 90 ]; then
      exit 1
    fi

    exit 0
```

## Rollback Strategy

### Blue-Green Deployment

```yaml
# blue-green-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ubeu-api-gateway-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ubeu-api-gateway
      version: blue
  template:
    metadata:
      labels:
        app: ubeu-api-gateway
        version: blue
    spec:
      containers:
      - name: api-gateway
        image: ubeu/api-gateway:v1.0.0
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ubeu-api-gateway-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ubeu-api-gateway
      version: green
  template:
    metadata:
      labels:
        app: ubeu-api-gateway
        version: green
    spec:
      containers:
      - name: api-gateway
        image: ubeu/api-gateway:v1.1.0
```

### Canary Deployment

```yaml
# canary-deployment.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ubeu-canary
spec:
  http:
  - route:
    - destination:
        host: ubeu-api-gateway
        subset: v1
      weight: 90
    - destination:
        host: ubeu-api-gateway
        subset: v2
      weight: 10
```

This deployment guide provides a comprehensive foundation for deploying UBeU in production environments with high availability, scalability, and security.