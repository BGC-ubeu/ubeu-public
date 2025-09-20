# UBeU Troubleshooting Guide

This guide helps you resolve common issues with UBeU platform, API integrations, and credential operations.

## Quick Issue Resolution

### Can't Access Dashboard

**Symptoms:**
- Login page loads but can't access dashboard
- "Invalid credentials" error
- "Account suspended" message

**Solutions:**

1. **Check email verification:**
   ```bash
   # Resend verification email
   curl -X POST https://api.ubeu.io/v1/auth/resend-verification \
     -H "Content-Type: application/json" \
     -d '{"email": "your-email@example.com"}'
   ```

2. **Reset password:**
   ```bash
   # Request password reset
   curl -X POST https://api.ubeu.io/v1/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email": "your-email@example.com"}'
   ```

3. **Check account status:**
   ```bash
   # Get account status
   curl https://api.ubeu.io/v1/users/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

### API Authentication Issues

**Symptoms:**
- "Unauthorized" or "Invalid token" errors
- API requests failing with 401 status

**Solutions:**

1. **Refresh token:**
   ```bash
   curl -X POST https://api.ubeu.io/v1/auth/refresh \
     -H "Content-Type: application/json" \
     -d '{"refreshToken": "your-refresh-token"}'
   ```

2. **Check token expiration:**
   ```javascript
   // Decode JWT to check expiration
   const jwt = require('jsonwebtoken');
   const decoded = jwt.decode(token);
   console.log('Expires:', new Date(decoded.exp * 1000));
   ```

3. **Verify API key:**
   ```bash
   # Test API key
   curl https://api.ubeu.io/v1/users/me \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

## Credential Issues

### Credential Issuance Fails

**Symptoms:**
- "Credential issuance failed" error
- Transaction fails on Hedera network
- Insufficient allowance error

**Troubleshooting Steps:**

1. **Check subscription limits:**
   ```bash
   # Get subscription usage
   curl https://api.ubeu.io/v1/billing/subscriptions/YOUR_USER_ID \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Verify allowance balance:**
   ```bash
   # Check treasury allowance
   curl https://api.ubeu.io/v1/billing/allowance \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Check network status:**
   ```bash
   # Hedera network status
   curl https://mainnet-public.mirrornode.hedera.com/api/v1/network/nodes
   ```

4. **Validate credential data:**
   ```javascript
   // Validate credential structure
   const credential = {
     subjectDid: "did:hedera:mainnet:0.0.12345",
     type: "DomainOwnership",
     claims: {
       domain: "example.iam",
       verified: true
     }
   };

   // Check required fields
   if (!credential.subjectDid || !credential.type) {
     console.error("Missing required fields");
   }
   ```

### Credential Verification Fails

**Symptoms:**
- Credential shows as invalid
- Verification returns false
- Signature verification fails

**Solutions:**

1. **Check credential format:**
   ```javascript
   // Validate credential structure
   function validateCredential(credential) {
     const required = ['@context', 'type', 'id', 'issuer', 'issuanceDate', 'credentialSubject'];

     for (const field of required) {
       if (!credential[field]) {
         throw new Error(`Missing required field: ${field}`);
       }
     }

     // Check types array
     if (!Array.isArray(credential.type) || !credential.type.includes('VerifiableCredential')) {
       throw new Error('Invalid credential type');
     }

     return true;
   }
   ```

2. **Verify issuer:**
   ```bash
   # Check issuer DID
   curl https://api.ubeu.io/v1/identities/did/DID_OF_ISSUER
   ```

3. **Check expiration:**
   ```javascript
   const credential = await getCredential(credentialId);
   const now = new Date();
   const expiration = new Date(credential.expirationDate);

   if (now > expiration) {
     console.error('Credential has expired');
   }
   ```

4. **Validate proof:**
   ```javascript
   // Verify cryptographic proof
   const crypto = require('crypto');

   function verifyProof(credential) {
     const proof = credential.proof;
     if (!proof) return false;

     // Verify signature
     const verify = crypto.createVerify('SHA256');
     verify.update(JSON.stringify(credential.credentialSubject));
     return verify.verify(publicKey, proof.proofValue, 'hex');
   }
   ```

## Domain Issues

### Domain Registration Fails

**Symptoms:**
- "Domain already registered" error
- "Invalid domain format" error
- Registration transaction fails

**Solutions:**

1. **Check domain availability:**
   ```bash
   # Check if domain exists
   curl https://api.ubeu.io/v1/domains/example.iam
   ```

