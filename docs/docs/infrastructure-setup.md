# **UBeU Infrastructure Setup Guide**

## **Overview**

This document provides comprehensive infrastructure setup instructions for deploying the UBeU Identity Platform in production environments. The platform is designed for high availability, scalability, and enterprise-grade security.

---

## **🏗️ Architecture Overview**

### **Microservices Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │    │  Load Balancer  │    │   CDN (CloudFlare│
│   (Kong/Traefik)│    │   (AWS ALB)     │    │   /Fastly)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                    ┌─────────────────────┐
                    │   Kubernetes Cluster │
                    │   (EKS/GKE/AKS)     │
                    └─────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Identity Service│ │ Domain Service  │ │ Credential Svc  │
│   (Node.js)     │ │   (Node.js)     │ │   (Node.js)     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                    ┌─────────────────────┐
                    │   Data Layer        │
                    │                     │
                    │ ┌─────────────────┐ │
                    │ │ PostgreSQL      │ │
                    │ │ (RDS/Aurora)    │ │
                    │ └─────────────────┘ │
                    │                     │
                    │ ┌─────────────────┐ │
                    │ │ Redis Cluster   │ │
                    │ │ (ElastiCache)   │ │
                    │ └─────────────────┘ │
                    └─────────────────────┘
```

### **External Dependencies**
- **Hedera Network**: Mainnet/Testnet nodes
- **IPFS/Arweave**: Decentralized storage
- **Email/SMS Services**: SendGrid, Twilio, etc.
- **Payment Processors**: Alchemy Pay, NOWPayments
- **Monitoring**: DataDog, New Relic, or Prometheus stack

---

## **📋 Prerequisites**

### **Cloud Provider Setup**
- AWS/GCP/Azure account with appropriate permissions
- Domain name and SSL certificates
- IAM roles and service accounts configured

### **Development Tools**
```bash
# Required tools
brew install kubectl helm terraform awscli
npm install -g @kubernetes/client-node

# For local development
brew install docker docker-compose minikube
```

### **Network Requirements**
- VPC with public/private subnets
- Security groups for microservices
- Load balancer configuration
- CDN setup for static assets

---

## **🚀 Deployment Options**

### **Option 1: Kubernetes (Recommended for Production)**

#### **1. Infrastructure Setup**
```bash
# Clone infrastructure repository
git clone https://github.com/ubeu/infrastructure.git
cd infrastructure

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -var-file=production.tfvars

# Apply infrastructure
terraform apply -var-file=production.tfvars
```

#### **2. Kubernetes Cluster Setup**
```bash
# Configure kubectl
aws eks update-kubeconfig --region us-east-1 --name ubeu-cluster

# Install Helm charts
helm repo add stable https://charts.helm.sh/stable
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install cert-manager for SSL
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# Install nginx ingress controller
helm install nginx-ingress stable/nginx-ingress \
  --set controller.publishService.enabled=true
```

#### **3. Database Setup**
```bash
# Install PostgreSQL with Helm
helm install postgresql bitnami/postgresql \
  --set postgresqlPassword=your-password \
  --set postgresqlDatabase=ubeu_identity \
  --set persistence.enabled=true \
  --set persistence.size=100Gi

# Install Redis cluster
helm install redis bitnami/redis-cluster \
  --set password=your-redis-password \
  --set persistence.enabled=true \
  --set persistence.size=50Gi
```

#### **4. Application Deployment**
```bash
# Deploy UBeU services
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmaps/
kubectl apply -f k8s/secrets/
kubectl apply -f k8s/services/
kubectl apply -f k8s/deployments/
kubectl apply -f k8s/ingress.yaml

# Verify deployment
kubectl get pods -n ubeu
kubectl get services -n ubeu
kubectl get ingress -n ubeu
```

### **Option 2: Docker Compose (Development/Staging)**

#### **1. Environment Setup**
```bash
# Clone the repository
git clone https://github.com/ubeu/ubeu-iaas.git
cd ubeu-iaas

# Copy environment files
cp packages/identity-service/.env.example packages/identity-service/.env
cp packages/domain-verification-service/.env.example packages/domain-verification-service/.env
cp packages/treasury-service/.env.example packages/treasury-service/.env
cp packages/credential-service/.env.example packages/credential-service/.env

# Configure environment variables
nano packages/identity-service/.env
```

#### **2. Docker Compose Deployment**
```bash
# Build and start all services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f identity-service

