import { UBeUClient } from '../client/UBeUClient';
import { APIResponse } from '../types';

export interface EnterpriseAccount {
  id: string;
  companyName: string;
  parentDomain: string;
  contactEmail: string;
  contactName?: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  tier: 'pro' | 'enterprise';
  status: 'pending_verification' | 'active' | 'suspended' | 'cancelled';
  dnsVerificationStatus: 'pending' | 'verified' | 'failed' | 'expired';
  dnsChallenge?: string;
  dnsChallengeExpiry?: string;
  apiKey: string;
  managedDid: string;
  hederaAccountId: string;
  hcsTopicId: string;
  createdAt: string;
  verifiedAt?: string;
  lastActivityAt?: string;
}

export interface DNSVerificationChallenge {
  challenge: string;
  txtRecord: string;
  verificationUrl: string;
  expiresAt: string;
  instructions: string[];
}

export interface UsageMetrics {
  tier: string;
  limits: {
    monthlyCredentials: number;
    apiCallsPerMinute: number;
    storageGB: number;
    concurrentUsers: number;
  };
  currentUsage: {
    credentialsThisMonth: number;
    apiCallsToday: number;
    storageUsedGB: number;
    activeUsers: number;
  };
  resetDate: string;
  nextBillingDate: string;
}

export interface NetworkSpend {
  totalSpent: number; // USD cents
  monthlySpent: number;
  remainingAllowance: number;
  transactions: Array<{
    id: string;
    type: 'TOPIC_CREATE' | 'TOPIC_MESSAGE' | 'TOKEN_TRANSFER' | 'CONTRACT_CALL';
    amount: number; // tinybars
    usdValue: number; // cents
    timestamp: string;
    description: string;
    transactionId?: string;
  }>;
  resetDate: string;
  allowanceRenewalDate: string;
}

export class EnterpriseClient {
  constructor(private client: UBeUClient) {}

  /**
   * Register new enterprise account
   */
  async registerEnterprise(account: {
    companyName: string;
    parentDomain: string;
    contactEmail: string;
    contactName?: string;
    description?: string;
    logo?: string;
    website?: string;
    industry?: string;
    companySize?: string;
    tier: 'pro' | 'enterprise';
  }): Promise<APIResponse<{
    account: EnterpriseAccount;
    nextSteps: string[];
    estimatedActivationTime: string;
  }>> {
    return this.client.post('/api/v1/enterprise/register', account);
  }

  /**
   * Get enterprise account details
   */
  async getEnterpriseAccount(accountId?: string): Promise<APIResponse<EnterpriseAccount>> {
    const url = accountId ? `/api/v1/enterprise/accounts/${accountId}` : '/api/v1/enterprise/account';
    return this.client.get(url);
  }

  /**
   * Update enterprise account
   */
  async updateEnterpriseAccount(updates: Partial<EnterpriseAccount>): Promise<APIResponse<EnterpriseAccount>> {
    return this.client.put('/api/v1/enterprise/account', updates);
  }

  /**
   * Initiate DNS verification for domain ownership
   */
  async initiateDNSVerification(accountId: string): Promise<APIResponse<DNSVerificationChallenge>> {
    return this.client.post(`/api/v1/enterprise/accounts/${accountId}/dns-verification/initiate`);
  }

  /**
   * Check DNS verification status
   */
  async checkDNSVerification(accountId: string): Promise<APIResponse<{
    status: 'pending' | 'verified' | 'failed' | 'expired';
    verifiedAt?: string;
    lastChecked: string;
    nextCheck?: string;
    errorMessage?: string;
  }>> {
    return this.client.get(`/api/v1/enterprise/accounts/${accountId}/dns-verification/status`);
  }

  /**
   * Manually trigger DNS verification check
   */
  async verifyDNSChallenge(accountId: string): Promise<APIResponse<{
    verified: boolean;
    status: 'verified' | 'failed' | 'still_pending';
    message: string;
    accountActivated?: boolean;
  }>> {
    return this.client.post(`/api/v1/enterprise/accounts/${accountId}/dns-verification/verify`);
  }

