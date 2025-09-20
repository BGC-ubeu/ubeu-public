# UBeU Integration Guide

This guide covers integrating UBeU with existing systems, applications, and third-party services.

## Overview

UBeU provides multiple integration options:

- **REST API**: Full programmatic access
- **SDK**: JavaScript/TypeScript libraries
- **Webhooks**: Real-time event notifications
- **OpenID4**: Standard protocol support
- **OAuth 2.0**: Authorization flows

## API Integration

### Authentication

All API requests require authentication using JWT tokens:

```bash
# Get access token
curl -X POST https://api.ubeu.io/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-app@company.com",
    "password": "your-password"
  }'
```

Store the token securely and include it in subsequent requests:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://api.ubeu.io/v1/identities
```

### Rate Limiting

UBeU implements rate limiting based on your subscription tier:

```javascript
// Handle rate limiting
async function makeAPIRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      console.log(`Rate limited. Retry after ${retryAfter} seconds`);

      // Implement exponential backoff
      await sleep(parseInt(retryAfter) * 1000);
      return makeAPIRequest(url, options);
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
```

## SDK Integration

### JavaScript/TypeScript SDK

```bash
npm install @ubeu/sdk
```

```javascript
import { UBeUClient } from '@ubeu/sdk';

const client = new UBeUClient({
  apiKey: process.env.UBEU_API_KEY,
  baseUrl: process.env.UBEU_BASE_URL || 'https://api.ubeu.io/v1',
  timeout: 30000
});

// Initialize
await client.initialize();

// Create identity
const identity = await client.identities.create({
  email: 'user@company.com',
  domainAlias: 'user.company.iam'
});

// Issue credential
const credential = await client.credentials.issue({
  subjectDid: identity.did,
  type: 'EmploymentCredential',
  claims: {
    position: 'Software Engineer',
    employer: 'Tech Corp',
    startDate: '2023-01-01',
    employmentStatus: 'active'
  },
  expirationDate: '2026-01-01T00:00:00Z'
});

// Verify credential
const verification = await client.credentials.verify(credential.id);
```

### React Integration

```jsx
import React, { useEffect, useState } from 'react';
import { UBeUClient } from '@ubeu/sdk';

