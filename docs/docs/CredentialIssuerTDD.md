# UBeU Credentials Issuer Technical Design Document (TDD)

**Version:** 2.0  
**Date:** September 2025 
**Status:** Greenfield Implementation  
**Authors:** System Architecture Team  

---

## Executive Summary

This TDD defines the greenfield implementation of UBeU's Credentials Issuer system, eliminating .iss domain complexity while maintaining enterprise-grade credential issuance capabilities. The system abstracts all Web3 complexity behind a PostgreSQL-backed enterprise account management system with DNS-based verification. A single tier ($49/annual) plan for individuals (credential recipients) plus a two/three-tier Credential Issuer plans (Pro, Enterprise)

### Key Design Decisions

- **No .iss domains**: Enterprise identity managed via PostgreSQL accounts with DNS verification
- **Single API per enterprise**: Eliminates subdomain complexity through role-based permissions
- **UBeU-managed DIDs**: Enterprises never interact with blockchain directly
- **Treasury-sponsored fees**: Complete Web3 abstraction for enterprise users

---

## System Architecture

### Core Components

```
Enterprise Registration → DNS Verification → Account Creation → API Access → Credential Issuance
```

**Service Layer:**
- Enterprise Account Service (PostgreSQL-backed)
- DNS Verification Service (real-time TXT record validation)
- Credential Issuance Service (W3C compliant)
- DID Management Service (UBeU-managed enterprise DIDs)
- Treasury Service (network fee sponsorship)

**Data Layer:**
- PostgreSQL for all enterprise account management
- Hedera HCS for credential storage and audit trails
- Redis for caching and rate limiting

---

## Enterprise Account Management

### Account Structure
Enterprise accounts are PostgreSQL records containing:
- Company identification and contact information
- DNS verification status and challenge data
- UBeU-managed DID and signing keys
- Branding configuration (display name, logo, verification page)
- API credentials and permissions
- Billing tier and usage tracking

### Registration Flow
1. **Account Creation**: Company submits registration with parent domain
2. **DNS Challenge**: System generates unique TXT record for domain verification
3. **Verification**: Automated monitoring validates DNS record existence
4. **Account Activation**: Creates managed DID, API keys, and billing setup
5. **Dashboard Access**: Single enterprise interface with role-based views

---

## DNS Verification System

### Verification Requirements
All enterprise issuers must prove domain ownership through DNS TXT records before account activation.

**Challenge Format:**
- Record Name: `_ubeu-verification.{parent_domain}`
- Record Value: `ubeu-verify-{company}-{timestamp}-{nonce}`
- Expiration: 7 days from generation

### Verification Process
- **Challenge Generation**: Cryptographically secure, time-limited challenges
- **Continuous Monitoring**: Automated DNS polling until verification or expiration
- **Status Management**: Real-time account status updates based on DNS record presence

### Security Benefits
- Prevents enterprise impersonation (only real domain controllers can verify)
- Provides legal defensibility for trademark protection
- Enables trust chain from established corporate infrastructure to Web3 credentials

---

## Credential Issuance Architecture

### Issuance Model
**Single Issuer Identity**: Each enterprise has one managed DID for all credential types
**Role-Based Access**: Team permissions control credential types, not separate domains
**Treasury Sponsorship**: All network fees handled by UBeU treasury

### Core Issuance Flow
1. **API Authentication**: Validate enterprise API key and permissions
2. **Recipient Resolution**: Convert identity (john.smith.iam) to DID
3. **Credential Creation**: Generate W3C-compliant verifiable credential
4. **Cryptographic Signing**: Sign with enterprise's managed key
5. **Blockchain Storage**: Store on Hedera via HCS with treasury-sponsored fees
6. **DID Updates**: Add credential reference to recipient's DID document
7. **Notification**: Alert recipient of new credential availability

### Bulk Processing
- **Batch API**: Handle large-volume credential issuance
- **Asynchronous Processing**: Queue-based system for high-volume operations
- **Progress Tracking**: Real-time status updates for bulk operations
- **Error Handling**: Comprehensive failure recovery and reporting

---

## API Design

### REST Endpoints
- **Account Management**: Registration, verification, settings
- **Credential Operations**: Issue, revoke, query, bulk operations
- **Schema Management**: Create/manage custom credential types
- **Analytics**: Usage statistics, recipient engagement, billing
- **Verification**: Public credential verification endpoints

