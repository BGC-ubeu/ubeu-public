# Contributing to UBeU

Thank you for your interest in contributing to UBeU! We welcome contributions from the community and are grateful for your help in making decentralized identity more accessible.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)
- [Security](#security)

## 🤝 Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code. Please report unacceptable behavior to [conduct@ubeu.io](mailto:conduct@ubeu.io).

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and **npm**
- **Docker** and **Docker Compose**
- **Git**
- **TypeScript** (optional, for development)

### Quick Setup

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/ubeu-public.git
cd ubeu-public

# Install dependencies
npm install

# Start the demo environment
cd docker && docker-compose up -d

# Verify setup
curl http://localhost:3000/health
```

## 🛠️ Development Setup

### Local Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/ubeu/ubeu-public.git
   cd ubeu-public
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development services**
   ```bash
   # Start demo environment
   cd docker && docker-compose up -d

   # Or start individual services
   npm run dev
   ```

4. **Verify installation**
   ```bash
   # Check service health
   curl http://localhost:3000/health

   # Run tests
   npm test
   ```

### IDE Setup

We recommend using **Visual Studio Code** with the following extensions:

- **TypeScript and JavaScript Language Features**
- **ESLint**
- **Prettier**
- **Docker**
- **GitLens**

## 💻 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🧪 **Tests**
- 🎨 **UI/UX improvements**
- 🌐 **Internationalization**
- 📦 **SDK improvements**

### Contribution Process

1. **Choose an issue** or **create a new one**
2. **Fork the repository**
3. **Create a feature branch**
4. **Make your changes**
5. **Write tests** if applicable
6. **Update documentation**
7. **Submit a pull request**

## 🔄 Development Workflow

### Branch Naming Convention

```bash
# Feature branches
feature/add-new-endpoint
feature/improve-documentation

# Bug fix branches
fix/login-validation-bug
fix/api-response-format

# Documentation branches
docs/update-api-reference
docs/add-integration-guide
```

### Commit Message Format

```bash
type(scope): description

# Examples
feat(auth): add OAuth2 support
fix(api): resolve credential validation bug
docs(sdk): update JavaScript examples
test(auth): add integration tests for login flow
```

### Pull Request Process

1. **Create a descriptive PR title**
2. **Provide detailed description**
3. **Reference related issues**
4. **Add screenshots** for UI changes
5. **Request review** from maintainers

## 📝 Coding Standards

### TypeScript/JavaScript

- **Use TypeScript** for all new code
- **Strict type checking** enabled
- **ES6+ features** preferred
- **Async/await** over Promises
- **Descriptive variable names**

```typescript
// ✅ Good
async function createUserIdentity(domain: string): Promise<Identity> {
  const validation = await validateDomain(domain);
  if (!validation.isValid) {
    throw new Error(`Invalid domain: ${validation.error}`);
  }

  return await this.identityService.create({ domain });
}

// ❌ Avoid
async function create(d) {
  const v = await validate(d);
  if (!v.ok) throw new Error(v.err);
  return await svc.create({d});
}
```

### API Design

- **RESTful conventions**
- **JSON responses**
- **Consistent error formats**
- **OpenAPI documentation**

```typescript
// ✅ Good API response
{
  "success": true,
  "data": {
    "id": "did:hedera:mainnet:12345",
    "domain": "user.iam"
  }
}

// ❌ Avoid inconsistent responses
{
  "status": "ok",
  "user": {
    "identifier": "did:hedera:mainnet:12345"
  }
}
```

### Smart Contracts

- **Clear function documentation**
- **Input validation**
- **Event emission**
- **Gas optimization**

```solidity
// ✅ Good contract function
/// @notice Creates a new domain NFT
/// @param domain The domain name to register
/// @param owner The owner address
/// @return tokenId The NFT token ID
function createDomainNFT(
    string calldata domain,
    address owner
) external returns (uint256 tokenId) {
    require(bytes(domain).length > 0, "Domain cannot be empty");
    require(owner != address(0), "Invalid owner address");

    tokenId = _nextTokenId++;
    _mint(owner, tokenId);
    _domains[tokenId] = domain;

    emit DomainCreated(tokenId, domain, owner);
}
```

## 🧪 Testing

### Test Coverage Requirements

- **Unit tests**: 80%+ coverage
- **Integration tests**: All critical paths
- **API tests**: All endpoints
- **Contract tests**: All functions

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/auth.test.js
```

### Writing Tests

```typescript
// ✅ Good test structure
describe('IdentityService', () => {
  describe('createIdentity', () => {
    it('should create identity with valid domain', async () => {
      const domain = 'test.iam';
      const identity = await identityService.createIdentity(domain);

      expect(identity).toHaveProperty('id');
      expect(identity.domain).toBe(domain);
      expect(identity.status).toBe('pending');
    });

    it('should reject invalid domain', async () => {
      const invalidDomain = '';

      await expect(
        identityService.createIdentity(invalidDomain)
      ).rejects.toThrow('Invalid domain');
    });
  });
});
```

## 📚 Documentation

### Documentation Standards

- **Clear, concise language**
- **Code examples** for all features
- **Step-by-step guides**
- **Troubleshooting sections**
- **API reference** completeness

### Updating Documentation

```bash
# Update API documentation
npm run docs:api

# Update SDK documentation
npm run docs:sdk

# Build all documentation
npm run docs:build
```

## 🐛 Reporting Issues

### Bug Reports

**Please include:**

- **Clear title** describing the issue
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Screenshots** if applicable
- **Error logs**

### Feature Requests

**Please include:**

- **Clear description** of the feature
- **Use case** and **benefits**
- **Implementation suggestions**
- **Mockups** or **examples**

## 🔒 Security

### Security Considerations

- **Never commit secrets** or credentials
- **Use environment variables** for configuration
- **Validate all inputs**
- **Follow OWASP guidelines**
- **Regular dependency updates**

### Reporting Security Issues

**Please report security vulnerabilities to [security@ubeu.io](mailto:security@ubeu.io)**

- **DO NOT** create public GitHub issues for security vulnerabilities
- **DO NOT** commit security fixes without review
- **Include** detailed reproduction steps
- **Allow time** for fixes before public disclosure

## 🎉 Recognition

Contributors will be recognized through:

- **GitHub contributor statistics**
- **Mention in release notes**
- **Contributor spotlight** in community updates
- **Exclusive access** to beta features
- **Swag and merchandise** for significant contributions

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and community discussion
- **Community Forum**: [community.ubeu.io](https://community.ubeu.io)
- **Discord**: Real-time chat and support
- **Email**: [support@ubeu.io](mailto:support@ubeu.io)

### Response Times

- **Bug fixes**: Within 24-48 hours
- **Feature requests**: Within 1 week
- **General questions**: Within 24 hours

## 🙏 Thank You

Your contributions help make decentralized identity more accessible to everyone. We appreciate your time and expertise in building the future of digital identity!

**Happy contributing! 🚀**