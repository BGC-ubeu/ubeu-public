# Greenfield UBeU Monorepo Project Structure

Yes, this is designed as a **modern monorepo architecture** using Lerna for package management and Yarn workspaces for dependency management. Here's the comprehensive project structure:

## Root Level Structure

```
ubeu-platform/
├── 📁 packages/                    # All application packages
├── 📁 infrastructure/              # Infrastructure as Code
├── 📁 docs/                        # Documentation
├── 📁 tools/                       # Development tools
├── 📁 .github/                     # GitHub Actions & templates
├── 📄 package.json                 # Root package configuration
├── 📄 lerna.json                   # Lerna monorepo configuration
├── 📄 docker-compose.yml           # Local development environment
├── 📄 .env.example                 # Environment variables template
└── 📄 README.md                    # Project documentation
```

## 📁 packages/ Directory Structure

### Core Application Packages

```
packages/
├── 📁 api-gateway/                 # API Gateway service
│   ├── 📁 src/
│   │   ├── 📁 routes/              # API route definitions
│   │   ├── 📁 middleware/          # Authentication, rate limiting
│   │   ├── 📁 schemas/             # Request/response schemas
│   │   └── 📄 app.ts               # Main application
│   ├── 📄 package.json
│   ├── 📄 Dockerfile
│   └── 📄 docker-compose.yml
│
├── 📁 identity-service/            # Identity management service
│   ├── 📁 src/
│   │   ├── 📁 controllers/         # HTTP request handlers
│   │   ├── 📁 services/            # Business logic
│   │   ├── 📁 repositories/        # Data access layer
│   │   ├── 📁 models/              # Database models
│   │   └── 📁 types/               # TypeScript interfaces
│   ├── 📁 test/                    # Unit and integration tests
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📄 Dockerfile
│
├── 📁 domain-verification-service/ # Domain ownership verification
│   ├── 📁 src/
│   │   ├── 📁 verifiers/           # Blockchain verifiers
│   │   ├── 📁 cache/               # Verification caching
│   │   ├── 📁 services/            # Verification logic
│   │   └── 📁 types/               # Type definitions
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 treasury-service/            # Network fee sponsorship
│   ├── 📁 src/
│   │   ├── 📁 exchange/            # Exchange rate management
│   │   ├── 📁 allowances/          # User allowance tracking
│   │   ├── 📁 sponsorship/         # Transaction sponsorship
│   │   └── 📁 analytics/           # Cost analytics
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 credential-service/          # Verifiable credentials
│   ├── 📁 src/
│   │   ├── 📁 issuance/            # Credential creation
│   │   ├── 📁 verification/        # Credential validation
│   │   ├── 📁 schemas/             # Credential schemas
│   │   └── 📁 revocation/          # Credential revocation
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 social-verification-service/ # Social media verification
│   ├── 📁 src/
│   │   ├── 📁 platforms/           # Platform integrations
│   │   ├── 📁 badges/              # UV badge management
│   │   └── 📁 verification/        # Verification workflows
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 analytics-service/           # Usage analytics & monitoring
│   ├── 📁 src/
│   │   ├── 📁 metrics/             # Performance metrics
│   │   ├── 📁 events/              # Event tracking
│   │   └── 📁 dashboards/          # Analytics dashboards
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 shared/                      # Shared utilities & types
│   ├── 📁 src/
│   │   ├── 📁 types/               # Common TypeScript types
│   │   ├── 📁 utils/               # Utility functions
│   │   ├── 📁 constants/           # Application constants
│   │   └── 📁 errors/              # Custom error classes
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📁 contracts/                   # Smart contracts
│   ├── 📁 contracts/               # Solidity source files
│   │   ├── 📁 interfaces/          # Contract interfaces
│   │   ├── 📁 libraries/           # Reusable libraries
│   │   └── 📄 UBeURegistry.sol     # Main registry contract
│   ├── 📁 test/                    # Contract tests
│   ├── 📁 scripts/                 # Deployment scripts
│   ├── 📄 hardhat.config.ts        # Hardhat configuration
│   └── 📄 package.json
│
└── 📁 sdk/                         # Client SDK
    ├── 📁 src/
    │   ├── 📁 client/              # API client
    │   ├── 📁 wallet/              # Wallet integration
    │   ├── 📁 identity/            # Identity management
    │   └── 📁 credentials/         # Credential operations
    ├── 📄 package.json
    ├── 📄 rollup.config.js         # Build configuration
    └── 📄 tsconfig.json
```

## 📁 infrastructure/ Directory Structure