# Scale services if needed
docker-compose up -d --scale identity-service=3
```

---

## **⚙️ Configuration Files**

### **Environment Variables Template**

#### **Identity Service (.env)**
```bash
# Database Configuration
DB_HOST=postgresql
DB_PORT=5432
DB_USERNAME=ubeu_user
DB_PASSWORD=your-secure-password
DB_NAME=ubeu_identity

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.123456
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
HEDERA_PUBLIC_KEY=302a300506032b6570032100...

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# API Configuration
API_PORT=3001
API_BASE_URL=https://api.ubeu.io
CORS_ORIGINS=https://app.ubeu.io,https://admin.ubeu.io

# External Services
SENDGRID_API_KEY=SG.your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# Payment Configuration
ALCHEMY_PAY_API_KEY=your-alchemy-key
NOWPAYMENTS_API_KEY=your-nowpayments-key

# Monitoring
DATADOG_API_KEY=your-datadog-key
SENTRY_DSN=your-sentry-dsn

# Security
ENCRYPTION_KEY=your-32-byte-encryption-key
WEBHOOK_SECRET=your-webhook-secret
```

#### **Domain Verification Service (.env)**
```bash
# Service Configuration
PORT=3002
NODE_ENV=production

# Database (shared with identity service)
DB_HOST=postgresql
DB_PORT=5432
DB_USERNAME=ubeu_user
DB_PASSWORD=your-secure-password
DB_NAME=ubeu_identity

# Redis (shared)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.123456
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...

# Domain Verification
INFURA_PROJECT_ID=your-infura-id
ALCHEMY_API_KEY=your-alchemy-key
MORALIS_API_KEY=your-moralis-key

# DNS Verification
CLOUDFLARE_API_TOKEN=your-cloudflare-token
ROUTE53_ACCESS_KEY=your-aws-key
ROUTE53_SECRET_KEY=your-aws-secret
```

#### **Treasury Service (.env)**
```bash
# Service Configuration
PORT=3003
NODE_ENV=production

# Database (shared)
DB_HOST=postgresql
DB_PORT=5432
DB_USERNAME=ubeu_user
DB_PASSWORD=your-secure-password
DB_NAME=ubeu_identity

# Hedera Treasury Account
HEDERA_TREASURY_ACCOUNT=0.0.999999
HEDERA_TREASURY_KEY=302e020100300506032b657004220420...

# Exchange Rate Service
EXCHANGE_RATE_API_KEY=your-exchange-rate-key
EXCHANGE_RATE_CACHE_TTL=300

# Treasury Limits
MAX_DAILY_SPEND=1000000  # $10,000 in cents
MAX_MONTHLY_SPEND=25000000  # $250,000 in cents
```

#### **Credential Service (.env)**
```bash
# Service Configuration
PORT=3004
NODE_ENV=production

# Database (shared)
DB_HOST=postgresql
DB_PORT=5432
DB_USERNAME=ubeu_user
DB_PASSWORD=your-secure-password
DB_NAME=ubeu_identity

# Redis (shared)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.123456
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...

# HCS Configuration
HCS_TOPIC_MEMO_PREFIX=UBEUCredential:
HCS_MESSAGE_TTL=7776000  # 90 days in seconds

# IPFS Configuration
IPFS_PROJECT_ID=your-infura-id
IPFS_PROJECT_SECRET=your-infura-secret
IPFS_GATEWAY=https://ipfs.infura.io/ipfs/

# Revocation Registry
REVOCATION_REGISTRY_SIZE=100000
REVOCATION_CHECK_TTL=3600
```

---

## **🐳 Docker Configuration**

### **Dockerfile (Multi-stage Build)**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/*/package*.json ./packages/identity-service/
COPY packages/*/package*.json ./packages/domain-verification-service/
COPY packages/*/package*.json ./packages/treasury-service/
COPY packages/*/package*.json ./packages/credential-service/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/packages/identity-service/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/packages/identity-service/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
```

