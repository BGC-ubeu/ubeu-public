# UBeU: Identity as a Service

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Hedera](https://img.shields.io/badge/Hedera-Network-orange.svg)](https://hedera.com/)

> **UBeU** is a production-ready Identity as a Service (IaaS) platform that bridges Web2 simplicity with Web3 decentralized identity capabilities. Built on the Hedera network with PostgreSQL backend infrastructure.

## 🌟 Overview

UBeU transforms any Web3 domain (.eth, .hbar, .crypto, etc.) into a fully functional decentralized identity capable of receiving, storing, and presenting verifiable credentials from any W3C-compliant issuer. The platform provides zero-friction onboarding for both individual users and enterprise credential issuers.

### ✨ Key Features

- **🔐 Decentralized Identity**: Web3 domain-based identity with DID support
- **💰 Treasury Sponsorship**: Zero cryptocurrency requirements for users
- **🏢 Enterprise Ready**: PostgreSQL-backed with advanced billing
- **🔄 OpenID4 Compliance**: Universal wallet compatibility
- **📊 Advanced Analytics**: Real-time usage tracking and reporting
- **🔒 Security First**: AES-256 encryption and GDPR compliance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Hedera testnet/mainnet account

### Installation

```bash
# Clone the repository
git clone https://github.com/ubeu/ubeu-iaas.git
cd ubeu-iaas

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start development environment
npm run dev
```

### First Identity Creation

```bash
# Register a new identity
curl -X POST http://localhost:3000/api/v1/identities/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "domainAlias": "field1.field2.iam"
  }'
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [📖 Getting Started](./guides/getting-started.md) | Quick start guide for new users |
| [🏗️ Architecture](./ARCHITECTURE.md) | System architecture and design |
| [🔌 API Reference](./API.md) | Complete API documentation |
| [🚀 Deployment](./DEPLOYMENT.md) | Production deployment guide |
| [🔒 Security](./SECURITY.md) | Security guidelines and best practices |
| [💻 Development](./DEVELOPMENT.md) | Development setup and contribution guide |
| [🔧 Integration](./guides/integration-guide.md) | Third-party integration guide |
| [🛠️ Troubleshooting](./guides/troubleshooting.md) | Common issues and solutions |

## 🏗️ Architecture

UBeU is built as a microservices architecture with the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │   Web App       │ │   Mobile App    │ │   Admin Panel   │ │
│  │                 │ │                 │ │                 │ │
│  │ • React/Vue     │ │ • React Native  │ │ • Dashboard     │ │
│  │ • PWA Support   │ │ • Wallet Connect│ │ • Analytics     │ │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │ API Gateway     │ │ Microservices   │ │   Database      │ │
│  │                 │ │                 │ │                 │ │
│  │ • REST/GraphQL  │ │ • Identity Mgmt │ │ • PostgreSQL    │ │
│  │ • Authentication│ │ • Domain Verif. │ │ • Redis Cache   │ │
│  │ • Rate Limiting │ │ • Treasury      │ │ • Audit Logs    │ │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 Hedera Network Layer                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │ Smart Contracts │ │   HCS Topics    │ │   HTS Tokens    │ │
│  │                 │ │                 │ │                 │ │
│  │ • Data Storage  │ │ • DID Documents │ │ • UBAuth Tokens │ │
│  │ • Final         │ │ • Audit Trails  │ │ • Domain NFTs   │ │
│  │   Settlement    │ │ • Event Logs    │ └─────────────────┘ │
│  └─────────────────┘ └─────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

## 💰 Pricing Model

UBeU offers a hybrid pricing model designed for both individual users and enterprise credential issuers:

### Individual Tier - $49/year
- Unlimited treasury-sponsored network operations
- 1 included .iam personal domain + 1 external Web3 domain
- 2 DID digital identity profiles
- 5 social media verifications
- Unlimited credential reception and updates

### Pro Issuer Tier - $199/month + $0.10/credential + $499 setup
- All individual features for unlimited users
- PostgreSQL-backed enterprise account management
- DNS domain verification for credential issuer status
- Bulk credential issuance capabilities
- Basic analytics and usage reporting
- Up to 10,000 credentials/month included

### Enterprise Issuer Tier - Custom + $0.08/credential + $2,499 setup
- All Pro features with unlimited scale
- Advanced analytics and reporting
- Custom credential schemas and templates
- Priority support and SLAs
- OpenID4VCI/VP enterprise integration
- White-label options and custom branding

## 🔧 Technology Stack

### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Fastify for high-performance APIs
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis for session and rate limiting
- **Blockchain**: Hedera SDK with HCS/HTS integration

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for client state
- **UI Components**: Radix UI primitives

### DevOps
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes manifests
- **CI/CD**: GitHub Actions with automated testing
- **Monitoring**: Prometheus + Grafana stack

## 🌐 API Endpoints

### Identity Management
```bash
# Create identity
POST /api/v1/identities/register

# Resolve DID
GET /api/v1/identities/did/{did}

# Update identity
PUT /api/v1/identities/{id}
```

### Domain Verification
```bash
# Register .iam domain
POST /api/v1/domains/register

# Verify external domain
POST /api/v1/domains/verify

# Get domain status
GET /api/v1/domains/{domain}
```

### Credential Management
```bash
# Issue credential
POST /api/v1/credentials/issue

# Get credential
GET /api/v1/credentials/{id}

# Verify credential
POST /api/v1/credentials/verify
```

### Billing & Subscriptions
```bash
# Create subscription
POST /api/v1/billing/subscriptions

# Get pricing
GET /api/v1/billing/pricing

# Process payment
POST /api/v1/billing/webhook
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📊 Monitoring

UBeU includes comprehensive monitoring and observability:

- **Application Metrics**: Response times, error rates, throughput
- **Business Metrics**: User registrations, credential issuances, revenue
- **Infrastructure**: CPU, memory, disk usage, network I/O
- **Blockchain**: Transaction success rates, gas usage, HCS performance

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](./DEVELOPMENT.md) for details on:

- Setting up your development environment
- Code style and standards
- Testing requirements
- Pull request process
- Release workflow

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with tests
4. Run the test suite: `npm test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.ubeu.io](https://docs.ubeu.io)
- **Issues**: [GitHub Issues](https://github.com/ubeu/ubeu-iaas/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ubeu/ubeu-iaas/discussions)
- **Email**: support@ubeu.io

## 🙏 Acknowledgments

- **Hedera**: For providing the robust distributed ledger infrastructure
- **Hiero DID SDK**: For the comprehensive DID management library
- **OpenID4 Community**: For the universal identity standards
- **Our Contributors**: For their dedication to decentralized identity

---

**UBeU** - Bridging Web2 simplicity with Web3 sovereignty 🌉