```
infrastructure/
├── 📁 terraform/                   # Infrastructure as Code
│   ├── 📁 environments/            # Environment-specific configs
│   │   ├── 📁 dev/
│   │   ├── 📁 staging/
│   │   └── 📁 prod/
│   ├── 📁 modules/                 # Reusable infrastructure modules
│   │   ├── 📁 kubernetes/
│   │   ├── 📁 database/
│   │   ├── 📁 networking/
│   │   └── 📁 monitoring/
│   └── 📄 main.tf
│
├── 📁 kubernetes/                  # Kubernetes manifests
│   ├── 📁 base/                    # Base configurations
│   ├── 📁 overlays/                # Environment overlays
│   ├── 📁 helm/                    # Helm charts
│   └── 📄 kustomization.yaml
│
├── 📁 docker/                      # Docker configurations
│   ├── 📁 images/                  # Custom Docker images
│   └── 📁 compose/                 # Docker Compose files
│
└── 📁 monitoring/                  # Monitoring & observability
    ├── 📁 prometheus/              # Prometheus configuration
    ├── 📁 grafana/                 # Grafana dashboards
    └── 📁 alerts/                  # Alert configurations
```

## 📁 docs/ Directory Structure

```
docs/
├── 📄 README.md                    # Project overview
├── 📄 API.md                       # API documentation
├── 📄 ARCHITECTURE.md              # System architecture
├── 📄 DEPLOYMENT.md                # Deployment guide
├── 📄 SECURITY.md                  # Security guidelines
├── 📄 DEVELOPMENT.md               # Development setup
├── 📁 api/                         # API specifications
│   ├── 📄 identity-api.yaml        # OpenAPI spec
│   ├── 📄 domain-api.yaml
│   └── 📄 credential-api.yaml
├── 📁 architecture/                # Architecture documentation
│   ├── 📄 data-model.md
│   ├── 📄 service-interactions.md
│   └── 📄 scalability.md
└── 📁 guides/                      # User guides
    ├── 📄 getting-started.md
    ├── 📄 integration-guide.md
    └── 📄 troubleshooting.md
```

## Key Configuration Files

### 📄 lerna.json - Monorepo Configuration
```json
{
  "packages": ["packages/*"],
  "version": "1.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "command": {
    "publish": {
      "ignoreChanges": ["*.md"],
      "message": "chore(release): publish"
    }
  }
}
```

### 📄 package.json - Root Package Configuration
```json
{
  "name": "ubeu-platform",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "lerna run build",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "clean": "lerna run clean",
    "dev": "lerna run dev --parallel",
    "deploy": "lerna run deploy"
  },
  "devDependencies": {
    "lerna": "^7.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^14.0.0"
  }
}
```

### 📄 docker-compose.yml - Local Development
```yaml
version: '3.8'
services:
  api-gateway:
    build: ./packages/api-gateway
    ports:
      - "3000:3000"
    depends_on:
      - identity-service
      - domain-verification-service
  
  identity-service:
    build: ./packages/identity-service
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/ubeu
    depends_on:
      - postgres
      - redis
  
  domain-verification-service:
    build: ./packages/domain-verification-service
    depends_on:
      - redis
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ubeu
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Package Dependencies & Relationships

### Dependency Flow
```
shared
├── identity-service
├── domain-verification-service
├── treasury-service
├── credential-service
├── social-verification-service
└── analytics-service
    └── api-gateway
```

### Shared Package Contents
```typescript
// packages/shared/src/types/index.ts
export interface User {
  id: string;
  primaryDid: string;
  domains: string[];
  allowances: Allowance;
}

export interface DID {
  id: string;
  did: string;
  context: DIDContext;
  hcsTopicId: string;
}

export interface Domain {
  name: string;
  type: DomainType;
  ownerId: string;
  verifiedAt?: Date;
}
```

## Development Workflow

### Local Development
```bash
# Install dependencies
yarn install

# Start all services
yarn dev

# Run tests across all packages
yarn test

# Build all packages
yarn build

# Lint all packages
yarn lint
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: yarn install
      - run: yarn lint
      - run: yarn test
      - run: yarn build
