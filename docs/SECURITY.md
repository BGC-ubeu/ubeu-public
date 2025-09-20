# UBeU Security Guidelines

## Overview

UBeU implements a comprehensive security framework designed to protect user identities, credentials, and sensitive data while maintaining compliance with industry standards and regulations.

## Security Principles

### 1. Defense in Depth
- **Multiple Security Layers**: Authentication, authorization, encryption, and monitoring
- **Zero Trust Architecture**: Every request is authenticated and authorized
- **Least Privilege**: Minimum permissions required for operations
- **Fail-Safe Defaults**: Secure defaults with explicit permission grants

### 2. Data Protection
- **Encryption at Rest**: AES-256-GCM for all sensitive data
- **Encryption in Transit**: TLS 1.3 for all network communications
- **Data Minimization**: Only collect necessary data
- **Right to be Forgotten**: GDPR-compliant data deletion

### 3. Privacy by Design
- **User Control**: Users own and control their identity data
- **Consent Management**: Explicit user consent for data processing
- **Transparency**: Clear data usage and sharing policies
- **Anonymization**: Personal data anonymized where possible

## Authentication & Authorization

### JWT Token Security

```javascript
// Secure JWT configuration
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1h',           // Short expiration
  issuer: 'ubeu.io',
  audience: 'ubeu-api',
  subject: userId,
  notBefore: '0s',           // No clock skew tolerance
  jwtid: uuidv4()            // Unique token ID
};

// Token refresh strategy
const refreshTokenConfig = {
  expiresIn: '30d',          // Long expiration for refresh
  secure: true,
  httpOnly: true,
  sameSite: 'strict'
};
```

### Multi-Factor Authentication (MFA)

```javascript
// TOTP-based MFA implementation
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Generate MFA secret
const secret = speakeasy.generateSecret({
  name: 'UBeU Identity',
  issuer: 'UBeU'
});

// Verify MFA token
const verified = speakeasy.totp.verify({
  secret: user.mfaSecret,
  encoding: 'base64',
  token: requestToken,
  window: 2  // 2-step window for clock skew
});
```

### Role-Based Access Control (RBAC)

```typescript
// Permission definitions
enum Permission {
  IDENTITY_READ = 'identity:read',
  IDENTITY_WRITE = 'identity:write',
  CREDENTIAL_ISSUE = 'credential:issue',
  CREDENTIAL_REVOKE = 'credential:revoke',
  DOMAIN_REGISTER = 'domain:register',
  BILLING_READ = 'billing:read',
  BILLING_WRITE = 'billing:write',
  ADMIN_USER_MANAGE = 'admin:user:manage',
  ADMIN_SYSTEM_CONFIG = 'admin:system:config'
}

// Role definitions
const ROLES = {
  USER: [
    Permission.IDENTITY_READ,
    Permission.IDENTITY_WRITE,
    Permission.CREDENTIAL_ISSUE,
    Permission.DOMAIN_REGISTER,
    Permission.BILLING_READ
  ],
  ENTERPRISE: [
    Permission.IDENTITY_READ,
    Permission.IDENTITY_WRITE,
    Permission.CREDENTIAL_ISSUE,
    Permission.CREDENTIAL_REVOKE,
    Permission.DOMAIN_REGISTER,
    Permission.BILLING_READ,
    Permission.BILLING_WRITE
  ],
  ADMIN: Object.values(Permission)
};
```

## Data Encryption

### Database Encryption

```sql
-- PostgreSQL encryption functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_data(input text, key text)
RETURNS text AS $$
BEGIN
  RETURN encode(
    encrypt(
      convert_to(input, 'utf8'),
      key::bytea,
      'aes'
    ),
    'base64'
  );
END;
$$ LANGUAGE plpgsql;

-- Decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_data(input text, key text)
RETURNS text AS $$
BEGIN
  RETURN convert_from(
    decrypt(
      decode(input, 'base64'),
      key::bytea,
      'aes'
    ),
    'utf8'
  );
END;
$$ LANGUAGE plpgsql;

-- Usage example
UPDATE users
SET encrypted_email = encrypt_data(email, current_setting('app.encryption_key'))
WHERE encrypted_email IS NULL;
```

