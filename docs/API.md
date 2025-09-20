# UBeU API Reference

## Overview

UBeU provides a comprehensive REST API for managing decentralized identities, domains, credentials, and billing operations. All APIs follow RESTful conventions and return JSON responses.

## Base URL

```
https://api.ubeu.io/v1
```

## Authentication

UBeU uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Obtaining a Token

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "requestId": "uuid"
}
```

Error responses:

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable message",
  "details": { ... },
  "requestId": "uuid"
}
```

## Rate Limiting

UBeU implements rate limiting to prevent abuse:

- **Individual users**: 1000 requests/hour
- **Pro tier**: 5000 requests/hour
- **Enterprise tier**: 25000 requests/hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1638360000
```

---

# Identity Management API

## Create Identity

Register a new decentralized identity with optional domain alias.

```bash
POST /api/v1/identities/register
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "domainAlias": "john.smith.iam",
  "externalDomain": "john.eth",
  "subscriptionTier": "individual"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "did": "did:hedera:mainnet:0.0.12345",
    "hederaAccount": "0.0.12345",
    "topicId": "0.0.67890",
    "ubAuthToken": "0.0.11111",
    "subscription": {
      "id": "uuid",
      "tier": "individual",
      "status": "active"
    }
  }
}
```

## Get Identity

Retrieve identity information by user ID.

```bash
GET /api/v1/identities/{userId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "did": "did:hedera:mainnet:0.0.12345",
    "domains": [
      {
        "domain": "john.smith.iam",
        "type": "iam",
        "status": "active",
        "expiresAt": "2026-01-01T00:00:00Z"
      }
    ],
    "credentials": [
      {
        "id": "urn:uuid:credential-id",
        "type": "DomainOwnership",
        "issuer": "did:hedera:mainnet:0.0.issuer",
        "issuedAt": "2025-01-01T00:00:00Z"
      }
    ]
  }
}
```

## Resolve DID

Resolve a DID to its document.

```bash
GET /api/v1/identities/did/{did}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": "did:hedera:mainnet:0.0.12345",
    "controller": "did:hedera:mainnet:0.0.12345",
    "verificationMethod": [
      {
        "id": "did:hedera:mainnet:0.0.12345#key-1",
        "type": "Ed25519VerificationKey2020",
        "controller": "did:hedera:mainnet:0.0.12345",
        "publicKeyMultibase": "z..."
      }
    ],
    "service": [
      {
        "id": "did:hedera:mainnet:0.0.12345#domain",
        "type": "DomainLinkage",
        "serviceEndpoint": "john.smith.iam"
      }
    ]
  }
}
```

## Update Identity

Update identity information.

```bash
PUT /api/v1/identities/{userId}
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "domainAlias": "johnsmith.iam"
}
```

---

# Domain Management API

## Register .iam Domain

Register a new .iam domain.

```bash
POST /api/v1/domains/register
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "domain": "john.smith.iam",
  "userId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "domain": "john.smith.iam",
    "nftTokenId": "0.0.12345",
    "transactionId": "0.0.12345@1234567890.000000000",
    "expiresAt": "2026-01-01T00:00:00Z"
  }
}
```

## Verify External Domain

Verify ownership of external Web3 domains (.eth, .crypto, etc.).

```bash
POST /api/v1/domains/verify
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "domain": "john.eth",
  "userId": "uuid",
  "signature": "0x...",
  "message": "Verify ownership of john.eth"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "domain": "john.eth",
    "verified": true,
    "blockchain": "ethereum",
    "proof": "0x...",
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

## Get Domain Status

Check domain registration and verification status.

```bash
GET /api/v1/domains/{domain}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "domain": "john.smith.iam",
    "type": "iam",
    "status": "active",
    "owner": "uuid",
    "registeredAt": "2025-01-01T00:00:00Z",
    "expiresAt": "2026-01-01T00:00:00Z",
    "autoRenew": true
  }
}
```

