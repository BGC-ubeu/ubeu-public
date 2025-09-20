import { UBeUClient } from '../client/UBeUClient';
import { APIResponse } from '../types';

export interface OpenID4VCIMetadata {
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
}

export interface CredentialOffer {
  credential_offer: {
    credential_issuer: string;
    credentials: Array<{
      format: string;
      types: string[];
      trust_framework?: any;
    }>;
    grants: {
      authorization_code?: {
        issuer_state?: string;
      };
      'urn:ietf:params:oauth:grant-type:pre-authorized_code'?: {
        'pre-authorized_code': string;
        user_pin_required?: boolean;
      };
    };
  };
  credential_offer_uri: string;
}

export interface CredentialRequest {
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
}

export interface CredentialResponse {
  format: string;
  credential: any;
  c_nonce?: string;
  c_nonce_expires_in?: number;
}

export interface DeferredCredentialResponse {
  format: string;
  credential: any;
  c_nonce?: string;
  c_nonce_expires_in?: number;
}

export interface PresentationRequest {
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
}

export interface PresentationResponse {
  vp_token: string;
  presentation_submission?: any;
  state?: string;
}

export interface PresentationVerificationResult {
  verified: boolean;
  holder_did?: string;
  credentials_verified: Array<{
    credential_id: string;
    verified: boolean;
    verification_result: any;
  }>;
}

export class OpenID4Client {
  constructor(private client: UBeUClient) {}

  // OpenID4VCI Methods

