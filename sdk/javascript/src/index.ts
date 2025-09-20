// UBeU SDK - Main Entry Point
import { UBeUClient } from './client/UBeUClient';
import { IdentityClient } from './identity/IdentityClient';
import { CredentialClient } from './credentials/CredentialClient';
import { IssuerClient } from './credentials/IssuerClient';
import { EnterpriseClient } from './credentials/EnterpriseClient';
import { OpenID4Client } from './credentials/OpenID4Client';
import { WalletClient } from './wallet/WalletClient';

// Export main classes
export { UBeUClient } from './client/UBeUClient';
export { IdentityClient } from './identity/IdentityClient';
export { CredentialClient } from './credentials/CredentialClient';
export { IssuerClient } from './credentials/IssuerClient';
export { EnterpriseClient } from './credentials/EnterpriseClient';
export { OpenID4Client } from './credentials/OpenID4Client';
export { WalletClient } from './wallet/WalletClient';

// Export types and interfaces
export * from './types';

// Import types for internal use
import type {
  SDKConfig,
  SDKStatus,
  AuthCredentials,
  AuthResult,
  UserSession
} from './types';

// Main SDK class
class UBeUSDK {
  private client: UBeUClient;
  public identity: IdentityClient;
  public credentials: CredentialClient;
  public issuer: IssuerClient;
  public enterprise: EnterpriseClient;
  public openid4: OpenID4Client;
  public wallet: WalletClient;

  constructor(config: SDKConfig) {
    this.client = new UBeUClient(config);
    this.identity = new IdentityClient(this.client);
    this.credentials = new CredentialClient(this.client);
    this.issuer = new IssuerClient(this.client);
    this.enterprise = new EnterpriseClient(this.client);
    this.openid4 = new OpenID4Client(this.client);
    this.wallet = new WalletClient(this.client);
  }

  /**
   * Initialize the SDK
   */
  async initialize(): Promise<void> {
    await this.client.initialize();
  }

  /**
   * Get SDK version
   */
  getVersion(): string {
    return '1.0.0';
  }

  /**
   * Get SDK status
   */
  async getStatus(): Promise<SDKStatus> {
    return await this.client.getStatus();
  }

  /**
   * Authenticate with the platform
   */
  async authenticate(credentials: AuthCredentials): Promise<AuthResult> {
    return await this.client.authenticate(credentials);
  }

  /**
   * Logout from the platform
   */
  async logout(): Promise<void> {
    return await this.client.logout();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.client.isAuthenticated();
  }

  /**
   * Get current user session
   */
  getCurrentSession(): UserSession | null {
    return this.client.getCurrentSession();
  }

  /**
   * Set API base URL
   */
  setBaseUrl(url: string): void {
    this.client.setBaseUrl(url);
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.client.setAuthToken(token);
  }

  /**
   * Enable debug mode
   */
  enableDebug(): void {
    this.client.enableDebug();
  }

  /**
   * Disable debug mode
   */
  disableDebug(): void {
    this.client.disableDebug();
  }

  /**
   * Add event listener
   */
  on(event: string, listener: (...args: any[]) => void): void {
    this.client.on(event, listener);
  }

  /**
   * Remove event listener
   */
  off(event: string, listener: (...args: any[]) => void): void {
    this.client.off(event, listener);
  }

  /**
   * Remove all event listeners for an event
   */
  removeAllListeners(event?: string): void {
    this.client.removeAllListeners(event);
  }
}

// Types are exported from ./types

// Export main SDK class
export default UBeUSDK;

// Create default instance for convenience
export const ubeu = new UBeUSDK({
  environment: 'development'
});