---

# Credential Management API

## Issue Credential

Issue a new verifiable credential.

```bash
POST /api/v1/credentials/issue
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "subjectDid": "did:hedera:mainnet:0.0.12345",
  "type": "DomainOwnership",
  "claims": {
    "domain": "john.smith.iam",
    "ownershipVerified": true,
    "verificationDate": "2025-01-01T00:00:00Z"
  },
  "expirationDate": "2026-01-01T00:00:00Z",
  "evidence": [
    {
      "id": "https://ubeu.io/evidence/domain-verification",
      "type": "DomainVerification",
      "verifier": "did:hedera:mainnet:0.0.verifier"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "credentialId": "urn:uuid:credential-id",
    "transactionId": "0.0.12345@1234567890.000000000",
    "status": "issued",
    "cost": 50000
  }
}
```

## Get Credential

Retrieve a credential by ID.

```bash
GET /api/v1/credentials/{credentialId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json"
    ],
    "type": ["VerifiableCredential", "DomainOwnership"],
    "id": "urn:uuid:credential-id",
    "issuer": {
      "id": "did:hedera:mainnet:0.0.issuer",
      "name": "UBeU Issuer"
    },
    "issuanceDate": "2025-01-01T00:00:00Z",
    "expirationDate": "2026-01-01T00:00:00Z",
    "credentialSubject": {
      "id": "did:hedera:mainnet:0.0.12345",
      "domain": "john.smith.iam",
      "ownershipVerified": true
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2025-01-01T00:00:00Z",
      "verificationMethod": "did:hedera:mainnet:0.0.issuer#key-1",
      "proofValue": "z..."
    }
  }
}
```

## Verify Credential

Verify the authenticity and validity of a credential.

```bash
POST /api/v1/credentials/verify
Content-Type: application/json
```

**Request Body:**
```json
{
  "credential": { ... },
  "verificationMethod": "proof"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "issuer": "did:hedera:mainnet:0.0.issuer",
    "subject": "did:hedera:mainnet:0.0.12345",
    "expirationDate": "2026-01-01T00:00:00Z",
    "status": "valid",
    "checks": {
      "signature": true,
      "expiration": true,
      "revocation": false,
      "issuer": true
    }
  }
}
```

## Revoke Credential

Revoke a previously issued credential.

```bash
POST /api/v1/credentials/{credentialId}/revoke
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "reason": "Credential no longer valid",
  "revokedBy": "did:hedera:mainnet:0.0.issuer"
}
```

---

# Open Badges API

## Issue Open Badge

Issue an IMS Global Open Badge credential.

```bash
POST /api/v1/badges/issue
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "recipientDid": "did:hedera:mainnet:0.0.12345",
  "achievement": {
    "id": "urn:uuid:achievement-id",
    "type": "Achievement",
    "name": "Course Completion",
    "description": "Successfully completed the Advanced Web3 Development course",
    "criteria": {
      "narrative": "Completed all course modules and assessments with 85% or higher"
    },
    "image": "https://example.com/badge-image.png"
  },
  "issuerDid": "did:hedera:mainnet:0.0.issuer",
  "evidence": [
    {
      "id": "https://lms.example.com/certificates/12345",
      "narrative": "Certificate of completion issued by LMS",
      "name": "Course Certificate"
    }
  ]
}
```

## Get Badge

Retrieve an Open Badge by ID.

```bash
GET /api/v1/badges/{badgeId}
```

## Verify Badge

Verify badge authenticity.

```bash
GET /api/v1/badges/{badgeId}/verify
```

---

# Billing & Subscription API

## Create Subscription

Create a new subscription.