2. **Validate domain format:**
   ```javascript
   function validateDomain(domain) {
     // .iam domain validation
     if (domain.endsWith('.iam')) {
       const parts = domain.split('.');
       if (parts.length !== 2) {
         throw new Error('Invalid .iam domain format');
       }
       if (parts[0].length < 3 || parts[0].length > 63) {
         throw new Error('Domain name must be 3-63 characters');
       }
       if (!/^[a-zA-Z0-9-]+$/.test(parts[0])) {
         throw new Error('Domain name contains invalid characters');
       }
     }

     // External domain validation
     if (domain.includes('.')) {
       // Basic domain format check
       const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       if (!domainRegex.test(domain)) {
         throw new Error('Invalid domain format');
       }
     }

     return true;
   }
   ```

3. **Check registration limits:**
   ```bash
   # Get user limits
   curl https://api.ubeu.io/v1/users/limits \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

### External Domain Verification Fails

**Symptoms:**
- Domain verification fails
- Signature verification fails
- DNS records not found

**Troubleshooting:**

1. **Check DNS records:**
   ```bash
   # Check TXT records for domain verification
   dig TXT _ubeu-verify.example.com

   # Or for .iam domains
   dig TXT _iam-verify.example.iam
   ```

2. **Verify signature:**
   ```javascript
   const ethers = require('ethers');

   async function verifyDomainOwnership(domain, signature, message) {
     try {
       const recoveredAddress = ethers.utils.verifyMessage(message, signature);
       const domainOwner = await getDomainOwner(domain);

       return recoveredAddress.toLowerCase() === domainOwner.toLowerCase();
     } catch (error) {
       console.error('Signature verification failed:', error);
       return false;
     }
   }
   ```

3. **Check blockchain indexer:**
   ```bash
   # ENS domain ownership
   curl https://api.thegraph.com/subgraphs/name/ensdomains/ens \
     -H "Content-Type: application/json" \
     -d '{"query": "{ domains(where: {name: \"example.eth\"}) { owner { id } } }"}'

   # Unstoppable Domains
   curl https://api.unstoppabledomains.com/resolve/domains/example.crypto
   ```

## Network and Connectivity Issues

### Hedera Network Issues

**Symptoms:**
- Transactions failing
- High latency
- Network congestion errors

**Solutions:**

1. **Check network status:**
   ```bash
   # Hedera network status
   curl https://mainnet-public.mirrornode.hedera.com/api/v1/network/nodes

   # Check specific node
   curl https://mainnet-public.mirrornode.hedera.com/api/v1/network/nodes/0.0.3
   ```

2. **Monitor transaction status:**
   ```bash
   # Check transaction status
   curl https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/YOUR_TRANSACTION_ID
   ```

3. **Handle network congestion:**
   ```javascript
   async function executeWithRetry(transaction, maxRetries = 3) {
     let lastError;

     for (let attempt = 1; attempt <= maxRetries; attempt++) {
       try {
         const response = await transaction.execute(client);
         const receipt = await response.getReceipt(client);

         if (receipt.status === Status.Success) {
           return receipt;
         }

         throw new Error(`Transaction failed: ${receipt.status}`);

       } catch (error) {
         lastError = error;

         if (error.message.includes('BUSY') || error.message.includes('PLATFORM_TRANSACTION_NOT_CREATED')) {
           // Network congestion - wait and retry
           const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
           await sleep(delay);
           continue;
         }

         throw error;
       }
     }

     throw lastError;
   }
   ```

### API Rate Limiting

**Symptoms:**
- 429 "Too Many Requests" errors
- Requests being throttled

**Solutions:**

1. **Check rate limits:**
   ```bash
   # Get current limits
   curl https://api.ubeu.io/v1/users/limits \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Implement backoff:**
   ```javascript
   class RateLimitHandler {
     constructor() {
       this.retryQueue = [];
       this.isProcessing = false;
     }

     async makeRequest(url, options = {}) {
       try {
         const response = await fetch(url, options);

         if (response.status === 429) {
           const retryAfter = response.headers.get('Retry-After') || '60';

           // Add to retry queue
           this.retryQueue.push({
             url,
             options,
             retryAfter: parseInt(retryAfter)
           });

           // Process retry queue
           this.processRetryQueue();

           throw new Error(`Rate limited. Retry after ${retryAfter} seconds`);
         }

         return response;

       } catch (error) {
         if (error.message.includes('Rate limited')) {
           throw error;
         }

         // Handle other errors
         throw new Error(`Request failed: ${error.message}`);
       }
     }

     async processRetryQueue() {
       if (this.isProcessing || this.retryQueue.length === 0) {
         return;
       }

       this.isProcessing = true;

       while (this.retryQueue.length > 0) {
         const request = this.retryQueue.shift();

         setTimeout(async () => {
           try {
             await this.makeRequest(request.url, request.options);
           } catch (error) {
             console.error('Retry failed:', error);
           }
         }, request.retryAfter * 1000);
       }

       this.isProcessing = false;
     }
   }
   ```

