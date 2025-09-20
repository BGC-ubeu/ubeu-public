# UBeU Demo Environment

This directory contains a complete demo environment for UBeU that can be run locally using Docker Compose.

## ✨ Features

- **🚀 Quick Setup** - Get running in minutes
- **🎮 Interactive Demo** - Full-featured demo application
- **📚 API Documentation** - Live API docs and testing
- **🧪 Sample Data** - Pre-loaded demo users and credentials
- **🔧 Development Ready** - Easy customization and extension

## 📋 Prerequisites

- **Docker**: 20.10+ with Docker Compose
- **RAM**: 4GB available
- **Disk Space**: 10GB free
- **Ports**: 3000, 5432, 6379 available

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
# Clone the public repository
git clone https://github.com/ubeu/ubeu-public.git
cd ubeu-public/docker
```

### 2. Start Demo Environment

```bash
# Start all services
docker-compose up -d

# View logs (optional)
docker-compose logs -f
```

### 3. Access the Demo

- **🌐 Web Interface**: http://localhost:3000
- **📖 API Documentation**: http://localhost:3000/docs
- **🗄️ Database Admin**: http://localhost:8080 (adminer)
- **📊 Health Check**: http://localhost:3000/health

### 4. Demo Credentials

```bash
Username: demo@ubeu.io
Password: demo123
```

## 🏗️ Services Included

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 3000 | Main REST API endpoint |
| **Identity Service** | 3001 | DID management and resolution |
| **Credential Service** | 3004 | OpenID4VCI/VP operations |
| **Domain Service** | 3002 | Domain verification and linking |

### Supporting Services

| Service | Port | Description |
|---------|------|-------------|
| **PostgreSQL** | 5432 | Primary database |
| **Redis** | 6379 | Caching and sessions |
| **Adminer** | 8080 | Database management UI |

## 🎮 Demo Scenarios

### 1. Identity Creation Journey

```bash
# 1. Create an identity
curl -X POST http://localhost:3000/api/v1/identities \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "demo.user.iam",
    "verificationMethod": "email"
  }'

# 2. Check identity status
curl http://localhost:3000/api/v1/identities/did:hedera:testnet:demo123

# 3. Update profile
curl -X PUT http://localhost:3000/api/v1/identities/did:hedera:testnet:demo123 \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "name": "Demo User",
      "email": "demo@ubeu.io"
    }
  }'
```

### 2. Credential Issuance Flow

```bash
# Issue a demo credential
curl -X POST http://localhost:3000/api/v1/credentials/issue \
  -H "Content-Type: application/json" \
  -d '{
    "subjectDid": "did:hedera:testnet:demo123",
    "achievement": {
      "name": "Demo Certificate",
      "description": "Successfully completed UBeU demo"
    },
    "issuerDid": "did:hedera:testnet:issuer456"
  }'

# Verify the credential
curl http://localhost:3000/api/v1/credentials/urn:uuid:demo-123/verify
```

### 3. Domain Verification

```bash
# Verify external domain
curl -X POST http://localhost:3000/api/v1/domains/verify \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "demo.eth",
    "verificationType": "dns"
  }'

# Link domain to identity
curl -X POST http://localhost:3000/api/v1/domains/link \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "demo.eth",
    "did": "did:hedera:testnet:demo123"
  }'
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```bash
# Database
POSTGRES_DB=ubeu_demo
POSTGRES_USER=demo_user
POSTGRES_PASSWORD=demo_password

# Redis
REDIS_PASSWORD=demo_redis

# API
NODE_ENV=development
API_PORT=3000
JWT_SECRET=demo_jwt_secret

# Demo settings
DEMO_MODE=true
DISABLE_AUTH=false
SKIP_VERIFICATION=true
```

### Custom Docker Compose

Override services in `docker-compose.override.yml`:

```yaml
version: '3.8'
services:
  api-gateway:
    environment:
      - LOG_LEVEL=debug
      - API_PORT=3001
    ports:
      - "3001:3001"
```

## 🔧 Development Mode

### Hot Reload Setup

```bash
# Enable development mode
echo "DEMO_MODE=true" >> .env
echo "HOT_RELOAD=true" >> .env

# Restart services
docker-compose down
docker-compose up -d
```

### Database Access

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U demo_user -d ubeu_demo

