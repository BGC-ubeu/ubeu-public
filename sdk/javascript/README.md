# UBeU JavaScript SDK

Official JavaScript SDK for the UBeU Identity as a Service platform.

[![npm version](https://img.shields.io/npm/v/@ubeu/sdk.svg)](https://www.npmjs.com/package/@ubeu/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Features

- **🔄 OpenID4 Compliance** - Universal wallet compatibility
- **🌐 Multi-Domain Support** - .iam, .eth, .crypto domains
- **🔐 Type-Safe** - Full TypeScript support
- **📱 Cross-Platform** - Node.js and browser support
- **⚡ Fast** - Optimized for performance
- **🛡️ Secure** - Built-in security best practices

## 📦 Installation

```bash
npm install @ubeu/sdk
```

## 🚀 Quick Start

```javascript
import { UBeUClient } from '@ubeu/sdk';

// Initialize client
const client = new UBeUClient({
  apiKey: 'your-api-key',
  environment: 'sandbox' // or 'production'
});

// Create an identity
const identity = await client.identities.create({
  domain: 'john.doe.iam',
  verificationMethod: 'email'
});

console.log('Identity created:', identity.did);
```

## 📚 Documentation

- **[Full API Reference](https://docs.ubeu.io/sdk/javascript)**
- **[Integration Guide](https://docs.ubeu.io/guides/integration)**
- **[Code Examples](https://docs.ubeu.io/examples/javascript)**

## 🏗️ API Overview

### Identity Management

```javascript
// Create identity
const identity = await client.identities.create({
  domain: 'user.domain.iam',
  verificationMethod: 'email'
});

// Get identity
const identity = await client.identities.get('did:hedera:mainnet:12345');

// Update identity
await client.identities.update(did, {
  profile: { name: 'John Doe' }
});

// Resolve DID
const document = await client.identities.resolve('did:hedera:mainnet:12345');
```

### Credential Operations

```javascript
// Issue credential
const credential = await client.credentials.issue({
  subjectDid: 'did:hedera:mainnet:12345',
  achievement: {
    name: 'Course Completion',
    description: 'Successfully completed Advanced Blockchain'
  },
  issuerDid: 'did:hedera:mainnet:issuer123'
});

// Verify credential
const result = await client.credentials.verify(credentialId);

// Present credential
const presentation = await client.credentials.present({
  credentials: [credentialId],
  holderDid: 'did:hedera:mainnet:12345',
  verifierDid: 'did:hedera:mainnet:verifier789'
});
```

### Domain Verification

```javascript
// Verify external domain
const result = await client.domains.verify({
  domain: 'user.eth',
  verificationType: 'wallet',
  ownerAddress: '0x1234...',
  signature: '0xabcd...'
});

// Link domain to identity
await client.domains.link({
  domain: 'user.eth',
  did: 'did:hedera:mainnet:12345'
});
```

## ⚙️ Configuration

```javascript
const client = new UBeUClient({
  // Required
  apiKey: 'your-api-key',

  // Optional
  environment: 'sandbox',        // 'sandbox' | 'production'
  timeout: 30000,               // Request timeout in ms
  retryAttempts: 3,             // Number of retry attempts
  baseUrl: 'https://api.ubeu.io', // Custom API endpoint

  // Advanced options
  logger: customLogger,         // Custom logger instance
  cache: customCache,           // Custom cache implementation
  rateLimiter: customLimiter    // Custom rate limiter
});
```

## 🔧 Environment Setup

### Sandbox Environment

```javascript
const client = new UBeUClient({
  apiKey: 'sandbox-api-key',
  environment: 'sandbox'
});
```

### Production Environment

```javascript
const client = new UBeUClient({
  apiKey: process.env.UBEU_API_KEY,
  environment: 'production'
});
```

## 🧪 Testing

```javascript
import { UBeUClient } from '@ubeu/sdk';

// Use sandbox for testing
const client = new UBeUClient({
  apiKey: 'test-api-key',
  environment: 'sandbox'
});

// All operations work the same way
const identity = await client.identities.create({
  domain: 'test.user.iam'
});
```

## 📝 Error Handling

```javascript
try {
  const result = await client.identities.create(params);
} catch (error) {
  switch (error.code) {
    case 'DOMAIN_ALREADY_REGISTERED':
      console.log('Domain is already taken');
      break;
    case 'INSUFFICIENT_FUNDS':
      console.log('Please top up your account');
      break;
    case 'INVALID_DOMAIN':
      console.log('Domain format is invalid');
      break;
    default:
      console.error('Unexpected error:', error.message);
  }
}
```

## 🔐 Authentication

### API Key Authentication

```javascript
const client = new UBeUClient({
  apiKey: 'your-api-key'
});
```

### OAuth2 Authentication (Coming Soon)

```javascript
const client = new UBeUClient({
  oauth: {
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectUri: 'https://your-app.com/callback'
  }
});
```

## 📊 Rate Limiting

The SDK includes built-in rate limiting:

```javascript
// Automatic rate limiting
const client = new UBeUClient({
  apiKey: 'your-api-key',
  rateLimit: {
    requests: 100,     // requests per window
    window: 60000      // window in milliseconds
  }
});
```

## 🌐 Browser Support

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/@ubeu/sdk@latest/dist/browser.js"></script>
</head>
<body>
  <script>
    const client = new UBeU.UBeUClient({
      apiKey: 'your-api-key'
    });

    // Use the SDK
    client.identities.create({
      domain: 'user.iam'
    }).then(identity => {
      console.log('Identity:', identity);
    });
  </script>
</body>
</html>
```

## 🔧 Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/ubeu/ubeu-public.git
cd ubeu-public/sdk/javascript

# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test

# Generate documentation
npm run docs
```

### Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for development guidelines.

## 📋 Requirements

- **Node.js**: 18.0.0 or higher
- **TypeScript**: 4.9.0 or higher (for development)
- **npm**: 8.0.0 or higher

## 🐛 Troubleshooting

### Common Issues

#### Connection Timeout
```javascript
// Increase timeout
const client = new UBeUClient({
  apiKey: 'your-api-key',
  timeout: 60000  // 60 seconds
});
```

#### Rate Limiting
```javascript
// Implement backoff strategy
let retries = 0;
const maxRetries = 3;

while (retries < maxRetries) {
  try {
    const result = await client.identities.create(params);
    break;
  } catch (error) {
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      retries++;
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, retries) * 1000)
      );
    } else {
      throw error;
    }
  }
}
```

## 📞 Support

- 📖 **[Documentation](https://docs.ubeu.io/sdk/javascript)**
- 💬 **[Community Forum](https://community.ubeu.io)**
- 🐛 **[Issue Tracker](https://github.com/ubeu/ubeu-public/issues)**
- 📧 **[Support Email](support@ubeu.io)**

## 📄 License

This SDK is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

**Built with ❤️ for the future of digital identity**