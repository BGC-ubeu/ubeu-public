# UBeU Greenfield Technical Design Document - Enhanced

## Executive Summary

### Problem Statement
Digital identity management suffers from fundamental fragmentation between Web2 and Web3 ecosystems. Users manage multiple disconnected identities across platforms, struggle with complex blockchain interactions, and lack portable credential verification. Enterprises face high integration costs for issuing verifiable credentials, while individuals cannot seamlessly present verified identity attributes across different contexts without vendor lock-in.

### Solution Overview
UBeU provides a unified, self-sovereign identity platform that bridges Web2 and Web3 through domain-based identity binding. The system leverages Hedera's blockchain infrastructure to create W3C-compliant decentralized identifiers (DIDs) linked to both UBeU native domains (.iam) and existing Web3 domains (.eth, .sol, etc.) to serve as DID identifer aliases. Non-transferable UBAuth tokens cryptographically bind user identities across systems to a single digital identity built on did:hedera while maintaining complete user sovereignty through exportable private keys and credentials for self-custody.

### Key Architectural Decisions

**Backend-First Architecture**: Platform designed with modern cloud-native patterns where business logic resides in scalable backend services. Smart contracts serve as immutable data storage and final settlement layer only.

**Treasury-Sponsored Fee Model**: Platform treasury funds all network operations, tracked against a $2 annual per-user allowance using Hedera's Exchange Rate precompile (0x168) for real-time USD/HBAR conversions. This abstracts blockchain complexity from users while ensuring sustainable economics through automated cost management.

**Multi-DID Single-Topic Architecture**: Users manage multiple contextual DIDs (personal, professional, etc.) within one Hedera Consensus Service (HCS) topic. This reduces operational costs by 90% compared to per-DID topics while enabling flexible identity contexts.

**Identity Context Management**: Complex many-to-many relationships between domains (aliases) and DIDs, with user-controlled credential routing and assignment.

**Off-Chain Verification Pattern**: Cross-chain domain ownership verification occurs off-chain using direct blockchain API calls with database caching, with results submitted on-chain for dispute resolution. This approach reduces transaction costs by 95% while maintaining cryptographic security.

**Unified Pricing Model**: Flat $20/year registration fee covers `.iam` domain registration, DID creation, external Web3 domain binding, and network spending allowance. Universal .iam domain provisioning provides all users with self-selected human-readable DID alias.

### Phased Domain Support Strategy

**Phase 1 (Primary Focus)**: EVM-Compatible Chains
- **Ethereum Name Service (ENS)**: .eth domains
- **Unstoppable Domains**: .crypto, .nft, .blockchain, .bitcoin, .coin, .wallet, .x, .dao, .888
- **Polygon Domains**: .polygon domains
- **Other EVM Chains**: .arb (Arbitrum), .op (Optimism), .base, etc.

**Phase 2 (Future Development)**: Non-EVM Chains
- **Solana**: .sol domains
- **Bitcoin**: .btc domains (via Stacks or similar)
- **Other Non-EVM**: .ada (Cardano), .near, .flow, etc.

### Success Criteria
- User retention >90% after 30 days (measured via session analytics)
- Credential verification latency <500ms at 95th percentile
- System availability >99.9% excluding planned maintenance
- Support for 1M+ active identities within 18 months
- Average network spend <$1/user/year maintaining treasury sustainability

---

## 2. Identity Context Architecture

### Many-to-Many Alias-to-DID Relationships

UBeU implements a sophisticated **many-to-many relationship** between domains (aliases) and DIDs, providing maximum flexibility for identity management:

```typescript
interface IdentityContext {
  userId: string;
  hcsTopicId: string;        // 1 HCS topic per user
  primaryDid: string;        // Main DID for the user
  dids: DIDContext[];        // Up to 5 DIDs per user
  domains: DomainAlias[];    // Multiple domains per user
  aliasMappings: AliasMapping[]; // Many-to-many relationships
}

interface AliasMapping {
  domainId: string;
  didId: string;
  context: 'personal' | 'professional' | 'educational';
  isPrimary: boolean;        // One primary alias per DID
  createdAt: Date;
}
```

#### **Relationship Examples:**

**One Domain → Multiple DIDs:**
```
Domain: john.doe.iam
├── Personal DID: did:hedera:0.0.12345
├── Professional DID: did:hedera:0.0.12346
└── Educational DID: did:hedera:0.0.12347
```

**Multiple Domains → One DID:**
```
DID: did:hedera:0.0.12345
├── john.doe.iam (primary)
├── john.eth (Web3 alias)
├── john.crypto (Web3 alias)
└── jdoe.company.iss (enterprise alias)
```

### User-Controlled Credential Routing

Credentials are **not automatically assigned** to DIDs. Users maintain full control over credential acceptance and routing:

```typescript
interface CredentialOffer {
  id: string;
  issuerDid: string;
  credentialType: string;
  credentialData: any;
  status: 'pending' | 'accepted' | 'declined' | 'reassigned';
  offeredToDid: string;      // Original target DID
  assignedToDid?: string;    // Final assigned DID (may differ)
  userId: string;
  createdAt: Date;
  expiresAt?: Date;
}

class CredentialRoutingService {
  async offerCredentialToUser(
    userId: string,
    credential: CredentialOffer
  ): Promise<CredentialOffer> {
    // 1. Store credential offer
    const offer = await this.storeCredentialOffer(credential);

    // 2. Notify user of pending credential
    await this.notifyUserOfCredentialOffer(userId, offer);

    // 3. Wait for user decision
    return offer;
  }

  async processCredentialDecision(
    offerId: string,
    decision: 'accept' | 'decline' | 'reassign',
    targetDidId?: string
  ): Promise<void> {
    const offer = await this.getCredentialOffer(offerId);

    switch (decision) {
      case 'accept':
        await this.assignCredentialToDid(offer, offer.offeredToDid);
        break;
      case 'decline':
        await this.declineCredentialOffer(offer);
        break;
      case 'reassign':
        if (targetDidId) {
          await this.reassignCredentialToDid(offer, targetDidId);
        }
        break;
    }
  }
}
```

### HCS Topic and DID Structure

**Per-User Architecture:**
- **1 HCS Topic**: Single topic per user for all identity operations
- **Up to 5 DIDs**: Maximum 5 contextual DIDs per user
- **Unlimited Aliases**: Multiple domains can alias each DID
- **Cost Optimization**: 90% reduction in HCS topic costs

```typescript
interface UserHCSArchitecture {
  userId: string;
  hcsTopicId: string;
  dids: {
    personal?: string;
    professional?: string;
    educational?: string;
    social?: string;
    gaming?: string;
  };
  domainPricing: {
    iam: { included: 1, additional: 10 };  // $20 includes 1, $10 each additional
    external: { cost: 0 };                 // Free to link/verify
  };
}
```

