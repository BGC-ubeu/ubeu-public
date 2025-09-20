## User Journey 1: Web2 User Registration Workflow: Functional Description

### Core Identity Components

**The Five-Component Identity Architecture:**

1. **Individual User**: The actual person seeking digital identity (e.g., John Smith)
2. **Authentication Method**: Web2 credentials (username/password) for familiar access
3. **Domain Identifier**: Human-readable `.iam` domain (e.g., `john.smith.iam`) as the primary alias
4. **UBAuth Binding Token**: Non-transferable identity anchor token that creates immutable relationships
5. **Decentralized Identifier (DID)**: W3C-compliant `did:hedera` method identifier for interoperability

### Initial Registration Process Flow

**Step 1: User Initiates Registration**
- User visits UBeU platform and chooses "Web2 Registration" option
- Provides desired two-field domain name (e.g., "john.smith" for `john.smith.iam`)
- Creates username/password credentials for platform access
- Selects payment method (credit card, bank transfer, or other fiat options)

**Step 2: Domain Validation and Availability**
- System validates the requested domain follows the strict two-field format requirement
- Checks availability across the `.iam` namespace to prevent conflicts
- Reserves the domain temporarily during registration process

**Step 3: Payment Processing and Fee Structure**
- User pays unified $20 annual registration fee covering all identity components
- Payment processed through Alchemy Pay traditional payment rails (credit cards, bank transfers)
- Converted to USDC and deposited in treasury account for network fee sponsorship
- No blockchain knowledge or cryptocurrency required from user

**Step 4: Automated Hedera Infrastructure Creation**
- System deterministically generates a Hedera account using cryptographic derivation (the `custodied Hedera Account`)
- Creates a single HCS (Hedera Consensus Service) topic for the user's identity documents
- All network fees sponsored by treasury account - completely transparent to user
- User never interacts with Hedera wallets, account IDs, or HBAR currency

**Step 5: Identity Token Creation and Binding**
- **Domain NFT**: Transferable token representing ownership of the `.iam` domain, created and transferred from UBeU Treasury to the `custodied Hedera Account` 
- **UBAuth Token**: Non-transferable binding token that creates the immutable identity relationships, created and transferred from UBeU Treasury to the `custodied Hedera Account` updated to be non-transferrable.

**Step 6: UBeU issued Verified Credential as Part of Registration Process Flow**
- UBeU automatically issues credential for verified ownership of .iam domain
- UBeU automatically issues credential for verified ownership of UBAuth token (serial number).

### The UBAuth Token: Core Innovation

**Purpose and Function:**
The UBAuth token serves as the immutable anchor that binds together all identity components. Unlike the domain NFT which can be transferred, the UBAuth token permanently links:

- **Web2 Credential Hash**: Cryptographic representation of username/password
- **Hedera Account**: Auto-generated blockchain account holding tokens
- **HCS Topic**: Storage location for DID documents and credentials
- **DID Identifier**: W3C-compliant decentralized identifier

**Critical Characteristics:**
- **Non-Transferable**: Cannot be moved between accounts, ensuring permanent binding
- **Immutable Metadata**: Contains permanent links between all identity components
- **Deterministic Creation**: Generated using cryptographic methods for consistency
- **Account Residence**: Lives in user's auto-generated Hedera account, not treasury

### Immutable Relationships Established

**Primary Binding (Never Changes):**
1. **UBAuth Token ↔ Hedera Account**: Token permanently resides in specific Hedera account
2. **UBAuth Token ↔ HCS Topic**: Token metadata permanently links to identity document storage
3. **UBAuth Token ↔ DID**: Token establishes permanent ownership of decentralized identifier
4. **Web2 Credentials ↔ UBAuth Token**: Hash of credentials permanently embedded in token

**Dynamic Relationships (Can Change):**
1. **Domain Alias ↔ UBAuth Token**: `.iam` domain can be transferred, but UBAuth token binding remains
2. **Additional Domains**: User can connect external domains (`.eth`, `.sol`) to same UBAuth token
3. **Session Access**: User can access via Web2 credentials OR exported blockchain credentials

### Multi-DID Architecture Within Single Topic

**Efficiency Design:**
- Single HCS topic can contain multiple DID documents for same user
- Enables personal/professional identity separation without additional network costs
- Reduces Hedera fees by ~90% compared to one-topic-per-DID architecture
- All DIDs within topic linked to same UBAuth token for ownership verification

**Use Cases:**
- **Personal DID**: For individual credentials, social verifications, personal domains
- **Professional DID**: For work credentials, business domains, corporate identity
- **Specialized DIDs**: For specific use cases while maintaining single identity anchor

### Zero-Friction Abstraction

**Hidden Complexity:**
- User never sees Hedera account IDs (0.0.x format)
- Network fees completely abstracted through treasury sponsorship
- Blockchain operations happen transparently in background
- Standard Web2 dashboard interface for all identity management

**Network Allowance System:**
- Each user receives $2 annual allowance for network operations
- Typical transactions cost $0.0001-$0.001, allowing thousands of operations
- Usage tracked but invisible to user unless approaching limits
- Early renewal offered at 90% allowance usage

### Session and Access Management

**Dual Access Methods:**
1. **Web2 Path**: Username/password login to web dashboard
2. **Web3 Export**: User can export private keys for self-custody and blockchain wallet access

**Session Features:**
- JWT-based authentication supporting both access methods
- Context switching between multiple DIDs within same session
- Seamless transition between Web2 and Web3 interaction modes
- Backup credential generation for account recovery

### Enterprise Integration Ready

**Credential Reception:**
- W3C-compliant DID enables receiving verifiable credentials from any issuer
- Privacy-preserving credential storage using zero-knowledge proofs
- Support for both public and private credential verification
- Integration with enterprise identity systems through standard protocols

This architecture enables a Web2 user to gain access to the full Web3 identity ecosystem while maintaining the familiar username/password experience, with the option to graduate to full self-custody blockchain interaction when ready.

## User Journey 2: Web3 User Registration Workflow: EVM Domain Integration

### Core Identity Components for Web3 Users

**The Five-Component Identity Architecture (Web3 Variant):**

1. **Individual User**: The person with existing Web3 domain ownership (e.g., Sam with `sam.eth`)
2. **Native Account Connected via Native Wallet**: Existing blockchain wallet (MetaMask, Rainbow, etc.) - no new wallet needed - connects to user's preferred blockchain account; i.e. Ethereum: (0x....) and EVM-compatible (./docs/EVM-compatible-chains.md)
3. **External Domain Token**: Existing NFT representing domain ownership (e.g., ENS NFT for `.eth`)
4. **UBAuth Binding Token**: Non-transferable identity anchor linking external account to Hedera identity
5. **Decentralized Identifier (DID)**: W3C-compliant `did:hedera` method identifier using domain as human-readable alias

### Initial Registration Process Flow

**Step 1: Wallet Connection and Domain Discovery**
- User connects existing wallet (MetaMask, WalletConnect, etc.) to UBeU platform
- System automatically scans wallet for supported Web3 domains - all EVM-compatible initially (./docs/EVM-compatible-chains.md); non-EVM chains planned.
- User selects which domain(s) to use as DID alias from discovered domains
- Multiple domains can be linked to single identity if owned

**Step 2: Domain Ownership Verification Challenge**
- System generates cryptographic challenge specific to the domain namespace
- For ENS domains: Challenge references ENS registry and resolver contracts
- User signs challenge with wallet controlling the domain's owner address
- Signature proves ownership without revealing private keys or requiring domain transfer

**Step 3: Off-Chain Verification Process**
- Domain Verification Service validates signature against blockchain registry
- Confirms user's wallet address matches domain owner in authoritative registry
- Creates verification proof that can be audited but preserves privacy
- No on-chain transactions required for verification on origin blockchain (Ethereum, Polygon, etc.)

**Step 4: Payment in Native Currency**
- User pays $20 annual fee using preferred currency from their existing native wallet
- Alchemy Pay and NOWPayments processors accept ETH, USDC, POL, ARB, or other supported cryptocurrencies
- Payment automatically converted to USDC and settled on Hedera treasury
- No HBAR required - user never interacts with Hedera's native currency

**Step 5: Hedera Infrastructure Creation (Transparent)**
- System deterministically creates Hedera account linked to user's native wallet signature
- Single HCS topic established for user's identity documents
- User's domain is set as human-readable alias for DID identifier allowing issuers to issue credentials to the alias.
- All Hedera network fees sponsored by treasury account
- User remains unaware of Hedera-specific account IDs or operations

**Step 6: UBeU issued Verified Credential as Part of Registration Process Flow**
- UBeU automatically issues credential for verified ownership of external domains
- UBeU automatically issues credential for verified ownership of .iam domain
- UBeU automatically issues credential for verified ownership of UBAuth token (serial number).  

### Enhanced Domain Registration vs Free Connection

**Universal Registration ($20/year):**
- Includes automatic `.iam` domain creation (e.g., `sam.johnson.iam`) 
- External domain connection (e.g., `sam.eth`) included at no additional cost
- UBAuth token created linking both domains to same identity
- Full identity platform access with credential reception capabilities

### UBAuth Token for Web3 Users

**Enhanced Binding for External Domains:**
The UBAuth token creates immutable relationships between:

- **Native Wallet Address**: User's existing Ethereum/Solana/etc. address
- **Domain Ownership Proof**: Cryptographic proof of domain control
- **Hedera Account**: Auto-generated account holding UBAuth token
- **HCS Topic**: Storage for DID documents and received credentials
- **DID Identifier**: W3C-compliant identifier with domain alias

**Multi-Domain Support:**
- Single UBAuth token binds immutable ownership of native account (Ethereum), to the hedera custodied account, to the DID hcs topic, to the initial DID document
- Domains are NOT immutable records of ownership and are mapped to the user in the operations state recorded in PostgreSQL  
- User can add additional domains (sam.eth + sam.lens + sam.sol) to map to the same identity
- Each domain verified independently but linked to same DID
- Enables comprehensive Web3 identity aggregation
- Many-to-many DID-to-domain relationship allows maximum flexibility. Multiple aliases to one DID. One alias to multiple DIDs

### Cross-Chain Verification Architecture

**Privacy-Preserving Design:**
- Domain ownership verified off-chain with signature verification
- Results committed to Hedera via hash for dispute resolution
- No sensitive data exposed on any blockchain
- Original domain remains on native blockchain unchanged

**Oracle Integration:**
- RCP for authoritative domain registry queries
- Real-time verification of domain ownership status
- Automated updates if domain ownership changes
- Fallback verification methods for network resilience

**Supported Domain Types:**
- **ENS Domains** (.eth): Ethereum Name Service registry verification
- **EVM-Compatible**: Polygon, Arbitum, (./docs/EVM-compatible-chains.md)
- **Unstoppable Domains**: Multiple TLD support (.crypto, .nft, .blockchain)

### Immutable vs Dynamic Relationships

**Immutable Bindings (Never Change):**
1. **UBAuth Token ↔ Hedera Account**: Permanent residence in auto-generated account
2. **UBAuth Token ↔ HCS Topic**: Permanent link to identity document storage
3. **UBAuth Token ↔ DID**: Permanent ownership of decentralized identifier
4. **Native Wallet Signature ↔ UBAuth Token**: Cryptographic proof of original wallet control

**Dynamic Relationships (Can Change)/ Not etched in UBAuth Token:**
1. **Domain Ownership**: If user transfers `sam.eth`, UBAuth token ownership unchanged
2. **Domain Alias**: DID can use different domains as primary alias
3. **Additional Domains**: User can connect/disconnect external domains
4. **Wallet Access**: User can export Hedera keys for direct blockchain interaction
5. **Additional Accounts** User can connect multiple accounts (via account recovery methods) which is supported in PostgreSQL wallet_linking table.

### Domain Transfer Scenarios

