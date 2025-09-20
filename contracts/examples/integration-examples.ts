// UBeU Contract Integration Examples
// These examples show how to use the interface-based contract clients

import { ethers } from 'ethers';
import { DomainNFTClient, UBAuthTokenClient, UBeURegistryClient } from '../../../packages/sdk/src/contracts';

// Example 1: Basic Domain Registration
export async function registerDomainExample() {
  // Connect to Hedera network
  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');
  const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  // Create contract clients
  const domainNFT = new DomainNFTClient({
    contractAddress: '0x...', // DomainNFT contract address
    provider,
    signer
  });

  const registry = new UBeURegistryClient({
    contractAddress: '0x...', // UBeURegistry contract address
    provider,
    signer
  });

  try {
    // Register a domain
    await registry.registerDomain('user.iam', 'did:hedera:testnet:12345', signer.address);

    // Mint the domain NFT
    const tokenId = await domainNFT.mintDomainNFT('user.iam', signer.address);

    console.log(`Domain registered with token ID: ${tokenId}`);
  } catch (error) {
    console.error('Domain registration failed:', error);
  }
}

// Example 2: Identity Creation with UBAuth Token
export async function createIdentityExample() {
  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');
  const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  const ubAuth = new UBAuthTokenClient({
    contractAddress: '0x...', // UBAuthToken contract address
    provider,
    signer
  });

  try {
    // Mint UBAuth token for user
    const serialNumber = await ubAuth.mintUBAuth(
      signer.address,
      'did:hedera:testnet:12345',
      'user.iam'
    );

    // Get identity information
    const identity = await ubAuth.getIdentity(signer.address);

    console.log('Identity created:', {
      serialNumber,
      did: identity.did,
      primaryDomain: identity.primaryDomain
    });
  } catch (error) {
    console.error('Identity creation failed:', error);
  }
}

// Example 3: Complete User Onboarding Flow
export async function completeOnboardingExample() {
  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');
  const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  // Initialize all contract clients
  const domainNFT = new DomainNFTClient({
    contractAddress: '0x...',
    provider,
    signer
  });

  const ubAuth = new UBAuthTokenClient({
    contractAddress: '0x...',
    provider,
    signer
  });

  const registry = new UBeURegistryClient({
    contractAddress: '0x...',
    provider,
    signer
  });

  try {
    const userAddress = signer.address;
    const domain = 'john.iam';
    const did = `did:hedera:testnet:${Date.now()}`;

    console.log('Starting user onboarding...');

    // Step 1: Register domain
    console.log('1. Registering domain...');
    await registry.registerDomain(domain, did, userAddress);

    // Step 2: Mint domain NFT
    console.log('2. Minting domain NFT...');
    const tokenId = await domainNFT.mintDomainNFT(domain, userAddress);

    // Step 3: Create UBAuth token
    console.log('3. Creating UBAuth token...');
    const serialNumber = await ubAuth.mintUBAuth(userAddress, did, domain);

    // Step 4: Verify domain
    console.log('4. Verifying domain...');
    await registry.verifyDomain(domain, did);

    // Step 5: Get final state
    const identity = await ubAuth.getIdentity(userAddress);
    const domainInfo = await domainNFT.getDomainInfo(tokenId);

    console.log('✅ Onboarding complete!');
    console.log('Identity:', identity);
    console.log('Domain Info:', domainInfo);

  } catch (error) {
    console.error('Onboarding failed:', error);
  }
}

// Example 4: Batch Operations for Enterprises
export async function enterpriseBatchExample() {
  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');
  const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  const registry = new UBeURegistryClient({
    contractAddress: '0x...',
    provider,
    signer
  });

  const ubAuth = new UBAuthTokenClient({
    contractAddress: '0x...',
    provider,
    signer
  });

  try {
    // Batch register multiple domains
    const domains = ['alice.company.iam', 'bob.company.iam', 'charlie.company.iam'];
    const dids = [
      'did:hedera:testnet:alice123',
      'did:hedera:testnet:bob456',
      'did:hedera:testnet:charlie789'
    ];
    const owners = [signer.address, signer.address, signer.address];

    console.log('Batch registering domains...');
    await registry.batchRegisterDomains(domains, dids, owners);

    // Batch mint UBAuth tokens
    console.log('Batch minting UBAuth tokens...');
    await ubAuth.batchMintUBAuth(owners, dids, domains);

    console.log('✅ Enterprise batch operations complete!');

  } catch (error) {
    console.error('Batch operations failed:', error);
  }
}