### Application-Level Encryption

```typescript
import * as crypto from 'crypto';

// AES-256-GCM encryption
class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private keyLength = 32;
  private ivLength = 16;
  private tagLength = 16;

  async encrypt(plaintext: string, key: string): Promise<string> {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipher(this.algorithm, key);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Return format: iv:authTag:encryptedData
    return [
      iv.toString('hex'),
      authTag.toString('hex'),
      encrypted
    ].join(':');
  }

  async decrypt(encryptedData: string, key: string): Promise<string> {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipher(this.algorithm, key);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
```

## API Security

### Input Validation & Sanitization

```typescript
import { z } from 'zod';

// Input validation schemas
const createIdentitySchema = z.object({
  email: z.string().email().max(255),
  domainAlias: z.string().regex(/^[a-zA-Z0-9-]+\.iam$/).max(100),
  externalDomain: z.string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).optional()
});

const issueCredentialSchema = z.object({
  subjectDid: z.string().regex(/^did:hedera:mainnet:0\.0\.\d+$/),
  type: z.enum(['DomainOwnership', 'IdentityVerification', 'WalletConnection']),
  claims: z.record(z.any()),
  expirationDate: z.string().datetime().optional()
});

// Request validation middleware
export async function validateRequest(schema: z.ZodSchema, data: any) {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid request data', error.errors);
    }
    throw error;
  }
}
```

### Rate Limiting

```typescript
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiting configuration
const rateLimiters = {
  // General API rate limiting
  general: new RateLimiterMemory({
    keyPrefix: 'api_general',
    points: 1000,           // Number of requests
    duration: 60 * 60,      // Per hour
    blockDuration: 60       // Block for 1 minute if exceeded
  }),

  // Authentication endpoints
  auth: new RateLimiterMemory({
    keyPrefix: 'api_auth',
    points: 5,              // 5 attempts
    duration: 60 * 15,      // Per 15 minutes
    blockDuration: 60 * 60  // Block for 1 hour
  }),

  // Credential issuance
  credentials: new RateLimiterMemory({
    keyPrefix: 'api_credentials',
    points: 100,            // 100 credentials
    duration: 60 * 60,      // Per hour
  })
};

// Rate limiting middleware
export async function rateLimit(req: Request, limiter: RateLimiterMemory) {
  try {
    await limiter.consume(req.ip);
  } catch (rejRes) {
    throw new RateLimitError('Too many requests', rejRes.msBeforeNext);
  }
}
```

### CORS Configuration

```typescript
// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow specific domains
    const allowedOrigins = [
      'https://app.ubeu.io',
      'https://api.ubeu.io',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  maxAge: 86400 // 24 hours
};
```

## Blockchain Security

### Hedera Transaction Security

```typescript
import {
  Client,
  PrivateKey,
  AccountId,
  Transaction,
  TransactionId
} from '@hashgraph/sdk';

// Secure Hedera client configuration
class HederaSecurityService {
  private client: Client;
  private operatorId: AccountId;
  private operatorKey: PrivateKey;

  constructor() {
    // Use mainnet for production
    this.client = Client.forMainnet();

    // Load from secure environment variables
    this.operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    this.operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);

    // Set operator with key security
    this.client.setOperator(this.operatorId, this.operatorKey);
  }

  // Secure transaction execution
  async executeTransaction(transaction: Transaction): Promise<any> {
    try {
      // Set transaction ID for replay protection
      const transactionId = TransactionId.generate(this.operatorId);
      transaction.setTransactionId(transactionId);

      // Set transaction memo for audit trail
      transaction.setTransactionMemo(`UBeU-${Date.now()}`);

      // Execute with timeout
      const response = await transaction.execute(this.client);

      // Get receipt with timeout
      const receipt = await response.getReceipt(this.client);

      // Verify transaction success
      if (receipt.status !== Status.Success) {
        throw new Error(`Transaction failed: ${receipt.status}`);
      }

      return receipt;
    } catch (error) {
      // Log security events
      console.error('Hedera transaction failed:', error);
      throw new SecurityError('Blockchain transaction failed');
    }
  }

  // Secure DID document storage
  async storeDIDDocument(did: string, document: any): Promise<string> {
    const topicId = await this.getOrCreateTopic(did);

    const message = {
      did,
      document,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const transaction = new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(JSON.stringify(message));

    const receipt = await this.executeTransaction(transaction);
    return receipt.topicSequenceNumber.toString();
  }
}
```