## Billing and Subscription Issues

### Payment Processing Fails

**Symptoms:**
- Payment declined
- Insufficient funds error
- Payment method invalid

**Solutions:**

1. **Check payment method:**
   ```bash
   # Get payment methods
   curl https://api.ubeu.io/v1/billing/payment-methods \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Verify allowance:**
   ```bash
   # Check treasury allowance
   curl https://api.ubeu.io/v1/billing/allowance \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Update payment method:**
   ```bash
   curl -X PUT https://api.ubeu.io/v1/billing/payment-methods \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "type": "credit_card",
       "token": "new_payment_token"
     }'
   ```

### Subscription Issues

**Symptoms:**
- Subscription not activating
- Billing cycle problems
- Plan change fails

**Solutions:**

1. **Check subscription status:**
   ```bash
   curl https://api.ubeu.io/v1/billing/subscriptions/YOUR_USER_ID \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Process setup fee:**
   ```bash
   curl -X POST https://api.ubeu.io/v1/billing/setup-fee/SUBSCRIPTION_ID \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Change subscription:**
   ```bash
   curl -X PUT https://api.ubeu.io/v1/billing/subscriptions/SUBSCRIPTION_ID \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"tier": "pro"}'
   ```

## Integration Issues

### Webhook Problems

**Symptoms:**
- Webhooks not being received
- Invalid signature errors
- Webhook events out of order

**Solutions:**

1. **Verify webhook URL:**
   ```bash
   # Test webhook endpoint
   curl -X POST YOUR_WEBHOOK_URL \
     -H "Content-Type: application/json" \
     -d '{"test": "webhook"}'
   ```

2. **Check webhook signature:**
   ```javascript
   const crypto = require('crypto');

   function verifyWebhookSignature(payload, signature, secret) {
     const expected = crypto
       .createHmac('sha256', secret)
       .update(JSON.stringify(payload))
       .digest('hex');

     return crypto.timingSafeEqual(
       Buffer.from(signature, 'hex'),
       Buffer.from(expected, 'hex')
     );
   }

   // Usage
   const isValid = verifyWebhookSignature(
     req.body,
     req.headers['x-ubeu-signature'],
     process.env.WEBHOOK_SECRET
   );
   ```

3. **Handle webhook retries:**
   ```javascript
   app.post('/webhooks/ubeu', async (req, res) => {
     const eventId = req.headers['x-ubeu-event-id'];

     // Check if event already processed
     const processed = await checkEventProcessed(eventId);
     if (processed) {
       return res.sendStatus(200);
     }

     try {
       await processWebhookEvent(req.body);

       // Mark as processed
       await markEventProcessed(eventId);

       res.sendStatus(200);
     } catch (error) {
       console.error('Webhook processing failed:', error);

       // Return error to trigger retry
       res.sendStatus(500);
     }
   });
   ```

### SDK Issues

**Symptoms:**
- SDK initialization fails
- Authentication errors
- Request timeouts

**Solutions:**

1. **Check SDK configuration:**
   ```javascript
   import { UBeUClient } from '@ubeu/sdk';

   const client = new UBeUClient({
     apiKey: process.env.UBEU_API_KEY,
     baseUrl: process.env.UBEU_BASE_URL || 'https://api.ubeu.io/v1',
     timeout: 30000, // Increase timeout
     retryAttempts: 3,
     retryDelay: 1000
   });

   // Enable debug logging
   client.setLogLevel('debug');
   ```

2. **Handle SDK errors:**
   ```javascript
   try {
     const result = await client.identities.create(identityData);
     console.log('Identity created:', result);
   } catch (error) {
     if (error.code === 'RATE_LIMITED') {
       // Handle rate limiting
       await sleep(error.retryAfter);
       return retryOperation();
     }

     if (error.code === 'NETWORK_ERROR') {
       // Handle network issues
       return fallbackOperation();
     }

     console.error('SDK error:', error);
     throw error;
   }
   ```

## Performance Issues

### Slow API Responses

**Symptoms:**
- API calls taking too long
- Timeout errors
- High latency

**Solutions:**