**When External Domain is Transferred:**
- Original owner retains UBAuth token and DID ownership
- New domain owner cannot access previous owner's DID or credentials
- UBeU registry updates domain-to-DID mappings to reflect changed ownership
- Previous owner's identity remains intact with other (.iam or external) domains/aliases

**Maintaining Identity Integrity:**
- UBAuth token binding survives domain transfers
- User's received credentials remain valid and accessible
- Professional/personal DID separation maintained within HCS topic
- Identity continuity preserved regardless of domain trading activity

### Multi-DID Context Switching

**Professional/Personal Separation:**
- Single HCS topic contains multiple DID documents
- Context switching in dashboard between professional `sam.eth` DID and personal `sam.johnson.iam` DID
- Different credential sets for different contexts
- Unified identity management with flexible presentation
- User dashboard credentials pending to accept/decline/reassign (to different DID). No automatic DID updating; credentials must be user accepted.

**Enterprise Integration:**
- Work domains (.company.eth) can create separate professional DID
- Personal domains maintain separate credential space
- Single UBAuth token governs access to all contexts
- Employer cannot access personal credentials/DIDs

### Wallet Integration Patterns

**Seamless Web3 Experience:**
- User continues using familiar wallet for authentication
- No new seed phrases or private key management required
- Standard wallet signing for UBeU platform access
- Export option available for Hedera-native wallet interaction

**Signature-Based Authentication:**
- Platform access via wallet signature challenges
- Session management using JWT tokens
- No password creation required for Web3 users
- Backup authentication via exported Hedera credentials

### Zero-Friction Hedera Abstraction

**Hidden Complexity:**
- User never sees Hedera account IDs (0.0.x format)
- HCS topic management completely transparent
- Treasury-sponsored fees eliminate HBAR requirements
- Standard Web3 wallet interface maintained throughout

**Network Operations:**
- DID document updates happen transparently; user accepts/declines/reassigns.
- Credentials from issuers routed to domain alias and DID identifier automatically, received to user dashboard
- Social verifications processed without Hedera knowledge
- Analytics and audit trails maintained invisibly

### Payment and Fee Structure

**Native Currency Flexibility:**
- Accept payment in user's preferred cryptocurrency
- Support for major tokens (ETH, USDC, etc)
- Automatic conversion and settlement in USDC on Hedera
- Multi-year registration options 

**Treasury Sponsorship Model:**
- All Hedera network fees covered by treasury account
- User's $2 annual allowance tracked but invisible
- Typical operations cost $0.0001-$0.001 each
- Thousands of operations possible within allowance

### Enterprise and Credential Ecosystem

**W3C Compliance:**
- Full compatibility with existing verifiable credential issuers
- Support for both public and privacy-preserving credentials
- Integration with enterprise identity systems
- Zero-knowledge proof capabilities for sensitive credentials

**Interoperability Benefits:**
- Existing Web3 domains gain credential reception capabilities
- Enhanced utility for domain investments
- Cross-chain identity verification
- Bridge to emerging decentralized identity ecosystems

This architecture enables Web3 users to leverage their existing domain investments and wallet infrastructure while gaining access to enterprise-grade identity capabilities, all without learning Hedera-specific concepts or managing additional cryptocurrencies.

## User Journey 3: Web3 User Wallet Connection with Domain No Longer Present

### Scenario: Domain Transfer After Registration

**The Situation:**
Alice originally registered with `alice.eth` domain and later transferred the domain NFT to Bob. Alice connects her original ETH wallet to UBeU, but the system no longer detects `alice.eth` in her wallet.

### Automatic Wallet Recognition and Access

**Step 1: Immediate Wallet Authentication**
- Alice connects her original ETH wallet (0x123...abc) via MetaMask
- UBeU system queries `account_mappings` table using her wallet address as `native_account_id`
- System finds existing record linking her ETH wallet to her Hedera account, DID, and UBAuth token
- **Immediate authentication granted** - no verification challenges or recovery process needed

**Step 2: Automatic Domain Portfolio Sync**
- System performs real-time scan of Alice's current wallet holdings
- Domain Verification Service queries ENS registry to confirm `alice.eth` ownership
- Detects `alice.eth` is no longer owned by Alice's wallet address
- **Automatically removes** `alice.eth` from Alice's active domain aliases
- **Automatically revokes** UBeU issued verified owner credential for `alice.eth`
- **Automatically adds** any new domains discovered in her wallet (e.g., `alice.bnb`, `alice.crypto`) that Alice verifies.
- **Automatically issues** UBeU issues verified domain ownership credential for verified domains. 

**Step 3: Seamless Dashboard Access**
- Alice gains immediate access to her complete UBeU dashboard
- All credentials, social verifications, and identity data remain intact
- Domain portfolio reflects her current wallet holdings
- Dashboard shows UBeU issued domain ownership verified credential for primary DID tab to accept/decline/reassign to a different DID
- All DIDs and HCS topic access preserved

### Why No Recovery Process is Needed

**Wallet Control = Identity Control:**
- Alice's ETH wallet address is the immutable proof of identity ownership
- The UBAuth token creates permanent binding: **ETH Wallet ↔ Hedera Account ↔ DID ↔ HCS Topic**
- Domain ownership is dynamic and transferable; wallet control is the identity anchor
- Only the holder of Alice's ETH private keys can access her UBeU identity

**Domain Independence Architecture:**
- Domains function as **transferable aliases**, not identity anchors
- Domain transfers don't affect core identity binding or access rights
- UBAuth token binding persists regardless of domain portfolio changes
- Identity continuity maintained through wallet-based authentication

### Updated Identity State

**What Alice Retains:**
- Complete access to UBeU dashboard and all features
- All previously received verifiable credentials
- All social verifications and reputation data
- Her primary `.iam` domain (e.g., `alice.smith.iam`)
- All DIDs within her HCS topic (personal/professional contexts)
- Network allowance and billing continuity

**What Alice Loses:**
- **Only the domain alias** for `alice.eth` (now belongs to Bob)
- External applications can no longer resolve `alice.eth` to Alice's DID
- Alice cannot receive credentials addressed to `alice.eth`

**Automatic Updates:**
- Domain-to-DID mapping updated to reflect current wallet holdings
- New domains in Alice's wallet (that she verified) are linked as aliases
- Billing unaffected (external domain connections are free)
- All identity relationships preserved

### Technical Implementation Flow

```javascript
// Streamlined connection logic
async function connectExistingWallet(walletAddress) {
    // 1. Recognize existing user
    const profile = await getAccountMappingByWallet(walletAddress);
    
    // 2. Update domain portfolio automatically
    const currentDomains = await scanWalletDomains(walletAddress);
    await syncDomainPortfolio(profile.hedera_account_id, currentDomains);
    
    // 3. Create session and grant access
    return createAuthenticatedSession(profile);
}

async function syncDomainPortfolio(hederaAccountId, currentDomains) {
    const storedDomains = await getExternalDomains(hederaAccountId);
    
    // Remove domains no longer owned
    const removedDomains = storedDomains.filter(d => !currentDomains.includes(d));
    await removeFromDomainAliases(removedDomains, hederaAccountId);
    
    // Add newly discovered domains that Alice verifies
    const newDomains = currentDomains.filter(d => !storedDomains.includes(d));
    await addToDomainAliases(newDomains, hederaAccountId);
}
```

### Security and Fraud Prevention

**Why This is Secure:**
- ETH wallet private key control provides stronger authentication than domain ownership
- Domain transfers are legitimate user actions; wallet control indicates intentional access
- UBAuth token binding prevents unauthorized identity access from domain acquirers
- Aligns with Web3 security principles: "your keys, your crypto, your identity"

**Bob's Experience (New Domain Owner):**
- Bob connects his wallet containing the transferred `alice.eth` domain
- System detects Bob's account is associated with a UBeU account and connects to Bob's UBeU account, or it finds no association and Bob is offered to create a UBeU digital identity or link his wallet with an existing account (which requires recovery methods for Hedera custodied account). In no scenario does the possession of Alice.eth allow Bob to link to Alice's identity
- Bob cannot access Alice's UBeU profile or credentials
- Bob must connect to his existing UBeU identity or register a new UBeU identity, allowing him to use `alice.eth` which creates fresh domain-to-DID mappings

### Recovery Methods: When Actually Needed

Recovery methods (backup credentials, private keys, recovery phrases, linked wallets) are only required when:

1. **Alice loses access to her ETH wallet** (lost private keys, hardware failure)
2. **Alice wants to migrate to a different wallet** (security upgrade, convenience)
3. **Alice's wallet is compromised** and needs emergency identity migration
4. **Alice exports her .iam domainNFT and subsequently transfers it** Alice exports her .iam domain NFT from UBeU custody account to self-custody. UBeU updates wallet_linking which does not require Alice to authenticate her new Hedera wallet via a recovery method. If Alice transfers the .iam domainNFT to yet another new Hedera account, wallet link would break and Alice would require authentication with a recovery method for her second Hedera account.  

These scenarios involve losing control of the wallet itself, not domain transfers within the wallet.

### User Experience Benefits

**Zero Friction Access:**
- No verification challenges or waiting periods
- No manual domain management required
- Automatic portfolio updates without user intervention
- Maintains familiar Web3 wallet-based authentication

**Identity Continuity:**
- All identity components preserved during domain transfers
- Credentials remain valid and accessible
- Professional/personal DID separation maintained
- Network allowance and billing continuity

**Flexibility:**
- Users free to trade domains without identity concerns
- New domain acquisitions can be automatically integrated with UBeU digital identity with user requested domain verification.
- Multiple domain aliases supported without additional cost
- Identity independent of any specific domain holdings

This workflow should correctly implements UBeU's core principle that **wallet control equals identity control**, treating domains as transferable aliases rather than identity anchors, while maintaining seamless user experience and robust security through wallet-based authentication.


## User Journey 4: Web3 Cross-Wallet Recovery - Lost ETH Account to New Polygon Account

### Scenario: Lost Wallet Recovery

**The Situation:**
- Alice originally registered UBeU using MetaMask with `alice.eth` domain on Ethereum
- Alice loses access to her original ETH wallet (lost private keys, compromised account, hardware failure)
- Alice now has a new Polygon wallet containing `alice.crypto` domain (Unstoppable Domain)
- Alice wants to link her new Polygon wallet to her existing UBeU profile

### Connection Detection and Options

**Step 1: New Wallet Connection**
- Alice connects her new Polygon wallet containing `alice.crypto` via MetaMask (Polygon network)
- UBeU system queries `account_mappings` table using new wallet address
- **No existing record found** - wallet is not associated with any UBeU profile
- System scans new wallet and discovers `alice.crypto` domain via Unstoppable Domains registry on Polygon

**Step 2: Universal Connection Options**
Alice is presented with two choices:

**Option A: "Create New UBeU Profile"**
- Register fresh identity with `alice.crypto` domain  
- Lose all previous credentials, social verifications, and identity data
- Start completely new UBeU profile