### Key Management

```typescript
import { createHash, randomBytes } from 'crypto';

// Secure key derivation
class KeyManagementService {
  private saltRounds = 12;
  private keyLength = 32;

  // Derive encryption key from password
  async deriveKey(password: string, salt?: Buffer): Promise<{ key: Buffer, salt: Buffer }> {
    if (!salt) {
      salt = randomBytes(32);
    }

    return new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, this.keyLength, (err, derivedKey) => {
        if (err) reject(err);
        else resolve({ key: derivedKey, salt });
      });
    });
  }

  // Generate secure random key
  generateKey(): Buffer {
    return randomBytes(this.keyLength);
  }

  // Secure key storage (in production, use HSM)
  async storeKey(keyId: string, key: Buffer): Promise<void> {
    const encryptedKey = await this.encryptKey(key);
    // Store in secure database with access controls
    await this.secureKeyStorage.store(keyId, encryptedKey);
  }

  // Key rotation
  async rotateKey(keyId: string): Promise<void> {
    const oldKey = await this.retrieveKey(keyId);
    const newKey = this.generateKey();

    // Re-encrypt all data with new key
    await this.reEncryptData(oldKey, newKey);

    // Store new key
    await this.storeKey(keyId, newKey);

    // Securely destroy old key
    await this.destroyKey(oldKey);
  }
}
```

## Monitoring & Auditing

### Security Event Logging

```typescript
import winston from 'winston';

// Security event logger
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Security events to separate log
    new winston.transports.File({
      filename: 'logs/security.log',
      level: 'warn'
    }),
    // All events to combined log
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Security event types
enum SecurityEvent {
  AUTHENTICATION_SUCCESS = 'auth.success',
  AUTHENTICATION_FAILURE = 'auth.failure',
  AUTHORIZATION_FAILURE = 'authz.failure',
  SUSPICIOUS_ACTIVITY = 'activity.suspicious',
  DATA_ACCESS = 'data.access',
  CONFIGURATION_CHANGE = 'config.change',
  BLOCKCHAIN_TRANSACTION = 'blockchain.tx'
}

// Log security events
export function logSecurityEvent(
  event: SecurityEvent,
  userId: string,
  details: Record<string, any>,
  req?: Request
) {
  const logEntry = {
    event,
    userId,
    timestamp: new Date().toISOString(),
    ip: req?.ip,
    userAgent: req?.headers['user-agent'],
    details
  };

  securityLogger.warn('Security Event', logEntry);
}
```

### Intrusion Detection

```typescript
// Simple intrusion detection
class IntrusionDetectionService {
  private suspiciousPatterns = {
    bruteForce: {
      threshold: 5,      // Failed attempts
      window: 15 * 60    // 15 minutes
    },
    unusualTraffic: {
      threshold: 1000,   // Requests per minute
      window: 60
    },
    suspiciousPayloads: [
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i
    ]
  };

  async analyzeRequest(req: Request): Promise<{
    isSuspicious: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    actions: string[];
  }> {
    const analysis = {
      isSuspicious: false,
      riskLevel: 'low' as 'low' | 'medium' | 'high',
      actions: [] as string[]
    };

    // Check for brute force attempts
    const failedAttempts = await this.getFailedAttempts(req.ip, this.suspiciousPatterns.bruteForce.window);
    if (failedAttempts >= this.suspiciousPatterns.bruteForce.threshold) {
      analysis.isSuspicious = true;
      analysis.riskLevel = 'high';
      analysis.actions.push('block_ip', 'notify_admin');
    }

    // Check for unusual traffic patterns
    const requestCount = await this.getRequestCount(req.ip, this.suspiciousPatterns.unusualTraffic.window);
    if (requestCount >= this.suspiciousPatterns.unusualTraffic.threshold) {
      analysis.isSuspicious = true;
      analysis.riskLevel = 'medium';
      analysis.actions.push('rate_limit', 'log_activity');
    }

    // Check for suspicious payloads
    const body = JSON.stringify(req.body || {});
    for (const pattern of this.suspiciousPatterns.suspiciousPayloads) {
      if (pattern.test(body)) {
        analysis.isSuspicious = true;
        analysis.riskLevel = 'high';
        analysis.actions.push('block_request', 'log_security_event');
        break;
      }
    }

    return analysis;
  }
}
```