// Example 5: Using Mock Contracts for Testing
export async function testingWithMocksExample() {
  // In a real test environment, you would import mock contracts
  // For this example, we'll simulate mock behavior
  const mockDomainNFT = {
    mintDomainNFT: async (domain: string, owner: string) => {
      console.log(`Mock minting domain ${domain} for ${owner}`);
      return 123;
    },
    getDomainInfo: async (tokenId: number) => {
      console.log(`Mock getting domain info for token ${tokenId}`);
      return {
        domain: 'test.iam',
        originalOwner: '0x123...',
        currentOwner: '0x123...',
        mintedAt: Date.now(),
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
        renewalCount: 0,
        isActive: true
      };
    }
  };

  const mockUBAuth = {
    mintUBAuth: async (owner: string, did: string, domain: string) => {
      console.log(`Mock minting UBAuth for ${owner} with DID ${did} and domain ${domain}`);
      return 456;
    },
    getIdentity: async (owner: string) => {
      console.log(`Mock getting identity for ${owner}`);
      return {
        did: 'did:test:123',
        primaryDomain: 'test.iam',
        serialNumber: 456
      };
    }
  };

  try {
    // Test domain minting
    const tokenId = await mockDomainNFT.mintDomainNFT('test.iam', '0x123...');
    console.log('Mock domain minted with token ID:', tokenId);

    // Test identity creation
    const serialNumber = await mockUBAuth.mintUBAuth(
      '0x123...',
      'did:test:123',
      'test.iam'
    );
    console.log('Mock identity created with serial:', serialNumber);

    // Test queries
    const identity = await mockUBAuth.getIdentity('0x123...');
    const domainInfo = await mockDomainNFT.getDomainInfo(tokenId);

    console.log('✅ Mock testing complete!');
    console.log('Identity:', identity);
    console.log('Domain Info:', domainInfo);

  } catch (error) {
    console.error('Mock testing failed:', error);
  }
}

// Example 6: Error Handling and Recovery
export async function errorHandlingExample() {
  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');
  const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  const domainNFT = new DomainNFTClient({
    contractAddress: '0x...',
    provider,
    signer
  });

  try {
    // Attempt to mint domain without signer
    const domainNFTReadOnly = new DomainNFTClient({
      contractAddress: '0x...',
      provider
      // No signer - read-only mode
    });

    // This will work - read operations
    const isRegistered = await domainNFTReadOnly.isDomainRegistered('test.iam');
    console.log('Domain registered:', isRegistered);

    // This will fail - write operations require signer
    try {
      await domainNFTReadOnly.mintDomainNFT('test.iam', signer.address);
    } catch (error) {
      console.log('Expected error for write operation without signer:', error instanceof Error ? error.message : String(error));
    }

  } catch (error) {
    console.error('Error handling example failed:', error);
  }
}

// Example 7: Event Listening
export async function eventListeningExample() {
  const provider = new ethers.JsonRpcProvider('https://testnet.hashio.io/api');

  const domainNFT = new DomainNFTClient({
    contractAddress: '0x...',
    provider
  });

  try {
    // Get the underlying contract to listen for events
    const contract = domainNFT.getContract() as unknown as ethers.Contract;

    // Listen for DomainNFTMinted events
    contract.on('DomainNFTMinted', (tokenId: bigint, domain: string, owner: string) => {
      console.log('New domain minted:', {
        tokenId: tokenId.toString(),
        domain,
        owner
      });
    });

    // Listen for DomainNFTRenewed events
    contract.on('DomainNFTRenewed', (domain: string, newExpiry: bigint) => {
      console.log('Domain renewed:', {
        domain,
        newExpiry: new Date(Number(newExpiry) * 1000).toISOString()
      });
    });

    console.log('✅ Event listeners set up');

    // Keep the script running to listen for events
    // In a real application, you'd handle this differently

  } catch (error) {
    console.error('Event listening failed:', error);
  }
}

// Export all examples
export const examples = {
  registerDomainExample,
  createIdentityExample,
  completeOnboardingExample,
  enterpriseBatchExample,
  testingWithMocksExample,
  errorHandlingExample,
  eventListeningExample
};

// Usage:
// import { examples } from './integration-examples';
// await examples.completeOnboardingExample();