### Domain Pricing Structure

**Included in $20 Registration:**
- ✅ 1 .iam domain (e.g., john.doe.iam)
- ✅ DID creation and HCS topic setup
- ✅ Treasury-sponsored network fees ($2/year allowance)
- ✅ Basic identity management

**Additional Costs:**
- ➕ Extra .iam domains: $10/year each
- ➕ External Web3 domains: FREE (just verification)
- ➕ Enterprise .iss domains: Custom pricing

### Self-Custody Scenarios

#### **Web2 User Self-Custody Flow:**

```typescript
class SelfCustodyService {
  async exportDomainNFT(
    userId: string,
    targetHederaAccount: string,
    password: string
  ): Promise<ExportResult> {
    // 1. Verify user owns the domain NFT
    const domainNft = await this.getUserDomainNFT(userId);

    // 2. Export UBAuth token association
    const ubAuthToken = await this.getUserUBAuthToken(userId);

    // 3. Create account association record
    const association = await this.createAccountAssociation(
      targetHederaAccount,
      ubAuthToken
    );

    // 4. Transfer domain NFT to user's account
    await this.transferDomainNFT(domainNft, targetHederaAccount);

    // 5. Update user profile with new account
    await this.updateUserHederaAccount(userId, targetHederaAccount);

    return {
      domainNftTransferred: true,
      ubAuthAssociation: association,
      newHederaAccount: targetHederaAccount
    };
  }
}
```

**Key Points:**
- User's new Hedera account must associate with original UBeU account holding UBAuth token
- New account is treated like a Web3 user's native account during registration
- Maintains link to original identity while enabling self-custody

### Web3 Domain Relationship to Hedera DID

**Important Clarification:** Web3 domains are **NOT** the immutable link to Hedera DID:

```typescript
interface Web3DomainLinkage {
  web3Domain: string;        // e.g., "john.eth"
  web3Account: string;       // e.g., "0x1234...abcd" (ETH address)
  ubeuHederaAccount: string; // e.g., "0.0.56789" (UBeU-managed)
  linkageType: 'temporary' | 'exportable'; // NOT immutable
  verificationProof: string;
  createdAt: Date;
}
```

#### **How It Works:**

1. **Initial Linkage**: Web3 domain provides access to UBeU-sponsored Hedera account
2. **Key Export Required**: Users must export keys when signing up for true ownership
3. **Non-Immutable**: Web3 account linkage can be changed or removed
4. **Recovery Mechanism**: If Web3 domain is lost, user can still access via .iam domain

#### **User Recovery Scenarios:**

```typescript
class DomainRecoveryService {
  async recoverAccessWithoutWeb3Domain(
    userId: string,
    iamDomain: string,
    newWeb3Account?: string
  ): Promise<RecoveryResult> {
    // 1. Verify .iam domain ownership
    const iamVerified = await this.verifyIamDomainOwnership(iamDomain, userId);

    if (!iamVerified) {
      throw new Error('IAM domain verification failed');
    }

    // 2. Restore access to UBeU account
    const ubeuAccount = await this.restoreUBeUAccountAccess(userId);

    // 3. Option to create new Web3 alias
    if (newWeb3Account) {
      await this.createNewWeb3Alias(userId, newWeb3Account, ubeuAccount);
    }

    return {
      accessRestored: true,
      ubeuAccount: ubeuAccount,
      newAliasCreated: !!newWeb3Account
    };
  }
}
```

#### **Key Principles:**

- **Web3 Domain ≠ Hedera DID**: Domain is just an access method, not the identity itself
- **Export Keys on Signup**: Users should export keys for true self-custody
- **Multiple Recovery Paths**: .iam domain provides backup access
- **Flexible Aliases**: Users can add/remove/change domain aliases without affecting core DID

This architecture ensures users maintain control over their identity while providing flexible, user-friendly access methods through various domain aliases.

---

## 3. System Architecture

### High-Level Component Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    External Systems                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│  │   Web2 Apps     │ │   Web3 Apps     │ │ Payment Systems │    │
│  │                 │ │                 │ │                 │    │
│  │ • Username/     │ │ • Wallet        │ │ • Alchemy Pay   │    │
│  │   Password      │ │   Connect       │ │ • NOWPayments   │    │
│  │ • Social Login  │ │ • ENS/SNS       │ │ • Crypto        │    │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UBeU Platform                                │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│  │   API Gateway   │ │  Backend Srvcs. │ │   Database      │    │
│  │                 │ │                 │ │                 │    │
│  │ • REST/GraphQL  │ │ • Identity Mgmt │ │ • PostgreSQL    │    │
│  │ • Authentication│ │ • Domain Verif. │ │ • Redis Cache   │    │
│  │ • Rate Limiting │ │ • Treasury      │ │ • Audit Logs    │    │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Hedera Network                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│  │ Smart Contracts │ │   HCS Topics    │ │   HTS Tokens    │    │
│  │                 │ │                 │ │                 │    │
│  │ • Data Storage  │ │ • DID Documents │ │ • UBAuth Tokens │    │
│  │ • Final         │ │ • Audit Trails  │ │ • Domain NFTs   │    │
│  │   Settlement    │ │ • Event Logs    │ └─────────────────┘    │
│  └─────────────────┘ └─────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

**API Gateway**: Central entry point implementing REST/GraphQL APIs with authentication, rate limiting, and request routing. Provides unified interface for all client interactions while enforcing security policies.

**Backend Services Cluster**:
- *Identity Management Service*: Handles DID creation, resolution, and context switching
- *Domain Verification Service*: Validates ownership of external domains through direct blockchain APIs
- *Treasury Service*: Manages network fee sponsorship and allowance tracking using Hedera precompiles
- *Credential Processing Service*: Handles verifiable credential issuance and verification
- *Social Media Verification Service*: Manages platform-specific verification workflows
- *Analytics Service*: Provides usage metrics and performance monitoring

**Database Layer**:
- *PostgreSQL*: Primary data storage for user profiles, domains, DIDs, and business logic
- *Redis*: High-performance caching for DID resolution, domain verification, and session data
- *Audit Database*: Immutable audit trail storage with compliance reporting capabilities

**Smart Contract Layer**:
- *Registry Contract*: Manages domain-to-DID mappings and final settlement operations
- *Storage Contract*: Handles persistent state with role-based access controls
- *Libraries*: Reusable components for token operations and cryptographic functions

### Data Flow Patterns

**Registration Flow**:
```
User Request → API Gateway → Identity Service → Database
    ↓
Domain Verification → Treasury Service → Smart Contract
    ↓
HCS Topic Creation → DID Document Storage → Response
```

**Verification Flow**:
```
External App → API Gateway → Identity Service → Database Lookup
    ↓
DID Resolution → HCS Verification → Credential Validation → Response
```

