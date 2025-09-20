// UBeU SDK Types and Interfaces

// Core Types
export type Environment = 'development' | 'staging' | 'production';
export type AuthType = 'password' | 'wallet' | 'social' | 'enterprise';
export type UserStatus = 'active' | 'suspended' | 'pending' | 'deleted';
export type VerificationStatus = 'pending' | 'verified' | 'failed' | 'expired';
export type CredentialStatus = 'active' | 'revoked' | 'expired' | 'suspended';

// SDK Configuration Types
export interface SDKConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
  environment?: Environment;
  apiKey?: string;
}

export interface SDKStatus {
  initialized: boolean;
  authenticated: boolean;
  version: string;
  environment: Environment;
  services: {
    identity: boolean;
    credentials: boolean;
    issuer: boolean;
    enterprise: boolean;
    openid4: boolean;
    wallet: boolean;
    analytics: boolean;
  };
  lastActivity: Date;
}

// Authentication Types
export interface AuthCredentials {
  type: AuthType;
  identifier: string; // email, wallet address, etc.
  secret?: string;    // password, signature, etc.
  options?: Record<string, any>;
}

export interface AuthResult {
  success: boolean;
  session?: UserSession;
  user?: UserProfile;
  error?: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  createdAt: Date;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Identity Types
export interface DID {
  id: string;
  did: string;
  userId: string;
  context: 'personal' | 'professional' | 'educational' | 'social' | 'gaming';
  hcsTopicId: string;
  documentHash: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Domain {
  id: string;
  name: string;
  type: 'iam' | 'eth' | 'sol' | 'btc' | 'crypto' | 'nft' | 'polygon' | 'arb' | 'op';
  chainType: 'native' | 'evm' | 'non-evm';
  phase: 1 | 2;
  ownerId: string;
  didId: string;
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  expiresAt: string;
  createdAt: string;
}

export interface IdentityContext {
  userId: string;
  hcsTopicId: string;
  primaryDid: string;
  dids: DID[];
  domains: Domain[];
  aliasMappings: AliasMapping[];
}

export interface AliasMapping {
  domainId: string;
  didId: string;
  context: 'personal' | 'professional' | 'educational' | 'social' | 'gaming';
  isPrimary: boolean;
  createdAt: string;
}

// User Profile
export interface UserProfile {
  id: string;
  email?: string;
  walletAddress?: string;
  primaryDid: string;
  domains: string[];
  status: 'active' | 'suspended' | 'pending';
  createdAt: Date;
  lastLoginAt: Date;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
  };
  verificationStatus: {
    email: boolean;
    wallet: boolean;
    social: Record<string, boolean>;
  };
}

// Credential Types
export interface VerifiableCredential {
  '@context': string[];
  id: string;
  type: string[];
  issuer: string | Issuer;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: CredentialSubject;
  proof?: Proof;
}

export interface Issuer {
  id: string;
  name?: string;
  type?: string;
}

export interface CredentialSubject {
  id: string;
  [key: string]: any;
}

export interface Proof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
}

export interface CredentialOffer {
  id: string;
  issuerDid: string;
  credentialType: string;
  credentialData: any;
  status: 'pending' | 'accepted' | 'declined' | 'reassigned';
  offeredToDid: string;
  assignedToDid?: string;
  userId: string;
  createdAt: string;
  expiresAt?: string;
}

export interface CredentialSchema {
  id: string;
  name: string;
  version: string;
  type: string;
  schema: any;
  createdAt: string;
  updatedAt: string;
}

// Social Verification Types
export interface SocialVerificationRequest {
  userId: string;
  platform: string;
  platformUserId?: string;
  username?: string;
  verificationCode?: string;
  additionalData?: any;
}

export interface SocialVerificationResult {
  success: boolean;
  platform: string;
  verified: boolean;
  userId?: string;
  username?: string;
  profileData?: any;
  badgesAwarded?: string[];
  error?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'social' | 'engagement' | 'verification' | 'achievement';
  criteria: BadgeCriteria;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  points: number;
  createdAt: string;
}

export interface BadgeCriteria {
  platform: string;
  type: 'follower_count' | 'engagement' | 'verification' | 'streak' | 'milestone';
  threshold: number;
  additionalConditions?: any;
}

// Analytics Types
export interface EventData {
  id: string;
  type: string;
  userId?: string;
  sessionId?: string;
  timestamp: string;
  properties: Record<string, any>;
  metadata?: any;
}

export interface MetricsData {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  averageResponseTime: number;
  errorRate: number;
  platformMetrics: Record<string, number>;
  timeRange: string;
}

export interface DashboardData {
  id: string;
  name: string;
  description: string;
  widgets: WidgetData[];
  createdAt: string;
  updatedAt: string;
  refreshInterval: number;
}

export interface WidgetData {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'funnel';
  title: string;
  data: any;
  config: WidgetConfig;
}

export interface WidgetConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'area';
  timeRange?: string;
  metrics?: string[];
  filters?: Record<string, any>;
  refreshRate?: number;
}

// Treasury Types
export interface Allowance {
  userId: string;
  annualLimit: number;
  spentThisYear: number;
  lastReset: string;
  renewalDate: string;
}

export interface Subscription {
  userId: string;
  plan: 'basic' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface TreasuryOperation {
  type: 'TOPIC_CREATE' | 'TOPIC_MESSAGE' | 'TOKEN_TRANSFER' | 'CONTRACT_CALL';
  estimatedCost: number;
  description: string;
}

// Enterprise Types
export interface SCIMUser {
  id: string;
  externalId?: string;
  userName: string;
  name: {
    givenName: string;
    familyName: string;
    middleName?: string;
  };
  emails: Array<{
    value: string;
    type: string;
    primary: boolean;
  }>;
  active: boolean;
  groups?: Array<{
    value: string;
    display: string;
  }>;
  meta: {
    resourceType: string;
    created: string;
    lastModified: string;
    location: string;
  };
}

export interface SCIMConfig {
  baseUrl: string;
  bearerToken: string;
  enterpriseId: string;
}

// Export/Import Types
export interface ExportedIdentity {
  did: string;
  privateKey: string;
  hederaAccountId: string;
  ubAuthTokenId: string;
  domainNftId: string;
  hcsTopicId: string;
  credentials: ExportedCredential[];
  verificationMethods: VerificationMethod[];
  metadata: IdentityMetadata;
}

export interface ExportedCredential {
  id: string;
  type: string[];
  issuer: string;
  subject: string;
  issuanceDate: string;
  expirationDate?: string;
  claims: Record<string, any>;
}

export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase?: string;
  publicKeyJwk?: any;
}

export interface IdentityMetadata {
  exportDate: string;
  version: string;
  compatiblePlatforms: string[];
  checksum: string;
}

// Error Types
export interface SDKError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

export class UBeUError extends Error {
  public code: string;
  public details?: any;
  public timestamp: string;
  public requestId?: string;

  constructor(code: string, message: string, details?: any, requestId?: string) {
    super(message);
    this.name = 'UBeUError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
    this.requestId = requestId;
  }
}

// Event Types
export interface SDKEvent {
  type: string;
  data: any;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

export type SDKEventType =
  | 'authenticated'
  | 'logout'
  | 'error'
  | 'credential_issued'
  | 'credential_verified'
  | 'domain_verified'
  | 'social_verified'
  | 'badge_earned'
  | 'export_completed'
  | 'import_completed';

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;