function CredentialManager() {
  const [client, setClient] = useState(null);
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const ubeuClient = new UBeUClient({
      apiKey: process.env.REACT_APP_UBEU_API_KEY
    });

    ubeuClient.initialize().then(() => {
      setClient(ubeuClient);
    });
  }, []);

  const issueCredential = async (credentialData) => {
    if (!client) return;

    try {
      const credential = await client.credentials.issue(credentialData);
      setCredentials(prev => [...prev, credential]);
    } catch (error) {
      console.error('Failed to issue credential:', error);
    }
  };

  return (
    <div>
      <h2>Credential Manager</h2>
      <button onClick={() => issueCredential({
        subjectDid: 'did:hedera:mainnet:0.0.12345',
        type: 'SkillCertification',
        claims: { skill: 'JavaScript', level: 'Expert' }
      })}>
        Issue New Credential
      </button>

      <ul>
        {credentials.map(cred => (
          <li key={cred.id}>
            {cred.type} - {cred.issuanceDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## OpenID4 Integration

### OpenID4VCI (Credential Issuance)

UBeU supports the OpenID4VCI protocol for standardized credential issuance:

```javascript
// Credential issuer metadata
const issuerMetadata = {
  credential_issuer: 'https://api.ubeu.io/v1',
  credential_endpoint: 'https://api.ubeu.io/v1/credentials/issue',
  credentials_supported: [
    {
      format: 'jwt_vc_json',
      id: 'DomainOwnershipCredential',
      types: ['VerifiableCredential', 'DomainOwnershipCredential'],
      cryptographic_binding_methods_supported: ['did'],
      cryptographic_suites_supported: ['Ed25519Signature2020'],
      display: [{
        name: 'Domain Ownership',
        locale: 'en-US',
        description: 'Proof of domain ownership'
      }]
    }
  ]
};

// Pre-authorized code flow
const issuanceRequest = {
  grant_type: 'urn:ietf:params:oauth:grant-type:pre-authorized_code',
  'pre-authorized_code': 'code_from_authorization_server',
  user_pin: '1234' // If PIN required
};

const credentialRequest = {
  format: 'jwt_vc_json',
  credential_definition: {
    type: ['VerifiableCredential', 'DomainOwnershipCredential']
  },
  proof: {
    proof_type: 'jwt',
    jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZDI1NTE5In0...' // Proof JWT
  }
};
```

### OpenID4VP (Presentation)

For credential presentation and verification:

```javascript
// Presentation definition
const presentationDefinition = {
  id: 'domain-ownership-presentation',
  input_descriptors: [{
    id: 'domain-ownership-input',
    name: 'Domain Ownership Credential',
    purpose: 'Verify domain ownership',
    constraints: {
      fields: [{
        path: ['$.type'],
        filter: {
          type: 'array',
          contains: {
            const: 'DomainOwnershipCredential'
          }
        }
      }]
    }
  }]
};

// Authorization request
const authorizationRequest = {
  response_type: 'vp_token',
  client_id: 'verifier-client-id',
  redirect_uri: 'https://verifier.com/callback',
  presentation_definition: presentationDefinition,
  nonce: 'random-nonce',
  state: 'random-state'
};
```

## Webhook Integration

### Setting Up Webhooks

```bash
# Register webhook endpoint
curl -X POST https://api.ubeu.io/v1/webhooks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks/ubeu",
    "events": ["credential.issued", "credential.verified", "identity.created"],
    "secret": "your-webhook-secret"
  }'
```

### Handling Webhook Events

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhooks/ubeu', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-ubeu-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  if (!verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).send('Invalid signature');
  }

  const event = JSON.parse(req.body);

  switch (event.event) {
    case 'credential.issued':
      handleCredentialIssued(event.data);
      break;
    case 'credential.verified':
      handleCredentialVerified(event.data);
      break;
    case 'identity.created':
      handleIdentityCreated(event.data);
      break;
  }

  res.sendStatus(200);
});
```

### Webhook Event Types

```javascript
// Credential Issued
{
  "event": "credential.issued",
  "data": {
    "credentialId": "urn:uuid:cred-12345",
    "subjectDid": "did:hedera:mainnet:0.0.12345",
    "issuerDid": "did:hedera:mainnet:0.0.issuer",
    "type": "DomainOwnershipCredential",
    "timestamp": "2025-01-01T00:00:00Z"
  }
}

// Identity Created
{
  "event": "identity.created",
  "data": {
    "userId": "user-12345",
    "did": "did:hedera:mainnet:0.0.12345",
    "domain": "user.company.iam",
    "subscriptionTier": "pro",
    "timestamp": "2025-01-01T00:00:00Z"
  }
}

// Payment Processed
{
  "event": "payment.processed",
  "data": {
    "paymentId": "pay-12345",
    "userId": "user-12345",
    "amount": 199.00,
    "currency": "USD",
    "subscriptionId": "sub-12345",
    "status": "completed",
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

## Learning Management System (LMS) Integration

### Moodle Integration

```php
// Moodle plugin for UBeU integration
class ubeu_credential_plugin extends credential_plugin_base {

    public function issue_credential($user, $course, $completion) {
        // Prepare credential data
        $credentialData = [
            'subjectDid' => $this->get_user_did($user),
            'type' => 'CourseCompletionCredential',
            'claims' => [
                'courseId' => $course->id,
                'courseName' => $course->fullname,
                'completionDate' => date('c', $completion->timecompleted),
                'grade' => $completion->grade
            ],
            'evidence' => [
                [
                    'id' => $this->get_course_url($course),
                    'narrative' => 'Completed course with grade ' . $completion->grade . '%',
                    'name' => $course->fullname . ' Certificate'
                ]
            ]
        ];

        // Issue credential via UBeU API
        $response = $this->call_ubeu_api('/v1/credentials/issue', $credentialData);

        if ($response->success) {
            // Store credential ID in Moodle
            $this->store_credential_id($user->id, $course->id, $response->data->credentialId);
        }

        return $response;
    }

    private function call_ubeu_api($endpoint, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.ubeu.io' . $endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->get_api_token()
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response);
    }
}
```

### Canvas LMS Integration

```ruby
# Canvas LMS integration
class UBeUCredentialService
  def initialize(api_key, base_url = 'https://api.ubeu.io/v1')
    @api_key = api_key
    @base_url = base_url
  end

  def issue_course_completion_credential(user, course, enrollment)
    credential_data = {
      subjectDid: get_user_did(user),
      type: 'CourseCompletionCredential',
      claims: {
        courseId: course.id,
        courseName: course.name,
        completionDate: enrollment.completed_at.iso8601,
        finalGrade: enrollment.computed_final_score
      },
      evidence: [{
        id: "#{@base_url}/courses/#{course.id}",
        narrative: "Successfully completed #{course.name} with grade #{enrollment.computed_final_score}%",
        name: "#{course.name} Completion Certificate"
      }]
    }

    response = HTTP.auth("Bearer #{@api_key}")
                  .post("#{@base_url}/credentials/issue", json: credential_data)

    if response.status.success?
      data = JSON.parse(response.body)
      store_credential_reference(user.id, course.id, data['data']['credentialId'])
    end

    response
  end

  private

  def get_user_did(user)
    # Look up or create DID for user
    did = UserDID.find_by(user_id: user.id)&.did
    return did if did

    # Create new DID if not exists
    create_user_did(user)
  end
end
```

## Enterprise Integration

### Single Sign-On (SSO)

```javascript
// SAML SSO integration
const saml = require('saml2-js');

const sp = new saml.ServiceProvider({
  entity_id: 'https://your-app.com/saml/metadata',
  private_key: fs.readFileSync('private_key.pem'),
  certificate: fs.readFileSync('certificate.pem'),
  assert_endpoint: 'https://your-app.com/saml/assert',
  sign_get_request: true
});

const idp = new saml.IdentityProvider({
  sso_login_url: 'https://ubeu.io/saml/login',
  sso_logout_url: 'https://ubeu.io/saml/logout',
  certificates: [ubeuCertificate]
});

// Login request
app.get('/login', (req, res) => {
  sp.create_login_request_url(idp, {}, (error, login_url, request_id) => {
    if (error) return res.send(500);
    res.redirect(login_url);
  });
});

// Assertion consumer
app.post('/saml/assert', (req, res) => {
  sp.post_assert(idp, req, (error, saml_response) => {
    if (error) return res.send(500);

    // Extract user information from SAML response
    const user = {
      email: saml_response.user.email,
      name: saml_response.user.name,
      ubeuDid: saml_response.user.ubeu_did
    };

    // Create session
    req.session.user = user;
    res.redirect('/dashboard');
  });
});
```

### SCIM Integration

```javascript
// SCIM 2.0 integration for user provisioning
const scim = require('scim2-models');

app.get('/scim/v2/Users', (req, res) => {
  const users = await getUsersFromUBeU();
  const scimUsers = users.map(user => new scim.User({
    id: user.id,
    userName: user.email,
    name: {
      givenName: user.firstName,
      familyName: user.lastName
    },
    emails: [{
      value: user.email,
      primary: true
    }],
    active: user.status === 'active',
    'urn:ietf:params:scim:schemas:extension:ubeu:2.0:User': {
      did: user.did,
      domain: user.domain,
      credentials: user.credentials?.length || 0
    }
  }));

  res.json({
    schemas: ['urn:ietf:params:scim:api:messages:2.0:ListResponse'],
    totalResults: scimUsers.length,
    Resources: scimUsers
  });
});

app.post('/scim/v2/Users', async (req, res) => {
  const scimUser = req.body;

  // Create user in UBeU
  const ubeuUser = await createUserInUBeU({
    email: scimUser.userName,
    firstName: scimUser.name?.givenName,
    lastName: scimUser.name?.familyName,
    domain: generateDomain(scimUser.userName)
  });

  const responseUser = new scim.User({
    id: ubeuUser.id,
    userName: ubeuUser.email,
    name: {
      givenName: ubeuUser.firstName,
      familyName: ubeuUser.lastName
    }
  });

  res.status(201).json(responseUser);
});
```

## Custom Integration Examples

### Banking Integration

```javascript
// KYC verification integration
class BankingIntegration {
  constructor(ubeuClient) {
    this.ubeuClient = ubeuClient;
  }

  async verifyCustomerKYC(customerId, documents) {
    // Issue KYC credential
    const kycCredential = await this.ubeuClient.credentials.issue({
      subjectDid: await this.getCustomerDID(customerId),
      type: 'KYCVerificationCredential',
      claims: {
        customerId,
        verificationLevel: 'Enhanced',
        documentsVerified: documents.map(doc => doc.type),
        verificationDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      evidence: documents.map(doc => ({
        id: doc.url,
        narrative: `Verified ${doc.type} document`,
        name: doc.type
      }))
    });

    // Store credential reference in banking system
    await this.storeCredentialReference(customerId, kycCredential.id);

    return kycCredential;
  }

  async checkCustomerVerification(customerId) {
    const credentials = await this.ubeuClient.credentials.getForSubject(
      await this.getCustomerDID(customerId)
    );

    const kycCredentials = credentials.filter(
      cred => cred.type.includes('KYCVerificationCredential')
    );

    return kycCredentials.length > 0 && kycCredentials[0].status === 'valid';
  }
}
```

### Healthcare Integration

```javascript
// Healthcare credential integration
class HealthcareIntegration {
  async issueMedicalCredential(patientId, providerId, medicalData) {
    const patientDID = await this.getPatientDID(patientId);
    const providerDID = await this.getProviderDID(providerId);

    const medicalCredential = await this.ubeuClient.credentials.issue({
      subjectDid: patientDID,
      issuerDid: providerDID,
      type: 'MedicalCredential',
      claims: {
        patientId,
        medicalRecordId: medicalData.recordId,
        diagnosis: medicalData.diagnosis,
        treatment: medicalData.treatment,
        prescription: medicalData.prescription,
        issueDate: new Date().toISOString()
      },
      expirationDate: medicalData.expiryDate,
      evidence: [{
        id: medicalData.recordUrl,
        narrative: 'Medical record from certified healthcare provider',
        name: 'Medical Record'
      }]
    });

    // Encrypt sensitive medical data
    const encryptedCredential = await this.encryptMedicalData(medicalCredential);

    return encryptedCredential;
  }

  async verifyPrescription(prescriptionId, pharmacistId) {
    const prescriptionCredential = await this.ubeuClient.credentials.get(prescriptionId);

    if (!prescriptionCredential) {
      throw new Error('Prescription not found');
    }

    // Verify credential authenticity
    const verification = await this.ubeuClient.credentials.verify(prescriptionId);

    if (!verification.verified) {
      throw new Error('Prescription verification failed');
    }

    // Check prescription hasn't expired
    if (new Date() > new Date(prescriptionCredential.expirationDate)) {
      throw new Error('Prescription has expired');
    }

    // Log prescription dispensing
    await this.logPrescriptionDispensing(prescriptionId, pharmacistId);

    return verification;
  }
}
```

## Testing Integration

### Mock Server Setup

```javascript
// Mock UBeU server for testing
const express = require('express');
const app = express();

app.use(express.json());

// Mock identity creation
app.post('/v1/identities/register', (req, res) => {
  res.json({
    success: true,
    data: {
      userId: 'mock-user-123',
      did: 'did:hedera:testnet:0.0.12345',
      hederaAccount: '0.0.12345',
      topicId: '0.0.67890'
    }
  });
});

// Mock credential issuance
app.post('/v1/credentials/issue', (req, res) => {
  res.json({
    success: true,
    data: {
      credentialId: 'urn:uuid:mock-cred-123',
      transactionId: '0.0.12345@1234567890.000000000',
      status: 'issued'
    }
  });
});

module.exports = app;
```

### Integration Test Example

```javascript
const { UBeUClient } = require('@ubeu/sdk');

describe('UBeU Integration', () => {
  let client;

  beforeAll(async () => {
    client = new UBeUClient({
      apiKey: 'test-api-key',
      baseUrl: 'http://localhost:3001' // Mock server
    });
    await client.initialize();
  });

  test('should create identity', async () => {
    const identity = await client.identities.create({
      email: 'test@example.com',
      domainAlias: 'test.iam'
    });

    expect(identity).toHaveProperty('did');
    expect(identity).toHaveProperty('userId');
  });

  test('should issue credential', async () => {
    const credential = await client.credentials.issue({
      subjectDid: 'did:hedera:testnet:0.0.12345',
      type: 'TestCredential',
      claims: { test: true }
    });

    expect(credential).toHaveProperty('id');
    expect(credential.type).toContain('TestCredential');
  });

  test('should verify credential', async () => {
    const verification = await client.credentials.verify('urn:uuid:mock-cred-123');

    expect(verification.verified).toBe(true);
  });
});
```

## Best Practices

### Error Handling

```javascript
async function robustAPIRequest(url, options = {}, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = response.headers.get('Retry-After') || '60';
        await sleep(parseInt(retryAfter) * 1000);
        continue;
      }

      if (response.status >= 500) {
        // Server error - retry
        if (attempt < maxRetries) {
          await sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
          continue;
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed, retrying...`, error.message);
        await sleep(Math.pow(2, attempt) * 1000);
      }
    }
  }

  throw lastError;
}
```

### Monitoring Integration

```javascript
// Integration monitoring
class IntegrationMonitor {
  constructor(ubeuClient) {
    this.ubeuClient = ubeuClient;
    this.metrics = {
      requestsTotal: 0,
      errorsTotal: 0,
      latencySum: 0,
      lastHealthCheck: null
    };
  }

  async recordRequest(endpoint, duration, success) {
    this.metrics.requestsTotal++;

    if (!success) {
      this.metrics.errorsTotal++;
    }

    this.metrics.latencySum += duration;

    // Send metrics to monitoring system
    await this.sendMetrics({
      endpoint,
      duration,
      success,
      timestamp: new Date().toISOString()
    });
  }

  async healthCheck() {
    try {
      const start = Date.now();
      await this.ubeuClient.identities.get('health-check');
      const duration = Date.now() - start;

      this.lastHealthCheck = {
        status: 'healthy',
        duration,
        timestamp: new Date().toISOString()
      };

      return this.lastHealthCheck;
    } catch (error) {
      this.lastHealthCheck = {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };

      throw error;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      averageLatency: this.metrics.requestsTotal > 0
        ? this.metrics.latencySum / this.metrics.requestsTotal
        : 0,
      errorRate: this.metrics.requestsTotal > 0
        ? this.metrics.errorsTotal / this.metrics.requestsTotal
        : 0
    };
  }
}
```

This comprehensive integration guide provides everything needed to successfully integrate UBeU with existing systems and applications.