**Treasury Operations**:
```
Service Request → Treasury Service → Exchange Rate Precompile (0x168)
    ↓
Allowance Check → HBAR Conversion → Sponsored Transaction → Database Update
```

---

## 4. Hedera System Precompiles Integration

### Core Precompile Usage

**Hedera Token Service (HTS) - Address 0x167**:
The HTS precompile enables direct interaction with Hedera's native token service for UBAuth tokens and domain NFTs.

```typescript
// Example: Creating UBAuth token via HTS precompile
class TreasuryService {
  async createUBAuthToken(accountId: string): Promise<string> {
    const tokenStruct = {
      name: "UBAuth Token",
      symbol: "UBAUTH",
      treasury: this.treasuryAccount,
      keys: this.getTokenKeys(),
      tokenSupplyType: TokenSupplyType.FINITE,
      maxSupply: 1,
      tokenType: TokenType.NON_FUNGIBLE_UNIQUE
    };

    const result = await this.callHTSPrecompile(
      'createNonFungibleToken',
      [tokenStruct]
    );

    const { responseCode, tokenAddress } = this.decodeHTSResult(result);
    if (responseCode !== 22) { // SUCCESS
      throw new Error(`Token creation failed: ${responseCode}`);
    }

    return tokenAddress;
  }

  private async callHTSPrecompile(functionName: string, params: any[]): Promise<Buffer> {
    const contractCall = new ContractCallQuery()
      .setContractId('0.0.359') // HTS precompile contract
      .setFunction(functionName, params)
      .setGas(1000000);

    return await contractCall.execute(this.client);
  }
}
```

**Exchange Rate Precompile - Address 0x168**:
Used for real-time USD/HBAR conversion in treasury allowance tracking.

```typescript
// Example: Converting HBAR costs to USD cents
class TreasuryService {
  async convertToUsdCents(hbarAmount: number): Promise<number> {
    const exchangeRate = await this.getExchangeRate();

    // Convert tinybars to tinycents (1 HBAR = 100,000,000 tinybars)
    const tinybars = hbarAmount * 100000000;
    const tinycents = tinybars * exchangeRate.hbarEquivalent / exchangeRate.centEquivalent;

    return Math.ceil(tinycents / 1000000); // Convert to USD cents
  }

  private async getExchangeRate(): Promise<ExchangeRate> {
    const query = new ContractCallQuery()
      .setContractId('0.0.360') // Exchange Rate precompile
      .setFunction('getExchangeRate')
      .setGas(50000);

    const result = await query.execute(this.client);
    return this.decodeExchangeRate(result);
  }
}
```

**Pseudorandom Number Generator (PRNG) - Address 0x169**:
Used for secure randomness in verification codes and cryptographic operations.

```typescript
// Example: Generating secure verification codes
class VerificationService {
  async generateVerificationCode(): Promise<string> {
    const randomBytes = await this.getPseudorandomSeed();
    const code = this.bytesToVerificationCode(randomBytes);
    return code;
  }

  private async getPseudorandomSeed(): Promise<Buffer> {
    const query = new ContractCallQuery()
      .setContractId('0.0.361') // PRNG precompile
      .setFunction('getPseudorandomSeed')
      .setGas(50000);

    return await query.execute(this.client);
  }
}
```

### Precompile Response Code Handling

All HTS operations must check response codes for success:

```typescript
// Standard HTS response handling
const SUCCESS_CODE = 22;
const INVALID_TOKEN_ID = 19;
const INSUFFICIENT_TOKEN_BALANCE = 25;

function handleHTSResponse(responseCode: number, operation: string): void {
  switch (responseCode) {
    case SUCCESS_CODE:
      return; // Success
    case INVALID_TOKEN_ID:
      throw new Error(`${operation}: Invalid token ID`);
    case INSUFFICIENT_TOKEN_BALANCE:
      throw new Error(`${operation}: Insufficient balance`);
    default:
      throw new Error(`${operation} failed with code: ${responseCode}`);
  }
}
```

---

## 5. Enterprise Domain Support (.iss Domains)

### Overview
.iss domains are specialized for enterprise and organizational use, enabling seamless integration with corporate identity systems, directory services, and SSO (Single Sign-On) platforms. Unlike .iam domains which are for individual users, .iss domains support hierarchical organizational structures.

### Domain Structure
- **Root Level**: `company.iss` - Organization-level domain
- **Department Level**: `hr.company.iss`, `it.company.iss`, `finance.company.iss`
- **Sub-department Level**: `recruiting.hr.company.iss`, `security.it.company.iss`

### Key Differences from .iam Domains

| Aspect | .iam Domains | .iss Domains |
|--------|-------------|--------------|
| **Target Users** | Individuals | Organizations/Enterprises |
| **Verification** | Self-service registration | DNS-based verification |
| **Hierarchy** | Flat (user choice) | Hierarchical (org structure) |
| **Management** | Individual user | Organization administrators |
| **Use Cases** | Personal identity | Enterprise SSO, employee verification |
| **Pricing** | $20/year (individual) | Custom enterprise pricing |

### DNS-Based Verification Process

.iss domains require DNS verification to prove organizational ownership:

```typescript
class IssDomainVerifier {
  async verifyIssDomain(domain: string, organizationId: string): Promise<VerificationResult> {
    // 1. Extract root domain from subdomain
    const rootDomain = this.extractRootDomain(domain); // company.iss

    // 2. Generate verification token
    const verificationToken = await this.generateVerificationToken(domain);

    // 3. Check DNS TXT record
    const dnsRecords = await this.queryDnsTxtRecords(`_ubeu-verify.${domain}`);
    const expectedRecord = `ubeu-verification=${verificationToken}`;

    if (!dnsRecords.includes(expectedRecord)) {
      throw new Error('DNS verification failed: TXT record not found');
    }

    // 4. Verify organizational ownership
    const orgVerification = await this.verifyOrganizationalOwnership(domain, organizationId);

    // 5. Create domain record
    return await this.createIssDomainRecord(domain, organizationId, verificationToken);
  }

  private extractRootDomain(domain: string): string {
    const parts = domain.split('.');
    // For subdomain.company.iss, return company.iss
    if (parts.length > 2 && parts[parts.length - 1] === 'iss') {
      return `${parts[parts.length - 2]}.iss`;
    }
    return domain;
  }
}
```

### Enterprise Integration Examples

#### Active Directory Integration
```typescript
class ActiveDirectoryIntegration {
  async syncEmployeeIdentities(issDomain: string): Promise<void> {
    // 1. Query Active Directory for employees
    const employees = await this.queryActiveDirectory(issDomain);

    // 2. Create organizational DIDs
    for (const employee of employees) {
      const employeeDid = await this.createEmployeeDID(employee, issDomain);
      const employeeDomain = `${employee.username}.${issDomain}`;

      // 3. Link employee domain to DID
      await this.linkEmployeeDomain(employeeDomain, employeeDid, employee);
    }

    // 4. Set up department hierarchies
    await this.createDepartmentHierarchy(issDomain, employees);
  }
}
```