```

## Deployment Strategy

### Environment-Based Deployments
- **Development**: Local Docker Compose
- **Staging**: Kubernetes with Helm charts
- **Production**: Multi-region Kubernetes with ArgoCD

### Service Mesh Architecture
```
┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │────│  Service Mesh   │
│   (Kong/Traefik)│    │  (Istio/Linkerd)│
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│ Identity Service│    │Domain Service   │
│                 │    │                 │
│ • Auto-scaling  │    │ • Auto-scaling  │
│ • Load balanced │    │ • Load balanced │
└─────────────────┘    └─────────────────┘
```

This monorepo structure provides:
- **Clear separation of concerns** between services
- **Shared code management** through the shared package
- **Independent deployment** of services
- **Consistent tooling** across all packages
- **Scalable development** with proper CI/CD pipelines

# Greenfield UBeU Development Strategy

## **Recommendation: Start Fresh with AI-Assisted Development**

Based on the analysis, I recommend **starting fresh** rather than copying the current project. Here's why and how:

---

## **Approach Comparison**

### ❌ **Copy & Refactor Current Project**
**Pros:**
- Existing working code
- Proven business logic
- Faster initial progress

**Cons:**
- Heavy architectural baggage
- Complex refactoring required
- Legacy patterns persist
- Higher risk of bugs
- Timeline: 6-9 months

### ✅ **Start Fresh (Recommended)**
**Pros:**
- Clean architecture from day one
- Modern best practices
- Easier maintenance
- Better scalability
- Faster long-term development
- AI can build it efficiently

**Cons:**
- Rebuild everything from scratch
- Initial slower progress
- Risk of missing requirements
- Timeline: 4-6 months

---

## **Why Start Fresh is Better**

### **Current Project Issues:**
- **Contract-heavy architecture** with complex on-chain logic
- **Legacy patterns** that don't scale well
- **Mixed concerns** between contracts and backend
- **Optimization hacks** for contract size limits
- **Complex treasury tracking** on-chain

### **Greenfield Advantages:**
- **Backend-first design** with contracts as data layer
- **Modern cloud-native patterns**
- **Clean separation of concerns**
- **Horizontal scalability**
- **Standard web development practices**

---

## **Effective AI Prompt Structure**

Here's the optimal prompt to initiate greenfield development:

## **Primary AI Prompt:**

```
You are a senior full-stack architect specializing in modern web applications and blockchain integration. You need to build UBeU, a production-ready Identity as a Service platform from scratch.

## MISSION
Build a greenfield UBeU platform that provides seamless Web2-to-Web3 identity management using did:hedera, with complete blockchain complexity abstraction.

## CORE REQUIREMENTS
- Backend-first architecture with Node.js/TypeScript
- PostgreSQL database with Redis caching
- REST/GraphQL APIs with OpenAPI documentation
- Treasury-sponsored Hedera network fees ($2/user/year allowance)
- Multi-DID single-topic architecture
- Domain verification for .iam, .eth, all EVM-compatible domains (phase 1), and non-EVM (.sol, .btc, etc.) domains (phase 2)
- Verifiable credentials with AnonCreds
- Social media verification with UV badges
- Smart contracts as data layer only
- Kubernetes deployment with microservices

## BUSINESS LOGIC TO PRESERVE
- $20/year subscription covers identity service + network fees
- Users use human-readable aliases (Web3 domains or .iam domains) for DID identifiers
- Treasury sponsors ALL Hedera transactions
- Complete blockchain abstraction from UX
- GDPR/CCPA compliance
- Exportable identities for self-custody

## TECHNICAL CONSTRAINTS
- Monorepo structure with Lerna/Yarn workspaces
- 99.9% uptime requirement
- <500ms API response times
- Support 1M+ users
- SOC 2 compliance ready

## DEVELOPMENT APPROACH
1. Start with project structure and core services
2. Implement identity management service first
3. Add domain verification service
4. Integrate treasury service for fee sponsorship
5. Add credential and social verification services
6. Implement smart contracts for data anchoring
7. Add monitoring, analytics, and security

## DELIVERABLES
- Complete monorepo with all services
- Docker/Kubernetes deployment configs
- OpenAPI specifications
- Database schemas and migrations
- Unit and integration tests
- Security audit preparation
- Production deployment guides

Begin by creating the project structure and implementing the identity management service.
```

---

## **Step-by-Step Implementation Plan**

### **Phase 1: Foundation (Week 1-2)**
```bash
# Initialize monorepo
mkdir ubeu-digital-identity
cd ubeu-digital-identity
npm init -y
npx lerna init

# Create core packages
npx lerna create shared
npx lerna create identity-service
npx lerna create api-gateway
npx lerna create database

