// Simple JavaScript Integration Examples
// These examples show basic usage of the interface-based contract clients

// Example 1: Basic Setup and Domain Check
async function basicDomainCheck() {
  console.log('=== Basic Domain Check Example ===');

  // In a real application, you would:
  // 1. Import the SDK: const { DomainNFTClient } = require('@ubeu/sdk');
  // 2. Connect to your preferred network
  // 3. Use the contract address from your deployment

  console.log('1. Connect to Hedera network');
  console.log('2. Create DomainNFT client with contract address');
  console.log('3. Check if domain is available');

  // Example code (would work with real SDK):
  /*
  const { DomainNFTClient } = require('@ubeu/sdk');
  const ethers = require('ethers');

  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');
  const client = new DomainNFTClient({
    contractAddress: '0x...', // Your deployed contract address
    provider: provider
  });

  const isAvailable = await client.isDomainRegistered('example.iam');
  console.log('Domain available:', !isAvailable);
  */
}

// Example 2: User Identity Creation Flow
async function identityCreationFlow() {
  console.log('=== Identity Creation Flow ===');

  console.log('Step 1: User provides domain and DID');
  console.log('Step 2: Register domain in registry');
  console.log('Step 3: Mint domain NFT');
  console.log('Step 4: Create UBAuth token');
  console.log('Step 5: Verify domain ownership');

  // Example workflow:
  /*
  // 1. Setup clients
  const registry = new UBeURegistryClient({ contractAddress: '...', provider, signer });
  const domainNFT = new DomainNFTClient({ contractAddress: '...', provider, signer });
  const ubAuth = new UBAuthTokenClient({ contractAddress: '...', provider, signer });

  // 2. User input
  const domain = 'user.iam';
  const did = 'did:hedera:testnet:12345';
  const userAddress = signer.address;

  // 3. Register domain
  await registry.registerDomain(domain, did, userAddress);

  // 4. Mint NFT
  const tokenId = await domainNFT.mintDomainNFT(domain, userAddress);

  // 5. Create identity token
  const serialNumber = await ubAuth.mintUBAuth(userAddress, did, domain);

  // 6. Verify domain
  await registry.verifyDomain(domain, did);

  console.log('✅ Identity created successfully!');
  */
}

// Example 3: Enterprise Batch Operations
async function enterpriseBatchOperations() {
  console.log('=== Enterprise Batch Operations ===');

  console.log('Use case: Company onboarding multiple employees');

  // Example for enterprise:
  /*
  const registry = new UBeURegistryClient({ contractAddress: '...', provider, signer });
  const ubAuth = new UBAuthTokenClient({ contractAddress: '...', provider, signer });

  // Employee data
  const employees = [
    { domain: 'alice.company.iam', did: 'did:hedera:testnet:alice123', address: '0x...' },
    { domain: 'bob.company.iam', did: 'did:hedera:testnet:bob456', address: '0x...' },
    { domain: 'charlie.company.iam', did: 'did:hedera:testnet:charlie789', address: '0x...' }
  ];

  // Extract data for batch operations
  const domains = employees.map(e => e.domain);
  const dids = employees.map(e => e.did);
  const addresses = employees.map(e => e.address);

  // Batch register domains
  await registry.batchRegisterDomains(domains, dids, addresses);

  // Batch create identities
  await ubAuth.batchMintUBAuth(addresses, dids, domains);

  console.log('✅ Batch operations completed for', employees.length, 'employees');
  */
}

// Example 4: Query Operations (Read-Only)
async function queryOperations() {
  console.log('=== Query Operations ===');

  console.log('Read operations that don\'t require signing:');

  // Example queries:
  /*
  const domainNFT = new DomainNFTClient({ contractAddress: '...', provider });
  const ubAuth = new UBAuthTokenClient({ contractAddress: '...', provider });
  const registry = new UBeURegistryClient({ contractAddress: '...', provider });

  // Check domain status
  const isRegistered = await domainNFT.isDomainRegistered('user.iam');
  const isVerified = await registry.isDomainVerified('user.iam');

  // Get user domains
  const userDomains = await registry.getUserDomains(userAddress);

  // Get identity info
  const identity = await ubAuth.getIdentity(userAddress);
  const hasToken = await ubAuth.hasUBAuth(userAddress);

  // Get domain info
  const tokenId = await domainNFT.getTokenByDomain('user.iam');
  const domainInfo = await domainNFT.getDomainInfo(tokenId);

  console.log('User identity:', identity);
  console.log('Domain info:', domainInfo);
  */
}