#### SSO Integration
```typescript
class SSOIntegrationService {
  async configureSSO(issDomain: string, ssoProvider: SSOProvider): Promise<void> {
    // 1. Configure SAML/OIDC endpoints
    const ssoConfig = await this.setupSSOEndpoints(issDomain, ssoProvider);

    // 2. Create organizational verification policies
    const policies = await this.createVerificationPolicies(issDomain);

    // 3. Set up automatic credential issuance
    await this.configureAutoIssuance(issDomain, policies);

    // 4. Enable domain-based authentication
    await this.enableDomainAuthentication(issDomain, ssoConfig);
  }
}
```

### Use Cases and Examples

#### Corporate Employee Verification
```
Organization: Acme Corp (acme.iss)
├── Employees get: john.doe.acme.iss
├── HR gets: hr.acme.iss
├── IT gets: it.acme.iss
└── Automatic credential issuance for:
    ├── Employment verification
    ├── Security clearance badges
    ├── Access control credentials
```

#### Educational Institution
```
University: harvard.iss
├── Students: john.doe.student.harvard.iss
├── Faculty: dr.smith.faculty.harvard.iss
├── Alumni: jane.smith.alumni.harvard.iss
└── Departments: cs.harvard.iss, law.harvard.iss
```

#### Government Agency
```
Agency: state.gov.iss
├── Employees: agent.smith.fbi.state.gov.iss
├── Departments: treasury.state.gov.iss
├── Contractors: contractor.xyz.state.gov.iss
└── Secure credential hierarchies
```

### Technical Implementation

#### Domain Hierarchy Management
```typescript
interface IssDomainHierarchy {
  rootDomain: string;           // company.iss
  parentDomain?: string;        // hr.company.iss (for it.hr.company.iss)
  domainType: 'root' | 'department' | 'subdepartment' | 'user';
  permissions: DomainPermissions;
  policies: VerificationPolicies[];
}

class DomainHierarchyService {
  async createHierarchicalDomain(domainName: string, parentDomain?: string): Promise<IssDomainHierarchy> {
    const hierarchy = await this.analyzeDomainHierarchy(domainName, parentDomain);

    // Validate hierarchy rules
    await this.validateHierarchyRules(hierarchy);

    // Create domain with inherited permissions
    const domain = await this.createDomainWithInheritance(domainName, hierarchy);

    // Set up policy inheritance
    await this.applyInheritedPolicies(domain, hierarchy);

    return hierarchy;
  }
}
```

#### Bulk Credential Issuance
```typescript
class BulkCredentialService {
  async issueOrganizationalCredentials(issDomain: string, credentialType: string): Promise<void> {
    // 1. Get all active domain members
    const members = await this.getDomainMembers(issDomain);

    // 2. Filter by eligibility criteria
    const eligibleMembers = await this.filterEligibleMembers(members, credentialType);

    // 3. Batch create credentials
    const credentials = await this.batchCreateCredentials(eligibleMembers, credentialType);

    // 4. Distribute to member DIDs
    await this.distributeCredentials(credentials, issDomain);

    // 5. Log issuance audit trail
    await this.logBulkIssuance(credentials, issDomain);
  }
}
```

### Security Considerations

#### Hierarchical Access Control
- **Root Domain**: Full administrative control
- **Department Domains**: Department-specific permissions
- **User Domains**: Individual user control
- **Policy Inheritance**: Automatic permission propagation

#### Audit and Compliance
- **Immutable Audit Trails**: All domain operations logged to HCS
- **Compliance Reporting**: GDPR, SOX, HIPAA compliance features
- **Access Monitoring**: Real-time security monitoring and alerting

### Integration with Existing Enterprise Systems

#### LDAP/Active Directory
- Automatic user provisioning from directory services
- Group-based permission assignment
- Password policy synchronization

#### Identity Providers (Okta, Azure AD, Ping)
- SAML 2.0 and OIDC integration
- Just-in-Time (JIT) provisioning
- Multi-factor authentication support

#### HR Systems (Workday, SAP, Oracle HCM)
- Employee lifecycle management
- Automatic credential updates
- Termination/deactivation workflows

---

## 6. Export Digital Identity Capability

### Self-Sovereign Identity Export

UBeU provides complete **export capabilities** enabling true self-sovereignty and interoperability with other identity platforms. Users can export their entire digital identity for use with alternative providers or self-custody.

```typescript
interface ExportedIdentity {
  did: string;
  privateKey: string;           // Encrypted with user password
  hederaAccountId: string;
  ubAuthTokenId: string;
  domainNftId: string;
  hcsTopicId: string;
  credentials: ExportedCredential[];
  verificationMethods: VerificationMethod[];
  metadata: IdentityMetadata;
}

class IdentityExportService {
  async exportUserIdentity(userId: string, password: string): Promise<ExportedIdentity> {
    // 1. Verify user ownership and consent
    await this.verifyExportConsent(userId);

    // 2. Gather all identity components
    const identityComponents = await this.gatherIdentityComponents(userId);

    // 3. Encrypt sensitive data
    const encryptedPrivateKey = await this.encryptPrivateKey(identityComponents.privateKey, password);

    // 4. Create export bundle
    const exportBundle: ExportedIdentity = {
      did: identityComponents.did,
      privateKey: encryptedPrivateKey,
      hederaAccountId: identityComponents.hederaAccountId,
      ubAuthTokenId: identityComponents.ubAuthTokenId,
      domainNftId: identityComponents.domainNftId,
      hcsTopicId: identityComponents.hcsTopicId,
      credentials: await this.exportCredentials(userId),
      verificationMethods: identityComponents.verificationMethods,
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0',
        compatiblePlatforms: ['Hedera', 'ION', 'Dock', 'Veres One']
      }
    };

    // 5. Generate export audit trail
    await this.logIdentityExport(userId, exportBundle);

    return exportBundle;
  }

  async importExternalIdentity(importBundle: ExportedIdentity, targetUserId: string): Promise<void> {
    // 1. Validate import bundle
    await this.validateImportBundle(importBundle);

    // 2. Create new UBeU identity structure
    const newIdentity = await this.createIdentityFromImport(importBundle, targetUserId);

    // 3. Migrate credentials and verification methods
    await this.migrateCredentials(importBundle.credentials, newIdentity);

    // 4. Update user profile
    await this.updateUserProfile(targetUserId, newIdentity);

    // 5. Log import audit trail
    await this.logIdentityImport(targetUserId, importBundle);
  }
}
```

### Export Formats and Compatibility