  /**
   * Get usage metrics and limits
   */
  async getUsageMetrics(accountId?: string): Promise<APIResponse<UsageMetrics>> {
    const url = accountId ? `/api/v1/enterprise/accounts/${accountId}/usage` : '/api/v1/enterprise/usage';
    return this.client.get(url);
  }

  /**
   * Get network spend tracking
   */
  async getNetworkSpend(accountId?: string): Promise<APIResponse<NetworkSpend>> {
    const url = accountId ? `/api/v1/enterprise/accounts/${accountId}/spend` : '/api/v1/enterprise/spend';
    return this.client.get(url);
  }

  /**
   * Upgrade enterprise tier
   */
  async upgradeTier(newTier: 'pro' | 'enterprise'): Promise<APIResponse<{
    success: boolean;
    newLimits: UsageMetrics['limits'];
    effectiveDate: string;
    proratedAmount?: number;
  }>> {
    return this.client.post('/api/v1/enterprise/upgrade', { tier: newTier });
  }

  /**
   * Regenerate API key
   */
  async regenerateApiKey(accountId?: string): Promise<APIResponse<{
    newApiKey: string;
    oldApiKeyExpiresAt: string;
    message: string;
  }>> {
    const url = accountId ? `/api/v1/enterprise/accounts/${accountId}/api-key` : '/api/v1/enterprise/api-key';
    return this.client.post(url);
  }

  /**
   * Get enterprise billing history
   */
  async getBillingHistory(accountId?: string, filters?: {
    fromDate?: string;
    toDate?: string;
    status?: 'paid' | 'pending' | 'failed';
    limit?: number;
  }): Promise<APIResponse<Array<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    description: string;
    invoiceDate: string;
    paidAt?: string;
    invoiceUrl?: string;
  }>>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }

    const query = params.toString();
    const baseUrl = accountId ? `/api/v1/enterprise/accounts/${accountId}/billing` : '/api/v1/enterprise/billing';
    const url = query ? `${baseUrl}?${query}` : baseUrl;

    return this.client.get(url);
  }

  /**
   * Get enterprise analytics
   */
  async getAnalytics(accountId?: string, timeRange?: string): Promise<APIResponse<{
    overview: {
      totalCredentials: number;
      activeCredentials: number;
      totalRecipients: number;
      averageIssuanceTime: number;
    };
    trends: {
      dailyIssuance: Array<{ date: string; count: number }>;
      credentialTypes: Array<{ type: string; count: number }>;
      topRecipients: Array<{ recipientId: string; count: number }>;
    };
    performance: {
      apiResponseTime: number;
      successRate: number;
      errorRate: number;
    };
  }>> {
    const baseUrl = accountId ? `/api/v1/enterprise/accounts/${accountId}/analytics` : '/api/v1/enterprise/analytics';
    const url = timeRange ? `${baseUrl}?timeRange=${timeRange}` : baseUrl;
    return this.client.get(url);
  }

  /**
   * Suspend enterprise account
   */
  async suspendAccount(accountId: string, reason: string): Promise<APIResponse<{
    success: boolean;
    suspensionDate: string;
    reactivationInstructions: string;
  }>> {
    return this.client.post(`/api/v1/enterprise/accounts/${accountId}/suspend`, { reason });
  }

  /**
   * Reactivate suspended account
   */
  async reactivateAccount(accountId: string): Promise<APIResponse<{
    success: boolean;
    reactivationDate: string;
    message: string;
  }>> {
    return this.client.post(`/api/v1/enterprise/accounts/${accountId}/reactivate`);
  }

  /**
   * Delete enterprise account (soft delete)
   */
  async deleteAccount(accountId: string, confirmation: string): Promise<APIResponse<{
    success: boolean;
    deletionDate: string;
    dataRetentionPeriod: string;
    message: string;
  }>> {
    return this.client.delete(`/api/v1/enterprise/accounts/${accountId}`, { data: { confirmation } });
  }
}