# Set up basic infrastructure
# - Docker Compose for local dev
# - TypeScript configurations
# - ESLint/Prettier setup
# - Basic CI/CD pipeline
```

### **Phase 2: Core Identity Service (Week 3-4)**
```typescript
// Start with identity management
interface IdentityService {
  createIdentity(userData: UserRegistration): Promise<IdentityResult>
  resolveDID(did: string): Promise<DIDDocument>
  updateDID(did: string, updates: DIDUpdate): Promise<boolean>
  linkDomain(did: string, domain: string): Promise<boolean>
}
```

### **Phase 3: Domain Verification (Week 5-6)**
```typescript
// Direct blockchain API integration
class DomainVerificationService {
  async verifyENSDomain(domain: string, owner: string): Promise<boolean>
  async verifyUnstoppableDomain(domain: string, owner: string): Promise<boolean>
  async verifyIamDomain(domain: string, owner: string): Promise<boolean>
}
```

### **Phase 4: Treasury Integration (Week 7-8)**
```typescript
// Clean treasury implementation
class TreasuryService {
  async sponsorTransaction(userId: string, operation: HederaOperation): Promise<boolean>
  async getUserAllowance(userId: string): Promise<Allowance>
  async trackNetworkSpend(userId: string, amount: number): Promise<void>
}
```

### **Phase 5: Smart Contracts (Week 9-10)**
```solidity
// Minimal contracts for data anchoring
contract UBeURegistry {
    function anchorIdentity(bytes32 identityHash, address owner) external
    function anchorCredential(bytes32 credentialHash, string memory did) external
    function anchorDomain(bytes32 domainHash, string memory did) external
}
```

---

## **AI-Assisted Development Workflow**

### **Prompt Engineering Strategy:**

1. **Context-Rich Prompts**: Include business requirements, technical constraints, and success criteria

2. **Incremental Development**: Build service by service, not all at once

3. **Quality Assurance**: Include testing, documentation, and security requirements in each prompt

4. **Integration Focus**: Ensure services work together from the start

### **Example Service-Specific Prompt:**

```
Implement the Domain Verification Service for UBeU greenfield platform.

REQUIREMENTS:
- Support all EVM-compatible (.eth), Unstoppable Domains (.crypto, ALL Tlds etc.), and UBeU native .iam domains created with user registration
- Direct blockchain API integration (no oracles)
- Redis caching with 24-hour TTL
- Rate limiting and error handling
- TypeScript with comprehensive error types
- Unit tests with >90% coverage
- OpenAPI documentation

ARCHITECTURE:
- Clean service layer with repository pattern
- Database persistence for verification results
- Event-driven cache invalidation
- Circuit breaker pattern for external APIs

DELIVERABLES:
- Complete service implementation
- Database migrations
- Docker configuration
- Integration tests
- API documentation
```

---

## **Risk Mitigation**

### **Business Logic Preservation:**
- Create comprehensive business requirements document first
- Implement integration tests that validate business rules
- Regular reviews against current platform behavior

### **Timeline Management:**
- Start with MVP features (identity creation, DID resolution)
- Add advanced features iteratively
- Parallel development of multiple services

### **Quality Assurance:**
- Automated testing from day one
- Code reviews and pair programming
- Security audits at each phase
- Performance testing and optimization

---

## **Success Metrics**

### **Week 1-2: Foundation**
- ✅ Monorepo structure established
- ✅ Basic services skeleton implemented
- ✅ Database schema designed
- ✅ CI/CD pipeline working

### **Week 3-4: Core Identity**
- ✅ User registration working
- ✅ DID creation and resolution
- ✅ Basic API endpoints functional
- ✅ Database operations tested

### **Week 5-6: Domain Verification**
- ✅ ENS domain verification
- ✅ .iam domain verification
- ✅ Caching implemented
- ✅ Error handling robust

### **Week 7-8: Treasury**
- ✅ Allowance tracking
- ✅ Transaction sponsorship
- ✅ Exchange rate integration
- ✅ Cost monitoring

### **Week 9-10: Production Ready**
- ✅ All services integrated
- ✅ End-to-end testing
- ✅ Security audit passed
- ✅ Performance optimized

---

## **Final Recommendation**

**Start fresh with the comprehensive AI prompt above.** The benefits of clean architecture, modern patterns, and faster long-term development outweigh the initial rebuild effort. The current project has too much architectural debt that would be expensive to refactor.

**Key Success Factors:**
1. **Detailed, context-rich prompts** for AI development
2. **Incremental, service-by-service approach**
3. **Strong testing and documentation focus**
4. **Regular integration and testing**
5. **Business logic validation at each step**

This approach will result in a superior, maintainable platform that achieves all UBeU's business goals with modern architecture.
