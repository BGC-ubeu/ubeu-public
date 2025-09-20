import { UBeUClient } from '../client/UBeUClient';
import {
  DID,
  Domain,
  IdentityContext,
  AliasMapping,
  UserProfile,
  APIResponse,
  PaginatedResponse
} from '../types';

export class IdentityClient {
  constructor(private client: UBeUClient) {}

  /**
   * Create a new identity
   */
  async createIdentity(userData: {
    email?: string;
    walletAddress?: string;
    domains?: string[];
  }): Promise<APIResponse<{ user: UserProfile; primaryDid: DID }>> {
    return this.client.post('/api/v1/identity/register', userData);
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<APIResponse<UserProfile>> {
    return this.client.get('/api/v1/user/profile');
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<APIResponse<UserProfile>> {
    return this.client.put('/api/v1/user/profile', updates);
  }

  /**
   * Resolve DID
   */
  async resolveDID(did: string): Promise<APIResponse<any>> {
    return this.client.get(`/api/v1/identity/${encodeURIComponent(did)}`);
  }

  /**
   * Get user's DIDs
   */
  async getDIDs(userId?: string): Promise<APIResponse<DID[]>> {
    const url = userId ? `/api/v1/identity/dids?userId=${userId}` : '/api/v1/identity/dids';
    return this.client.get(url);
  }

  /**
   * Create a new DID
   */
  async createDID(context: DID['context'], userId?: string): Promise<APIResponse<DID>> {
    return this.client.post('/api/v1/identity/did', { context, userId });
  }

  /**
   * Update DID
   */
  async updateDID(did: string, updates: Partial<DID>): Promise<APIResponse<boolean>> {
    return this.client.put(`/api/v1/identity/did/${encodeURIComponent(did)}`, updates);
  }

  /**
   * Get user's domains
   */
  async getDomains(userId?: string): Promise<APIResponse<Domain[]>> {
    const url = userId ? `/api/v1/domains?userId=${userId}` : '/api/v1/domains';
    return this.client.get(url);
  }

  /**
   * Register a new domain
   */
  async registerDomain(domain: {
    name: string;
    type: Domain['type'];
    didId?: string;
  }): Promise<APIResponse<Domain>> {
    return this.client.post('/api/v1/domain/register', domain);
  }

  /**
   * Verify domain ownership
   */
  async verifyDomain(domain: string, expectedOwner: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/domain/verify', { domain, expectedOwner });
  }

  /**
   * Link domain to DID
   */
  async linkDomain(did: string, domain: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/identity/link-domain', { did, domain });
  }

  /**
   * Get identity context
   */
  async getIdentityContext(userId?: string): Promise<APIResponse<IdentityContext>> {
    const url = userId ? `/api/v1/identity/context?userId=${userId}` : '/api/v1/identity/context';
    return this.client.get(url);
  }

  /**
   * Export identity
   */
  async exportIdentity(password: string): Promise<APIResponse<any>> {
    return this.client.post('/api/v1/identity/export', { password });
  }

  /**
   * Import identity
   */
  async importIdentity(identityData: any, targetUserId?: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/identity/import', { identityData, targetUserId });
  }

  /**
   * Search identities
   */
  async searchIdentities(query: {
    did?: string;
    domain?: string;
    email?: string;
    walletAddress?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<UserProfile>> {
    return this.client.post('/api/v1/identity/search', query);
  }

  /**
   * Get identity statistics
   */
  async getStatistics(): Promise<APIResponse<any>> {
    return this.client.get('/api/v1/identity/statistics');
  }

  /**
   * Delete identity (dangerous operation)
   */
  async deleteIdentity(confirmation: string): Promise<APIResponse<boolean>> {
    return this.client.delete('/api/v1/identity', {
      data: { confirmation }
    });
  }

  /**
   * Get supported domain types
   */
  async getSupportedDomainTypes(): Promise<APIResponse<string[]>> {
    return this.client.get('/api/v1/domains/types');
  }

  /**
   * Check domain availability
   */
  async checkDomainAvailability(domain: string): Promise<APIResponse<boolean>> {
    return this.client.get(`/api/v1/domain/availability/${encodeURIComponent(domain)}`);
  }

  /**
   * Get domain pricing
   */
  async getDomainPricing(): Promise<APIResponse<any>> {
    return this.client.get('/api/v1/domain/pricing');
  }

  /**
   * Transfer domain ownership
   */
  async transferDomain(domainId: string, newOwnerId: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/domain/transfer', { domainId, newOwnerId });
  }

  /**
   * Get alias mappings
   */
  async getAliasMappings(userId?: string): Promise<APIResponse<AliasMapping[]>> {
    const url = userId ? `/api/v1/identity/aliases?userId=${userId}` : '/api/v1/identity/aliases';
    return this.client.get(url);
  }

  /**
   * Create alias mapping
   */
  async createAliasMapping(mapping: Omit<AliasMapping, 'id' | 'createdAt'>): Promise<APIResponse<AliasMapping>> {
    return this.client.post('/api/v1/identity/alias', mapping);
  }

  /**
   * Update alias mapping
   */
  async updateAliasMapping(aliasId: string, updates: Partial<AliasMapping>): Promise<APIResponse<boolean>> {
    return this.client.put(`/api/v1/identity/alias/${aliasId}`, updates);
  }

  /**
   * Delete alias mapping
   */
  async deleteAliasMapping(aliasId: string): Promise<APIResponse<boolean>> {
    return this.client.delete(`/api/v1/identity/alias/${aliasId}`);
  }
}