**Standard Export Formats**:
- **JSON-LD**: W3C Verifiable Credentials standard
- **DID Document**: W3C DID Core specification
- **Hedera Native**: Direct compatibility with Hedera SDK
- **Universal Format**: Interoperable with other SSI platforms

**Platform Compatibility**:
- **Hedera**: Native support via SDK
- **ION**: Microsoft decentralized identity network
- **Dock**: Enterprise-grade credential platform
- **Veres One**: Verifiable credentials network

### Export Security Features

**Data Protection**:
- **Encryption**: AES-256-GCM for sensitive data
- **Password Protection**: User-controlled encryption keys
- **Selective Export**: Choose what to export
- **Audit Logging**: Complete export history

**Privacy Controls**:
- **Consent Required**: Explicit user permission for exports
- **Data Minimization**: Only export necessary data
- **Revocation Support**: Ability to revoke exported credentials
- **Usage Tracking**: Monitor how exported data is used

---

## 7. Enterprise System Integration Architecture

### Integration Patterns

UBeU integrates with enterprise systems through standardized APIs and protocols:

#### 1. **SCIM (System for Cross-domain Identity Management)**
```typescript
class SCIMIntegrationService {
  async syncUsersFromHR(scimEndpoint: string, apiKey: string): Promise<void> {
    // 1. Connect to HR system via SCIM
    const scimClient = new SCIMClient(scimEndpoint, apiKey);

    // 2. Fetch user updates
    const userChanges = await scimClient.getUserUpdates();

    // 3. Process each change
    for (const change of userChanges) {
      switch (change.operation) {
        case 'CREATE':
          await this.createEnterpriseUser(change.user, change.organization);
          break;
        case 'UPDATE':
          await this.updateEnterpriseUser(change.user);
          break;
        case 'DELETE':
          await this.deactivateEnterpriseUser(change.user.id);
          break;
      }
    }

    // 4. Sync organizational structure
    await this.syncOrganizationalHierarchy(scimClient);
  }
}
```

#### 2. **LDAP/Active Directory Integration**
```typescript
class LDAPIntegrationService {
  async syncFromActiveDirectory(ldapConfig: LDAPConfig): Promise<void> {
    // 1. Establish LDAP connection
    const ldapClient = new LDAPClient(ldapConfig);

    // 2. Query organizational units
    const orgUnits = await ldapClient.searchOU('(objectClass=organizationalUnit)');

    // 3. Query users with group memberships
    const users = await ldapClient.searchUsers('(objectClass=user)', ['memberOf']);

    // 4. Create hierarchical domain structure
    for (const orgUnit of orgUnits) {
      const domainName = `${orgUnit.name}.${ldapConfig.rootDomain}`;
      await this.createOrganizationalDomain(domainName, orgUnit);
    }

    // 5. Map users to domains
    for (const user of users) {
      const userDomain = this.mapUserToDomain(user, orgUnits);
      await this.assignUserToDomain(user, userDomain);
    }
  }
}
```

#### 3. **SSO Provider Integration (SAML/OIDC)**
```typescript
class SSOIntegrationService {
  async configureSAMLProvider(samlConfig: SAMLConfig, issDomain: string): Promise<void> {
    // 1. Set up SAML service provider
    const sp = new SAMLServiceProvider({
      entityId: `https://ubeu.io/saml/${issDomain}`,
      assertionConsumerService: `https://ubeu.io/saml/acs/${issDomain}`,
      certificate: samlConfig.certificate,
      privateKey: samlConfig.privateKey
    });

    // 2. Configure identity provider metadata
    await sp.configureIdP(samlConfig.idpMetadata);

    // 3. Set up attribute mapping
    const attributeMapping = {
      'email': 'urn:oid:0.9.2342.19200300.100.1.3',
      'employeeId': 'urn:oid:2.16.840.1.113730.3.1.3',
      'department': 'urn:oid:2.16.840.1.113730.3.1.2',
      'manager': 'urn:oid:0.9.2342.19200300.100.1.10'
    };

    // 4. Create domain-specific authentication policies
    await this.createDomainAuthPolicies(issDomain, attributeMapping);

    // 5. Enable JIT provisioning
    await this.enableJITProvisioning(issDomain, samlConfig);
  }

  async handleSAMLAssertion(assertion: SAMLAssertion): Promise<AuthResult> {
    // 1. Validate SAML assertion
    const validationResult = await this.validateSAMLAssertion(assertion);

    // 2. Extract user attributes
    const userAttributes = this.extractUserAttributes(assertion);

    // 3. Find or create user
    const user = await this.findOrCreateEnterpriseUser(userAttributes);

    // 4. Generate UBeU session
    const session = await this.createEnterpriseSession(user, userAttributes);

    return session;
  }
}
```

#### 4. **REST API Integration**
```typescript
class RESTIntegrationService {
  async integrateWithHRSystem(apiConfig: APIConfig): Promise<void> {
    // 1. Set up API client with authentication
    const apiClient = new APIClient({
      baseURL: apiConfig.baseURL,
      auth: {
        type: apiConfig.authType,
        credentials: apiConfig.credentials
      }
    });

    // 2. Test connectivity
    await this.testAPIConnectivity(apiClient);

    // 3. Discover available endpoints
    const endpoints = await this.discoverAPIEndpoints(apiClient);

    // 4. Set up webhooks for real-time sync
    await this.configureWebhooks(apiClient, endpoints);

    // 5. Perform initial data sync
    await this.performInitialSync(apiClient, endpoints);

    // 6. Schedule ongoing synchronization
    await this.scheduleOngoingSync(apiConfig.syncInterval);
  }