1. **Check API performance:**
   ```bash
   # Test API response time
   curl -w "@curl-format.txt" -o /dev/null -s https://api.ubeu.io/v1/health

   # curl-format.txt
   # time_namelookup:  %{time_namelookup}\n
   # time_connect:  %{time_connect}\n
   # time_appconnect:  %{time_appconnect}\n
   # time_pretransfer:  %{time_pretransfer}\n
   # time_redirect:  %{time_redirect}\n
   # time_starttransfer:  %{time_starttransfer}\n
   # time_total:  %{time_total}\n
   ```

2. **Optimize requests:**
   ```javascript
   // Use batch operations
   const batchRequests = [
     client.identities.get(userId1),
     client.identities.get(userId2),
     client.identities.get(userId3)
   ];

   const results = await Promise.allSettled(batchRequests);

   // Use caching
   const cache = new Map();

   async function getCachedIdentity(userId) {
     if (cache.has(userId)) {
       return cache.get(userId);
     }

     const identity = await client.identities.get(userId);
     cache.set(userId, identity);

     // Cache for 5 minutes
     setTimeout(() => cache.delete(userId), 5 * 60 * 1000);

     return identity;
   }
   ```

3. **Monitor performance:**
   ```javascript
   // Add performance monitoring
   async function monitoredRequest(operation, ...args) {
     const start = Date.now();
     try {
       const result = await operation(...args);
       const duration = Date.now() - start;

       // Log performance metrics
       console.log(`${operation.name} took ${duration}ms`);

       // Send to monitoring system
       await sendMetrics({
         operation: operation.name,
         duration,
         success: true
       });

       return result;
     } catch (error) {
       const duration = Date.now() - start;

       await sendMetrics({
         operation: operation.name,
         duration,
         success: false,
         error: error.message
       });

       throw error;
     }
   }
   ```

## Data Issues

### Missing or Corrupted Data

**Symptoms:**
- Credentials not showing up
- Identity data incomplete
- Database inconsistencies

**Solutions:**

1. **Check data integrity:**
   ```sql
   -- Check for orphaned records
   SELECT c.* FROM credentials c
   LEFT JOIN users u ON c.subject_did = u.did
   WHERE u.id IS NULL;

   -- Validate DID format
   SELECT * FROM users
   WHERE did NOT LIKE 'did:hedera:%';

   -- Check for expired credentials
   SELECT * FROM credentials
   WHERE expires_at < CURRENT_TIMESTAMP
   AND status = 'active';
   ```

2. **Repair data issues:**
   ```javascript
   // Fix orphaned credentials
   async function repairOrphanedCredentials() {
     const orphaned = await db.query(`
       SELECT c.* FROM credentials c
       LEFT JOIN users u ON c.subject_did = u.did
       WHERE u.id IS NULL
     `);

     for (const credential of orphaned) {
       // Mark as invalid or delete
       await db.query('UPDATE credentials SET status = ? WHERE id = ?', [
         'invalid',
         credential.id
       ]);
     }
   }

   // Validate and fix DID formats
   async function fixInvalidDIDs() {
     const invalid = await db.query(`
       SELECT * FROM users
       WHERE did NOT LIKE 'did:hedera:%'
     `);

     for (const user of invalid) {
       const fixedDID = `did:hedera:mainnet:0.0.${user.hedera_account_id}`;
       await db.query('UPDATE users SET did = ? WHERE id = ?', [
         fixedDID,
         user.id
       ]);
     }
   }
   ```

## Getting Help

### Support Resources

1. **Documentation:**
   - [API Reference](./../API.md)
   - [Integration Guide](./integration-guide.md)
   - [Development Guide](./../DEVELOPMENT.md)

2. **Community Support:**
   - [GitHub Issues](https://github.com/ubeu/ubeu-iaas/issues)
   - [Community Forum](https://community.ubeu.io)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/ubeu)

3. **Professional Support:**
   - Email: support@ubeu.io
   - Live Chat: Available in dashboard
   - Phone: +1 (555) 123-4567 (Enterprise customers)

### Diagnostic Information

When reporting issues, please include:

```javascript
// Generate diagnostic report
function generateDiagnosticReport() {
  return {
    timestamp: new Date().toISOString(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    },
    ubeu: {
      version: process.env.npm_package_version,
      apiUrl: process.env.UBEU_BASE_URL,
      network: process.env.HEDERA_NETWORK
    },
    system: {
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      loadAverage: require('os').loadavg()
    },
    recentErrors: getRecentErrors(),
    networkConnectivity: testNetworkConnectivity()
  };
}
```

This comprehensive troubleshooting guide should help resolve most common issues with UBeU. If you encounter an issue not covered here, please check the community resources or contact support with your diagnostic information.