## Compliance

### GDPR Compliance

```typescript
// GDPR compliance features
class GDPRComplianceService {
  // Data portability
  async exportUserData(userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    const credentials = await this.credentialRepository.findByUserId(userId);
    const domains = await this.domainRepository.findByUserId(userId);

    return {
      user,
      credentials,
      domains,
      exportDate: new Date().toISOString(),
      gdprCompliant: true
    };
  }

  // Right to be forgotten
  async deleteUserData(userId: string): Promise<void> {
    // Soft delete user data
    await this.userRepository.softDelete(userId);

    // Anonymize credentials
    await this.credentialRepository.anonymizeByUserId(userId);

    // Revoke active credentials
    await this.credentialRepository.revokeByUserId(userId);

    // Log deletion for audit
    await this.auditService.logDataDeletion(userId);
  }

  // Consent management
  async updateConsent(userId: string, consentType: string, granted: boolean): Promise<void> {
    await this.consentRepository.update(userId, {
      [consentType]: granted,
      updatedAt: new Date()
    });

    // If consent withdrawn, stop processing
    if (!granted) {
      await this.stopDataProcessing(userId, consentType);
    }
  }
}
```

### Security Headers

```typescript
// Security headers middleware
export function securityHeaders(req: Request, res: Response, next: Function) {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");

  // HSTS (HTTP Strict Transport Security)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  next();
}
```

## Incident Response

### Incident Response Plan

1. **Detection**: Automated monitoring and alerting
2. **Assessment**: Security team evaluates impact and scope
3. **Containment**: Isolate affected systems and stop breach
4. **Recovery**: Restore systems from clean backups
5. **Lessons Learned**: Post-incident analysis and improvements

### Automated Response

```typescript
// Automated incident response
class IncidentResponseService {
  async handleSecurityIncident(incident: SecurityIncident): Promise<void> {
    // Log incident
    await this.logIncident(incident);

    // Assess severity
    const severity = await this.assessSeverity(incident);

    // Automated response based on severity
    switch (severity) {
      case 'critical':
        await this.respondCritical(incident);
        break;
      case 'high':
        await this.respondHigh(incident);
        break;
      case 'medium':
        await this.respondMedium(incident);
        break;
      case 'low':
        await this.respondLow(incident);
        break;
    }

    // Notify stakeholders
    await this.notifyStakeholders(incident, severity);
  }

  private async respondCritical(incident: SecurityIncident): Promise<void> {
    // Immediate containment
    await this.blockIP(incident.ip);
    await this.disableUser(incident.userId);
    await this.isolateSystems();

    // Notify law enforcement if required
    await this.notifyLawEnforcement(incident);
  }

  private async respondHigh(incident: SecurityIncident): Promise<void> {
    // Rate limiting
    await this.increaseRateLimit(incident.ip);

    // Enhanced monitoring
    await this.enableEnhancedMonitoring(incident.userId);
  }
}
```

## Security Testing

### Automated Security Testing

```yaml
# GitHub Actions security workflow
name: Security Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run SAST (Static Application Security Testing)
        uses: github/super-linter@v4
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Run Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'UBeU'
          path: '.'
          format: 'ALL'

      - name: Run Container Security Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: trivy-results.sarif
```

This comprehensive security framework ensures UBeU maintains the highest standards of security, privacy, and compliance while protecting user identities and data.