  async handleWebhookEvent(event: WebhookEvent): Promise<void> {
    switch (event.type) {
      case 'user.created':
        await this.handleUserCreated(event.data);
        break;
      case 'user.updated':
        await this.handleUserUpdated(event.data);
        break;
      case 'user.terminated':
        await this.handleUserTerminated(event.data);
        break;
      case 'org.changed':
        await this.handleOrgStructureChanged(event.data);
        break;
    }
  }
}
```

### Integration Security and Compliance

#### **Secure Data Transmission**
- **Mutual TLS**: Certificate-based authentication
- **OAuth 2.0**: Token-based authorization
- **API Key Management**: Rotatable keys with scopes
- **Rate Limiting**: Prevent abuse and ensure fair usage

#### **Data Mapping and Transformation**
```typescript
class DataMappingService {
  async mapEnterpriseUser(enterpriseUser: EnterpriseUser): Promise<UBeUUser> {
    // 1. Map basic user information
    const ubeuUser: UBeUUser = {
      email: enterpriseUser.email,
      firstName: enterpriseUser.firstName,
      lastName: enterpriseUser.lastName,
      employeeId: enterpriseUser.employeeId,
      department: enterpriseUser.department,
      manager: enterpriseUser.manager
    };

    // 2. Apply data transformation rules
    ubeuUser = await this.applyTransformationRules(ubeuUser, enterpriseUser);

    // 3. Validate mapped data
    await this.validateMappedData(ubeuUser);

    // 4. Generate UBeU-specific identifiers
    ubeuUser.userId = await this.generateUBeUUserId(enterpriseUser);
    ubeuUser.primaryDid = await this.generateUserDID(ubeuUser);

    return ubeuUser;
  }
}
```

#### **Compliance and Audit**
- **GDPR Compliance**: Data processing agreements and consent management
- **SOX Compliance**: Audit trails for financial and HR data
- **HIPAA Compliance**: Protected health information handling
- **Data Residency**: Geographic data storage compliance

### Integration Monitoring and Management

#### **Health Monitoring**
```typescript
class IntegrationHealthService {
  async monitorIntegrationHealth(integrationId: string): Promise<HealthStatus> {
    // 1. Check API connectivity
    const connectivity = await this.checkConnectivity(integrationId);

    // 2. Verify data synchronization
    const syncStatus = await this.verifyDataSync(integrationId);

    // 3. Monitor error rates
    const errorRate = await this.getErrorRate(integrationId);

    // 4. Check data consistency
    const consistency = await this.verifyDataConsistency(integrationId);

    // 5. Generate health report
    return {
      integrationId,
      status: this.calculateOverallHealth(connectivity, syncStatus, errorRate, consistency),
      lastSync: syncStatus.lastSync,
      errorRate: errorRate.percentage,
      issues: this.identifyIssues(connectivity, syncStatus, errorRate, consistency)
    };
  }
}
```

This comprehensive integration approach ensures seamless connectivity with existing enterprise systems while maintaining security, compliance, and data integrity.

---

## 8. Enhanced Onboarding Flow

### Web2 User Onboarding

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Signs Up │───▶│  Email/Password │───▶│  Payment ($20)  │
│   (Web2 User)   │    │   Credentials    │    │   Processing    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│Deterministic    │    │  Create UBeU    │    │  Treasury       │
│Hedera Account   │    │   .iam Domain   │    │  Sponsorship     │
│Creation (0.0.x) │    │   (field1.field2│    │  Setup ($2/year  │
└─────────────────┘    │     .iam)       │    │   allowance)     │
                       └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HCS Topic     │    │   DID Creation  │    │   UBAuth Token  │
│   Creation      │    │   (did:hedera)  │    │   Minting        │
│   (Multi-DID)   │    │                 │    │   (HTS 0x167)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Domain NFT    │    │   DID Document  │    │   User Profile   │
│   Creation      │    │   Storage in    │    │   Complete       │
│   (Transferable) │    │   HCS Topic    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Web3 User Onboarding

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Wallet Connect │───▶│  Domain Claim   │───▶│  Payment ($20)  │
│  (MetaMask/     │    │  (.eth, .sol)   │    │   Processing    │
│   HashPack)     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Domain         │    │  Verification   │    │  Treasury       │
│  Ownership      │    │  (Off-Chain)    │    │  Sponsorship     │
│  Check          │    │                 │    │  Setup           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Link Existing  │    │   Create UBeU   │    │   UBAuth Token   │
│  Hedera Account │    │   .iam Domain   │    │   Binding        │
│  (if available) │    │   (field1.field2│    │   (HTS 0x167)    │
└─────────────────┘    │     .iam)       │    └─────────────────┘
                       └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HCS Topic     │    │   DID Creation  │    │   User Profile   │
│   Creation      │    │   (did:hedera)  │    │   Complete       │
│   (Multi-DID)   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Universal Hedera Account Creation

**All users** (Web2 users, Web3 users with existing Hedera accounts, and Web3 users without Hedera accounts) receive a UBeU-managed Hedera account that serves as the cryptographic link between their identity and the Hedera network. This account holds:

- **UBAuth Token**: Non-transferable HTS token binding the user's identity
- **Domain NFT**: Transferable token representing .iam domain ownership
- **Private Key**: The cryptographic link between Hedera DID and UBeU sessions

This account acts as the bridge between the user's W3C DID (stored on Hedera) and their authenticated UBeU sessions, enabling seamless identity operations while maintaining self-sovereignty.

```typescript
class AccountCreationService {
  async createDeterministicAccount(email: string): Promise<string> {
    // Generate deterministic account ID from email hash
    const emailHash = this.hashEmail(email);
    const accountId = this.generateAccountId(emailHash);

    // Create account with auto-renewal
    const accountCreateTx = new AccountCreateTransaction()
      .setKey(this.generateKeyPair(accountId).publicKey)
      .setInitialBalance(Hbar.fromTinybars(0)) // Treasury sponsored
      .setAutoRenewPeriod(Duration.fromDays(90))
      .setAccountMemo(`UBeU Identity Account for ${email}`);

    // Treasury signs and pays for the transaction
    const treasurySignature = await this.treasurySign(accountCreateTx);
    const response = await accountCreateTx.execute(this.client);

    return response.getReceipt().accountId.toString();
  }

  private generateAccountId(emailHash: Buffer): string {
    // Use PRNG precompile for additional entropy
    const randomSeed = await this.getPseudorandomSeed();
    const combined = Buffer.concat([emailHash, randomSeed]);

    // Generate deterministic 0.0.x format account ID
    const accountNum = this.secureHash(combined).readUInt32BE(0);
    return `0.0.${accountNum}`;
  }
}
```

---

## 9. Core Technical Decisions

### Decision 1: Backend-First Architecture with Smart Contracts as Data Layer

**Context**: Platform requires high-throughput, low-latency operations for identity management at consumer scale while maintaining blockchain immutability for critical data.

**Alternatives Evaluated**:
- *Smart Contract-First*: Complex business logic in contracts (current approach)
- *Hybrid Approach*: Mixed contract/backend logic
- *Full Backend*: No blockchain integration

**Decision Rationale**: Backend-first architecture provides superior developer experience, easier scaling, and faster iteration while using smart contracts for immutable data storage and final settlement. This approach maintains blockchain benefits while avoiding contract size and gas limitations.

**Technical Implementation**:
- Business logic in Node.js/TypeScript services
- Smart contracts handle final settlement and data anchoring
- Database-first data modeling with blockchain as audit trail
- API-first design with OpenAPI specifications

**Domain Verification Implementation Strategy**:

**Phase 1: EVM Chain Focus**
```typescript
class EVMChainVerifier extends BaseVerifier {
  async verifyDomain(domain: string, owner: string): Promise<boolean> {
    // 1. Determine chain from domain TLD
    const chain = this.getChainFromDomain(domain);

    // 2. Use appropriate RPC endpoint
    const rpcUrl = this.getChainRPC(chain);

    // 3. Query domain registry contract
    const isOwner = await this.queryDomainOwnership(domain, owner, rpcUrl);

    // 4. Cache result with TTL
    await this.cacheResult(domain, isOwner);

    return isOwner;
  }

