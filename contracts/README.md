# UBeU Smart Contracts

This directory contains the **interface definitions** for UBeU smart contracts. These interfaces define the standard APIs that our contracts implement, allowing developers to:

- ✅ Understand integration points
- ✅ Generate type-safe SDKs
- ✅ Create mock implementations for testing
- ✅ Build applications that work with UBeU

## 📋 Available Interfaces

| Interface | Purpose | Key Functions |
|-----------|---------|---------------|
| **`IDomainNFT.sol`** | Domain NFT management | `mintDomainNFT()`, `transferDomainNFT()`, `getDomainInfo()` |
| **`IUBAuthToken.sol`** | Identity authentication | `mintUBAuth()`, `getIdentity()`, `hasUBAuth()` |
| **`IUBeURegistry.sol`** | Identity registry | `registerDomain()`, `resolveDomain()`, `anchorDIDDocument()` |

## 🔧 Integration Example

```solidity
// Import interfaces for type-safe integration
import "./IDomainNFT.sol";
import "./IUBAuthToken.sol";

contract MyDApp {
    IDomainNFT public domainNFT;
    IUBAuthToken public ubAuth;

    constructor(address _domainNFT, address _ubAuth) {
        domainNFT = IDomainNFT(_domainNFT);
        ubAuth = IUBAuthToken(_ubAuth);
    }

    function createIdentity(string memory domain, string memory did) external {
        // Type-safe calls using interfaces
        uint256 tokenId = domainNFT.mintDomainNFT(domain, msg.sender);
        int64 serialNumber = ubAuth.mintUBAuth(msg.sender, did, domain);
    }
}
```

## 📁 Directory Structure

```
public/contracts/
├── 📄 IDomainNFT.sol          # Domain NFT interface
├── 📄 IUBAuthToken.sol        # UBAuth token interface
├── 📄 IUBeURegistry.sol       # Registry interface
├── 📁 examples/               # Mock implementations for testing
│   ├── 📄 MockDomainNFT.sol
│   ├── 📄 MockUBAuthToken.sol
│   └── 📄 MockUBeURegistry.sol
└── 📁 archive/                # Original contract implementations
    ├── 📄 DomainNFT.sol
    ├── 📄 UBAuthToken.sol
    └── 📄 UBeURegistry.sol
```

## 🧪 Testing with Mock Contracts

For development and testing, use our mock implementations:

```solidity
// Use mock contracts for testing
import "./examples/MockDomainNFT.sol";
import "./examples/MockUBAuthToken.sol";

contract TestMyDApp {
    MockDomainNFT public mockDomainNFT;
    MockUBAuthToken public mockUBAuth;

    constructor() {
        mockDomainNFT = new MockDomainNFT();
        mockUBAuth = new MockUBAuthToken();
    }

    function testCreateIdentity() external {
        // Test with mock implementations
        uint256 tokenId = mockDomainNFT.mintDomainNFT("test.iam", msg.sender);
        int64 serialNumber = mockUBAuth.mintUBAuth(msg.sender, "did:test:123", "test.iam");

        // Verify results
        assert(tokenId > 0);
        assert(serialNumber > 0);
    }
}
```

## ⚠️ Important Notes

### Interface-Only Approach
- **These are interfaces only** - they define the API but not the implementation
- **Full implementations are private** - business logic and algorithms are proprietary
- **Use for integration only** - create your own implementations or use our deployed contracts
- **Subject to change** - interfaces may evolve; check for updates

### Business Logic Protection
- Fee structures and pricing models are not exposed
- Treasury mechanisms and fund flows are private
- Core algorithms and business workflows are proprietary
- Implementation details remain confidential

## 🔗 Integration Options

### Option 1: Use Deployed Contracts
```solidity
// Use UBeU's deployed contract addresses
contract MyDApp {
    IDomainNFT public domainNFT = IDomainNFT(0x1234567890123456789012345678901234567890);
    IUBAuthToken public ubAuth = IUBAuthToken(0x0987654321098765432109876543210987654321);

    function createIdentity(string memory domain, string memory did) external {
        // Call deployed contracts
        uint256 tokenId = domainNFT.mintDomainNFT(domain, msg.sender);
        int64 serialNumber = ubAuth.mintUBAuth(msg.sender, did, domain);
    }
}
```

### Option 2: Create Custom Implementation
```solidity
// Implement your own version of the interfaces
import "./IDomainNFT.sol";

contract MyDomainNFT is IDomainNFT {
    // Implement all IDomainNFT functions
    function mintDomainNFT(string memory domain, address owner)
        external payable returns (uint256) {
        // Your custom implementation
    }

    // ... implement other interface functions
}
```

