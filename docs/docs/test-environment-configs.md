## ✅ **Yes, Deploy to Local Hedera Environment First**

Based on my analysis of the UBeU codebase, **it is highly recommended to deploy contracts and services to a local Hedera test environment before moving to Hedera testnet**. This follows Hedera blockchain development best practices and will ensure a smoother transition to frontend development.

## **📋 What I've Set Up**

### **1. ✅ Codebase Analysis Complete**
- **Contracts**: Ready for deployment with updated Hardhat config and deploy scripts
- **Services**: Docker-ready with proper configurations
- **Dependencies**: All required packages and configurations in place

### **2. ✅ Local Environment Configuration**
- **Hardhat Config**: Added `hedera-local` network configuration
- **Deploy Script**: Updated to support local Hedera node with proper client initialization
- **TypeScript Fixes**: Resolved all compilation errors in deploy script
- **Package Scripts**: Added `deploy:local` command

### **3. ✅ Docker Infrastructure**
- **Docker Compose**: Complete setup with all services (PostgreSQL, Redis, Hedera Local Node, 4 microservices)
- **Health Checks**: Proper service dependencies and health monitoring
- **Environment Variables**: Pre-configured for local development
- **Setup Script**: Automated environment startup script

## **🚀 How to Deploy Locally**

### **Step 1: Start Local Environment**
```bash
# Make setup script executable (already done)
chmod +x scripts/setup-local-env.sh

# Start all services
./scripts/setup-local-env.sh
```

This will:
- Pull Hedera local node image
- Build all UBeU service containers
- Start PostgreSQL, Redis, and Hedera local node
- Wait for all services to be healthy

### **Step 2: Deploy Smart Contracts**
```bash
# Set environment variables
export HEDERA_NETWORK=local
export HEDERA_ACCOUNT_ID=0.0.2
export HEDERA_PRIVATE_KEY=302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137
export TREASURY_ACCOUNT_ID=0.0.3

# Deploy contracts
cd packages/contracts
npm run deploy:local
```

### **Step 3: Verify Services**
```bash
# Check service health
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health
curl http://localhost:3004/health

# Check Hedera local node
curl http://localhost:5600/api/v1/network/nodes

# Test Open Badges API
curl -X POST http://localhost:3004/api/v1/badges/issue \
  -H "Content-Type: application/json" \
  -d '{
    "recipientDid": "did:hedera:testnet:0.0.67890",
    "achievement": {
      "id": "urn:uuid:test-course-completion",
      "type": "Achievement",
      "name": "Test Course Completion",
      "description": "Successfully completed test course",
      "criteria": {
        "narrative": "Completed all test modules"
      },
      "tags": ["education", "test"]
    },
    "issuerDid": "did:hedera:testnet:0.0.12345",
    "expirationDate": "2026-09-20T00:00:00Z"
  }'

# Test Badge Verification
curl http://localhost:3004/api/v1/badges/urn:uuid:test-badge-id/verify

# Test LMS Integration
curl -X POST http://localhost:3004/api/v1/lms/sync \
  -H "Content-Type: application/json" \
  -d '{
    "lmsConfig": {
      "type": "moodle",
      "baseUrl": "https://demo.moodle.net",
      "apiKey": "test_api_key",
      "courseId": "TEST101"
    },
    "badgeMapping": {
      "courseId": "TEST101",
      "badgeTemplateId": "course-completion",
      "issuerDid": "did:hedera:testnet:0.0.12345",
      "autoIssue": true
    }
  }'

# Test Badge Templates
curl http://localhost:3004/api/v1/badges/templates/educational

# Test Badge Backpack Export
curl -X POST http://localhost:3004/api/v1/backpack/export \
  -H "Content-Type: application/json" \
  -d '{
    "badgeId": "urn:uuid:test-badge-id",
    "backpackConfig": {
      "provider": "open_badges",
      "baseUrl": "https://backpack.openbadges.org"
    },
    "recipientEmail": "test@example.com"
  }'
```

## **🎯 Benefits of Local Deployment First**

### **Cost-Free Development**
- No HBAR costs for testing
- Unlimited transactions on local node
- Fast iteration cycles

### **Isolated Testing**
- Complete control over test data
- No interference with testnet state
- Easy reset and replay scenarios

### **Debugging Advantages**
- Full access to node logs
- Detailed transaction inspection
- Step-by-step execution verification

### **Open Badges Testing Benefits**
- Complete badge lifecycle testing (issue → verify → share)
- LMS integration testing with mock data
- Badge Backpack compatibility validation
- Educational template testing
- Load testing for badge operations

### **CI/CD Preparation**
- Validates deployment scripts
- Tests service integrations
- Ensures configuration compatibility