### **Docker Compose Configuration**
```yaml
version: '3.8'

services:
  postgresql:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ubeu_identity
      POSTGRES_USER: ubeu_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docs/database-schema.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ubeu_user -d ubeu_identity"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  identity-service:
    build:
      context: .
      dockerfile: packages/identity-service/Dockerfile
    environment:
      - NODE_ENV=production
      - DB_HOST=postgresql
      - REDIS_HOST=redis
    depends_on:
      postgresql:
        condition: service_healthy
      redis:
        condition: service_healthy
    ports:
      - "3001:3001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  domain-verification-service:
    build:
      context: .
      dockerfile: packages/domain-verification-service/Dockerfile
    environment:
      - NODE_ENV=production
      - DB_HOST=postgresql
      - REDIS_HOST=redis
    depends_on:
      postgresql:
        condition: service_healthy
      redis:
        condition: service_healthy
    ports:
      - "3002:3002"

  treasury-service:
    build:
      context: .
      dockerfile: packages/treasury-service/Dockerfile
    environment:
      - NODE_ENV=production
      - DB_HOST=postgresql
    depends_on:
      postgresql:
        condition: service_healthy
    ports:
      - "3003:3003"

  credential-service:
    build:
      context: .
      dockerfile: packages/credential-service/Dockerfile
    environment:
      - NODE_ENV=production
      - DB_HOST=postgresql
      - REDIS_HOST=redis
    depends_on:
      postgresql:
        condition: service_healthy
      redis:
        condition: service_healthy
    ports:
      - "3004:3004"

volumes:
  postgres_data:
  redis_data:
```

---

## **☸️ Kubernetes Manifests**

### **Namespace Configuration**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ubeu
  labels:
    name: ubeu
    environment: production
```

### **ConfigMap for Application Configuration**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ubeu-config
  namespace: ubeu
data:
  NODE_ENV: "production"
  API_BASE_URL: "https://api.ubeu.io"
  CORS_ORIGINS: "https://app.ubeu.io,https://admin.ubeu.io"
  LOG_LEVEL: "info"
  METRICS_ENABLED: "true"
  CACHE_TTL: "3600"
```

### **Secret for Sensitive Configuration**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ubeu-secrets
  namespace: ubeu
type: Opaque
data:
  # Base64 encoded values
  DB_PASSWORD: <base64-encoded-password>
  REDIS_PASSWORD: <base64-encoded-password>
  JWT_SECRET: <base64-encoded-secret>
  HEDERA_PRIVATE_KEY: <base64-encoded-key>
  SENDGRID_API_KEY: <base64-encoded-key>
  TWILIO_AUTH_TOKEN: <base64-encoded-token>
  ENCRYPTION_KEY: <base64-encoded-key>
```

### **Deployment Manifest**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: identity-service
  namespace: ubeu
  labels:
    app: identity-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: identity-service
  template:
    metadata:
      labels:
        app: identity-service
    spec:
      containers:
      - name: identity-service
        image: ubeu/identity-service:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: ubeu-config
              key: NODE_ENV
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: DB_PASSWORD
        - name: REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: REDIS_PASSWORD
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
```

### **Service Manifest**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: identity-service
  namespace: ubeu
  labels:
    app: identity-service
spec:
  selector:
    app: identity-service
  ports:
  - name: http
    port: 80
    targetPort: 3001
  type: ClusterIP
```

### **Ingress Configuration**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ubeu-ingress
  namespace: ubeu
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
  - hosts:
    - api.ubeu.io
    - app.ubeu.io
    - admin.ubeu.io
    secretName: ubeu-tls
  rules:
  - host: api.ubeu.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: identity-service
            port:
              number: 80
  - host: app.ubeu.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app
            port:
              number: 80
  - host: admin.ubeu.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: admin-dashboard
            port:
              number: 80
```

---

## **🔒 Security Configuration**

### **Network Security**
```bash
# Security groups configuration
aws ec2 create-security-group \
  --group-name ubeu-sg \
  --description "UBeU platform security group" \
  --vpc-id vpc-12345678

# Allow inbound traffic
aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0

# Deny all other inbound traffic
```

### **SSL/TLS Configuration**
```yaml
# cert-manager ClusterIssuer
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@ubeu.io
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
```

### **Secrets Management**
```bash
# AWS Secrets Manager setup
aws secretsmanager create-secret \
  --name ubeu/production/database \
  --description "UBeU production database credentials" \
  --secret-string '{"username":"ubeu_user","password":"secure-password"}'

# IAM policy for secrets access
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:us-east-1:123456789012:secret:ubeu/production/*"
      ]
    }
  ]
}
```

---

## **📊 Monitoring & Observability**

### **Prometheus Configuration**
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'identity-service'
    static_configs:
      - targets: ['identity-service:3001']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'domain-service'
    static_configs:
      - targets: ['domain-verification-service:3002']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'credential-service'
    static_configs:
      - targets: ['credential-service:3004']
    metrics_path: '/metrics'
    scrape_interval: 5s
