import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EventEmitter } from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';
import {
  SDKConfig,
  AuthCredentials,
  AuthResult,
  UserSession,
  SDKStatus,
  APIResponse,
  SDKEvent,
  UBeUError
} from '../types';

export class UBeUClient extends EventEmitter {
  private httpClient: AxiosInstance;
  private config: SDKConfig;
  private session: UserSession | null = null;
  private requestQueue: Map<string, { resolve: Function; reject: Function }> = new Map();

  constructor(config: SDKConfig = {}) {
    super();

    this.config = {
      baseUrl: 'http://localhost:3000',
      timeout: 30000,
      retries: 3,
      debug: false,
      environment: 'development',
      ...config
    };

    this.httpClient = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'UBeU-SDK/1.0.0'
      }
    });

    this.setupInterceptors();
  }

  /**
   * Initialize the client
   */
  async initialize(): Promise<void> {
    try {
      // Test connection to API
      await this.get('/health');
      this.emit('initialized');
    } catch (error) {
      throw new UBeUError('INITIALIZATION_FAILED', 'Failed to initialize UBeU client', error);
    }
  }

  /**
   * Set base URL
   */
  setBaseUrl(url: string): void {
    this.config.baseUrl = url;
    this.httpClient.defaults.baseURL = url;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Enable debug mode
   */
  enableDebug(): void {
    this.config.debug = true;
  }

  /**
   * Disable debug mode
   */
  disableDebug(): void {
    this.config.debug = false;
  }

  /**
   * Authenticate with the platform
   */
  async authenticate(credentials: AuthCredentials): Promise<AuthResult> {
    try {
      const response = await this.post<AuthResult>('/auth/login', credentials);

      if (response.success && response.session) {
        this.session = response.session;
        this.setAuthToken(response.session.token);
        this.emit('authenticated', response);
      }

      return response;
    } catch (error: any) {
      throw new UBeUError('AUTHENTICATION_FAILED', 'Authentication failed', error);
    }
  }

  /**
   * Logout from the platform
   */
  async logout(): Promise<void> {
    try {
      if (this.session) {
        await this.post('/auth/logout');
        this.session = null;
        delete this.httpClient.defaults.headers.common['Authorization'];
        this.emit('logout');
      }
    } catch (error: any) {
      throw new UBeUError('LOGOUT_FAILED', 'Logout failed', error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.session !== null && this.session.expiresAt > new Date();
  }

  /**
   * Get current user session
   */
  getCurrentSession(): UserSession | null {
    return this.session;
  }

  /**
   * Get SDK status
   */
  async getStatus(): Promise<SDKStatus> {
    const services = await this.checkServiceStatus();

    return {
      initialized: true,
      authenticated: this.isAuthenticated(),
      version: '1.0.0',
      environment: this.config.environment || 'development',
      services,
      lastActivity: new Date()
    };
  }

  /**
   * Check service availability
   */
  private async checkServiceStatus(): Promise<SDKStatus['services']> {
    const services: SDKStatus['services'] = {
      identity: false,
      credentials: false,
      wallet: false,
      analytics: false
    };

    try {
      // Check identity service
      await this.get('/api/v1/identity/health');
      services.identity = true;
    } catch (error) {
      // Service not available
    }

    try {
      // Check credential service
      await this.get('/api/v1/credential/health');
      services.credentials = true;
    } catch (error) {
      // Service not available
    }

    try {
      // Check wallet service (assuming it exists)
      await this.get('/api/v1/wallet/health');
      services.wallet = true;
    } catch (error) {
      // Service not available
    }

    try {
      // Check analytics service
      await this.get('/api/v1/analytics/health');
      services.analytics = true;
    } catch (error) {
      // Service not available
    }

    return services;
  }

  /**
   * HTTP GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  /**
   * HTTP POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  /**
   * HTTP PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  /**
   * HTTP DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  /**
   * HTTP PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  /**
   * Generic HTTP request with retry logic
   */
  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    retryCount = 0
  ): Promise<T> {
    const requestId = uuidv4();

    try {
      if (this.config.debug) {
        console.log(`[${requestId}] ${method} ${url}`, data);
      }

      const response = await this.httpClient.request({
        method: method as any,
        url,
        data,
        ...config,
        headers: {
          'X-Request-ID': requestId,
          ...config?.headers
        }
      });

      if (this.config.debug) {
        console.log(`[${requestId}] Response:`, response.data);
      }

      return response.data;
    } catch (error: any) {
      if (this.config.debug) {
        console.error(`[${requestId}] Error:`, error.message);
      }

      // Retry logic for transient errors
      if (retryCount < (this.config.retries || 3) && this.isRetryableError(error)) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.request<T>(method, url, data, config, retryCount + 1);
      }

      // Emit error event
      this.emit('error', {
        type: 'request_error',
        data: {
          method,
          url,
          error: error.message,
          requestId
        },
        timestamp: new Date().toISOString()
      });

      throw new UBeUError(
        'REQUEST_FAILED',
        `Request failed: ${error.message}`,
        error,
        requestId
      );
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    if (!error.response) {
      // Network errors are retryable
      return true;
    }

    const status = error.response.status;
    // Retry on 5xx errors and 429 (rate limit)
    return status >= 500 || status === 429;
  }

  /**
   * Setup axios interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.httpClient.interceptors.request.use(
      (config) => {
        // Add timestamp to request
        config.metadata = { startTime: new Date() };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.httpClient.interceptors.response.use(
      (response: AxiosResponse) => {
        // Calculate response time
        const startTime = response.config.metadata?.startTime;
        if (startTime) {
          const duration = new Date().getTime() - startTime.getTime();
          response.duration = duration;

          if (this.config.debug) {
            console.log(`Request took ${duration}ms`);
          }
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Upload file
   */
  async uploadFile(url: string, file: File, metadata?: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    return this.request('POST', url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * Download file
   */
  async downloadFile(url: string, filename?: string): Promise<Blob> {
    const response = await this.httpClient.get(url, {
      responseType: 'blob'
    });

    return response.data;
  }

  /**
   * Get request queue size
   */
  getQueueSize(): number {
    return this.requestQueue.size;
  }

  /**
   * Clear request queue
   */
  clearQueue(): void {
    this.requestQueue.clear();
  }

  /**
   * Get client configuration
   */
  getConfig(): SDKConfig {
    return { ...this.config };
  }

  /**
   * Update client configuration
   */
  updateConfig(updates: Partial<SDKConfig>): void {
    this.config = { ...this.config, ...updates };
    if (updates.baseUrl) {
      this.setBaseUrl(updates.baseUrl);
    }
    if (updates.timeout) {
      this.httpClient.defaults.timeout = updates.timeout;
    }
  }
}