## **📊 Local Environment Architecture**

```
┌─────────────────┐    ┌─────────────────┐
│ Hedera Local    │    │   UBeU Services │
│ Node (50211)    │◄──►│                 │
│ Mirror (5600)   │    │ • Identity (3001)│
└─────────────────┘    │ • Domain (3002)  │
          │            │ • Treasury (3003)│
          ▼            │ • Credential (3004)│
┌─────────────────┐    └─────────────────┘
│ PostgreSQL      │            │
│ (5433)          │◄───────────┘
└─────────────────┘
          │
          ▼
┌─────────────────┐
│ Redis (6380)    │
└─────────────────┘
```

## **🔄 Next Steps After Local Validation**

1. **Run Integration Tests**: Execute comprehensive test suites including Open Badges scenarios
2. **Validate Open Badges**: Test badge issuance, verification, LMS integration, and backpack export
3. **Test Educational Templates**: Validate all badge templates and achievement types
4. **Validate Functionality**: Test all user journeys locally including badge workflows
5. **Deploy to Testnet**: Use validated scripts for Hedera testnet
6. **Frontend Development**: Begin with confidence in backend stability including Open Badges UI

## **⚡ Quick Start Commands**

```bash
# Start everything
./scripts/setup-local-env.sh

# Deploy contracts
cd packages/contracts && npm run deploy:local

# Check logs
docker-compose logs -f identity-service

# Stop environment
docker-compose down
```

This local-first approach ensures your UBeU platform is thoroughly tested and stable before moving to Hedera testnet, following industry best practices for blockchain development.

# Environment Configuration
NODE_ENV=development
DEBUG=ubeu:*
LOG_LEVEL=debug

# Server Ports
API_PORT=3001
FRONTEND_PORT=5173
ZKP_SERVICE_PORT=3002

# Database Configuration (Docker)
DATABASE_URL=postgresql://ubeu_admin:ubeu_dev_password@localhost:5433/ubeu_dev
REDIS_URL=redis://localhost:6380

# Hedera local-node Configuration
#Local node settings
LOCAL_OPERATOR_ID=0.0.2
LOCAL_OPERATOR_KEY=302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137
LOCAL_NODE_ENDPOINT=127.0.0.1:50211
LOCAL_ACCOUNT_ID=0.0.3
LOCAL_MIRROR_NODE_URL=http://127.0.0.1:5600

# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ACCOUNT_ID=0.0.6225264
HEDERA_OPERATOR_PRIVATE_KEY=133bbc730151c43e1c3f1d368dfc316dc2139c47a76c775a04d6e7acd956c1a3 
TREASURY_ACCOUNT_ID=0.0.789012
TREASURY_PRIVATE_KEY=your_treasury_private_key_here
AUDIT_TOPIC_ID=0.0.555555

# Frontend Configuration
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3001/api/v1
VITE_ZKP_SERVICE_URL=http://localhost:3002/api/v1

# JWT Configuration
JWT_SECRET=ubeu_development_jwt_secret_change_in_production_environment
JWT_EXPIRES_IN=24h

# External APIs
HEDERA_MIRROR_NODE_URL=https://testnet.mirrornode.hedera.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

# Security
BCRYPT_ROUNDS=12
CORS_ORIGIN=http://localhost:5173
HELMET_CSP_ENABLED=true

# Development Features
ENABLE_API_DOCS=true
ENABLE_METRICS=true
ENABLE_REQUEST_LOGGING=true
SKIP_EMAIL_VERIFICATION=true

# Testing
TEST_DATABASE_URL=postgresql://ubeu_admin:ubeu_dev_password@localhost:5433/ubeu_test

# Open Badges Testing Configuration
OPEN_BADGES_TEST_ISSUER_DID=did:hedera:testnet:0.0.12345
OPEN_BADGES_TEST_RECIPIENT_DID=did:hedera:testnet:0.0.67890
OPEN_BADGES_BACKPACK_URL=https://backpack.openbadges.org

# LMS Integration Testing
MOODLE_TEST_BASE_URL=https://demo.moodle.net
MOODLE_TEST_API_KEY=test_api_key
CANVAS_TEST_BASE_URL=https://canvas.instructure.com
CANVAS_TEST_API_KEY=test_canvas_key
GOOGLE_CLASSROOM_TEST_API_KEY=test_google_key

## **🛡️ Open Badges Testing Scenarios**

