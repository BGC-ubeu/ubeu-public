import { UBeUClient } from '../client/UBeUClient';
import { APIResponse } from '../types';

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  connected: boolean;
  type: 'metamask' | 'walletconnect' | 'hashpack' | 'phantom' | 'other';
}

export interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed?: string;
  gasPrice?: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  network: string;
  type: 'transfer' | 'contract_call' | 'approval' | 'other';
}

export interface WalletConnection {
  connected: boolean;
  address?: string;
  network?: string;
  balance?: string;
  error?: string;
}

export class WalletClient {
  constructor(private client: UBeUClient) {}

  /**
   * Connect wallet
   */
  async connectWallet(walletType: WalletInfo['type'], network?: string): Promise<APIResponse<WalletConnection>> {
    return this.client.post('/api/v1/wallet/connect', { walletType, network });
  }

  /**
   * Disconnect wallet
   */
  async disconnectWallet(): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/wallet/disconnect');
  }

  /**
   * Get wallet info
   */
  async getWalletInfo(): Promise<APIResponse<WalletInfo>> {
    return this.client.get('/api/v1/wallet/info');
  }

  /**
   * Get wallet balance
   */
  async getBalance(address?: string, network?: string): Promise<APIResponse<string>> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (network) params.append('network', network);

    const query = params.toString();
    const url = query ? `/api/v1/wallet/balance?${query}` : '/api/v1/wallet/balance';

    return this.client.get(url);
  }

  /**
   * Send transaction
   */
  async sendTransaction(transaction: {
    to: string;
    value: string;
    data?: string;
    gasLimit?: string;
    gasPrice?: string;
    network?: string;
  }): Promise<APIResponse<Transaction>> {
    return this.client.post('/api/v1/wallet/send', transaction);
  }

  /**
   * Sign message
   */
  async signMessage(message: string, address?: string): Promise<APIResponse<string>> {
    return this.client.post('/api/v1/wallet/sign', { message, address });
  }

  /**
   * Verify signature
   */
  async verifySignature(message: string, signature: string, address: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/wallet/verify', { message, signature, address });
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(address?: string, limit?: number, offset?: number): Promise<APIResponse<Transaction[]>> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    const query = params.toString();
    const url = query ? `/api/v1/wallet/transactions?${query}` : '/api/v1/wallet/transactions';

    return this.client.get(url);
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(hash: string, network?: string): Promise<APIResponse<Transaction>> {
    const url = network ? `/api/v1/wallet/transaction/${hash}?network=${network}` : `/api/v1/wallet/transaction/${hash}`;
    return this.client.get(url);
  }

  /**
   * Estimate gas
   */
  async estimateGas(transaction: {
    to: string;
    value?: string;
    data?: string;
    from?: string;
  }): Promise<APIResponse<string>> {
    return this.client.post('/api/v1/wallet/estimate-gas', transaction);
  }

  /**
   * Get gas price
   */
  async getGasPrice(network?: string): Promise<APIResponse<string>> {
    const url = network ? `/api/v1/wallet/gas-price?network=${network}` : '/api/v1/wallet/gas-price';
    return this.client.get(url);
  }

  /**
   * Get supported networks
   */
  async getSupportedNetworks(): Promise<APIResponse<string[]>> {
    return this.client.get('/api/v1/wallet/networks');
  }

  /**
   * Switch network
   */
  async switchNetwork(network: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/wallet/switch-network', { network });
  }

  /**
   * Add network
   */
  async addNetwork(networkConfig: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
  }): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/wallet/add-network', networkConfig);
  }

  /**
   * Get wallet tokens
   */
  async getTokens(address?: string, network?: string): Promise<APIResponse<any[]>> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (network) params.append('network', network);

    const query = params.toString();
    const url = query ? `/api/v1/wallet/tokens?${query}` : '/api/v1/wallet/tokens';

    return this.client.get(url);
  }

  /**
   * Get token balance
   */
  async getTokenBalance(tokenAddress: string, walletAddress?: string, network?: string): Promise<APIResponse<string>> {
    const params = new URLSearchParams();
    params.append('tokenAddress', tokenAddress);
    if (walletAddress) params.append('walletAddress', walletAddress);
    if (network) params.append('network', network);

    return this.client.get(`/api/v1/wallet/token-balance?${params.toString()}`);
  }

  /**
   * Transfer tokens
   */
  async transferTokens(transfer: {
    tokenAddress: string;
    to: string;
    amount: string;
    network?: string;
  }): Promise<APIResponse<Transaction>> {
    return this.client.post('/api/v1/wallet/transfer-tokens', transfer);
  }

  /**
   * Approve token spending
   */
  async approveTokenSpending(approval: {
    tokenAddress: string;
    spender: string;
    amount: string;
    network?: string;
  }): Promise<APIResponse<Transaction>> {
    return this.client.post('/api/v1/wallet/approve', approval);
  }

  /**
   * Get token allowance
   */
  async getTokenAllowance(tokenAddress: string, owner: string, spender: string, network?: string): Promise<APIResponse<string>> {
    const params = new URLSearchParams();
    params.append('tokenAddress', tokenAddress);
    params.append('owner', owner);
    params.append('spender', spender);
    if (network) params.append('network', network);

    return this.client.get(`/api/v1/wallet/token-allowance?${params.toString()}`);
  }

  /**
   * Get NFT balance
   */
  async getNFTBalance(address?: string, network?: string): Promise<APIResponse<any[]>> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (network) params.append('network', network);

    const query = params.toString();
    const url = query ? `/api/v1/wallet/nfts?${query}` : '/api/v1/wallet/nfts';

    return this.client.get(url);
  }

  /**
   * Transfer NFT
   */
  async transferNFT(transfer: {
    contractAddress: string;
    tokenId: string;
    to: string;
    network?: string;
  }): Promise<APIResponse<Transaction>> {
    return this.client.post('/api/v1/wallet/transfer-nft', transfer);
  }

  /**
   * Get wallet statistics
   */
  async getWalletStatistics(address?: string, timeRange?: string): Promise<APIResponse<any>> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (timeRange) params.append('timeRange', timeRange);

    const query = params.toString();
    const url = query ? `/api/v1/wallet/statistics?${query}` : '/api/v1/wallet/statistics';

    return this.client.get(url);
  }

  /**
   * Export wallet data
   */
  async exportWalletData(address?: string, includeTransactions?: boolean): Promise<APIResponse<any>> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (includeTransactions !== undefined) params.append('includeTransactions', includeTransactions.toString());

    return this.client.get(`/api/v1/wallet/export?${params.toString()}`);
  }

  /**
   * Validate wallet address
   */
  async validateAddress(address: string, network?: string): Promise<APIResponse<boolean>> {
    const url = network ? `/api/v1/wallet/validate/${address}?network=${network}` : `/api/v1/wallet/validate/${address}`;
    return this.client.get(url);
  }

  /**
   * Get wallet connection status
   */
  async getConnectionStatus(): Promise<APIResponse<WalletConnection>> {
    return this.client.get('/api/v1/wallet/status');
  }

  /**
   * Refresh wallet data
   */
  async refreshWalletData(): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/wallet/refresh');
  }

  /**
   * Get wallet notifications
   */
  async getWalletNotifications(limit?: number): Promise<APIResponse<any[]>> {
    const url = limit ? `/api/v1/wallet/notifications?limit=${limit}` : '/api/v1/wallet/notifications';
    return this.client.get(url);
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: string): Promise<APIResponse<boolean>> {
    return this.client.put(`/api/v1/wallet/notification/${notificationId}/read`);
  }
}