```bash
POST /api/v1/billing/subscriptions
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "uuid",
  "tier": "pro",
  "paymentMethod": "allowance"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "tier": "pro",
      "status": "pending_setup",
      "monthlyFixedFee": 199.00,
      "credentialFeePerUnit": 0.10,
      "setupFee": 499.00,
      "monthlyCredentialLimit": 10000
    },
    "setupFeeRequired": true,
    "setupFeeAmount": 499.00,
    "firstMonthTotal": 698.00
  }
}
```

## Get Subscription

Get user's active subscription.

```bash
GET /api/v1/billing/subscriptions/{userId}
Authorization: Bearer <token>
```

## Process Setup Fee

Process one-time setup fee payment.

```bash
POST /api/v1/billing/setup-fee/{subscriptionId}
Authorization: Bearer <token>
```

## Get Pricing Information

Get current pricing for all tiers.

```bash
GET /api/v1/billing/pricing
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tiers": {
      "individual": {
        "monthlyFixedFee": 49.00,
        "credentialFeePerUnit": 0,
        "setupFee": 0,
        "monthlyCredentialLimit": -1
      },
      "pro": {
        "monthlyFixedFee": 199.00,
        "credentialFeePerUnit": 0.10,
        "setupFee": 499.00,
        "monthlyCredentialLimit": 10000
      },
      "enterprise": {
        "monthlyFixedFee": 2000.00,
        "credentialFeePerUnit": 0.08,
        "setupFee": 2499.00,
        "monthlyCredentialLimit": -1
      }
    },
    "volumeDiscounts": [
      {
        "threshold": 50000,
        "discountRate": 0.20,
        "description": "20% discount for 50K+ credentials"
      }
    ]
  }
}
```

## Calculate Pricing

Calculate pricing for specific usage scenario.

```bash
POST /api/v1/billing/calculate
Content-Type: application/json
```

**Request Body:**
```json
{
  "tier": "pro",
  "credentialCount": 5000,
  "includeSetupFee": true
}
```

---

# Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Too many requests |
| `INSUFFICIENT_ALLOWANCE` | 402 | Insufficient treasury allowance |
| `SUBSCRIPTION_REQUIRED` | 402 | Active subscription required |
| `CREDENTIAL_LIMIT_EXCEEDED` | 402 | Monthly credential limit exceeded |
| `DOMAIN_UNAVAILABLE` | 409 | Domain already registered |
| `INVALID_DOMAIN` | 400 | Invalid domain format |
| `BLOCKCHAIN_ERROR` | 500 | Hedera network error |
| `INTERNAL_ERROR` | 500 | Internal server error |

---

# Webhooks

UBeU supports webhooks for real-time notifications:

## Payment Webhook

```bash
POST /api/v1/billing/webhook
X-Webhook-Signature: <signature>
Content-Type: application/json
```

**Payload:**
```json
{
  "event": "payment.completed",
  "data": {
    "paymentId": "payment_12345",
    "amount": 199.00,
    "currency": "USD",
    "subscriptionId": "sub_12345",
    "userId": "user_12345"
  },
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## Credential Issued Webhook

```json
{
  "event": "credential.issued",
  "data": {
    "credentialId": "urn:uuid:cred-12345",
    "subjectDid": "did:hedera:mainnet:0.0.12345",
    "issuerDid": "did:hedera:mainnet:0.0.issuer",
    "type": "DomainOwnership"
  },
  "timestamp": "2025-01-01T00:00:00Z"
}
```

---

# SDK Examples

## JavaScript/TypeScript

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
```

## cURL Examples

```bash
# Register identity
curl -X POST https://api.ubeu.io/v1/identities/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"email":"user@example.com","domainAlias":"field1.field2.iam"}'

# Get pricing
curl https://api.ubeu.io/v1/billing/pricing

# Issue credential
curl -X POST https://api.ubeu.io/v1/credentials/issue \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"subjectDid":"did:hedera:mainnet:0.0.12345","type":"DomainOwnership"}'
```

---

For more detailed examples and advanced usage, see the [Integration Guide](./guides/integration-guide.md).