### Authentication & Authorization
- **API Key Authentication**: Single master key per enterprise
- **Role-Based Permissions**: Granular access control within enterprise teams
- **Rate Limiting**: Tier-based request and credential volume limits
- **Usage Tracking**: Real-time monitoring against monthly allowances

---

## Database Schema

### PostgreSQL Tables
- **enterprise_accounts**: Complete account management
- **credential_issuances**: Issuance history and metadata
- **schemas**: Custom credential type definitions
- **usage_tracking**: Real-time usage and billing data
- **verification_challenges**: DNS verification state management

### Key Design Principles
- **Normalized Structure**: Efficient queries and data consistency
- **Audit Trails**: Complete history of all account and issuance activities
- **Performance Optimization**: Indexes on frequently queried fields
- **Scalability**: Partitioning strategies for high-volume tables

---

## Security & Verification

### Enterprise Verification
- **DNS Ownership Proof**: TXT record validation for corporate identity
- **Continuous Monitoring**: Ongoing verification status checks
- **Revocation Handling**: Immediate suspension on verification failure

### Cryptographic Security
- **Managed Key Infrastructure**: UBeU controls all enterprise signing keys
- **Ed25519 Signatures**: Hedera-native cryptographic signing
- **Key Rotation**: Automated key lifecycle management
- **Hardware Security**: HSM integration for key protection

### Access Control
- **API Key Security**: Secure generation, rotation, and revocation
- **Permission Management**: Fine-grained role-based access
- **Audit Logging**: Comprehensive activity tracking
- **Anomaly Detection**: Automated suspicious activity monitoring

---

## SDK Implementation

### Enterprise SDK Features
- **Simple Integration**: Single class initialization with API key
- **Full API Coverage**: All enterprise operations available
- **Error Handling**: Comprehensive error mapping and recovery
- **Rate Limiting**: Built-in respect for API limits
- **Async Support**: Non-blocking operations for bulk processing

### Developer Experience
- **Code Examples**: Complete integration examples for common use cases
- **Type Safety**: Full TypeScript definitions
- **Documentation**: API reference with interactive examples
- **Testing Tools**: Sandbox environment and mock data

---

## Operational Workflows

### Google Integration Example
1. **Registration**: Google submits enterprise account request
2. **DNS Setup**: Google adds TXT record to google.com DNS
3. **Verification**: UBeU validates DNS record and activates account
4. **API Integration**: Google integrates SDK with existing certification system
5. **Credential Issuance**: Google issues certifications via UBeU API to recipient identities
6. **Recipient Experience**: Users receive credentials at their UBeU identities (john.smith.iam)

### Ongoing Operations
- **Monthly Billing**: Automated usage calculation and invoicing
- **Usage Monitoring**: Real-time tracking against allowances and limits
- **Support Escalation**: Tiered support based on enterprise tier
- **Analytics Reporting**: Regular usage and engagement reports

---

## Performance & Scalability

### Performance Targets
- **API Response Time**: <200ms for single credential issuance
- **Bulk Processing**: 1000+ credentials/minute throughput
- **DNS Verification**: <5 minute average verification time
- **System Uptime**: 99.9% availability SLA

### Scalability Architecture
- **Horizontal Scaling**: Stateless services with load balancing
- **Database Optimization**: Read replicas and connection pooling
- **Caching Strategy**: Multi-layer caching for frequently accessed data
- **Queue Management**: Asynchronous processing for high-volume operations

### Monitoring & Observability
- **Application Metrics**: Response times, error rates, throughput
- **Business Metrics**: Credential issuance volumes, enterprise growth
- **Infrastructure Metrics**: Database performance, network utilization
- **Alerting**: Proactive monitoring with escalation procedures

---

## Deprecated Components

The following components from the existing UBeU implementation must be **removed** or **significantly modified**:

### 1. .iss Domain System
**Components to Remove:**
- `packages/domain-verification-service/src/verifiers/ISSDomainVerifier.ts` - .iss domain NFT creation
- Domain NFT minting logic in enterprise registration
- Subdomain management system (`training.aws.iss`, `employees.aws.iss`)
- Domain-based API key generation and management

**Rationale:** .iss domains create unnecessary Web3 complexity without business value. DNS verification of parent domains provides the same trust guarantees.

