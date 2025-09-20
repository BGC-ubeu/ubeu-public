// Standard Multicall3 address deployed on most networks
const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

export const EVM_CHAIN_CONFIGS: Record<string, EVMConfig> = {
  ethereum: {
    chainId: 1,
    rpcUrls: [
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      'https://rpc.ankr.com/ethereum',
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    ].filter(url => !url.includes('undefined')),
    registryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // ENS Registry
    supportedTLDs: ['eth'],
    nameHashFunction: 'namehash',
    isNFTBased: false,
    multicallAddress: MULTICALL3_ADDRESS
  },

  ethereum_unstoppable: {
    chainId: 1,
    rpcUrls: [
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      'https://rpc.ankr.com/ethereum',
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    ].filter(url => !url.includes('undefined')),
    registryAddress: '0x049aba7510f45BA5b64ea9E658E342F904DB358D', // UNS Registry
    supportedTLDs: ['crypto', 'nft', 'x', 'wallet', 'dao', 'bitcoin', 'blockchain', '888'],
    nameHashFunction: 'custom',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  polygon: {
    chainId: 137,
    rpcUrls: [
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      'https://rpc.ankr.com/polygon',
      'https://polygon-rpc.com'
    ].filter(url => !url.includes('undefined')),
    registryAddress: '0xe2e1d82b050bb5bfec776b2653a72f093a8373ab', // Polygon Domains
    supportedTLDs: ['polygon', 'web3', 'pol'],
    nameHashFunction: 'namehash',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  polygon_unstoppable: {
    chainId: 137,
    rpcUrls: [
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      'https://rpc.ankr.com/polygon',
      'https://polygon-rpc.com'
    ].filter(url => !url.includes('undefined')),
    registryAddress: '0x049aba7510f45BA5b64ea9E658E342F904DB358D', // UNS on Polygon
    supportedTLDs: ['crypto', 'nft', 'x', 'wallet', 'dao', 'bitcoin', 'blockchain', '888'],
    nameHashFunction: 'custom',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  bnb: {
    chainId: 56,
    rpcUrls: [
      'https://bsc-dataseed.binance.org',
      'https://rpc.ankr.com/bsc',
      'https://bsc-dataseed1.defibit.io'
    ],
    registryAddress: '0x08ced32a7f3eec915ba84415e9c07a7286977956', // Space ID
    supportedTLDs: ['bnb'],
    nameHashFunction: 'namehash',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  avalanche: {
    chainId: 43114,
    rpcUrls: [
      'https://api.avax.network/ext/bc/C/rpc',
      'https://rpc.ankr.com/avalanche',
      'https://avalanche-c-chain.publicnode.com'
    ],
    registryAddress: '0x797ac669a1908ca68cd9854994345f570495541a',
    supportedTLDs: ['avax'],
    nameHashFunction: 'namehash',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  arbitrum: {
    chainId: 42161,
    rpcUrls: [
      'https://arb1.arbitrum.io/rpc',
      'https://rpc.ankr.com/arbitrum',
      'https://arbitrum-one.publicnode.com'
    ],
    registryAddress: '0x08ced32a7f3eec915ba84415e9c07a7286977956', // Space ID Arbitrum
    supportedTLDs: ['arb'],
    nameHashFunction: 'namehash',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  gravity: {
    chainId: 1625,
    rpcUrls: [
      'https://rpc.gravity.xyz',
      'https://rpc.ankr.com/gravity'
    ],
    registryAddress: '0x08ced32a7f3eec915ba84415e9c07a7286977956', // Space ID Arbitrum
    supportedTLDs: ['g'],
    nameHashFunction: 'namehash',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  },

  fantom: {
    chainId: 250,
    rpcUrls: [
      'https://rpc.fantom.network',
      'https://rpc.ankr.com/fantom',
      'https://fantom-mainnet.public.blastapi.io'
    ],
    registryAddress: '0x6393c82a8cdb073c97e496e44849f584539dc21d',
    supportedTLDs: ['ftm'],
    nameHashFunction: 'namehash',
    isNFTBased: true,
    multicallAddress: MULTICALL3_ADDRESS
  }
};