// Example 5: Error Handling
async function errorHandling() {
  console.log('=== Error Handling ===');

  console.log('Common error scenarios and handling:');

  /*
  try {
    // Attempt to mint domain without signer
    await domainNFT.mintDomainNFT('test.iam', userAddress);
  } catch (error) {
    if (error.message.includes('Signer required')) {
      console.log('❌ Write operations require a signer');
      // Solution: Add signer to client configuration
    }
  }

  try {
    // Attempt to register already registered domain
    await registry.registerDomain('taken.iam', did, userAddress);
  } catch (error) {
    if (error.message.includes('already registered')) {
      console.log('❌ Domain already taken');
      // Solution: Try different domain
    }
  }

  try {
    // Network or RPC errors
    await client.getDomainInfo(tokenId);
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      console.log('❌ Network connection failed');
      // Solution: Retry with exponential backoff
    }
  }
  */
}

// Example 6: Event Monitoring
async function eventMonitoring() {
  console.log('=== Event Monitoring ===');

  console.log('Monitor contract events for real-time updates:');

  /*
  const domainNFT = new DomainNFTClient({ contractAddress: '...', provider });

  // Get raw contract for event listening
  const contract = domainNFT.getContract();

  // Listen for domain minting events
  contract.on('DomainNFTMinted', (tokenId, domain, owner) => {
    console.log('🎉 New domain minted:', {
      tokenId: tokenId.toString(),
      domain: domain,
      owner: owner
    });
  });

  // Listen for domain renewal events
  contract.on('DomainNFTRenewed', (domain, newExpiry) => {
    console.log('🔄 Domain renewed:', {
      domain: domain,
      expires: new Date(newExpiry.toNumber() * 1000).toISOString()
    });
  });

  console.log('✅ Event listeners active');
  */
}

// Example 7: Testing with Mock Contracts
async function testingWithMocks() {
  console.log('=== Testing with Mock Contracts ===');

  console.log('Use mock contracts for development and testing:');

  /*
  // In test environment, use mock implementations
  const { MockDomainNFT } = require('./MockDomainNFT.sol');
  const { MockUBAuthToken } = require('./MockUBAuthToken.sol');

  describe('Domain Operations', () => {
    let mockDomainNFT;
    let mockUBAuth;

    beforeEach(() => {
      mockDomainNFT = new MockDomainNFT();
      mockUBAuth = new MockUBAuthToken();
    });

    test('should mint domain successfully', async () => {
      const tokenId = await mockDomainNFT.mintDomainNFT('test.iam', userAddress);
      expect(tokenId).toBeGreaterThan(0);

      const domainInfo = await mockDomainNFT.getDomainInfo(tokenId);
      expect(domainInfo.domain).toBe('test.iam');
    });

    test('should create identity', async () => {
      const serialNumber = await mockUBAuth.mintUBAuth(
        userAddress,
        'did:test:123',
        'test.iam'
      );

      const identity = await mockUBAuth.getIdentity(userAddress);
      expect(identity.did).toBe('did:test:123');
    });
  });
  */
}

// Run all examples
async function runAllExamples() {
  console.log('🚀 UBeU Contract Integration Examples\n');

  await basicDomainCheck();
  console.log();

  await identityCreationFlow();
  console.log();

  await enterpriseBatchOperations();
  console.log();

  await queryOperations();
  console.log();

  await errorHandling();
  console.log();

  await eventMonitoring();
  console.log();

  await testingWithMocks();
  console.log();

  console.log('✅ All examples completed!');
  console.log('\n📖 For more details, see:');
  console.log('   - Interface documentation: ./README.md');
  console.log('   - Mock contracts: ./examples/');
  console.log('   - SDK documentation: https://docs.ubeu.io');
}

// Export examples for use in other files
module.exports = {
  basicDomainCheck,
  identityCreationFlow,
  enterpriseBatchOperations,
  queryOperations,
  errorHandling,
  eventMonitoring,
  testingWithMocks,
  runAllExamples
};

// If run directly, execute all examples
if (require.main === module) {
  runAllExamples().catch(console.error);
}