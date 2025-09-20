# Getting Started with UBeU

Welcome to UBeU! This guide will help you get started with creating your decentralized identity and issuing your first verifiable credential.

## What is UBeU?

UBeU is a decentralized identity platform that bridges Web2 simplicity with Web3 security. It allows you to:

- **Own your identity**: Create a decentralized identifier (DID) that you control
- **Register domains**: Use human-readable alias like an existing Web3 domain `john.eth` or a UBeU native domain `john.smith.iam`
- **Issue credentials**: Create verifiable credentials for education, employment, etc.
- **Share securely**: Present your credentials to verifiers without revealing unnecessary data

## Quick Start

### 1. Create Your Account

Visit [app.ubeu.io](https://app.ubeu.io) and click "Get Started".

```bash
# Or use our API directly
curl -X POST https://api.ubeu.io/v1/identities/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "domainAlias": "field1.field2.iam"
  }'
```

### 2. Choose Your Plan

UBeU offers flexible pricing for different needs:

| Plan | Price | Features |
|------|-------|----------|
| **Individual** | $49/year | Unlimited credentials, 1 .iam domain, 2 DID profiles, social media verifications |
| **Pro** | $199/month | Everything + bulk issuance, DNS verification |
| **Enterprise** | Custom | All features + white-label, custom schemas |

### 3. Register Your Domain

#### Option A: .iam Domain (Recommended)
```bash
curl -X POST https://api.ubeu.io/v1/domains/register \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "field1.field2.iam",
    "userId": "your-user-id"
  }'
```

#### Option B: External Web3 Domain
```bash
curl -X POST https://api.ubeu.io/v1/domains/verify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "yourname.eth",
    "signature": "0x...",
    "message": "Verify ownership of yourname.eth"
  }'
```

### 4. Create Your First Credential

```bash
curl -X POST https://api.ubeu.io/v1/credentials/issue \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subjectDid": "did:hedera:mainnet:0.0.YOUR_ACCOUNT",
    "type": "DomainOwnership",
    "claims": {
      "domain": "yourname.eth",
      "ownershipVerified": true,
      "verificationDate": "2025-01-01T00:00:00Z"
    },
    "expirationDate": "2026-01-01T00:00:00Z"
  }'
```

## Understanding UBeU Concepts

### Decentralized Identifiers (DIDs)

A DID is a unique identifier that you own and control:

```
did:hedera:mainnet:0.0.12345
```

- **You own it**: No central authority can take it away
- **You control it**: Private keys give you full control
- **It's portable**: Works across different platforms and services

### Verifiable Credentials

Credentials are tamper-proof digital certificates:

```json
{
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": ["VerifiableCredential", "DomainOwnership"],
  "issuer": "did:hedera:mainnet:0.0.issuer",
  "issuanceDate": "2025-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:hedera:mainnet:0.0.12345",
    "domain": "john.smith.iam",
    "ownershipVerified": true
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "verificationMethod": "did:hedera:mainnet:0.0.issuer#key-1",
    "proofValue": "z..."
  }
}
```

### Domain Types

UBeU supports multiple domain types:

#### .iam Domains
- **Purpose**: Personal identity domains
- **Format**: `field1.field2.iam`
- **Registration**: Through UBeU platform
- **Cost**: Included in Individual plan

#### External Web3 Domains
- **Purpose**: Existing Web3 domains
- **Supported**: .eth, .crypto, .sol, .btc, etc.
- **Verification**: Cryptographic proof of ownership
- **Cost**: Free (gas fees only)

## Step-by-Step Tutorials

### Tutorial 1: Create Your Identity

1. **Sign up** at [app.ubeu.io](https://app.ubeu.io)
2. **Verify your email** with the confirmation link
3. **Choose your plan** (Individual recommended for starters)
4. **Complete payment** (secure checkout process)
5. **Register domain** (e.g., `john.smith.iam`)

Your identity is now created! You can view it at:
```
https://app.ubeu.io/identity/YOUR_USER_ID
```

### Tutorial 2: Issue Your First Credential

1. **Navigate to Credentials** in your dashboard
2. **Click "Issue New Credential"**
3. **Choose credential type** (Domain Ownership, Skill Certification, etc.)
4. **Fill in the details**:
   - Subject: Your DID
   - Issuer: Your organization's DID
   - Claims: What you're certifying
   - Expiration: When it expires
5. **Add evidence** (supporting documents, URLs, etc.)
6. **Sign and issue** the credential

### Tutorial 3: Share Your Credential

1. **Go to your credentials list**
2. **Click "Share" on any credential**
3. **Choose sharing method**:
   - **Direct link**: Share a secure URL
   - **QR code**: For mobile scanning
   - **Selective disclosure**: Share only specific claims
4. **Set permissions** (who can view, expiration, etc.)
5. **Send the link** to the recipient

## Use Cases

### For Individuals

#### Professional Identity
- Create verifiable resume credentials
- Share employment history securely
- Prove educational achievements
- Demonstrate skill certifications

#### Personal Verification
- Age verification for services
- Identity proof for financial services
- Membership verification
- Access control for exclusive communities

### For Organizations

#### Educational Credentials
- University degrees and certificates
- Course completion certificates
- Professional certifications
- Continuing education credits

#### Employment Verification
- Employment history
- Performance reviews
- Security clearances
- Background check results

#### Compliance & Certification
- Industry certifications
- Regulatory compliance proofs
- Quality assurance certificates
- Environmental certifications

## Integration Examples

### JavaScript/TypeScript

```javascript
import { UBeUClient } from '@ubeu/sdk';

const client = new UBeUClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.ubeu.io/v1'
});

// Create identity
const identity = await client.identities.create({
  email: 'user@example.com',
  domainAlias: 'field1.field2.iam'
});

// Issue credential
const credential = await client.credentials.issue({
  subjectDid: identity.did,
  type: 'DomainOwnership',
  claims: { domain: 'field1.field2.iam' }
});

// Verify credential
const verification = await client.credentials.verify(credential.id);
```

### cURL Examples

```bash
# Create identity
curl -X POST https://api.ubeu.io/v1/identities/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","domainAlias":"field1.field2.iam"}'

# Get identity
curl https://api.ubeu.io/v1/identities/YOUR_USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Issue credential
curl -X POST https://api.ubeu.io/v1/credentials/issue \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subjectDid": "did:hedera:mainnet:0.0.12345",
    "type": "DomainOwnership",
    "claims": {"domain": "field1.field2.iam"}
  }'
```

## Best Practices

### Security

1. **Protect your private keys**: Never share your private keys or seed phrases
2. **Use hardware wallets**: For maximum security, use hardware security modules
3. **Enable 2FA**: Add an extra layer of security to your account
4. **Regular backups**: Keep secure backups of your identity data

### Privacy

1. **Minimal disclosure**: Only share necessary information
2. **Selective disclosure**: Use zero-knowledge proofs when possible
3. **Consent management**: Control who can access your data
4. **Data portability**: You can move your identity to other platforms

### Credential Management

1. **Regular renewal**: Keep credentials up to date
2. **Proper expiration**: Set appropriate expiration dates
3. **Evidence inclusion**: Include supporting evidence when issuing
4. **Revocation planning**: Have a plan for revoking compromised credentials

## Troubleshooting

### Common Issues

#### "Domain already registered"
**Solution**: Choose a different domain name or contact support for transfer

#### "Insufficient allowance"
**Solution**: Upgrade your plan or wait for monthly allowance reset

#### "Credential verification failed"
**Solution**: Check that the credential hasn't expired and the issuer is trusted

#### "Network congestion"
**Solution**: Hedera network congestion may cause delays; transactions will complete

### Getting Help

- **Documentation**: [docs.ubeu.io](https://docs.ubeu.io)
- **Community Forum**: [community.ubeu.io](https://community.ubeu.io)
- **Support Email**: support@ubeu.io
- **Live Chat**: Available in the web app

## What's Next?

Now that you have your UBeU identity set up, you can:

1. **Explore advanced features**:
   - Multiple DID profiles
   - Bulk credential issuance
   - Integration with existing systems

2. **Join the ecosystem**:
   - Connect with verifiers
   - Participate in credential networks
   - Contribute to the UBeU community

3. **Scale your usage**:
   - Upgrade to Pro or Enterprise plans
   - Integrate with your organization's systems
   - Build applications on top of UBeU

## Resources

- [API Reference](./../API.md) - Complete API documentation
- [Integration Guide](./integration-guide.md) - Third-party integrations
- [Security Guide](./../SECURITY.md) - Security best practices
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

Welcome to the decentralized identity revolution! 🌟