  private getChainFromDomain(domain: string): EVMChain {
    const tld = domain.split('.').pop();
    switch (tld) {
      case 'eth': return EVMChain.ETHEREUM;
      case 'crypto': return EVMChain.POLYGON; // Unstoppable uses Polygon
      case 'polygon': return EVMChain.POLYGON;
      case 'arb': return EVMChain.ARBITRUM;
      case 'op': return EVMChain.OPTIMISM;
      default: return EVMChain.ETHEREUM;
    }
  }
}
```

**Phase 2: Non-EVM Chain Support (Future)**
```typescript
class NonEVMChainVerifier extends BaseVerifier {
  async verifyDomain(domain: string, owner: string): Promise<boolean> {
    // 1. Use oracle services for non-EVM verification
    const oracleResult = await this.queryOracleService(domain, owner);

    // 2. Cross-verify with multiple oracles
    const confirmations = await this.getMultipleConfirmations(domain, owner);

    // 3. Apply consensus mechanism
    return this.applyConsensusAlgorithm(confirmations);
  }
}
```

**Benefits**:
- ✅ Faster development cycles
- ✅ Horizontal scaling capabilities
- ✅ Modern deployment patterns
- ✅ Easier testing and maintenance
- ✅ Superior user experience

### Decision 2: Treasury-Sponsored Fee Model with Hedera Precompile Integration

**Context**: Mainstream adoption requires abstracting blockchain costs and complexity while maintaining predictable platform economics.

**Decision Rationale**: Treasury sponsorship eliminates user-facing blockchain complexity while backend management with Hedera precompiles provides superior cost control and real-time optimization.

**Technical Implementation**:
```typescript
class TreasuryService {
  async sponsorTransaction(userId: string, operation: HederaOperation): Promise<TransactionResult> {
    // Check user's $2/year allowance
    const allowance = await this.getUserAllowance(userId);

    // Convert to HBAR using Exchange Rate precompile (0x168)
    const hbarCost = await this.convertToHbar(operation.estimatedCost);

    // Verify sufficient allowance
    if (allowance.remaining < operation.estimatedCost) {
      throw new InsufficientAllowanceError();
    }

    // Submit sponsored transaction
    const result = await this.submitSponsoredTransaction(operation);

    // Update allowance and audit trail
    await this.updateAllowance(userId, operation.estimatedCost);
    await this.logAuditTrail(userId, operation, result);

    return result;
  }

  private async convertToHbar(usdCents: number): Promise<number> {
    const exchangeRate = await this.getExchangeRate();
    const tinycents = usdCents * 1000000; // Convert cents to tinycents
    const tinybars = tinycents * exchangeRate.centEquivalent / exchangeRate.hbarEquivalent;
    return tinybars / 100000000; // Convert to HBAR
  }
}
```

### Decision 3: Multi-DID Single-Topic Architecture with Database Management

**Context**: Users require multiple identity contexts without proliferating blockchain resources or operational complexity.

**Decision Rationale**: Single HCS topic per user with database-managed DID relationships provides optimal cost efficiency and flexibility while maintaining cryptographic separation.

**Technical Implementation**:
```typescript
interface UserIdentity {
  userId: string;
  primaryDid: string;
  hcsTopicId: string;
  dids: {
    personal: string;
    professional: string;
    educational?: string;
  };
  domains: string[];
  allowances: Allowance;
}
```

### Decision 4: Direct Blockchain API Integration with Caching

**Context**: Cross-chain domain verification must be fast, cost-effective, and reliable while maintaining security.

**Decision Rationale**: Direct blockchain API calls with intelligent caching provide superior performance and reliability compared to oracle-based approaches.

**Technical Implementation**:
```typescript
class DomainVerificationService {
  async verifyDomainOwnership(domain: string, owner: string): Promise<VerificationResult> {
    // Check cache first
    const cached = await this.cache.get(`domain:${domain}`);
    if (cached && this.isCacheValid(cached)) {
      return cached.result;
    }

    // Direct blockchain API call
    const result = await this.verifyOnBlockchain(domain, owner);

    // Cache result with TTL
    await this.cache.set(`domain:${domain}`, result, this.getCacheTTL());

    return result;
  }
}
```

---

## 10. Data Architecture

### Core Data Models

**User Identity Model**:
```typescript
interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  createdAt: Date;
  lastLoginAt: Date;
  status: 'active' | 'suspended' | 'deleted';

  // Identity relationships
  primaryDid: string;
  hcsTopicId: string;
  domains: Domain[];
  dids: DID[];

  // Treasury information
  allowances: Allowance;
  subscription: Subscription;
}
```

**Domain Model**:
```typescript
interface Domain {
  id: string;
  name: string;
  type: 'iam' | 'eth' | 'sol' | 'btc' | 'crypto' | 'nft' | 'polygon' | 'arb' | 'op';
  chainType: 'native' | 'evm' | 'non-evm'; // Phase 1: native + evm, Phase 2: non-evm
  phase: 1 | 2; // Implementation phase
  ownerId: string;
  didId: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  verifiedAt?: Date;
  expiresAt: Date;
  createdAt: Date;
}

// Phase 1 Supported Domains (EVM Focus)
const PHASE_1_DOMAINS = [
  'iam',      // UBeU native
  'eth',      // Ethereum Name Service
  'crypto',   // Unstoppable Domains
  'nft',      // Unstoppable Domains
  'polygon',  // Polygon Domains
  'arb',      // Arbitrum
  'op'        // Optimism
] as const;