### 2. Subdomain Architecture
**Components to Remove:**
- `EnterpriseSubdomain` interfaces and management
- Multiple API key per subdomain logic
- Subdomain-based billing and usage tracking
- Subdomain permission systems

**Rationale:** Subdomains create organizational complexity that defeats Web3 abstraction goals. Single enterprise account with role-based permissions achieves the same functionality.

### 3. Complex Enterprise Registration
**Components to Modify:**
- `packages/identity-service/src/services/EnterpriseRegistrationService.ts` - Remove domain NFT creation
- Enterprise dashboard subdomain management interfaces
- Multi-tier subdomain pricing models

**Rationale:** Simplified single-domain approach reduces complexity while maintaining all necessary enterprise functionality.

### 4. Domain-Centric API Design
**Components to Refactor:**
- API endpoints that assume subdomain structure
- Authentication systems tied to domain ownership
- Billing systems that track subdomain usage separately

**Rationale:** Enterprise accounts managed via PostgreSQL with DNS verification provide cleaner abstraction and better developer experience.

### Migration Strategy
Since this is a **greenfield implementation**, no migration is required. The deprecated components should not be implemented in the new system architecture.

---

## Implementation Priority

### Phase 1 (MVP)
1. PostgreSQL enterprise account management
2. DNS verification system
3. Single credential issuance API
4. Basic enterprise SDK

### Phase 2 (Scale)
1. Bulk credential processing
2. Analytics and reporting
3. Custom schema management
4. Advanced enterprise dashboard

### Phase 3 (Enterprise Features)
1. Role-based access control
2. Advanced monitoring and alerting
3. Enterprise integrations (SSO, webhooks)
4. Advanced security features

**Correct.** The credential issuer business logic requires the exact same UBeU-custodied setup as individual digital identity holders.

## Consistent Architecture Across User Types

### Individual Identity Holders
```javascript
const individualSetup = {
  hederaAccount: "0.0.123456",        // UBeU-created and custodied
  keyManagement: "ubeu_controlled",    // UBeU holds all private keys
  did: "did:hedera:mainnet:individual_did",
  userExperience: "web2_dashboard",    // Never sees blockchain complexity
  networkFees: "treasury_sponsored"    // $2/year allowance
};
```

### Enterprise Credential Issuers
```javascript
const enterpriseSetup = {
  hederaAccount: "0.0.789012",        // UBeU-created and custodied (same pattern)
  keyManagement: "ubeu_controlled",    // UBeU holds all private keys (same pattern)  
  did: "did:hedera:mainnet:enterprise_did",
  userExperience: "web2_dashboard",    // Never sees blockchain complexity (same pattern)
  networkFees: "treasury_sponsored"    // Per-credential pricing includes network fees
};
```

## Why This Consistency Matters

### 1. **Zero Web3 Complexity Promise**
Both individual users and enterprise issuers get the same abstraction:
- No private key management
- No HBAR token requirements  
- No understanding of Hedera account IDs (0.0.x format)
- No direct blockchain interaction

### 2. **Simplified Key Management**
```javascript
// Same key management pattern for both
const keyManagement = {
  creation: "UBeU generates Ed25519 keypairs",
  storage: "UBeU secure vault (HSM-backed)",
  usage: "UBeU signs on behalf of user/enterprise",
  rotation: "UBeU handles automatically",
  backup: "UBeU manages redundancy"
};
```

### 3. **Consistent Treasury Model**
```javascript
const treasurySponsorship = {
  individuals: "UBeU pays network fees from $2/year allowance",
  enterprises: "UBeU pays network fees, charges per-credential markup",
  
  // Both abstract away:
  hbarRequirements: false,
  networkFeeVisibility: false,
  blockchainComplexity: false
};
```

### 4. **Same Technical Infrastructure**
Both user types leverage:
- **UBeU-managed Hedera accounts**: Created and controlled by UBeU platform
- **Custodied private keys**: UBeU performs all cryptographic operations
- **HCS storage**: Credentials and DID documents stored via UBeU's HCS integration
- **Multi-DID single-topic architecture**: Cost-efficient blockchain storage

## Updated TDD Section: Account Creation