### **Badge Issuance Testing**
```bash
# Test basic badge issuance
curl -X POST http://localhost:3004/api/v1/badges/issue \
  -H "Content-Type: application/json" \
  -d '{
    "recipientDid": "'$OPEN_BADGES_TEST_RECIPIENT_DID'",
    "achievement": {
      "id": "urn:uuid:test-achievement-001",
      "type": "Achievement",
      "name": "Test Achievement",
      "description": "Successfully completed test scenario",
      "criteria": {
        "narrative": "Completed all test requirements"
      },
      "tags": ["testing", "education"]
    },
    "issuerDid": "'$OPEN_BADGES_TEST_ISSUER_DID'",
    "expirationDate": "2026-12-31T23:59:59Z"
  }'
```

### **Badge Verification Testing**
```bash
# Test badge authenticity verification
curl http://localhost:3004/api/v1/badges/urn:uuid:test-achievement-001/verify

# Test invalid badge verification
curl http://localhost:3004/api/v1/badges/urn:uuid:invalid-badge/verify
```

### **LMS Integration Testing**
```bash
# Test Moodle integration
curl -X POST http://localhost:3004/api/v1/lms/sync \
  -H "Content-Type: application/json" \
  -d '{
    "lmsConfig": {
      "type": "moodle",
      "baseUrl": "'$MOODLE_TEST_BASE_URL'",
      "apiKey": "'$MOODLE_TEST_API_KEY'",
      "courseId": "TEST101"
    },
    "badgeMapping": {
      "courseId": "TEST101",
      "badgeTemplateId": "course-completion",
      "issuerDid": "'$OPEN_BADGES_TEST_ISSUER_DID'",
      "autoIssue": true
    }
  }'

# Test Canvas integration
curl -X POST http://localhost:3004/api/v1/lms/sync \
  -H "Content-Type: application/json" \
  -d '{
    "lmsConfig": {
      "type": "canvas",
      "baseUrl": "'$CANVAS_TEST_BASE_URL'",
      "apiKey": "'$CANVAS_TEST_API_KEY'",
      "courseId": "CANVAS101"
    },
    "badgeMapping": {
      "courseId": "CANVAS101",
      "badgeTemplateId": "skill-certification",
      "issuerDid": "'$OPEN_BADGES_TEST_ISSUER_DID'",
      "autoIssue": false
    }
  }'
```

### **Badge Backpack Testing**
```bash
# Test badge export to backpack
curl -X POST http://localhost:3004/api/v1/backpack/export \
  -H "Content-Type: application/json" \
  -d '{
    "badgeId": "urn:uuid:test-achievement-001",
    "backpackConfig": {
      "provider": "open_badges",
      "baseUrl": "'$OPEN_BADGES_BACKPACK_URL'"
    },
    "recipientEmail": "test.student@example.edu"
  }'

# Test badge import from backpack
curl -X POST http://localhost:3004/api/v1/backpack/import \
  -H "Content-Type: application/json" \
  -d '{
    "backpackId": "backpack_12345",
    "backpackConfig": {
      "provider": "open_badges",
      "baseUrl": "'$OPEN_BADGES_BACKPACK_URL'"
    }
  }'
```

### **Educational Templates Testing**
```bash
# Get all educational badge templates
curl http://localhost:3004/api/v1/badges/templates/educational

# Test specific template usage
curl -X POST http://localhost:3004/api/v1/badges/issue \
  -H "Content-Type: application/json" \
  -d '{
    "recipientDid": "'$OPEN_BADGES_TEST_RECIPIENT_DID'",
    "achievement": {
      "id": "urn:uuid:subject-mastery-test",
      "type": "Achievement",
      "name": "Subject Mastery Certificate",
      "description": "Demonstrated comprehensive understanding and mastery of subject matter",
      "criteria": {
        "narrative": "Achieved mastery level on comprehensive subject assessment"
      },
      "tags": ["mastery", "subject", "expertise"]
    },
    "issuerDid": "'$OPEN_BADGES_TEST_ISSUER_DID'"
  }'
```

### **Badge Sharing Testing**
```bash
# Test shareable badge URL generation
curl http://localhost:3004/api/v1/badges/urn:uuid:test-achievement-001/share?provider=linkedin

# Test badge authenticity endpoint
curl http://localhost:3004/api/v1/badges/urn:uuid:test-achievement-001/authenticity
```

### **Load Testing Open Badges**
```bash
# Load test badge issuance (requires artillery or similar)
artillery quick --count 50 --num 10 \
  http://localhost:3004/api/v1/badges/issue \
  -d '{
    "recipientDid": "did:hedera:testnet:0.0.67890",
    "achievement": {
      "id": "urn:uuid:load-test-{{ $randomInt }}",
      "type": "Achievement",
      "name": "Load Test Badge",
      "description": "Badge issued during load testing",
      "criteria": {"narrative": "Load test completion"}
    },
    "issuerDid": "did:hedera:testnet:0.0.12345"
  }'
```
