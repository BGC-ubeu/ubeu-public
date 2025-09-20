import { UBeUClient } from '../client/UBeUClient';
import {
  VerifiableCredential,
  CredentialOffer,
  CredentialSchema,
  APIResponse,
  PaginatedResponse
} from '../types';

export class CredentialClient {
  constructor(private client: UBeUClient) {}

  /**
   * Issue a verifiable credential to a UBeU identity holder
   */
  async issueCredential(credentialData: {
    type: string[];
    subjectId: string;  // UBeU identity (DID or domain)
    claims: Record<string, any>;
    expirationDate?: string;
    schemaId?: string;
    issuerName?: string;  // For display purposes
    deliveryMethod?: 'push' | 'email' | 'wallet';  // How to deliver to recipient
  }): Promise<APIResponse<VerifiableCredential>> {
    return this.client.post('/api/v1/credentials/issue', credentialData);
  }

  /**
   * Bulk issue credentials to multiple recipients
   */
  async bulkIssueCredentials(credentialsData: Array<{
    type: string[];
    subjectId: string;
    claims: Record<string, any>;
    expirationDate?: string;
    schemaId?: string;
  }>): Promise<APIResponse<{ issued: number; failed: number; results: any[] }>> {
    return this.client.post('/api/v1/credentials/bulk-issue', { credentials: credentialsData });
  }

  /**
   * Issue credential using a predefined template
   */
  async issueFromTemplate(templateId: string, recipientId: string, customData?: Record<string, any>): Promise<APIResponse<VerifiableCredential>> {
    return this.client.post('/api/v1/credentials/issue-template', {
      templateId,
      recipientId,
      customData
    });
  }

  /**
   * Verify a credential
   */
  async verifyCredential(credentialId: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/verify', { credentialId });
  }

  /**
   * Get credential by ID
   */
  async getCredential(credentialId: string): Promise<APIResponse<VerifiableCredential>> {
    return this.client.get(`/api/v1/credential/${credentialId}`);
  }

  /**
   * Get user's credentials
   */
  async getUserCredentials(userId?: string, status?: string): Promise<APIResponse<VerifiableCredential[]>> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (status) params.append('status', status);

    const query = params.toString();
    const url = query ? `/api/v1/credentials?${query}` : '/api/v1/credentials';

    return this.client.get(url);
  }

  /**
   * Revoke a credential
   */
  async revokeCredential(credentialId: string, reason?: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/revoke', { credentialId, reason });
  }

  /**
   * Update credential status
   */
  async updateCredentialStatus(credentialId: string, status: string): Promise<APIResponse<boolean>> {
    return this.client.put(`/api/v1/credential/${credentialId}/status`, { status });
  }

  /**
   * Get credential offers for user
   */
  async getCredentialOffers(userId?: string, status?: string): Promise<APIResponse<CredentialOffer[]>> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (status) params.append('status', status);

    const query = params.toString();
    const url = query ? `/api/v1/credential/offers?${query}` : '/api/v1/credential/offers';

    return this.client.get(url);
  }

  /**
   * Accept credential offer
   */
  async acceptCredentialOffer(offerId: string, targetDid?: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/offer/accept', { offerId, targetDid });
  }

  /**
   * Decline credential offer
   */
  async declineCredentialOffer(offerId: string, reason?: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/offer/decline', { offerId, reason });
  }

  /**
   * Reassign credential offer to different DID
   */
  async reassignCredentialOffer(offerId: string, targetDid: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/offer/reassign', { offerId, targetDid });
  }

  /**
   * Create credential schema
   */
  async createSchema(schemaData: {
    name: string;
    version: string;
    type: string;
    schema: any;
  }): Promise<APIResponse<CredentialSchema>> {
    return this.client.post('/api/v1/credential/schema', schemaData);
  }

  /**
   * Get credential schema
   */
  async getSchema(schemaId: string): Promise<APIResponse<CredentialSchema>> {
    return this.client.get(`/api/v1/credential/schema/${schemaId}`);
  }

  /**
   * Get all credential schemas
   */
  async getSchemas(): Promise<APIResponse<CredentialSchema[]>> {
    return this.client.get('/api/v1/credential/schemas');
  }

  /**
   * Update credential schema
   */
  async updateSchema(schemaId: string, updates: Partial<CredentialSchema>): Promise<APIResponse<boolean>> {
    return this.client.put(`/api/v1/credential/schema/${schemaId}`, updates);
  }

  /**
   * Delete credential schema
   */
  async deleteSchema(schemaId: string): Promise<APIResponse<boolean>> {
    return this.client.delete(`/api/v1/credential/schema/${schemaId}`);
  }

  /**
   * Search credentials
   */
  async searchCredentials(query: {
    issuer?: string;
    subject?: string;
    type?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<VerifiableCredential>> {
    return this.client.post('/api/v1/credential/search', query);
  }

  /**
   * Get credential statistics
   */
  async getStatistics(timeRange?: string): Promise<APIResponse<any>> {
    const url = timeRange ? `/api/v1/credential/statistics?timeRange=${timeRange}` : '/api/v1/credential/statistics';
    return this.client.get(url);
  }

  /**
   * Export credentials
   */
  async exportCredentials(userId?: string, format: 'json' | 'jsonld' = 'json'): Promise<APIResponse<any>> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    params.append('format', format);

    return this.client.get(`/api/v1/credential/export?${params.toString()}`);
  }

  /**
   * Import credentials
   */
  async importCredentials(credentialsData: any, userId?: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/import', { credentialsData, userId });
  }

  /**
   * Get credential types
   */
  async getCredentialTypes(): Promise<APIResponse<string[]>> {
    return this.client.get('/api/v1/credential/types');
  }

  /**
   * Validate credential data against schema
   */
  async validateCredentialData(credentialData: any, schemaId: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/validate', { credentialData, schemaId });
  }

  /**
   * Get credential proof
   */
  async getCredentialProof(credentialId: string): Promise<APIResponse<any>> {
    return this.client.get(`/api/v1/credential/${credentialId}/proof`);
  }

  /**
   * Verify credential proof
   */
  async verifyCredentialProof(credentialId: string, proof: any): Promise<APIResponse<boolean>> {
    return this.client.post(`/api/v1/credential/${credentialId}/verify-proof`, { proof });
  }

  /**
   * Get credential history
   */
  async getCredentialHistory(credentialId: string): Promise<APIResponse<any[]>> {
    return this.client.get(`/api/v1/credential/${credentialId}/history`);
  }

  /**
   * Share credential
   */
  async shareCredential(credentialId: string, recipientDid: string, permissions?: string[]): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/share', {
      credentialId,
      recipientDid,
      permissions
    });
  }

  /**
   * Get shared credentials
   */
  async getSharedCredentials(userId?: string): Promise<APIResponse<any[]>> {
    const url = userId ? `/api/v1/credential/shared?userId=${userId}` : '/api/v1/credential/shared';
    return this.client.get(url);
  }

  /**
   * Revoke credential sharing
   */
  async revokeCredentialSharing(credentialId: string, recipientDid: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/credential/revoke-sharing', {
      credentialId,
      recipientDid
    });
  }
}