### Universal Account Creation Pattern
```javascript
class UBeUAccountService {
  /**
   * Create custodied Hedera account - same for individuals and enterprises
   */
  async createCustodiedAccount(accountType: 'individual' | 'enterprise'): Promise<{
    hederaAccountId: string;
    managedDID: string;
    signingKeyId: string;
  }> {
    
    // 1. Generate Ed25519 keypair (UBeU retains private key)
    const keyPair = await this.generateSecureKeyPair();
    
    // 2. Create Hedera account with UBeU as controller
    const hederaAccount = await this.hederaClient.createAccount({
      publicKey: keyPair.publicKey,
      initialBalance: new Hbar(0) // Treasury sponsors all fees
    });
    
    // 3. Store private key in UBeU secure vault
    await this.keyVault.store(keyPair.privateKey, hederaAccount.accountId);
    
    // 4. Create DID using shared HCS topic architecture
    const did = await this.didService.createManagedDID({
      hederaAccountId: hederaAccount.accountId,
      signingKeyId: keyPair.id,
      accountType
    });
    
    return {
      hederaAccountId: hederaAccount.accountId,
      managedDID: did,
      signingKeyId: keyPair.id
    };
  }
}
```

## Business Logic Implications

### 1. **No Self-Custody Options**
Neither individuals nor enterprises manage their own keys:
- **Individuals**: Register via Web2 flow, get Web2 dashboard
- **Enterprises**: Register via DNS verification, get enterprise dashboard  
- **Both**: UBeU manages all blockchain interactions behind the scenes

### 2. **Consistent Signing Operations**
```javascript
// Same signing service for both user types
class UBeUSigningService {
  async signCredential(credentialData: any, signerKeyId: string): Promise<SignedCredential> {
    // UBeU retrieves private key from vault and signs
    const privateKey = await this.keyVault.retrieve(signerKeyId);
    return await this.cryptoService.sign(credentialData, privateKey);
  }
}
```

### 3. **Universal Fee Sponsorship**
Both user types benefit from treasury-sponsored transactions:
- **Individuals**: All operations covered by $49/year subscription
- **Enterprises**: All network fees included in per-credential pricing

This consistent architecture ensures that **both individual users and enterprise issuers experience the same level of Web3 abstraction**, making UBeU a true "Web2 interface to Web3 identity infrastructure" for all participants in the credential ecosystem.


In the context of Credly, **badges** are digital credentials or certifications issued to individuals to recognize skills, achievements, or competencies. They are not Credly-specific verification tools but rather a standardized concept in the digital credentialing space, often referred to as **digital badges** or **open badges**. These badges follow the **Open Badges standard** (developed by the IMS Global Learning Consortium), which ensures interoperability across platforms.

### Key Points About Credly Badges:
- **Definition**: A badge is a digital representation of an achievement, such as completing a course, earning a certification, or demonstrating a skill. It contains metadata like the issuer, recipient, issue date, and criteria for earning it.
- **Verification**: Badges issued by Credly are verifiable, meaning they include cryptographic signatures or links to verify authenticity, typically hosted on Credly’s platform. This ensures the badge’s legitimacy and prevents tampering.
- **Not Credly-Specific**: The concept of digital badges is industry-standard, based on the Open Badges specification. Credly uses this standard, allowing badges to be shared across platforms like LinkedIn or stored in digital wallets.
- **Credly’s Role**: Credly provides tools to create, issue, and manage these badges, integrating features like analytics, branding, and sharing options. Their platform simplifies the process for organizations but doesn’t alter the core badge concept.

### Relevance to UBeU:
For the **UBeU Universal Identity Platform**, Credly’s badges align with the **Verification Layer** and could be integrated as verifiable credentials using **@hiero-did-sdk/anoncreds** for privacy-preserving credential issuance. Badges could be stored as HCS-1 Files on Hedera’s Consensus Service, with verification handled via **@hiero-did-sdk/verifier** for cross-platform compatibility. This would support UBeU’s goal of bridging Web2 (e.g., Credly’s enterprise clients) and Web3 (decentralized identity) ecosystems.

If you’re considering integrating Credly badges into UBeU, I can provide a sample Solidity contract or Hiero DID SDK implementation to map badges to DIDs or UBAuth tokens. Let me know!

This TDD provides the architectural foundation for a simplified, enterprise-focused credential issuance system that abstracts Web3 complexity while maintaining the security and verifiability benefits of decentralized credentials.