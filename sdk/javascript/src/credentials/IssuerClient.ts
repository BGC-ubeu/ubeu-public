import { UBeUClient } from '../client/UBeUClient';
import {
  VerifiableCredential,
  CredentialSchema,
  APIResponse,
  PaginatedResponse
} from '../types';

export interface IssuerProfile {
  id: string;
  name: string;
  did: string;
  description?: string;
  website?: string;
  logo?: string;
  verificationStatus: 'pending' | 'verified' | 'suspended';
  createdAt: string;
  // New fields for enterprise accounts
  parentDomain?: string;
  dnsVerificationStatus?: 'pending' | 'verified' | 'failed';
  dnsChallenge?: string;
  dnsChallengeExpiry?: string;
  enterpriseTier?: 'pro' | 'enterprise';
  apiKey?: string;
  usageLimits?: {
    monthlyCredentials: number;
    currentMonthUsage: number;
  };
}

export interface CredentialTemplate {
  id: string;
  name: string;
  description: string;
  schemaId: string;
  issuerId: string;
  templateData: Record<string, any>;
  isActive: boolean;
  createdAt: string;
}

export class IssuerClient {
  constructor(private client: UBeUClient) {}

  /**
   * Register as a credential issuer (PostgreSQL-backed enterprise account)
   */
  async registerIssuer(profile: {
    name: string;
    description?: string;
    website?: string;
    logo?: string;
    parentDomain: string; // Required for DNS verification
    enterpriseTier?: 'pro' | 'enterprise';
  }): Promise<APIResponse<IssuerProfile>> {
    return this.client.post('/api/v1/issuers/register', profile);
  }

  /**
   * Initiate DNS verification for enterprise domain
   */
  async initiateDNSVerification(issuerId: string): Promise<APIResponse<{
    challenge: string;
    txtRecord: string;
    verificationUrl: string;
    expiresAt: string;
  }>> {
    return this.client.post(`/api/v1/issuers/${issuerId}/dns-verification/initiate`);
  }

  /**
   * Verify DNS challenge completion
   */
  async verifyDNSChallenge(issuerId: string): Promise<APIResponse<{
    verified: boolean;
    status: 'verified' | 'pending' | 'failed';
    message: string;
  }>> {
    return this.client.post(`/api/v1/issuers/${issuerId}/dns-verification/verify`);
  }

  /**
   * Get DNS verification status
   */
  async getDNSVerificationStatus(issuerId: string): Promise<APIResponse<{
    status: 'pending' | 'verified' | 'failed' | 'expired';
    challenge?: string;
    verifiedAt?: string;
    expiresAt?: string;
    lastChecked?: string;
  }>> {
    return this.client.get(`/api/v1/issuers/${issuerId}/dns-verification/status`);
  }

