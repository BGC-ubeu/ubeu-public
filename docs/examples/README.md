# UBeU Integration Examples

This directory contains practical examples and use cases for integrating UBeU into your applications.

## 📚 Examples by Use Case

### 🏫 Educational Platforms
- **[LMS Integration](./lms-integration.md)** - Integrate with Moodle, Canvas, Google Classroom
- **[Course Completion Badges](./course-completion.md)** - Issue Open Badges for completed courses
- **[Student Verification](./student-verification.md)** - Verify student identities and credentials

### 🏢 Enterprise Applications
- **[HR Onboarding](./hr-onboarding.md)** - Employee identity verification and credentialing
- **[Compliance Management](./compliance-management.md)** - Regulatory compliance with verifiable credentials
- **[API Integration](./enterprise-api-integration.md)** - Enterprise-grade API integration

### 🏥 Healthcare
- **[Medical Credentials](./medical-credentials.md)** - Healthcare professional verification
- **[Patient Consent](./patient-consent.md)** - Privacy-preserving patient consent management
- **[Medical Records](./medical-records.md)** - Secure medical credential sharing

### 💼 Professional Services
- **[Background Checks](./background-checks.md)** - Employment verification credentials
- **[License Verification](./license-verification.md)** - Professional license validation
- **[Certification Management](./certification-management.md)** - Professional certification tracking

## 🛠️ Technical Examples

### SDK Usage
- **[JavaScript SDK](./javascript-sdk.md)** - Complete JavaScript/TypeScript examples
- **[REST API](./rest-api.md)** - Direct API integration examples
- **[Webhook Integration](./webhooks.md)** - Real-time event processing

### Advanced Features
- **[Bulk Operations](./bulk-operations.md)** - Large-scale credential issuance
- **[Multi-Domain Setup](./multi-domain.md)** - Managing multiple domains per identity
- **[Custom Credential Types](./custom-credentials.md)** - Creating custom credential schemas

## 🚀 Quick Start Examples

### Basic Identity Creation
```javascript
import { UBeUClient } from '@ubeu/sdk';

const client = new UBeUClient({
  apiKey: 'your-api-key',
  environment: 'sandbox'
});

// Create an identity
const identity = await client.identities.create({
  domain: 'john.doe.iam',
  verificationMethod: 'email'
});

console.log('DID:', identity.did);
```

### Issue a Credential
```javascript
// Issue a course completion credential
const credential = await client.credentials.issue({
  subjectDid: identity.did,
  type: 'CourseCompletion',
  claims: {
    courseName: 'Advanced JavaScript',
    completionDate: '2025-01-15',
    grade: 'A',
    instructor: 'Dr. Smith'
  },
  issuerDid: 'did:hedera:mainnet:university123'
});
```

### Verify a Credential
```javascript
// Verify credential authenticity
const verification = await client.credentials.verify(credential.id);

if (verification.verified) {
  console.log('Credential is valid and authentic');
}
```

## 📋 Prerequisites

Before running these examples:

1. **Get API Access**
   ```bash
   # Sign up for a sandbox account
   # Visit: https://ubeu.io/sandbox
   ```

2. **Install Dependencies**
   ```bash
   npm install @ubeu/sdk
   ```

3. **Environment Setup**
   ```javascript
   // .env file
   UBEU_API_KEY=your-sandbox-api-key
   UBEU_ENVIRONMENT=sandbox
   ```

## 🧪 Testing

All examples include test suites:

```bash
# Run example tests
cd examples/javascript-sdk
npm test

# Run integration tests
npm run test:integration
```

## 📞 Support

- **📖 Documentation**: [docs.ubeu.io](https://docs.ubeu.io)
- **💬 Community**: [community.ubeu.io](https://community.ubeu.io)
- **🐛 Issues**: [GitHub Issues](https://github.com/ubeu/ubeu-public/issues)

---

**Need help with integration?** Contact our developer support team at developers@ubeu.io