# View Redis data
docker-compose exec redis redis-cli -a demo_redis
```

### Logs and Debugging

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api-gateway

# Access service shell
docker-compose exec api-gateway sh

# Check service health
docker-compose ps
```

## 📊 Demo Data

### Pre-loaded Users

| Username | DID | Domain | Role |
|----------|-----|--------|------|
| demo@ubeu.io | did:hedera:testnet:demo123 | demo.user.iam | Individual |
| enterprise@ubeu.io | did:hedera:testnet:ent456 | enterprise.iam | Enterprise |
| issuer@ubeu.io | did:hedera:testnet:issuer789 | issuer.iam | Credential Issuer |

### Sample Credentials

- **Course Completion** - Demo educational credential
- **Skill Certification** - Technical skill verification
- **Professional License** - Business credential example
- **Event Attendance** - Conference participation

### Test Domains

- **demo.user.iam** - Personal identity domain
- **enterprise.iam** - Organization domain
- **demo.eth** - External Ethereum domain
- **demo.crypto** - Unstoppable domain

## 🧪 Testing the Demo

### API Testing

```bash
# Health check
curl http://localhost:3000/health

# API documentation
curl http://localhost:3000/docs

# List identities
curl http://localhost:3000/api/v1/identities

# Create test credential
curl -X POST http://localhost:3000/api/v1/credentials/issue \
  -H "Content-Type: application/json" \
  -d @test-credential.json
```

### Web Interface Testing

1. **Registration**: Create new identity with .iam domain
2. **Credential Issuance**: Issue demo credentials
3. **Verification**: Test credential verification flow
4. **Domain Linking**: Link external domains
5. **Profile Management**: Update identity profile

## 🚨 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check port usage
lsof -i :3000

# Change ports in docker-compose.yml
services:
  api-gateway:
    ports:
      - "3001:3000"  # Changed from 3000 to 3001
```

#### Memory Issues
```bash
# Increase Docker memory
# Docker Desktop: Settings → Resources → Memory → 4GB+

# Or reduce service memory
services:
  api-gateway:
    environment:
      - NODE_OPTIONS=--max-old-space-size=512
```

#### Database Connection Issues
```bash
# Check database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d postgres
```

#### Service Startup Issues
```bash
# Check service dependencies
docker-compose config

# Start services individually
docker-compose up postgres -d
docker-compose up redis -d
docker-compose up api-gateway -d
```

## 🔄 Updating the Demo

```bash
# Pull latest changes
git pull origin main

# Rebuild services
docker-compose build --no-cache

# Restart with new version
docker-compose down
docker-compose up -d
```

## 🧹 Cleanup

### Stop Demo Environment
```bash
# Stop all services
docker-compose down

# Remove volumes (WARNING: deletes all data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean up networks
docker network prune
```

### Reset Demo Data
```bash
# Reset database only
docker-compose down
docker volume rm ubeu-demo_postgres_data
docker-compose up -d postgres

# Or reset everything
docker-compose down -v
docker-compose up -d
```

## 📞 Support

### Getting Help

- **📖 Documentation**: https://docs.ubeu.io/demo
- **💬 Community**: https://community.ubeu.io
- **🐛 Issues**: https://github.com/ubeu/ubeu-public/issues
- **📧 Support**: demo@ubeu.io

### Demo Limitations

⚠️ **This is a demo environment only!**

- Contains mock data and simplified security
- Not suitable for production use
- All data is ephemeral (resets on restart)
- No real blockchain transactions
- Simplified authentication flows

**For production deployment, see our [infrastructure documentation](../infrastructure/README.md).**

## 🎯 Next Steps

### After Exploring the Demo

1. **📚 Read the Documentation**
   - [API Reference](../docs/api/)
   - [Integration Guide](../docs/guides/integration.md)
   - [Architecture Overview](../docs/architecture.md)

2. **🛠️ Try the SDK**
   - [JavaScript SDK](../sdk/javascript/)
   - [Code Examples](../docs/examples/)

3. **🚀 Production Deployment**
   - [Infrastructure Setup](../infrastructure/)
   - [Deployment Guide](../docs/DEPLOYMENT.md)

4. **🤝 Get Involved**
   - [Contributing Guide](../CONTRIBUTING.md)
   - [Community Forum](https://community.ubeu.io)

---

**Ready to explore the future of digital identity? Let's get started! 🚀**