  /**
   * Get issuer profile
   */
  async getIssuerProfile(issuerId?: string): Promise<APIResponse<IssuerProfile>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}` : '/api/v1/issuers/profile';
    return this.client.get(url);
  }

  /**
   * Update issuer profile
   */
  async updateIssuerProfile(updates: Partial<IssuerProfile>): Promise<APIResponse<boolean>> {
    return this.client.put('/api/v1/issuers/profile', updates);
  }

  /**
   * Create a credential template
   */
  async createTemplate(template: {
    name: string;
    description: string;
    schemaId: string;
    templateData: Record<string, any>;
  }): Promise<APIResponse<CredentialTemplate>> {
    return this.client.post('/api/v1/issuers/templates', template);
  }

  /**
   * Get issuer's templates
   */
  async getTemplates(): Promise<APIResponse<CredentialTemplate[]>> {
    return this.client.get('/api/v1/issuers/templates');
  }

  /**
   * Update template
   */
  async updateTemplate(templateId: string, updates: Partial<CredentialTemplate>): Promise<APIResponse<boolean>> {
    return this.client.put(`/api/v1/issuers/templates/${templateId}`, updates);
  }

  /**
   * Delete template
   */
  async deleteTemplate(templateId: string): Promise<APIResponse<boolean>> {
    return this.client.delete(`/api/v1/issuers/templates/${templateId}`);
  }

  /**
   * Issue credential to UBeU identity holder
   */
  async issueCredential(recipientId: string, credentialData: {
    type: string[];
    claims: Record<string, any>;
    expirationDate?: string;
    schemaId?: string;
    templateId?: string;
    deliveryMethod?: 'push' | 'email' | 'wallet';
  }): Promise<APIResponse<VerifiableCredential>> {
    return this.client.post('/api/v1/issuers/credentials/issue', {
      recipientId,
      ...credentialData
    });
  }

  /**
   * Bulk issue credentials
   */
  async bulkIssueCredentials(recipients: Array<{
    recipientId: string;
    credentialData: {
      type: string[];
      claims: Record<string, any>;
      expirationDate?: string;
      schemaId?: string;
    };
  }>): Promise<APIResponse<{ issued: number; failed: number; results: any[] }>> {
    return this.client.post('/api/v1/issuers/credentials/bulk-issue', { recipients });
  }

  /**
   * Get issued credentials
   */
  async getIssuedCredentials(filters?: {
    status?: string;
    recipientId?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<VerifiableCredential>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }

    const query = params.toString();
    const url = query ? `/api/v1/issuers/credentials?${query}` : '/api/v1/issuers/credentials';

    return this.client.get(url);
  }

  /**
   * Revoke an issued credential
   */
  async revokeCredential(credentialId: string, reason?: string): Promise<APIResponse<boolean>> {
    return this.client.post('/api/v1/issuers/credentials/revoke', { credentialId, reason });
  }

  /**
   * Get issuer statistics
   */
  async getStatistics(timeRange?: string): Promise<APIResponse<{
    totalCredentials: number;
    activeCredentials: number;
    revokedCredentials: number;
    totalRecipients: number;
    topSchemas: Array<{ schemaId: string; count: number }>;
    issuanceTrend: Array<{ date: string; count: number }>;
    // New treasury and usage tracking fields
    networkSpend: {
      totalSpent: number; // in USD cents
      monthlySpent: number;
      remainingAllowance: number;
      resetDate: string;
    };
    usageMetrics: {
      monthlyCredentials: number;
      currentMonthUsage: number;
      apiCalls: number;
      successRate: number;
    };
  }>> {
    const url = timeRange ? `/api/v1/issuers/statistics?timeRange=${timeRange}` : '/api/v1/issuers/statistics';
    return this.client.get(url);
  }

  /**
   * Get treasury-sponsored network spend tracking
   */
  async getNetworkSpend(): Promise<APIResponse<{
    totalSpent: number; // USD cents
    monthlySpent: number;
    remainingAllowance: number;
    transactions: Array<{
      id: string;
      type: string;
      amount: number; // tinybars
      usdValue: number; // cents
      timestamp: string;
      description: string;
    }>;
    resetDate: string;
  }>> {
    return this.client.get('/api/v1/issuers/treasury/spend');
  }

  /**
   * Get usage limits and current consumption
   */
  async getUsageLimits(): Promise<APIResponse<{
    tier: string;
    limits: {
      monthlyCredentials: number;
      apiCallsPerMinute: number;
      storageGB: number;
    };
    currentUsage: {
      credentialsThisMonth: number;
      apiCallsToday: number;
      storageUsedGB: number;
    };
    resetDate: string;
  }>> {
    return this.client.get('/api/v1/issuers/limits');
  }

  /**
   * Upgrade enterprise tier
   */
  async upgradeTier(newTier: 'pro' | 'enterprise'): Promise<APIResponse<{
    success: boolean;
    newLimits: any;
    effectiveDate: string;
  }>> {
    return this.client.post('/api/v1/issuers/upgrade', { tier: newTier });
  }

  /**
   * Verify recipient identity before issuance
   */
  async verifyRecipient(recipientId: string): Promise<APIResponse<{
    isValid: boolean;
    identity?: any;
    verificationStatus: string;
  }>> {
    return this.client.post('/api/v1/issuers/verify-recipient', { recipientId });
  }

  /**
   * Get available credential schemas
   */
  async getAvailableSchemas(): Promise<APIResponse<CredentialSchema[]>> {
    return this.client.get('/api/v1/schemas/public');
  }

  /**
   * Create custom credential schema
   */
  async createSchema(schema: {
    name: string;
    version: string;
    type: string;
    schema: any;
    description?: string;
  }): Promise<APIResponse<CredentialSchema>> {
    return this.client.post('/api/v1/issuers/schemas', schema);
  }

  /**
   * Get issuer's custom schemas
   */
  async getCustomSchemas(): Promise<APIResponse<CredentialSchema[]>> {
    return this.client.get('/api/v1/issuers/schemas');
  }

  // OpenID4VCI Support Methods

  /**
   * Get OpenID4VCI credential issuer metadata
   */
  async getCredentialIssuerMetadata(): Promise<APIResponse<{
    credential_issuer: string;
    authorization_servers?: string[];
    credential_endpoint: string;
    deferred_credential_endpoint?: string;
    credentials_supported: Array<{
      format: string;
      types: string[];
      cryptographic_binding_methods_supported?: string[];
      cryptographic_suites_supported?: string[];
      display?: Array<{
        name: string;
        locale?: string;
        logo?: { url: string; alt_text?: string };
        description?: string;
        background_color?: string;
        text_color?: string;
      }>;
    }>;
  }>> {
    return this.client.get('/api/v1/issuers/.well-known/openid-credential-issuer');
  }

  /**
   * Create OpenID4VCI credential offer
   */
  async createCredentialOffer(offer: {
    credential_configuration_ids: string[];
    grants?: {
      authorization_code?: {
        issuer_state?: string;
      };
      'urn:ietf:params:oauth:grant-type:pre-authorized_code'?: {
        'pre-authorized_code': string;
        user_pin_required?: boolean;
      };
    };
  }): Promise<APIResponse<{
    credential_offer: {
      credential_issuer: string;
      credentials: Array<{
        format: string;
        types: string[];
        trust_framework?: any;
      }>;
      grants: any;
    };
    credential_offer_uri: string;
  }>> {
    return this.client.post('/api/v1/issuers/credential-offer', offer);
  }

  /**
   * Issue credential via OpenID4VCI
   */
  async issueCredentialOpenID4VCI(request: {
    credential_request: {
      format: string;
      credential_definition: {
        type: string[];
        credentialSubject?: any;
      };
      proof?: {
        proof_type: string;
        jwt?: string;
        cwt?: string;
      };
    };
  }): Promise<APIResponse<{
    format: string;
    credential: any;
    c_nonce?: string;
    c_nonce_expires_in?: number;
  }>> {
    return this.client.post('/api/v1/issuers/credentials/issue-openid4vci', request);
  }

  /**
   * Handle deferred credential request
   */
  async getDeferredCredential(transactionId: string): Promise<APIResponse<{
    format: string;
    credential: any;
    c_nonce?: string;
    c_nonce_expires_in?: number;
  }>> {
    return this.client.post('/api/v1/issuers/deferred-credential', { transaction_id: transactionId });
  }

  // OpenID4VP Support Methods

  /**
   * Create presentation request (OpenID4VP)
   */
  async createPresentationRequest(request: {
    presentation_definition: {
      id: string;
      input_descriptors: Array<{
        id: string;
        name?: string;
        purpose?: string;
        format?: any;
        constraints?: {
          fields?: Array<{
            path: string[];
            filter?: any;
            predicate?: string;
          }>;
        };
      }>;
    };
    response_mode?: string;
    response_type?: string;
    client_id?: string;
    redirect_uri?: string;
    state?: string;
    nonce?: string;
  }): Promise<APIResponse<{
    request_uri: string;
    presentation_request_uri: string;
    expires_in: number;
  }>> {
    return this.client.post('/api/v1/issuers/presentation-request', request);
  }

  /**
   * Verify presentation response
   */
  async verifyPresentationResponse(response: {
    vp_token: string;
    presentation_submission?: any;
    state?: string;
  }): Promise<APIResponse<{
    verified: boolean;
    holder_did?: string;
    credentials_verified: Array<{
      credential_id: string;
      verified: boolean;
      verification_result: any;
    }>;
  }>> {
    return this.client.post('/api/v1/issuers/presentation-response/verify', response);
  }
}