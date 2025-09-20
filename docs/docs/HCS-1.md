// ✅ Proper HCS-1 service initialization
import { HcsFileService, HederaHcsService } from '@hiero-did-sdk/hcs';
import { PrivateKey, Client } from '@hashgraph/sdk';

class CredentialStorageService {
  private hcsFileService: HcsFileService;
  private hcsService: HederaHcsService;

  constructor() {
    // 1. Configure network settings
    const networkConfig = {
      networks: [
        {
          network: 'testnet',                    // or 'mainnet'
          operatorId: process.env.HEDERA_ACCOUNT_ID!,
          operatorKey: process.env.HEDERA_PRIVATE_KEY!
        }
      ],
      cache: { maxSize: 1000 }                 // LRU cache for performance
    };

    // 2. Initialize HCS service with proper config
    this.hcsService = new HederaHcsService(networkConfig);

    // 3. Get Hedera client from service
    const client = this.hcsService.getClient('testnet');
    
    // 4. Initialize file service with client and cache
    this.hcsFileService = new HcsFileService(
      client, 
      { maxSize: 500 }  // Cache config for files
    );
  }
}

// Based on documentation, these are the correct signatures:

// HederaHcsService constructor
const hcsService = new HederaHcsService({
  networks: NetworkConfig[],           // Array of network configurations
  cache?: CacheConfig | Cache         // Optional cache configuration
});

// HcsFileService constructor  
const fileService = new HcsFileService(
  client: Client,                     // Hedera SDK client
  cache?: CacheConfig | Cache | HcsCacheService  // Optional cache
);

// Cache configuration options
interface CacheConfig {
  maxSize: number;                    // Maximum cached items
}

interface Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  cleanupExpired(): Promise<void>;
}