// Phase 2 Supported Domains (Non-EVM)
const PHASE_2_DOMAINS = [
  'sol',      // Solana
  'btc'       // Bitcoin
] as const;
```

**DID Model**:
```typescript
interface DID {
  id: string;
  did: string;
  userId: string;
  context: 'personal' | 'professional' | 'educational';
  hcsTopicId: string;
  documentHash: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### Database Schema Design

**Primary Tables**:
- `users` - User account information
- `domains` - Domain ownership and verification
- `dids` - DID identifiers and metadata
- `hcs_topics` - HCS topic management
- `credentials` - Verifiable credentials
- `allowances` - Treasury spending tracking
- `audit_trail` - Immutable audit logs

**Indexing Strategy**:
- Composite indexes on frequently queried combinations
- Partial indexes for active records
- JSONB columns for flexible metadata storage
- Time-based partitioning for audit trails

### Caching Strategy

**Redis Cache Layers**:
- **L1 Cache**: Hot data (recent DID resolutions, active sessions)
- **L2 Cache**: Warm data (domain verifications, user profiles)
- **L3 Cache**: Cold data archival

**Cache Invalidation**:
- Time-based expiration
- Event-driven invalidation
- Write-through caching for critical data

---

## 11. API Design

### REST API Structure

```
POST   /api/v1/identity/register     - Register new identity
GET    /api/v1/identity/{did}        - Resolve DID
POST   /api/v1/domain/verify         - Verify domain ownership
POST   /api/v1/credential/issue      - Issue verifiable credential
GET    /api/v1/user/profile          - Get user profile
PUT    /api/v1/user/allowance         - Update user allowance
```

### Authentication & Authorization

**JWT-Based Authentication**:
```typescript
interface AuthToken {
  userId: string;
  did: string;
  permissions: string[];
  exp: number;
  iat: number;
}
```

**Role-Based Access Control**:
- `USER`: Basic identity operations
- `VERIFIED`: Domain verification capabilities
- `TREASURY`: Network spending operations
- `ADMIN`: Platform administration

### Rate Limiting

**Tiered Rate Limits**:
- Free Tier: 100 requests/hour
- Basic: 1000 requests/hour
- Premium: 10000 requests/hour
- Enterprise: Unlimited

---

## 12. Security Architecture

### Authentication Flow

```
Client Request → API Gateway → JWT Validation → Service Authorization → Database Access
```

### Data Protection

**Encryption at Rest**:
- AES-256-GCM for sensitive user data
- TLS 1.3 for all network communications
- Hardware Security Modules for key management

**Privacy by Design**:
- Data minimization principles
- User-controlled data retention
- Selective disclosure for credentials
- GDPR/CCPA compliance framework

### Threat Mitigation

**Common Attack Vectors**:
- **DDoS Protection**: Cloudflare + API Gateway rate limiting
- **Injection Attacks**: Parameterized queries + input validation
- **Session Hijacking**: JWT with short expiration + refresh tokens
- **Data Breaches**: Encrypted storage + access logging

---

## 13. Scalability & Performance

### Horizontal Scaling Architecture

**Microservices Design**:
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Identity Service│ │ Domain Service  │ │ Treasury Service│
│                 │ │                 │ │                 │
│ • Auto-scaling  │ │ • Auto-scaling  │ │ • Auto-scaling  │
│ • Load balanced │ │ • Load balanced │ │ • Load balanced │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

**Database Scaling**:
- Read replicas for query distribution
- Sharding by user ID for write scaling
- Connection pooling for efficiency

### Performance Targets

**Latency Requirements**:
- DID Resolution: <200ms (with cache), <500ms (without cache)
- Domain Verification: <1000ms
- Credential Issuance: <2000ms
- API Response Time: <500ms at 95th percentile

**Throughput Capacity**:
- 10,000 requests/second sustained load
- 50,000 concurrent users
- 1M+ DID resolutions per hour

---

## 14. Implementation Roadmap

### Phase 1: Foundation (Months 1-3)
- [ ] Backend service architecture setup
- [ ] Database schema design and implementation
- [ ] API Gateway configuration
- [ ] Basic identity management service
- [ ] Treasury service foundation

### Phase 2: Core Services (Months 3-6)
- [ ] Domain verification service (EVM chains only)
  - [ ] ENS (.eth) verification
  - [ ] Unstoppable Domains (.crypto, .nft, etc.) verification
  - [ ] Polygon domains verification
  - [ ] Basic EVM chain support
- [ ] DID management and resolution
- [ ] Smart contract integration
- [ ] HCS topic management
- [ ] Credential processing service

### Phase 3: Advanced Features & Non-EVM Support (Months 6-9)
- [ ] Social media verification
- [ ] Multi-DID context management
- [ ] Export/import functionality
- [ ] Analytics and monitoring
- [ ] Enterprise integrations
- [ ] **Non-EVM Chain Support (Phase 2)**
  - [ ] Solana (.sol) domain verification
  - [ ] Bitcoin (.btc) domain verification
  - [ ] Oracle service integration for non-EVM chains
  - [ ] Cross-chain verification consensus mechanisms

### Phase 4: Production Readiness (Months 9-12)
- [ ] Security audit and penetration testing
- [ ] Performance optimization
- [ ] Documentation and SDK development
- [ ] Beta testing and user feedback
- [ ] Production deployment

---

## 15. Technology Stack

### Backend Services
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Fastify for API services
- **Database**: PostgreSQL 15+ with TypeORM
- **Cache**: Redis 7+ with clustering
- **Message Queue**: Redis Streams for async processing

### Infrastructure
- **Containerization**: Docker + Kubernetes
- **API Gateway**: Kong or AWS API Gateway
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

### Blockchain Integration
- **Hedera SDK**: @hashgraph/sdk for network interaction
- **Hiero DID SDK**: @hiero-did-sdk/* for identity operations
- **Smart Contracts**: Solidity ^0.8.20 with OpenZeppelin

### Development Tools
- **Testing**: Jest + Supertest for unit and integration tests
- **CI/CD**: GitHub Actions with automated deployment
- **Documentation**: OpenAPI 3.0 + Swagger UI
- **Code Quality**: ESLint + Prettier + SonarQube

---

## 16. Success Metrics

### Technical Metrics
- **Performance**: 99.9% uptime, <500ms API response time
- **Scalability**: Support 1M+ active users within 18 months
- **Security**: Zero critical vulnerabilities in production
- **Cost Efficiency**: <$1/user/year network spend

### Business Metrics
- **User Adoption**: 10,000+ registrations in first 6 months
- **Retention**: >90% user retention after 30 days
- **Satisfaction**: >4.5/5 user satisfaction rating
- **Revenue**: Sustainable subscription revenue model

### Quality Metrics
- **Code Coverage**: >90% test coverage
- **Documentation**: 100% API documentation coverage
- **Security**: SOC 2 Type II compliance
- **Performance**: <1% error rate in production

---

## Conclusion

This enhanced UBeU Technical Design Document provides comprehensive guidance for implementing a production-ready Identity as a Service platform. The document now includes:

- **Explicit Hedera Precompile Integration**: Detailed usage of HTS (0x167), Exchange Rate (0x168), and PRNG (0x169) precompiles with code examples
- **Enhanced Onboarding Flows**: Detailed diagrams and processes for both Web2 and Web3 user onboarding
- **Deterministic Account Creation**: Technical implementation details for creating Hedera accounts for Web2 users
- **Critical Hedera Operations**: Code examples for token creation, exchange rate conversion, and secure randomness generation

The backend-first approach with smart contracts as data layer provides superior developer experience, easier maintenance, and better user experience compared to the evolved current architecture.

The design emphasizes:
- **Clean Architecture**: Modern cloud-native patterns
- **User Experience**: Complete blockchain abstraction
- **Scalability**: Horizontal service scaling
- **Maintainability**: Standard web development practices
- **Cost Efficiency**: Optimized treasury management with Hedera precompiles

This enhanced design represents the optimal implementation of UBeU's Identity as a Service vision, balancing technical excellence with business requirements while providing clear, actionable guidance for AI-assisted development.