### Option 3: Use Mock for Testing
```solidity
// Use mocks for development and testing
import "./examples/MockDomainNFT.sol";

contract TestContract {
    MockDomainNFT public domainNFT;

    constructor() {
        domainNFT = new MockDomainNFT();
    }

    function testMinting() external returns (uint256) {
        return domainNFT.mintDomainNFT("test.iam", msg.sender);
    }
}
```

## 📚 Interface Details

### IDomainNFT - Domain Management
```solidity
interface IDomainNFT {
    // Core operations
    function mintDomainNFT(string memory domain, address owner) external payable returns (uint256);
    function renewDomain(string memory domain) external payable;
    function transferDomainNFT(string memory domain, address to) external;

    // Query functions
    function getDomainInfo(uint256 tokenId) external view returns (
        string memory domain,
        address originalOwner,
        address currentOwner,
        uint256 mintedAt,
        uint256 expiresAt,
        uint256 renewalCount,
        bool isActive
    );
    function isDomainRegistered(string memory domain) external view returns (bool);
    function getDomainOwner(string memory domain) external view returns (address);

    // Events
    event DomainNFTMinted(uint256 indexed tokenId, string indexed domain, address indexed owner);
    event DomainNFTRenewed(string indexed domain, uint256 newExpiry);
    event DomainNFTTransferred(string indexed domain, address indexed from, address indexed to);
}
```

### IUBAuthToken - Identity Tokens
```solidity
interface IUBAuthToken {
    // Core operations
    function mintUBAuth(address user, string memory did, string memory primaryDomain) external returns (int64);
    function burnUBAuth(address user) external;
    function updateIdentity(address user, string memory newDID, string memory newPrimaryDomain) external;

    // Query functions
    function getIdentity(address user) external view returns (
        address userAddress,
        string memory did,
        string memory primaryDomain,
        uint256 mintedAt,
        uint256 lastUpdated,
        int64 serialNumber,
        bool isActive
    );
    function hasUBAuth(address user) external view returns (bool);
    function getUserByDID(string memory did) external view returns (address);

    // Events
    event UBAuthTokenCreated(address indexed user, string indexed did, int64 serialNumber);
    event UBAuthTokenBurned(address indexed user, int64 serialNumber);
    event IdentityUpdated(address indexed user, string oldDID, string newDID);
}
```

### IUBeURegistry - Identity Registry
```solidity
interface IUBeURegistry {
    // Core operations
    function registerDomain(string memory domain, string memory did, address owner) external payable;
    function verifyDomain(string memory domain, string memory did) external;
    function resolveDomain(string memory domain) external view returns (string memory);
    function anchorDIDDocument(string memory did, bytes32 documentHash) external;

    // Query functions
    function getDomainRecord(string memory domain) external view returns (
        string memory domainName,
        string memory did,
        address owner,
        uint256 registeredAt,
        uint256 verifiedAt,
        uint256 expiresAt,
        bool isActive
    );
    function isDomainVerified(string memory domain) external view returns (bool);
    function getUserDomains(address user) external view returns (string[] memory);

    // Events
    event DomainRegistered(string indexed domain, string indexed did, address indexed owner);
    event DomainVerified(string indexed domain, string indexed did, uint256 timestamp);
    event DIDAnchored(string indexed did, bytes32 documentHash, uint256 timestamp);
    event DomainRenewed(string indexed domain, uint256 newExpiry);
}
```

## 🔧 Development Tools

### TypeScript SDK Generation
```bash
# Generate TypeScript types from interfaces
npx typechain --target ethers-v5 'public/contracts/*.sol'
```

### Mock Contract Factory
```solidity
// Factory for creating mock contracts
contract MockFactory {
    function createMockDomainNFT() external returns (IDomainNFT) {
        return new MockDomainNFT();
    }

    function createMockUBAuthToken() external returns (IUBAuthToken) {
        return new MockUBAuthToken();
    }

    function createMockUBeURegistry() external returns (IUBeURegistry) {
        return new MockUBeURegistry();
    }
}
```

## 📞 Getting Help

- 📖 [API Documentation](../docs/API.md)
- 🛠️ [Integration Guide](../docs/guides/integration-guide.md)
- 🧪 [Testing Guide](../docs/guides/testing-guide.md)
- 💬 [Community Forum](https://community.ubeu.io)
- 🐛 [GitHub Issues](https://github.com/ubeu/ubeu-public/issues)

## 🔄 Version History

- **v1.0.0** - Initial interface definitions
- **v1.0.0-mock** - Mock implementations for testing

## ⚖️ License

This interface-only approach allows maximum transparency while protecting intellectual property. The interfaces are licensed under MIT, while full implementations remain proprietary.

---

**Built for the future of decentralized identity** 🔐

*For production deployments, use the official UBeU contract addresses provided in our documentation.*