```

### **Grafana Dashboards**
```json
{
  "dashboard": {
    "title": "UBeU Platform Overview",
    "tags": ["ubeu", "production"],
    "timezone": "UTC",
    "panels": [
      {
        "title": "API Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m]) * 100",
            "legendFormat": "Error rate %"
          }
        ]
      }
    ]
  }
}
```

---

## **🔄 CI/CD Pipeline**

### **GitHub Actions Workflow**
```yaml
name: UBeU CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Run linting
      run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - name: Build Docker images
      run: |
        docker build -t ubeu/identity-service:latest ./packages/identity-service
        docker build -t ubeu/domain-service:latest ./packages/domain-verification-service
        docker build -t ubeu/credential-service:latest ./packages/credential-service

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
    - name: Deploy to staging
      run: |
        kubectl config use-context staging
        kubectl apply -f k8s/staging/

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
    - name: Deploy to production
      run: |
        kubectl config use-context production
        kubectl apply -f k8s/production/
```

---

## **🚨 Backup & Disaster Recovery**

### **Database Backup Strategy**
```bash
# Automated daily backups
0 2 * * * pg_dump -h postgresql -U ubeu_user -d ubeu_identity | gzip > /backups/daily_$(date +\%Y\%m\%d).sql.gz

# Point-in-time recovery
pg_basebackup -h postgresql -U ubeu_user -D /backups/basebackup -Ft -z -P

# Restore procedure
gunzip /backups/daily_20231201.sql.gz
psql -h postgresql -U ubeu_user -d ubeu_identity < /backups/daily_20231201.sql
```

### **Application Backup**
```bash
# Configuration backup
kubectl get configmaps -n ubeu -o yaml > /backups/configmaps_$(date +\%Y\%m\%d).yaml
kubectl get secrets -n ubeu -o yaml > /backups/secrets_$(date +\%Y\%m\%d).yaml

# Volume snapshots (AWS EBS)
aws ec2 create-snapshot --volume-id vol-12345678 --description "UBeU data volume snapshot"
```

---

## **📈 Scaling Strategy**

### **Horizontal Pod Autoscaling**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: identity-service-hpa
  namespace: ubeu
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: identity-service
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

### **Database Scaling**
```sql
-- Read replica configuration
CREATE PUBLICATION ubeu_pub FOR ALL TABLES;
CREATE SUBSCRIPTION ubeu_sub
  CONNECTION 'host=primary-db port=5432 user=replica dbname=ubeu_identity'
  PUBLICATION ubeu_pub;

-- Connection pooling with PgBouncer
[databases]
ubeu_identity = host=postgresql port=5432 dbname=ubeu_identity

[pgbouncer]
listen_port = 6432
listen_addr = *
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
reserve_pool_size = 5
```

---

## **🔍 Troubleshooting Guide**

### **Common Issues**

#### **Service Startup Failures**
```bash
# Check pod status
kubectl get pods -n ubeu

# View pod logs
kubectl logs -f pod/identity-service-12345 -n ubeu

# Check service endpoints
kubectl get endpoints -n ubeu

# Verify configuration
kubectl describe configmap ubeu-config -n ubeu
```

#### **Database Connection Issues**
```bash
# Test database connectivity
kubectl exec -it postgresql-0 -- psql -U ubeu_user -d ubeu_identity -c "SELECT version();"

# Check connection pool
kubectl exec -it pgbouncer-0 -- psql -U ubeu_user -d ubeu_identity -c "SHOW POOLS;"

# Monitor slow queries
kubectl exec -it postgresql-0 -- psql -U ubeu_user -d ubeu_identity -c "SELECT * FROM pg_stat_activity WHERE state = 'active';"
```

#### **Performance Issues**
```bash
# Check resource usage
kubectl top pods -n ubeu

# Monitor network traffic
kubectl exec -it monitoring-pod -- tcpdump -i eth0 port 80

# Analyze application metrics
curl http://prometheus:9090/api/v1/query?query=up
```

---

## **📚 Additional Resources**

### **Documentation Links**
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Hedera SDK Documentation](https://docs.hedera.com/guides/sdks)

### **Monitoring Tools**
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [ELK Stack](https://www.elastic.co/elastic-stack)
- [DataDog](https://www.datadoghq.com/)

### **Security Tools**
- [cert-manager](https://cert-manager.io/)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [OWASP ZAP](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)

This infrastructure setup provides a production-ready deployment for the UBeU Identity Platform with enterprise-grade security, scalability, and monitoring capabilities.