**Option B: "Link to Existing UBeU Profile"** *(Alice's Goal)*
- Connect new wallet to existing UBeU identity
- Maintain access to all previous credentials and data
- **Requires identity verification** since wallet addresses don't match

### Identity Verification Methods

**Step 3: Proving Ownership of Original UBeU Profile**
Since Alice's new Polygon wallet (0xDEF...xyz) doesn't match her original ETH wallet (0xABC...123), she must prove she owns the existing UBeU profile. Alice can choose from four verification methods:

#### Method 1: UBeU Backup Credentials ✅ **Recommended for This Scenario**
- Alice enters backup username (e.g., `backup_alice789_1673891234`)
- Provides backup password generated during original registration
- System validates against stored hash in `backup_credentials` table
- **Immediate verification** - fastest method for wallet migration

#### Method 2: Exported Private Key ✅ **Most Secure**
- Alice uploads encrypted Hedera private key file (exported during original registration)
- Provides decryption passphrase
- System decrypts and validates key matches original Hedera account
- **Cryptographically strongest** proof of identity ownership

#### Method 3: 24-Word Recovery Phrase ✅ **Self-Custody Standard**
- Alice enters complete BIP39 recovery phrase
- System hashes phrase and compares against stored hash
- **Industry standard** recovery method for serious crypto users

#### Method 4: Previously Linked Wallet (Not Available)
- Requires access to another wallet previously linked to UBeU account
- Since Alice lost her only connected wallet, this method is unavailable

### Cross-Wallet Linking Process

**Step 4: Identity Verification and Wallet Linking**
- Alice successfully verifies ownership using one of the available methods
- System creates new `wallet_linking` record connecting:
  - **Original Wallet**: 0xABC...123 (ETH, now inaccessible)
  - **New Wallet**: 0xDEF...xyz (Polygon, current)
  - **Link Type**: IDENTITY_MIGRATION
  - **Domain**: alice.crypto (new domain being linked)

**Step 5: Profile Migration and Domain Portfolio Update**
- New wallet address added to `account_mappings` as additional authorized wallet
- `alice.crypto` domain added to Alice's existing domain portfolio
- **alice.eth** status depends on current ownership:
  - If still in lost wallet: Marked as "inaccessible" but not removed, unless Alice removes the lost alias from her dashboard.
  - If transferred: Automatically removed via continuous monitoring of connected wallet
- All existing identity data remains intact

### Technical Implementation

**Dual Wallet Association:**
    1. Validate verification proof
    2. Create wallet linking record
    3. Update account mappings to include new wallet
    4. Scan and offer to link domains from new wallet (requires domain verification)
    5. Create session with new wallet

### Post-Migration Identity State

**What Alice Retains:**
- **Complete UBeU profile access** via new Polygon wallet
- **All previous credentials** and social verifications
- **All DIDs** within HCS topic (personal/professional contexts)
- **Primary .iam domain** (e.g., `alice.smith.iam`)
- **Network allowance** and billing continuity
- **All identity relationships** and reputation data

**What Alice Gains:**
- **New domain alias**: `alice.crypto` linked to existing identity
- **Polygon wallet access** to UBeU dashboard
- **Cross-chain flexibility** - can use either ETH or Polygon ecosystems
- **Multiple wallet support** for enhanced security

**What Alice Loses:**
- **ETH wallet access** (by nature of wallet loss)
- **alice.eth domain** (if it was in the lost wallet)

### Security and Fraud Prevention

**Anti-Fraud Measures:**
- **Verification requirement** prevents unauthorized wallet linking
- **Audit trail** logs all wallet migration attempts with timestamps
- **Dashboard notifications** sent during sensitive account changes
- **Rate limiting** prevents brute force attacks on verification methods

**Legitimate User Protection:**
- **Multiple verification methods** ensure Alice can recover even if she forgot some details
- **Permanent linking records** provide audit trail for legitimate migrations
- **Identity continuity** preserves all earned credentials and reputation

### Cross-Chain Technical Details

**Polygon Domain Verification:**
- UBeU queries Unstoppable Domains registry on Polygon (0x049aba7510f45BA5b64ea9E658E342F904DB358D)
- Verifies `alice.crypto` ownership via Polygon RPC calls, @hiero-did-sdk/verifier
- Creates cryptographic proof of domain ownership
- Links domain to Alice's existing Hedera account and DID

**Multi-Chain Support:**
- Alice can now authenticate from either Ethereum or Polygon contexts
- Domain portfolio spans multiple blockchains under single identity
- Payment flexibility supports both ETH and MATIC for future renewals

### Future Wallet Connections

**Additional Wallet Linking:**
- Alice can link more wallets to same identity in the future
- Each additional wallet goes through same verification process
- Multiple wallets provide redundancy against future loss
- All wallets maintain equal access to identity and credentials

**Recovery Resilience:**
- Alice now has both backup credentials AND wallet access for future recovery
- If she loses Polygon wallet, she can use backup credentials to link another wallet
- System prevents single point of failure in identity access

This workflow enables Alice to maintain complete identity continuity despite losing access to her original wallet, while adding enhanced cross-chain capabilities and preventing unauthorized access through robust identity verification requirements.

Perfect! Let me walk through the comprehensive workflow for a Web2 user's journey to self-custody of their domain NFT, followed by the consequences of subsequent transfers.

## User Journey 5: Web2 User Self-Custody Journey - Domain NFT Export

### Initial State: Mike's Web2 UBeU Profile

**Mike's Starting Position:**
- Registered as Web2 user with username/password credentials
- Owns `mike.jones.iam` domain NFT held in **UBeU-managed custodial Hedera account**
- UBAuth token linking his Web2 credentials to Hedera account/DID/HCS topic
- All identity data managed through UBeU platform interface
- Mike has never owned cryptocurrency or used blockchain wallets

### Step 1: Mike Decides to Self-Custody Domain

**Motivation for Self-Custody:**
- Wants true ownership of his domain asset
- Desires independence from platform dependencies
- Wants to use his DID alias - `mike.jones.iam` - as a wallet alias to receive crypto as well.  
- Plans to trade/transfer domain or use with other services
- Seeking enhanced security through personal key control

**UBeU Dashboard "Self-Custody Mode":**
- Mike accesses "Self-Custody Options" in account settings
- System offers three export levels:
  1. **Basic Export**: Domain NFT only; allows domain to be used as an account alias
  2. **Full Export**: Mike gains the ability to manage his identity independently using standard Hedera and DID tools and @hiero-did-sdk/*. 
     - HCS Topic Administration Key: This key gives Mike administrative control over his identity document storage topic on Hedera Consensus Service. He can update his DID documents, add new DIDs to his topic, and manage the identity information stored there using Hedera SDK tools or other DID management software.
     - DID Document Signing Key: This is the cryptographic key associated with Mike's DID that he uses to prove ownership of his identity and sign credential presentations. When someone needs to verify that Mike controls his DID, this key provides that proof.
     - UBAuth Token Metadata Access: While the UBAuth token itself remains non-transferable, Mike gets the cryptographic proofs showing the immutable binding between his original registration, his Hedera account, and his DID. This serves as permanent evidence of his identity ownership.
     - Considered and rejected: Hedera Custodied Account Private Keys owing to security risk. User's will have account recovery methods that would allow them to self-custody the Hedera Custodied account but should be discouraged since Private Keys exist outside their control. 
- Mike selects **"Basic Export: Domain NFT Only"**

### Step 2: Hedera Wallet Creation and Setup

**Creating Personal Hedera Wallet:**
- Mike downloads HashPack or Blade wallet (guided by UBeU tutorial)
- Creates new Hedera account (e.g., 0.0.987654) with personal private keys
- Completes wallet setup and secures seed phrase
- Provides new Hedera account ID to UBeU platform

**Pre-Export Preparation:**
- UBeU associates Mike's new Hedera account with token for fee-less transfer
- System creates **WalletLinkingRecord** establishing cryptographic link between:
  - Mike's Web2 credentials (username/password hash)
  - UBeU-managed custodial account (0.0.123456)
  - Mike's personal Hedera account (0.0.987654)
  - `mike.jones.iam` domain being transferred

### Step 3: Domain NFT Export Process

**Automated Export Execution:**

1. Create permanent linking record
2. Transfer NFT from UBeU-managed account to user's account
3. Update account mappings to include personal wallet

**Technical NFT Transfer:**
- Domain NFT (`mike.jones.iam`) transferred from UBeU custodial account to Mike's personal wallet
- HTS token association completed for Mike's account
- Transfer logged to HCS audit trail with consensus timestamp
- UBeU platform maintains all other identity components (UBAuth token, DID, credentials)

### Step 4: Post-Export Identity State

**What Mike Now Controls:**
- **Domain NFT**: `mike.jones.iam` in his personal HashPack wallet
- **Private Keys**: Direct control over domain asset
- **Transfer Rights**: Can sell, trade, or transfer domain independently

**What Remains in UBeU Platform:**
- **UBAuth Token**: Still in UBeU-managed custodial account
- **DID Documents**: Still in original HCS topic
- **All Credentials**: Social verifications, received VCs remain accessible
- **Web2 Access**: Username/password login still works normally

**Automatic Wallet Linking:**
- Mike can now access UBeU from **either**:
  1. **Web2 credentials** (original username/password)
  2. **Personal Hedera wallet** (connects via WalletLinkingRecord)
- Both access methods lead to same identity and data

### Step 5: Mike's Dual Access Experience

**Connecting via Personal Hedera Wallet:**
- Mike connects HashPack wallet to UBeU platform
- System detects `mike.jones.iam` domain in his wallet
- Finds WalletLinkingRecord proving Mike authorized this export
- **Immediate authentication** - no verification challenges needed
- Full access to original UBeU profile and all identity data

**Connecting via Web2 Credentials:**
- Mike logs in with original username/password
- Full access to UBeU dashboard as before
- Domain portfolio shows `mike.jones.iam` as "Self-Custodied"
- All other functionality remains identical

## User Journey 6: Subsequent Domain Transfer - Breaking the Link

### Scenario: Mike Transfers Domain to a Seconde Wallet

**The Transfer Event:**
- Mike decides to transfer `mike.jones.iam` domain to a different wallet.
- Mike transfers NFT from his wallet (0.0.987654) to his second wallet (0.0.111222)
- Transfer happens entirely outside UBeU platform (direct Hedera transaction)

### Step 1: Automatic Link Breaking

**System Detection:**
- Mike connects his first wallet, and upon wallet connect UBeU associates his wallet with the wallet_linked account.
- Wallet scan provides a list of alternative domains to use as alias or prompts to create .iam domain.

- Mike connets his second wallet, holding `mike.jones.iam` system finds his second wallet is not associated with a UBeU profile.
- Mike is presented the option of "Creating a new UBeU Profile" or "Link to existing UBeU Profile"
- Mike chooses to link his second wallet to his existing UBeU profile and DID via account recovery methods.
- Mike chooses to reestablish `mike.jones.iam` as an alias and domain verification Service queries HTS to confirm his new account as the current owner
- A new **walletLinkingRecord** is added. 

### Step 2: Mike's Recovery Options

**Web2 Access Continuity:**
- Mike retains full UBeU access via original Web2 credentials
- Identity, credentials, and social verifications remain intact
- Domain alias and Hedera wallet access

**Linking New Domains:**
- If Mike acquires new domains, he can link them at no cost
- If Mike wants new `.iam` domain, costs $10/year additional
- Mike can export new domains to self-custody using same process

**Re-export Different Domains:**
- Mike could export other domains he owns (if any) to new wallets
- Each export creates new WalletLinkingRecord
- Multiple wallets can be linked simultaneously for redundancy

### Technical Architecture Summary

**Permanent vs. Conditional Relationships:**

**Permanent (Survives Domain Transfers):**
- Web2 credentials → UBeU identity
- UBAuth token → Hedera custodial account
- DID → HCS topic
- Received credentials → Identity

**Conditional (Broken by Domain Transfers):**
- Domain NFT ownership → Wallet access
- WalletLinkingRecord → External wallet authentication
- Domain alias → DID resolution

**Security Model:**
- **Domain ownership** provides wallet-based access but not identity ownership
- **Identity ownership** remains with original credential holder (Mike)
- **Transfer events** automatically invalidate wallet-based access
- **Web2 access** provides identity continuity regardless of domain transfers

This architecture ensures that Mike maintains permanent control over his identity while allowing flexible domain asset management, preventing unauthorized access when domains change hands, and maintaining clear separation between identity ownership and domain ownership.


## User Journey 7: Alice's Multi-Wallet Access Scenario

### Alice's Initial Setup

**Original Registration via MetaMask:**
- **Native wallet**: MetaMask with `alice.eth` (Ethereum address: 0xABC...123)
- **UBeU-managed account**: Custodial Hedera account (0.0.456789) created automatically
- **Domain portfolio**: `alice.eth` (external) + `alice.jones.iam` (primary)
- **UBAuth token**: In UBeU-managed custodial account, linking ETH wallet to identity
- **Account mapping**: ETH address 0xABC...123 → UBeU identity/DID/HCS topic

### Alice's Self-Custody Export

**Domain NFT Export Process:**
- Alice creates personal HashPack wallet (Hedera account: 0.0.999888)
- Exports `alice.jones.iam` NFT from UBeU custodial account to personal HashPack
- **WalletLinkingRecord created** linking:
  - Original user identity (tied to ETH address 0xABC...123)
  - Personal Hedera account (0.0.999888)
  - Exported domain (`alice.jones.iam`)
  - Authorization proof of legitimate export

### The Answer: YES - Alice Has Dual Access

**Alice can now access her UBeU profile from BOTH wallets:**

## Connection Method 1: MetaMask (Original Wallet)

**When Alice connects MetaMask:**
*MetaMask connection flow*
1. Check primary account mapping
2. Scan current wallet domains
3. Update domain portfolio (alice.eth still present)
4. Create authenticated session

**Alice's MetaMask Access:**
- **Immediate authentication** via original account mapping
- **Full UBeU profile access** with all identity data
- **Domain scan detects**: `alice.eth` still in MetaMask wallet
- **Domain portfolio shows**: 
  - `alice.eth` (active in MetaMask)
  - `alice.jones.iam` (marked as "Self-Custodied in HashPack")

## Connection Method 2: HashPack (Personal Hedera Wallet)

**When Alice connects HashPack:**
*HashPack connection flow*  
1. Check for direct Hedera account mapping (none exists)
2. Scan wallet for domains
3. Check for WalletLinkingRecord
4. Link points to original UBeU identity
5. Create authenticated session

**Alice's HashPack Access:**
- **Authentication via WalletLinkingRecord** (not direct mapping)
- **Full UBeU profile access** to same identity as MetaMask connection
- **Domain scan detects**: `alice.jones.iam` in personal wallet
- **Same dashboard** with all credentials, DIDs, and identity data

### Technical Implementation: Unified Session Management

**Backend Session Architecture:**
```javascript
class SessionManager {
    async createUnifiedSession(userIdentity, walletType, walletAddress) {
        const session = {
            userId: userIdentity.id,
            primaryDID: userIdentity.primaryDID,
            hcsTopicId: userIdentity.hcsTopicId,
            accessMethod: walletType, // "ethereum_wallet" | "hedera_wallet"
            connectedWallet: walletAddress,
            activeAliases: await getActiveAliases(userIdentity.id),
            sessionToken: generateJWT(userIdentity.id)
        };
        
        // Same session regardless of wallet used
        return session;
    }
}
```

### Alice's Unified Dashboard Experience

**Identical Interface from Both Wallets:**
- **Same DIDs**: Personal and professional DIDs within single HCS topic
- **Same credentials**: All received VCs and social verifications
- **Same identity data**: Profile, reputation, settings
- **Domain portfolio visibility**: Shows domains across both wallets

**Dynamic Domain Portfolio Display:**
```javascript
// Dashboard domain portfolio
{
    externalDomains: [
        {
            domain: "alice.eth",
            location: "MetaMask (0xABC...123)",
            status: "active",
            lastVerified: "2025-01-15T10:30:00Z"
        }
    ],
    iamDomains: [
        {
            domain: "alice.jones.iam", 
            location: "HashPack (0.0.999888)",
            status: "self-custodied",
            exported: true,
            lastVerified: "2025-01-15T10:30:00Z"
        }
    ]
}
```

### Cross-Wallet Functionality

**Credential Reception:**
- Credentials sent to `alice.eth` → received regardless of connection method
- Credentials sent to `alice.jones.iam` → received regardless of connection method
- **Same DID resolution** for both aliases pointing to unified identity

**Social Verifications:**
- Verification badges appear in profile regardless of connection wallet
- Social links remain consistent across wallet connections
- **Identity continuity** maintained across all access methods

### Security and Validation

**Legitimate Multi-Wallet Access:**
- **MetaMask access**: Validated by original wallet control (strongest proof)
- **HashPack access**: Validated by WalletLinkingRecord + domain ownership
- **Both methods**: Lead to same identity with same permissions
- **Audit trail**: All access logged with wallet addresses and timestamps

**Fraud Prevention:**
- **WalletLinkingRecord verification**: Ensures HashPack access is authorized export
- **Domain ownership validation**: Confirms current ownership of linked domain
- **Session isolation**: Each wallet connection creates separate session tokens
- **Access logging**: All activities attributed to specific wallet used

### Benefits of Dual Access

**User Flexibility:**
- **Context switching**: Use MetaMask for Ethereum DeFi, HashPack for Hedera native features
- **Backup access**: If one wallet is compromised/lost, other wallet maintains access
- **Cross-chain operations**: Seamless interaction across Ethereum and Hedera ecosystems
- **Progressive decentralization**: Users can gradually move to self-custody

**Enhanced Security:**
- **Multiple access paths** prevent single point of failure
- **Wallet diversity** reduces risk concentration
- **Domain distribution** across wallets provides asset protection
- **Identity resilience** survives individual wallet compromise

This architecture demonstrates UBeU's sophisticated handling of multi-wallet scenarios while maintaining identity coherence and security. Alice enjoys the best of both worlds: familiar Ethereum ecosystem access AND direct Hedera native capabilities, all while maintaining unified identity management.


## User Journey 8: Web3 User Workplace Access - Two Pathways to Web2 Credentials

### Scenario: David's Workplace Challenge

**David's Situation:**
- Registered with MetaMask using `david.eth` domain  
- Works at a company with strict security policies blocking wallet extensions
- Needs to access UBeU credentials/dashboard from work computer
- Wants Web2 username/password login capability

## Option 1: Create Web2 Credentials from Active Web3 Session ✅ **Preferred Method**

### Step 1: Dashboard Web2 Credential Creation
**From David's Personal Device (Wallet Access Available):**
- David connects MetaMask to UBeU dashboard as normal
- Navigates to **"Account Settings" → "Access Methods"**
- Selects **"Create Workplace Access Credentials"**
- System offers backup credential generation

**Credential Generation Process:**
1. Validate active Web3 session
2. Generate backup credentials
3. Hash and store credentials
4. Present credentials to user

**User Experience:**
- **Immediate setup**: David creates credentials while authenticated via wallet
- **Secure display**: Credentials shown once with download/print options  
- **Clear instructions**: "Use these for workplace access when wallet unavailable"
- **Password options**: User can set custom password or use generated one

### Step 2: Workplace Authentication
**From David's Work Computer (No Wallet Access):**
- David visits UBeU login page
- Selects **"Username/Password Login"** option
- Enters backup credentials created from wallet session
- **Immediate access** to full UBeU profile and credentials

## Option 2: Account Recovery Method to Create Web2 Credentials ✅ **Alternative Method**

### Step 1: Recovery-Based Credential Creation
**When David Didn't Create Backup Credentials Initially:**
- David accesses UBeU platform from work computer (no wallet available)
- Clicks **"Can't Access Wallet? Recover Account"**
- System presents recovery options since no backup credentials exist

**Available Recovery Methods:**
1. **Exported Private Key** (if downloaded during registration)
2. **24-Word Recovery Phrase** (if generated during registration)  
3. **Previously Linked Wallet** (if additional wallets were connected)

### Step 2: Identity Verification via Recovery
**Using Recovery Phrase Example:**

*Recovery-based credential creation*
1. Verify recovery method
2. Create temporary authenticated session
3. Offer credential creation

**Recovery Workflow:**
- David enters 24-word recovery phrase (or uses private key)
- System verifies phrase against stored hash
- **Temporary session created** for account management
- David prompted: **"Create Web2 credentials for easier future access?"**
- System generates username/password for ongoing workplace use

### Step 3: Credential Setup and Storage
**Post-Recovery Credential Creation:**
- Same generation process as Option 1
- Credentials linked to verified identity
- David can now use either wallet OR username/password for future access

## Technical Implementation: Unified Backend

**Account Mapping Enhancement:**
```javascript
// Enhanced account mapping structure
{
    nativeAccountId: "0xABC...123", // David's ETH wallet
    hederaAccountId: "0.0.456789",
    didIds: ["did:hedera:mainnet:..."],
    domains: ["david.eth", "david.smith.iam"],
    
    // Multiple access methods
    authMethods: {
        wallet: {
            address: "0xABC...123",
            isActive: true
        },
        backupCredentials: {
            usernameHash: "hashed_username",
            passwordHash: "hashed_password", 
            createdAt: "2025-01-15T10:30:00Z",
            createdVia: "wallet_session" // or "recovery_method"
        },
        recoveryPhrase: {
            phraseHash: "hashed_phrase",
            isActive: true
        }
    }
}
```

## When to Use Each Method

### Option 1 (Wallet Session Creation) - **Best Practice:**
**Ideal When:**
- User has current wallet access
- Planning ahead for workplace restrictions
- Wants seamless setup process
- Security-conscious about pre-planning access methods

**Advantages:**
- **Immediate setup** from authenticated session
- **No recovery verification** needed
- **Clear provenance** - credentials created by verified wallet owner
- **Proactive approach** prevents future access issues

### Option 2 (Recovery-Based Creation) - **Fallback Method:**
**Ideal When:**
- User didn't create backup credentials initially
- Already facing wallet access restrictions
- Has recovery methods available (phrase, private key)
- Needs retroactive credential creation

**Advantages:**
- **Available anytime** user has recovery materials
- **No wallet access required** for setup
- **Flexible timing** - create credentials when needed
- **Recovery doubles as setup** - solves immediate access + future access

## Security Considerations

**Authentication Strength:**
- **Wallet creation**: Strongest (cryptographic proof of ownership)
- **Recovery creation**: Strong (verified recovery material required)
- **Both methods**: Result in equally secure Web2 credentials

**Audit Trails:**
```javascript
// Creation method logged
{
    event: "backup_credentials_created",
    userId: "david_identity_id",
    creationMethod: "wallet_session" | "recovery_verification",
    timestamp: "2025-01-15T10:30:00Z",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0..."
}
```

## User Experience Benefits

**Workplace Flexibility:**
- **No wallet dependencies** for daily work access
- **Standard login flow** familiar to enterprise users
- **Same identity data** regardless of authentication method
- **Seamless credential viewing** for work-related verifications

**Enterprise Compliance:**
- **No browser extensions** required at workplace
- **Standard username/password** meets IT security policies
- **Session management** supports enterprise SSO integration
- **Audit logging** satisfies compliance requirements

Both methods result in identical functionality - David gains workplace-friendly Web2 access to his UBeU identity while maintaining full wallet-based access from personal devices. The choice between methods depends on whether David plans ahead (Option 1) or needs retroactive access (Option 2).

## User Journey 9: Enterprise Credential Issuer Registration Workflow (See Appendix)
*AWS as a use case*

### Phase 1: AWS Corporate Registration

#### Step 1: Initial .iss Domain Registration Request

**AWS Corporate Identity Team Initiates Registration:**
- AWS accesses UBeU enterprise registration portal
- Submits registration request for primary domain: `aws.iss`
- Provides corporate contact information and payment method
- Selects enterprise tier: **Professional ($x/month)** or **Enterprise (custom pricing)**

**Required Information:**
```javascript
{
    requestedDomain: "aws.iss",
    organizationName: "Amazon Web Services",
    corporateEmail: "identity@amazon.com",
    techContact: "identity-tech@amazon.com",
    billingContact: "ap-digital-identity@amazon.com",
    enterpriseTier: "enterprise",
    estimatedCredentialVolume: "50000/month",
    integrationType: "api_only",
    setupFee: 2500 // Based on organization size
}
```

#### Step 2: DNS Ownership Verification

**Domain Verification Process:**
- UBeU Domain Verification Service generates DNS TXT record challenge
- AWS receives DNS verification instructions:
  ```
  Add TXT record to aws.com DNS:
  _ubeu-verification.aws.com TXT "ubeu-verify-aws-iss-2025-01-15-abc123def456"
  ```
- AWS IT team adds TXT record to Route 53 DNS configuration
- UBeU Verification Service queries AWS DNS to confirm record existence
- Verification typically completes within 24 hours

**Technical Verification:**
```javascript
async function verifyDnsOwnership(domain, verificationCode) {
    // 1. Generate DNS challenge
    const txtRecord = `_ubeu-verification.${domain.replace('.iss', '.com')}`;
    const expectedValue = `ubeu-verify-${domain}-${timestamp}-${nonce}`;
    
    // 2. Query DNS via Verification Service
    const dnsResult = await verificationService.queryDNS(txtRecord, 'TXT');
    
    // 3. Validate verification code
    return dnsResult.includes(expectedValue);
}
```

#### Step 3: Enterprise Payment Method Selection

Based on my analysis of UBeU's architecture and enterprise payment requirements, here are the optimal payment rails for zero-friction enterprise onboarding:

## Enterprise Payment Rails Strategy

### **Current Individual User Setup (Reference)**
- **Web2 Users**: Alchemy Pay (credit cards, bank transfers)
- **Web3 Users**: NOWPayments (crypto payments)
- **Cost**: $20/year individual registration

### **Enterprise Payment Requirements Analysis**

**Enterprise Payment Characteristics:**
- Higher transaction values ($1,000-$50,000+ setup fees)
- Monthly/annual recurring billing
- Complex approval workflows
- Regulatory compliance requirements
- Need for detailed invoicing and reporting
- Multiple stakeholder authorization
- Purchase order integration

## **Recommended Enterprise Payment Rail Strategy**

### **Tier 1: Traditional Enterprise Rails (Primary)**

**1. ACH/Wire Transfers**
```javascript
// Enterprise payment structure for traditional rails
const enterprisePaymentMethods = {
  achTransfer: {
    setupFee: 2500, // $2,500
    monthlyFee: 1000, // $1,000
    processingTime: "2-3 business days",
    compliance: "SOX, GDPR compliant",
    invoicing: "NET-30 terms available"
  },
  wireTransfer: {
    sameDay: true,
    international: true,
    feeStructure: "0.1% + $25 fixed",
    compliance: "Full AML/KYC"
  }
}
```

**2. Enterprise Credit Cards**
- Corporate Amex, Visa Commercial Cards
- Higher limits ($100K+)
- Automatic monthly billing
- Integration with expense management systems (Concur, Expensify)

**3. Enterprise Invoicing Systems**
```javascript
// Integration with enterprise procurement
const procurementIntegration = {
  purchaseOrders: true,
  sapIntegration: true,
  oracleFinancialsIntegration: true,
  approvalWorkflows: true,
  budgetCodeTracking: true
}
```

### **Tier 2: Modern FinTech Rails (Secondary)**

**1. Stripe Climate/Treasury**
- Enterprise-focused product suite
- Automated billing and subscription management
- Strong compliance and reporting
- Global payment processing

**2. Adyen Enterprise**
- Global payment processor
- Strong in regulated industries
- Multi-currency support
- Enterprise reporting dashboards

**3. Banking-as-a-Service Partners**
```javascript
const bankingPartners = {
  jpMorganChase: {
    corporatePayments: true,
    treasuryServices: true,
    globalReach: true
  },
  wellsFargo: {
    commercialCards: true,
    achProcessing: true,
    wireServices: true
  }
}
```

### **Tier 3: Crypto Rails (Specialized)**

**Enterprise Crypto Payment Providers:**

**1. Circle Business Account**
- USDC-native transactions
- Enterprise KYC/AML compliance
- Same-day settlement
- Regulatory clarity for institutions

**2. Coinbase Prime**
- Institutional-grade security
- Corporate treasury management
- Compliance reporting
- Multi-signature controls

**3. Fireblocks**
- Enterprise crypto infrastructure
- MPC wallet technology
- Compliance and reporting tools
- Integration with traditional banking

## **Zero-Friction Enterprise Onboarding Architecture**

### **Payment Method Selection Matrix**

```javascript
class EnterprisePaymentRouter {
  selectPaymentMethod(enterprise) {
    const methods = [];
    
    // Traditional enterprises (Fortune 500)
    if (enterprise.type === 'traditional') {
      methods.push('ach_transfer', 'corporate_card', 'wire_transfer');
    }
    
    // Tech companies
    if (enterprise.sector === 'technology') {
      methods.push('stripe_enterprise', 'corporate_card', 'ach_transfer');
    }
    
    // Crypto-native enterprises
    if (enterprise.cryptoCapable === true) {
      methods.push('circle_business', 'coinbase_prime', 'corporate_card');
    }
    
    return methods;
  }
}
```

### **Multi-Rail Payment Processing**

```javascript
class EnterprisePaymentService {
  async processEnterprisePayment(paymentRequest) {
    const {
      amount,
      enterprise,
      preferredMethod,
      setupFee,
      recurringBilling
    } = paymentRequest;
    
    // Route to appropriate payment rail
    switch (preferredMethod) {
      case 'ach_transfer':
        return await this.processACHTransfer(paymentRequest);
      
      case 'corporate_card':
        return await this.processCorporateCard(paymentRequest);
      
      case 'wire_transfer':
        return await this.processWireTransfer(paymentRequest);
      
      case 'circle_usdc':
        return await this.processCircleUSDC(paymentRequest);
      
      default:
        return await this.processDefaultMethod(paymentRequest);
    }
  }
  
  // Handle enterprise-specific billing
  async setupRecurringBilling(enterprise) {
    return {
      setupFee: await this.calculateSetupFee(enterprise),
      monthlyBilling: await this.setupMonthlyACH(enterprise),
      invoiceGeneration: await this.setupInvoicing(enterprise),
      complianceReporting: await this.enableCompliance(enterprise)
    };
  }
}
```

### **Enterprise Onboarding Flow**

**Phase 1: Payment Method Selection**
```javascript
// Present enterprise-appropriate options during registration
const registrationFlow = {
  step1: "Enterprise verification (DNS + legal entity)",
  step2: "Payment method selection (ACH/Wire/Corporate Card preferred)",
  step3: "Setup fee processing ($2,500)",
  step4: "Recurring billing setup",
  step5: "Instant credential issuer activation"
};
```

**Phase 2: Automated Recurring Billing**
- Monthly subscription billing via ACH
- Automatic usage-based overages
- Detailed enterprise invoicing
- Tax compliance documentation

## **Implementation Priority**

### **Phase 1 (Immediate)**
1. **ACH Transfer Integration** - Partner with modern ACH provider (Dwolla, Plaid)
2. **Corporate Card Processing** - Upgrade Alchemy Pay for enterprise cards
3. **Enterprise Invoicing** - Build NET-30 terms capability

### **Phase 2 (3-6 months)**
1. **Wire Transfer Support** - Traditional banking partnerships
2. **Purchase Order System** - Enterprise procurement integration
3. **Circle Business Integration** - For crypto-capable enterprises

### **Phase 3 (6-12 months)**
1. **ERP Integration** - SAP, Oracle Financials connectors
2. **Treasury Management** - Multi-currency, hedging capabilities
3. **Compliance Automation** - SOX, regulatory reporting

## **Zero-Friction Benefits**

**For Traditional Enterprises:**
- Familiar payment methods (ACH, wire, corporate cards)
- Standard invoicing and approval workflows
- Regulatory compliance built-in
- No cryptocurrency learning curve

**For Tech Companies:**
- Modern payment rails (Stripe, Adyen)
- API-first integration
- Automated billing and reporting
- Scalable pricing models

**For Crypto-Native Enterprises:**
- USDC-native transactions
- Instant settlement
- On-chain transparency
- Reduced traditional banking friction

This multi-rail approach ensures that UBeU can serve enterprises across the spectrum while maintaining the zero-friction onboarding experience that's critical for enterprise adoption.

#### Step 4: AWS Corporate Identity Creation

**Hedera Infrastructure Setup:**
- UBeU creates enterprise Hedera account for AWS
- Mints `aws.iss` domain NFT to AWS's enterprise account
- Creates corporate DID: `did:hedera:mainnet:{encodeBase58(awsAccountId)}_0.0.{hcsTopicId}`
- Issues "DNS Verified Enterprise" credential to AWS's DID
- Creates enterprise UBAuth token linking AWS corporate identity

**Payment Processing:**
- **Setup Fee**: $2,500 (enterprise tier)
- **Monthly Subscription**: Custom pricing based on volume
- **Payment Methods**: Corporate credit card, ACH transfer, or crypto via NOWPayments
- **Billing**: Automated monthly billing with usage-based overages

### Phase 2: Enterprise Dashboard and API Access

#### Step 5: AWS Enterprise Dashboard Access

**Dashboard Features for AWS:**
- **Organization Management**: Create and manage subdomain divisions
- **API Credentials**: Generate and manage API keys for different teams
- **Usage Analytics**: Monitor credential issuance volume and costs
- **Network Spend Tracking**: View Hedera fees within enterprise allowance
- **Batch Operations**: Bulk credential issuance and management tools

**API Key Generation:**
```javascript
// Enterprise API key structure
{
    keyId: "aws_training_api_key_001",
    subdomain: "training.aws.iss",
    permissions: ["issue_credentials", "revoke_credentials", "query_recipients"],
    monthlyLimit: 10000,
    rateLimiting: "1000_per_hour",
    created: "2025-01-15T10:30:00Z",
    teamContact: "aws-training-team@amazon.com"
}
```

#### Step 6: Subdomain Creation for Business Units

**AWS Creates Multiple Organizational Subdomains:**

**Training Division:**
- **Subdomain**: `training.aws.iss`
- **Purpose**: Issue training certificates and completion credentials
- **API Limits**: 10,000 credentials/month
- **Team Contact**: AWS Training and Certification team

**Employee Services:**
- **Subdomain**: `employees.aws.iss`  
- **Purpose**: Issue employee credentials, access badges, role certifications
- **API Limits**: 25,000 credentials/month
- **Team Contact**: AWS HR and Employee Services

**Partner Program:**
- **Subdomain**: `partners.aws.iss`
- **Purpose**: Issue partner certifications and tier status credentials
- **API Limits**: 5,000 credentials/month
- **Team Contact**: AWS Partner Network team

**Compliance Division:**
- **Subdomain**: `compliance.aws.iss`
- **Purpose**: Issue security clearances and compliance certifications
- **API Limits**: 2,000 credentials/month
- **Team Contact**: AWS Security and Compliance team

### Phase 3: Internal Team Integration

#### Step 7: Team-Specific API Integration

**AWS Training Team Integration:**
```javascript
// Training team credential issuance
const awsTrainingAPI = new UBeUAPI({
    apiKey: "aws_training_api_key_001",
    issuerDomain: "training.aws.iss",
    baseUrl: "https://api.ubeu.io/v1"
});

// Issue AWS Solutions Architect certification
async function issueArchitectCertification(recipientDomain, certificationData) {
    const credential = {
        issuer: "training.aws.iss",
        recipient: recipientDomain, // e.g., "john.smith.iam" or "john.eth"
        credentialType: "AWS_Solutions_Architect_Professional",
        issuanceDate: new Date().toISOString(),
        expirationDate: new Date(Date.now() + (3 * 365 * 24 * 60 * 60 * 1000)), // 3 years
        credentialData: {
            certificationId: certificationData.id,
            examScore: certificationData.score,
            specializations: certificationData.specializations,
            validRegions: ["global"]
        },
        metadata: {
            issuerLogo: "https://aws.amazon.com/training/logo.png",
            certificationLevel: "professional",
            creditsEarned: 50
        }
    };
    
    return await awsTrainingAPI.issueCredential(credential);
}
```

**Employee Services Integration:**
```javascript
// Employee services for internal AWS staff
const awsEmployeeAPI = new UBeUAPI({
    apiKey: "aws_employees_api_key_002", 
    issuerDomain: "employees.aws.iss",
    baseUrl: "https://api.ubeu.io/v1"
});

// Issue employee role credential
async function issueEmployeeRole(employeeId, roleData) {
    const credential = {
        issuer: "employees.aws.iss",
        recipient: `employee.${employeeId}.aws.iss`, // Internal employee subdomain
        credentialType: "AWS_Employee_Role",
        credentialData: {
            employeeId: roleData.employeeId,
            role: roleData.title,
            department: roleData.department,
            clearanceLevel: roleData.securityClearance,
            startDate: roleData.hireDate,
            manager: roleData.managerId
        },
        permissions: {
            internalAccess: roleData.accessLevels,
            awsServices: roleData.servicePermissions
        }
    };
    
    return await awsEmployeeAPI.issueCredential(credential);
}
```

#### Step 8: Cross-Organizational Coordination

**Enterprise Coordination Dashboard:**
- **Central Monitoring**: AWS corporate dashboard shows all subdomain activity
- **Budget Management**: Track network spend across all business units
- **Compliance Oversight**: Monitor credential issuance for audit purposes
- **API Key Management**: Corporate admin can create, revoke, or modify team API access

**Inter-Team Workflows:**
```javascript
// AWS Partner team issuing credentials to training graduates
async function issuePartnerTierCredential(trainingCredentialId, partnerTierData) {
    // 1. Verify training credential was issued by training.aws.iss
    const verification = await awsPartnerAPI.verifyCredential(trainingCredentialId);
    
    if (verification.issuer === "training.aws.iss" && verification.valid) {
        // 2. Issue partner tier credential
        const partnerCredential = {
            issuer: "partners.aws.iss", 
            recipient: verification.recipient,
            credentialType: "AWS_Partner_Tier",
            basedOnCredential: trainingCredentialId, // Reference to prerequisite
            credentialData: partnerTierData
        };
        
        return await awsPartnerAPI.issueCredential(partnerCredential);
    }
}
```

### Phase 4: Advanced Enterprise Features

#### Step 9: Batch Credential Operations

**AWS Training Batch Issuance:**
```javascript
// Batch issue certificates for training cohort
async function issueBatchCertifications(cohortData) {
    const batch = cohortData.graduates.map(graduate => ({
        issuer: "training.aws.iss",
        recipient: graduate.domain,
        credentialType: "AWS_Training_Completion",
        credentialData: {
            courseId: cohortData.courseId,
            completionDate: cohortData.completionDate,
            grade: graduate.finalGrade
        }
    }));
    
    // Batch API call - more efficient than individual calls
    return await awsTrainingAPI.issueBatchCredentials(batch);
}
```

#### Step 10: Enterprise Analytics and Reporting

**AWS Corporate Reporting:**
- **Credential Volume**: Track monthly issuance across all subdomains
- **Recipient Analytics**: Monitor which domains receive AWS credentials
- **Network Costs**: Track Hedera fees and allowance usage
- **Compliance Reports**: Generate audit trails for enterprise security reviews

**Sample Analytics Query:**
```javascript
// Generate AWS monthly credential report
async function generateMonthlyReport(month, year) {
    const report = await awsEnterpriseAPI.getAnalytics({
        timeframe: { month, year },
        breakdown: "by_subdomain",
        metrics: ["credentials_issued", "network_spend", "unique_recipients"],
        subdomains: ["training.aws.iss", "employees.aws.iss", "partners.aws.iss", "compliance.aws.iss"]
    });
    
    return {
        totalCredentials: report.totals.credentials_issued,
        networkSpend: report.totals.network_spend_usd,
        topRecipientDomains: report.top_recipients,
        subdomainBreakdown: report.by_subdomain
    };
}
```

### Phase 5: External Integration and Ecosystem

#### Step 11: AWS Ecosystem Integration

**Integration with AWS Services:**
- **AWS IAM Integration**: Map UBeU credentials to AWS IAM roles
- **AWS SSO Integration**: Use UBeU credentials for workforce authentication
- **AWS Marketplace**: Accept UBeU credentials for partner verification
- **AWS Academy**: Issue student credentials via `academy.aws.iss`

**Customer-Facing Credential Programs:**
- **AWS Customer Credentials**: Issue customer achievement badges
- **Solution Provider Credentials**: Verify third-party AWS expertise
- **Compliance Certifications**: Issue security and compliance credentials to customers

This comprehensive workflow enables AWS to leverage UBeU as enterprise identity infrastructure while maintaining granular control over different organizational units, ensuring secure and auditable credential issuance across their entire ecosystem.

## User Journey 10: AWS Academy - UBeU as Universal Platform for Mixed Audiences

### The Academy Scenario: Mixed Attendee Base

**AWS Academy Training Program:**
- **Web3 Users**: Some attendees have existing UBeU profiles (e.g., `alice.eth`, `john.crypto`)
- **Web2 Users**: Other attendees have no blockchain experience or UBeU profiles
- **AWS Goal**: Issue certifications to ALL attendees using a single, unified system

### UBeU's Universal Solution Architecture

#### For Web3 Users (Existing UBeU Profiles)

**Direct Credential Issuance:**
```javascript
// AWS can issue directly to existing UBeU users
const credential = {
    issuer: "academy.aws.iss",
    recipient: "alice.eth", // Resolves to Alice's existing DID
    credentialType: "AWS_Solutions_Architect_Foundation",
    credentialData: {
        courseId: "SAA-C03-Foundation",
        completionDate: "2025-01-15",
        score: 95,
        instructorId: "aws-instructor-001"
    }
};

await awsAcademyAPI.issueCredential(credential);
```

**Seamless Reception:**
- Credential appears in Alice's UBeU dashboard immediately
- Alice can accept/assign to appropriate DID (personal vs. professional)
- Full verifiable credential functionality available instantly

#### For Web2 Users (No UBeU Profiles)

**Import Code Generation:**
AWS generates unique import codes for Web2 attendees who don't have UBeU profiles:

```javascript
// AWS generates import codes for non-UBeU users
const importCode = await awsAcademyAPI.generateCredentialImportCode({
    recipientEmail: "bob.johnson@email.com",
    recipientName: "Bob Johnson",
    credential: {
        issuer: "academy.aws.iss",
        credentialType: "AWS_Solutions_Architect_Foundation",
        credentialData: {
            courseId: "SAA-C03-Foundation",
            completionDate: "2025-01-15",
            score: 88
        }
    }
});

// Returns: { importCode: "AWS-CERT-2025-ABC123", qrCode: "data:image/png...", expires: "2025-01-22" }
```

### Universal Distribution Strategy

#### AWS Academy Implementation

**Single API Workflow for All Attendees:**
```javascript
// AWS processes entire class roster with single API call
async function issueCertificationsToClass(classRoster) {
    const results = [];
    
    for (const student of classRoster) {
        try {
            if (student.ubeUDomain) {
                // Direct issuance for Web3 users
                const result = await awsAcademyAPI.issueCredential({
                    recipient: student.ubeUDomain,
                    credentialData: student.certificationData
                });
                results.push({ student: student.email, method: "direct", success: true });
            } else {
                // Import code generation for Web2 users
                const importCode = await awsAcademyAPI.generateCredentialImportCode({
                    recipientEmail: student.email,
                    recipientName: student.name,
                    credentialData: student.certificationData
                });
                results.push({ student: student.email, method: "import_code", importCode: importCode.code });
            }
        } catch (error) {
            results.push({ student: student.email, success: false, error: error.message });
        }
    }
    
    return results;
}
```

#### Student Communication

**Unified Email Template:**
AWS sends the same email format to all students, but with different redemption instructions:

**For Web3 Users:**
```
Subject: Your AWS Certification is Ready!

Your AWS Solutions Architect Foundation certification has been issued to your UBeU profile.

✅ View in UBeU Dashboard: https://app.ubeu.io
✅ Your Domain: alice.eth
✅ Credential Type: AWS Solutions Architect Foundation

The credential is immediately available in your UBeU dashboard.
```

**For Web2 Users:**
```
Subject: Your AWS Certification is Ready!

Your AWS Solutions Architect Foundation certification is waiting for you.

🎟️ Import Code: AWS-CERT-2025-ABC123
🔗 Claim Here: https://app.ubeu.io/import/AWS-CERT-2025-ABC123
📱 QR Code: [QR Code Image]

This will create your digital identity and add your certification.
```

### Web2 User Onboarding Via Import Portal

#### Step 1: Import Code Redemption

**Bob's Experience (Web2 User):**
- Bob clicks import link: `https://app.ubeu.io/import/AWS-CERT-2025-ABC123`
- UBeU validates import code and displays credential preview
- Bob sees: "AWS Solutions Architect Foundation Certificate from academy.aws.iss"

#### Step 2: Account Creation Options

**UBeU Presents Choice:**
```javascript
// Import portal offers options
{
    credentialPreview: {
        issuer: "academy.aws.iss",
        type: "AWS Solutions Architect Foundation",
        recipientName: "Bob Johnson"
    },
    onboardingOptions: [
        {
            type: "web2_registration",
            title: "Create UBeU Account",
            description: "Quick username/password setup",
            estimatedTime: "2 minutes"
        },
        {
            type: "wallet_connection", 
            title: "Connect Existing Wallet",
            description: "Use MetaMask, HashPack, or other wallet",
            estimatedTime: "1 minute"
        }
    ]
}
```

#### Step 3: Seamless Registration

**Bob Chooses Web2 Registration:**
```javascript
// Simple form
{
    preferredDomain: "bob.johnson.iam",
    username: "bob.johnson.2025",
    password: "••••••••••••",
    email: "bob.johnson@email.com" // Pre-filled from import code
}
```

**Behind the Scenes:**
- UBeU creates Bob's Hedera account and DID
- Issues UBAuth token and `bob.johnson.iam` domain NFT
- **Automatically imports the AWS credential** to Bob's new profile
- Creates session and directs Bob to dashboard

#### Step 4: Instant Credential Access

**Bob's New Dashboard:**
- **Profile**: `bob.johnson.iam` 
- **Credentials**: AWS Solutions Architect Foundation (immediately available)
- **Verification Link**: Shareable proof of certification
- **Future Ready**: Can receive more credentials from any issuer

### Technical Implementation: Universal Backend

#### Import Code System
```javascript
// Backend handles both scenarios transparently
class CredentialImportService {
    async processImportCode(importCode, userContext) {
        const pendingCredential = await this.validateImportCode(importCode);
        
        if (userContext.existingUBeUProfile) {
            // Direct import for existing users
            return await this.importToExistingProfile(pendingCredential, userContext.profile);
        } else {
            // Trigger onboarding flow for new users
            return await this.initiateOnboardingWithCredential(pendingCredential);
        }
    }
}
```

#### Universal API Response
```javascript
// Single API handles both user types
{
    "success": true,
    "credentials_issued": 25,
    "delivery_methods": {
        "direct_to_profile": 15,    // Web3 users with UBeU profiles
        "import_codes_generated": 10 // Web2 users without profiles
    },
    "import_codes": [
        {
            "recipient_email": "bob.johnson@email.com",
            "import_code": "AWS-CERT-2025-ABC123",
            "expires": "2025-01-22T10:30:00Z",
            "qr_code_url": "https://app.ubeu.io/qr/AWS-CERT-2025-ABC123"
        }
    ]
}
```

### Benefits for AWS Academy

#### Operational Simplicity
- **Single Integration**: One API handles all students regardless of tech background
- **Unified Analytics**: All certifications tracked in same system
- **Consistent Branding**: All credentials issued from `academy.aws.iss`
- **Standard Verification**: All credentials verifiable through same W3C-compliant system

#### Student Experience Benefits
- **No Discrimination**: Web2 and Web3 users get equal access to credentials
- **Growth Path**: Web2 users naturally onboard to Web3 identity ecosystem
- **Future Compatibility**: All students can receive credentials from other issuers
- **Professional Development**: Credentials work across entire UBeU ecosystem

#### Long-term Ecosystem Value
- **Network Effects**: Web2 users onboarded via import codes become available for other credential issuers
- **Reduced Friction**: AWS eliminates need to evaluate student technical capabilities
- **Universal Standards**: All credentials follow same W3C DID/VC standards regardless of user type
- **Cross-Platform Mobility**: Students can use credentials across any UBeU-compatible platform

This architecture allows AWS Academy to operate as if all students are on the same platform, while UBeU handles the complexity of bridging Web2 and Web3 user experiences seamlessly.

## User Journey 11: UBeU Enterprise System Integration Architecture

### Current Implementation Status

**✅ Architectured/Designed:**
- RESTful API framework with OAuth 2.0 and SAML 2.0 support
- Webhook infrastructure with retry logic and signature verification
- Multi-tier authentication (User, Application, Enterprise levels)
- SDK strategy for JavaScript/TypeScript, Python, and Go

## Identity and Access Management (IAM) Integration

### Single Sign-On (SSO) Integration

**SAML 2.0 Integration:**


### Directory Services Integration

**LDAP/Active Directory Integration:**

## Human Resources (HR) System Integration

### Employee Lifecycle Management

**Automated Employee Onboarding:**

**SCIM User Provisioning (Planned):**

## Enterprise Resource Planning (ERP) Integration

### SAP Integration Example

**SAP SuccessFactors Integration:**

**Oracle HCM Integration:**

## Learning Management System (LMS) Integration

### Enterprise Training Platform Integration

**Cornerstone OnDemand Integration:**

## Customer Relationship Management (CRM) Integration

### Salesforce Integration

**Salesforce Identity Integration:**

## Enterprise API Integration Patterns

### Batch Operations for Enterprise Scale

**Bulk Credential Issuance:**

### Enterprise Analytics and Reporting

**Integration Monitoring Dashboard:**

## Security and Compliance Integration

### Enterprise Security Framework

**Security Information and Event Management (SIEM) Integration:**

This integration architecture enables UBeU to seamlessly connect with existing enterprise infrastructure while maintaining its decentralized identity principles and providing familiar integration patterns for enterprise IT teams.

Based on my analysis of the UBeU project knowledge, here's how UBeU functions as a credential issuer utilizing the @hiero-did-sdk:

## User Journey 11: UBeU as Universal Credential Issuer

## UBeU's Credential Schemas

### Core Platform Schemas

UBeU would create and manage several foundational schemas for its platform operations:

**1. Domain Ownership Verification Schema:**
```javascript
// UBeU creates this schema for external domain verification
const domainOwnershipSchema = {
    name: "UBeU_Domain_Ownership_Verification",
    version: "1.0",
    issuer: "did:hedera:mainnet:ubeu_platform_did",
    attributes: [
        "domain_name",           // e.g., "alice.eth"
        "domain_type",          // e.g., "external", "iam", "iss"
        "blockchain_network",   // e.g., "ethereum", "solana", "polygon"
        "registry_contract",    // e.g., ENS registry address
        "verification_method",  // e.g., "ecdsa_signature", "dns_txt"
        "verification_timestamp",
        "verification_hash",    // Cryptographic proof
        "expiration_date",      // When verification expires
        "ubeu_account_binding"  // Link to UBAuth token
    ]
};
```

**2. DNS Verification Schema:**
```javascript
// UBeU creates this schema for .iss domain DNS verification
const dnsVerificationSchema = {
    name: "UBeU_DNS_Verification",
    version: "1.0", 
    issuer: "did:hedera:mainnet:ubeu_platform_did",
    attributes: [
        "domain_name",          // e.g., "aws.iss"
        "parent_domain",        // e.g., "amazon.com"
        "txt_record_content",   // DNS TXT record value
        "txt_record_name",      // e.g., "_ubeu-verification"
        "dns_server_queried",   // Which DNS server confirmed
        "verification_timestamp",
        "verification_method",  // "dns_txt_record"
        "enterprise_contact",   // Verified contact information
        "compliance_level"      // Enterprise verification tier
    ]
};
```

**3. UBeU Verified (UV) Badge Schema:**
```javascript
// Social media verification credentials
const uvBadgeSchema = {
    name: "UBeU_Verified_Badge",
    version: "1.0",
    issuer: "did:hedera:mainnet:ubeu_platform_did", 
    attributes: [
        "platform_name",        // e.g., "twitter", "linkedin"
        "platform_handle",      // e.g., "@alice_crypto"
        "platform_user_id",     // Platform's internal user ID
        "verification_code",    // PRNG-generated code used
        "verification_method",  // e.g., "direct_message", "profile_bio"
        "verification_timestamp",
        "did_identifier",       // Which DID this verifies
        "badge_level",         // "basic", "premium", "enterprise"
        "platform_follower_count", // Reputation signal
        "account_age_days"     // Account maturity signal
    ]
};
```

## Backend Credential Issuer Implementation

### UBeU Credential Issuance Service

```javascript
// Backend service implementing @hiero-did-sdk/anoncreds
class UBeUCredentialIssuerService {
    constructor() {
        this.hederaClient = Client.forMainnet();
        this.schemaRegistry = new Map();
        this.credDefRegistry = new Map();
        
        // Initialize UBeU as credential issuer
        this.ubeuIssuerDID = "did:hedera:mainnet:ubeu_platform_did";
        this.setupPlatformSchemas();
    }
    
    async setupPlatformSchemas() {
        // Create core UBeU schemas
        await this.createDomainOwnershipSchema();
        await this.createDNSVerificationSchema();
        await this.createUVBadgeSchema();
    }
    
    async createDomainOwnershipSchema() {
        const schema = {
            issuerId: this.ubeuIssuerDID,
            name: "UBeU_Domain_Ownership_Verification",
            version: "1.0",
            attrNames: [
                "domain_name", "domain_type", "blockchain_network",
                "registry_contract", "verification_method", 
                "verification_timestamp", "verification_hash",
                "expiration_date", "ubeu_account_binding"
            ]
        };
        
        // Use @hiero-did-sdk/anoncreds to create schema
        const { schemaId, schemaJson } = await AnonCreds.createSchema(schema);
        
        // Store schema in HCS-1 File format
        await this.storeSchemaInHCS(schemaId, schemaJson);
        
        // Create credential definition
        const credDef = await this.createCredentialDefinition(schemaId, "domain_ownership");
        
        this.schemaRegistry.set("domain_ownership", { schemaId, credDefId: credDef.credDefId });
    }
    
    async issueDomainOwnershipCredential(verificationData) {
        const { schemaId, credDefId } = this.schemaRegistry.get("domain_ownership");
        
        const credentialRequest = {
            credDefId: credDefId,
            holderDid: verificationData.holderDid,
            attributes: {
                domain_name: verificationData.domain,
                domain_type: verificationData.domainType,
                blockchain_network: verificationData.blockchain,
                registry_contract: verificationData.registryAddress,
                verification_method: verificationData.method,
                verification_timestamp: Date.now().toString(),
                verification_hash: verificationData.proofHash,
                expiration_date: verificationData.expirationDate,
                ubeu_account_binding: verificationData.ubAuthTokenId
            }
        };
        
        // Issue credential using @hiero-did-sdk/anoncreds
        const credential = await AnonCreds.issueCredential(credentialRequest);
        
        // Store credential in HFS
        await this.storeCredentialInHFS(credential);
        
        return credential;
    }
}
```

### API Interface for Credential Issuance

```javascript
// REST API endpoints for UBeU credential issuance
class UBeUCredentialAPI {
    constructor(credentialService) {
        this.credentialService = credentialService;
    }
    
    // Internal API - called by UBeU registration process
    async issueInternalCredential(req, res) {
        try {
            const { credentialType, holderDid, verificationData } = req.body;
            
            let credential;
            switch (credentialType) {
                case "domain_ownership":
                    credential = await this.credentialService.issueDomainOwnershipCredential(verificationData);
                    break;
                case "dns_verification":
                    credential = await this.credentialService.issueDNSVerificationCredential(verificationData);
                    break;
                case "uv_badge":
                    credential = await this.credentialService.issueUVBadgeCredential(verificationData);
                    break;
                default:
                    return res.status(400).json({ error: "Unknown credential type" });
            }
            
            res.json({ 
                success: true, 
                credentialId: credential.credentialId,
                credential: credential 
            });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    // External API - for enterprise issuers using UBeU
    async issueEnterpriseCredential(req, res) {
        try {
            // Validate enterprise issuer authorization
            const enterpriseDID = await this.validateEnterpriseIssuer(req.headers.authorization);
            
            const { recipientDid, credentialType, attributes } = req.body;
            
            // Use enterprise's schema and CredDef
            const credential = await this.credentialService.issueEnterpriseCredential({
                issuerDid: enterpriseDID,
                recipientDid: recipientDid,
                credentialType: credentialType,
                attributes: attributes
            });
            
            res.json({
                success: true,
                credentialId: credential.credentialId
            });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
```

## Schema Creation and Management

### UBeU Schema Registry Implementation

```javascript
// Schema registry using @hiero-did-sdk/anoncreds
class UBeUSchemaRegistry {
    async createPlatformSchema(schemaDefinition) {
        // Create schema using Hiero DID SDK
        const schema = await AnonCreds.createSchema({
            issuerId: "did:hedera:mainnet:ubeu_platform_did",
            name: schemaDefinition.name,
            version: schemaDefinition.version,
            attrNames: schemaDefinition.attributes
        });
        
        // Store schema as HCS-1 File
        const hcsFile = await this.createHCS1File({
            type: "SCHEMA",
            content: schema.schemaJson,
            compression: "zstd",
            encoding: "base64"
        });
        
        // Register
        await this.registerSchemaInStorage({
            schemaId: schema.schemaId,
            hcsFileId: hcsFile.fileId,
            issuerDid: "did:hedera:mainnet:ubeu_platform_did",
            schemaName: schemaDefinition.name,
            attributes: schemaDefinition.attributes
        });
        
        return schema;
    }
    
    async createCredentialDefinition(schemaId, tag) {
        // Create CredDef using Hiero DID SDK
        const credDef = await AnonCreds.createCredentialDefinition({
            issuerId: "did:hedera:mainnet:ubeu_platform_did",
            schemaId: schemaId,
            tag: tag,
            supportRevocation: true
        });
        
        // Store CredDef as HCS-1 File
        const hcsFile = await this.createHCS1File({
            type: "CRED_DEF", 
            content: credDef.credDefJson,
            compression: "zstd",
            encoding: "base64"
        });
        
        return credDef;
    }
}
```

## Integration with Domain Registration Process

### Automatic Credential Issuance Workflow

```javascript
// Integration with domain registration process
class DomainRegistrationWithCredentials {
    async registerExternalDomain(domainData) {
        // 1. Verify domain ownership via DVS
        const verification = await this.domainVerificationService.verifyOwnership(domainData);
        
        if (verification.verified) {
            // 2. Create UBAuth token and DID binding
            const ubAuthToken = await this.createUBAuthToken(domainData);
            
            // 3. Issue domain ownership credential automatically
            const credential = await this.credentialIssuer.issueDomainOwnershipCredential({
                holderDid: domainData.userDid,
                domain: domainData.domain,
                domainType: "external",
                blockchain: domainData.blockchain,
                registryAddress: domainData.registryContract,
                method: verification.method,
                proofHash: verification.proofHash,
                expirationDate: this.calculateExpirationDate(),
                ubAuthTokenId: ubAuthToken.tokenId
            });
            
            // 4. Store credential and update DID document
            await this.addCredentialToDID(domainData.userDid, credential);
            
            return {
                success: true,
                ubAuthToken: ubAuthToken,
                domainOwnershipCredential: credential
            };
        }
    }
    
    async registerISSDomain(enterpriseData) {
        // 1. Verify DNS ownership
        const dnsVerification = await this.verifyDNSOwnership(enterpriseData);
        
        if (dnsVerification.verified) {
            // 2. Issue DNS verification credential
            const credential = await this.credentialIssuer.issueDNSVerificationCredential({
                holderDid: enterpriseData.enterpriseDid,
                domain: enterpriseData.issDomain,
                parentDomain: enterpriseData.parentDomain,
                txtRecordContent: dnsVerification.txtRecord,
                verificationMethod: "dns_txt_record",
                enterpriseContact: enterpriseData.contact,
                complianceLevel: enterpriseData.tier
            });
            
            // 3. Grant enterprise issuer privileges
            await this.grantIssuerPrivileges(enterpriseData.enterpriseDid);
            
            return {
                success: true,
                dnsVerificationCredential: credential,
                issuerPrivileges: true
            };
        }
    }
}
```

This architecture positions UBeU as both a credential issuer for its own platform operations (domain verification, DNS verification, social verification) and as infrastructure enabling other enterprises to issue credentials through the UBeU ecosystem. The @hiero-did-sdk integration provides the foundation for standards-compliant credential issuance while maintaining Hedera-native performance and cost efficiency.

You've identified a crucial architectural point! Let me clarify the **immutable vs. mutable data separation** in UBeU's design:

## UBAuth Token: Immutable Core Identity Anchor vs. PostgreSQL Mutable Operational State

### What's Immutable in UBAuth Token Metadata
```javascript
// UBAuth token metadata (NEVER changes)
{
    tokenId: "0.0.123456_serial_1",
    originalNativeAccount: "0xABC...123", // Alice's original ETH wallet
    creationTimestamp: 1705891234000,
    hederaAccountId: "0.0.456789",     // Alice's UBeU-managed Hedera account
    hcsTopicId: "0.0.789012",         // Alice's identity document topic
    primaryDID: "did:hedera:mainnet:z6Mk...ABC_0.0.789012",
    ubeuAccountHash: "hash_of_original_registration_data"
}
```

**These values NEVER change** - they represent Alice's permanent identity anchor, regardless of what domains she gains/loses or wallets she connects.

## PostgreSQL: Mutable Operational State

### Current Active Mappings (Changeable)
```sql
-- account_mappings table: MUTABLE operational data
{
    native_account_id: "0xDEF...456",     -- NOW points to Polygon wallet
    hedera_account_id: "0.0.456789",     -- SAME (immutable link)
    did_ids: ["did:hedera:mainnet:z6Mk...ABC_0.0.789012"], -- SAME primary DID
    domains: ["alice.crypto", "alice.jones.iam"], -- UPDATED domain portfolio  
    all_aliases: ["alice.crypto", "alice.jones.iam"], -- CURRENT aliases
    primary_alias: "alice.crypto",       -- UPDATED primary
    verification_data: {current_wallet_proofs}, -- UPDATED
    last_updated: "2025-01-15T10:30:00Z"
}
```

## The Separation Model

### UBAuth Token = Permanent Identity Foundation
- **Purpose**: Immutable proof of identity ownership
- **Contains**: Original registration data that never changes
- **Survives**: Domain transfers, wallet changes, alias updates
- **Links**: Original native wallet → Hedera account → DID → HCS topic

### PostgreSQL = Current Operational State  
- **Purpose**: Track current active domains, wallets, and aliases
- **Contains**: What domains Alice currently has, which wallets can access her identity
- **Changes**: When domains transfer, new wallets connect, aliases update
- **Enables**: Current domain resolution, wallet authentication, session management

## Alice's Scenario: ETH → Polygon Migration

### What Happens to Data Layers

**UBAuth Token (Immutable):**
```javascript
// NEVER CHANGES - permanent identity anchor
{
    originalNativeAccount: "0xABC...123", // Still shows original ETH wallet
    hederaAccountId: "0.0.456789",
    primaryDID: "did:hedera:mainnet:z6Mk...ABC_0.0.789012",
    hcsTopicId: "0.0.789012"
}
```

**PostgreSQL account_mappings (Updated):**
```sql
-- UPDATED to reflect current state
native_account_id: "0xDEF...456"        -- NOW Polygon wallet
domains: ["alice.crypto", "alice.jones.iam"]  -- UPDATED portfolio
all_aliases: ["alice.crypto", "alice.jones.iam"] -- CURRENT aliases
```

**WalletLinkingRecord (New Entry):**
```sql
-- NEW record created for wallet migration
{
    original_user_id: "ubeu_identity_abc123",
    target_wallet_address: "0xDEF...456",  -- Polygon wallet
    domain: "alice.crypto",
    linking_signature: "recovery_proof_signature",
    created_at: "2025-01-15T10:30:00Z",
    is_active: true,
    link_type: "wallet_migration"
}
```

## Why This Architecture Works

### Identity Verification Process
```javascript
// How UBeU verifies Alice owns the identity
async function verifyIdentityOwnership(requestingWallet) {
    // 1. Check if wallet directly mapped (fast path)
    const directMapping = await getAccountMapping(requestingWallet);
    if (directMapping) return directMapping.ubeu_identity;
    
    // 2. Check wallet linking records (recovery path)
    const linkRecord = await getWalletLinkRecord(requestingWallet);
    if (linkRecord && linkRecord.is_active) {
        // 3. Verify link is still valid (domain still owned)
        const domainStillOwned = await verifyCurrentDomainOwnership(
            linkRecord.domain, 
            requestingWallet
        );
        
        if (domainStillOwned) {
            return linkRecord.original_user_identity;
        } else {
            // Domain transferred - break the link
            await deactivateWalletLink(linkRecord.id);
            return null;
        }
    }
    
    return null; // No valid connection found
}
```

### Domain Resolution Process
```javascript
// How domains resolve to DIDs
async function resolveDomainToDID(domain) {
    // 1. Check current domain mappings (PostgreSQL)
    const currentMapping = await getCurrentDomainMapping(domain);
    if (!currentMapping) return null;
    
    // 2. Verify domain ownership is still valid
    const ownershipValid = await verifyContinuousOwnership(domain);
    if (!ownershipValid) {
        // Remove invalid mapping
        await removeStaleMapping(domain);
        return null;
    }
    
    // 3. Return current DID (from PostgreSQL)
    return currentMapping.primary_did;
}
```

## Benefits of This Dual-Layer Architecture

### 1. **Identity Continuity**
- UBAuth token proves Alice is the same person regardless of current domains
- PostgreSQL tracks her current operational state
- She never loses access to her received credentials

### 2. **Domain Flexibility** 
- Domains can transfer without breaking identity
- New domains can be added without changing core identity
- Domain aliases can be updated dynamically

### 3. **Recovery Resilience**
- Multiple recovery paths available through wallet linking
- Identity survives complete domain portfolio changes
- Historical identity proof preserved in immutable token

### 4. **Performance Optimization**
- Fast domain resolution via PostgreSQL indexes
- Immutable data cached/computed once (UBAuth token)
- Continuous monitoring only affects mutable state

## Example: Alice's Complete State After Migration

### UBAuth Token Metadata (Immutable)
```
Original ETH wallet: 0xABC...123
Original domain: alice.eth  
Creation timestamp: 1705891234000
Hedera account: 0.0.456789
Primary DID: did:hedera:mainnet:z6Mk...ABC_0.0.789012
```

### Current PostgreSQL State (Mutable)
```
Current active wallet: 0xDEF...456 (Polygon)
Current domains: ["alice.crypto", "alice.jones.iam"]
Current primary alias: "alice.crypto"
Wallet link proof: recovery_verification_signature
```

### What Alice Can Do
- **Access her identity** via Polygon wallet (through wallet linking)
- **Receive credentials** sent to alice.crypto or alice.jones.iam  
- **Show proof of continuous identity** via UBAuth token
- **Export her complete identity** including historical provenance
- **Add more domains** to her current portfolio

This architecture ensures Alice maintains **permanent identity ownership** (UBAuth token) while enabling **dynamic operational flexibility** (PostgreSQL), creating a robust system that survives the natural evolution of Web3 domain portfolios.

### Appendix: Enterprise Onboarding and Workflow

## UBeU Credential Issuer Registration Process Evaluation

### **What's Implemented**

**1. Basic Service Architecture**
```javascript
// Core credential service structure is implemented
class CredentialService {
  private issuer: CredentialIssuer;
  private verifier: CredentialVerifier;
  private schemaManager: CredentialSchemaManager;
}
```

**2. W3C Verifiable Credential Framework**
The basic W3C credential structure is implemented with:
- Standard `@context`, `id`, `type`, `issuer`, `credentialSubject` fields
- Credential verification infrastructure
- Presentation verification capabilities
- Basic schema management

**3. Hiero DID SDK Integration**
```javascript
// Integration with @hiero-did-sdk components
import { HederaAnoncredsRegistry } from '@hiero-did-sdk/anoncreds';
import { Signer } from '@hiero-did-sdk/signer-internal';
import { HederaHcsService, HcsFileService } from '@hiero-did-sdk/hcs';
```

**4. RESTful API Endpoints**
- `/api/v1/issue` - Credential issuance endpoint
- `/api/v1/verify` - Credential verification endpoint
- `/api/v1/schemas` - Schema management endpoint
- Health check and basic service info endpoints

**5. Multi-tier Authentication Architecture**
- User-level authentication
- Application-level API keys
- Enterprise-level authorization

### **What's Yet To Be Implemented**

**1. Cryptographic Signing**
```javascript
// Current implementation uses mock proofs
private async generateProof(request: CredentialIssuanceRequest): Promise<string> {
    // Implement actual cryptographic signing with Hiero DID SDK
    return `proof_${Date.now()}_${request.walletAddress.slice(-8)}`;
}
```

**2. DNS Verification System**
The enterprise .iss domain verification is architecturally designed but not implemented:
- DNS TXT record challenge generation
- Verification service for DNS querying
- Automated domain ownership verification

**3. Enterprise Registration Workflow**
**Missing components:**
- Enterprise dashboard interface
- Payment processing integration (*See: User Journey 9, Step 3: Enterprise Payment Method Selection*)
- Domain NFT minting system
- Hedera account creation for enterprises
- API key generation and management

**4. Schema Registry Operations**
```javascript
// Schema registration via Hiero DID SDK not fully implemented
const registerSchemaResult = await registry.registerSchema({
    networkName: "testnet",
    issuerKeyDer: PrivateKey.generate().toStringDer(),
    schema,
}); // This integration is partially complete
```

**5. Credential Revocation System**
- Revocation registry creation
- Revocation status list management
- Real-time revocation checking

**6. Enterprise-Specific Features**
- Batch credential issuance
- Subdomain management (training.aws.iss, employees.aws.iss)
- Usage analytics and reporting
- Network fee tracking and allowance management

### **Critical Implementation Gaps**

**1. No Real Issuer Registration Flow**
The system can issue credentials but lacks the actual registration process for new issuers to:
- Verify their identity/organization
- Set up their issuer DID
- Configure their credential schemas
- Obtain API credentials

**2. No Schema Publication**
While schema management exists, there's no mechanism for:
- Publishing schemas to the Hedera network
- Making schemas discoverable by other systems
- Versioning and updating schemas

**3. No Enterprise Onboarding**
The detailed AWS workflow is documented but not implemented:
- No DNS verification automation
- No corporate identity validation
- No pricing/billing integration

### **Current State Assessment**

**Implementation Status: ~30% Complete**

✅ **Implemented:**
- Basic service infrastructure
- W3C credential structure
- SDK integration framework
- API endpoint structure
- Basic verification logic

❌ **Not Implemented:**
- Actual cryptographic operations
- Enterprise registration process
- DNS verification system
- Payment processing
- Schema registry operations
- Revocation management

The UBeU codebase has a solid architectural foundation for credential issuance but requires significant development to become a fully functional enterprise credential issuer registration system. The core W3C standards compliance is in place, but the business logic for onboarding, verification, and operational management remains to be implemented.