  /**
   * Get OpenID4VCI credential issuer metadata
   */
  async getCredentialIssuerMetadata(issuerId?: string): Promise<APIResponse<OpenID4VCIMetadata>> {
    const url = issuerId
      ? `/api/v1/issuers/${issuerId}/.well-known/openid-credential-issuer`
      : '/api/v1/issuers/.well-known/openid-credential-issuer';
    return this.client.get(url);
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
  }, issuerId?: string): Promise<APIResponse<CredentialOffer>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/credential-offer` : '/api/v1/issuers/credential-offer';
    return this.client.post(url, offer);
  }

  /**
   * Issue credential via OpenID4VCI
   */
  async issueCredential(request: CredentialRequest, issuerId?: string): Promise<APIResponse<CredentialResponse>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/credentials/issue-openid4vci` : '/api/v1/issuers/credentials/issue-openid4vci';
    return this.client.post(url, request);
  }

  /**
   * Handle deferred credential request
   */
  async getDeferredCredential(transactionId: string, issuerId?: string): Promise<APIResponse<DeferredCredentialResponse>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/deferred-credential` : '/api/v1/issuers/deferred-credential';
    return this.client.post(url, { transaction_id: transactionId });
  }

  /**
   * Batch issue credentials via OpenID4VCI
   */
  async batchIssueCredentials(requests: Array<{
    recipient_id: string;
    credential_request: CredentialRequest['credential_request'];
  }>, issuerId?: string): Promise<APIResponse<{
    transaction_ids: string[];
    status: 'processing' | 'completed';
    estimated_completion_time?: string;
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/credentials/batch-issue-openid4vci` : '/api/v1/issuers/credentials/batch-issue-openid4vci';
    return this.client.post(url, { requests });
  }

  /**
   * Get batch issuance status
   */
  async getBatchIssuanceStatus(transactionId: string, issuerId?: string): Promise<APIResponse<{
    status: 'processing' | 'completed' | 'failed';
    progress: {
      total: number;
      completed: number;
      failed: number;
    };
    results?: Array<{
      recipient_id: string;
      status: 'success' | 'failed';
      credential?: any;
      error?: string;
    }>;
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/batch-issuance/${transactionId}` : `/api/v1/issuers/batch-issuance/${transactionId}`;
    return this.client.get(url);
  }

  // OpenID4VP Methods

  /**
   * Create presentation request (OpenID4VP)
   */
  async createPresentationRequest(request: PresentationRequest, issuerId?: string): Promise<APIResponse<{
    request_uri: string;
    presentation_request_uri: string;
    expires_in: number;
    request_id: string;
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/presentation-request` : '/api/v1/issuers/presentation-request';
    return this.client.post(url, request);
  }

  /**
   * Get presentation request by URI
   */
  async getPresentationRequest(requestUri: string): Promise<APIResponse<PresentationRequest & { expires_at: string }>> {
    return this.client.get(`/api/v1/presentation-request?uri=${encodeURIComponent(requestUri)}`);
  }

  /**
   * Verify presentation response
   */
  async verifyPresentationResponse(response: PresentationResponse, issuerId?: string): Promise<APIResponse<PresentationVerificationResult>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/presentation-response/verify` : '/api/v1/issuers/presentation-response/verify';
    return this.client.post(url, response);
  }

  /**
   * Create selective disclosure request
   */
  async createSelectiveDisclosureRequest(request: {
    presentation_definition: PresentationRequest['presentation_definition'];
    selective_disclosure: {
      required_fields: string[];
      optional_fields: string[];
      minimum_credentials?: number;
    };
  }, issuerId?: string): Promise<APIResponse<{
    request_uri: string;
    presentation_request_uri: string;
    expires_in: number;
    request_id: string;
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/selective-disclosure-request` : '/api/v1/issuers/selective-disclosure-request';
    return this.client.post(url, request);
  }

  // Wallet Integration Methods

  /**
   * Generate wallet-compatible credential offer URI
   */
  async generateWalletCredentialOffer(credentialId: string, issuerId?: string): Promise<APIResponse<{
    offer_uri: string;
    qr_code_data: string;
    expires_in: number;
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/wallet-offer/${credentialId}` : `/api/v1/issuers/wallet-offer/${credentialId}`;
    return this.client.get(url);
  }

  /**
   * Handle wallet presentation submission
   */
  async handleWalletPresentation(presentation: {
    vp_token: string;
    presentation_submission: any;
    wallet_metadata?: {
      wallet_type: string;
      wallet_version: string;
      device_info?: any;
    };
  }, issuerId?: string): Promise<APIResponse<{
    verified: boolean;
    verification_details: any;
    session_info?: any;
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/wallet-presentation` : '/api/v1/issuers/wallet-presentation';
    return this.client.post(url, presentation);
  }

  // Utility Methods

  /**
   * Validate OpenID4VCI credential request format
   */
  validateCredentialRequest(request: any): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];

    if (!request.credential_request) {
      errors.push('Missing credential_request field');
    } else {
      const cr = request.credential_request;
      if (!cr.format) errors.push('Missing format in credential_request');
      if (!cr.credential_definition) errors.push('Missing credential_definition');
      if (!cr.credential_definition.type || !Array.isArray(cr.credential_definition.type)) {
        errors.push('Invalid or missing credential types');
      }
    }

    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  }

  /**
   * Validate OpenID4VP presentation definition
   */
  validatePresentationDefinition(definition: any): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];

    if (!definition.id) errors.push('Missing presentation definition ID');
    if (!definition.input_descriptors || !Array.isArray(definition.input_descriptors)) {
      errors.push('Missing or invalid input_descriptors');
    } else {
      definition.input_descriptors.forEach((descriptor: any, index: number) => {
        if (!descriptor.id) errors.push(`Input descriptor ${index} missing ID`);
        if (!descriptor.constraints && !descriptor.schema) {
          errors.push(`Input descriptor ${index} missing constraints or schema`);
        }
      });
    }

    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  }

  /**
   * Get supported OpenID4 formats and features
   */
  async getSupportedFormats(issuerId?: string): Promise<APIResponse<{
    vc_formats: string[];
    vp_formats: string[];
    cryptographic_suites: string[];
    proof_types: string[];
    features: {
      deferred_credential: boolean;
      batch_issuance: boolean;
      selective_disclosure: boolean;
      wallet_integration: boolean;
    };
  }>> {
    const url = issuerId ? `/api/v1/issuers/${issuerId}/openid4-capabilities` : '/api/v1/issuers/openid4-capabilities';
    return this.client.get(url);
  }
}