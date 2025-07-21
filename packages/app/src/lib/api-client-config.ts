/**
 * API Client Configuration
 *
 * Configuration interfaces and types for the API client
 */

export interface ApiClientConfig {
  baseUrl?: string | undefined;
  timeout?: number | undefined;
  headers?: Record<string, string> | undefined;
}

export interface RequestOptions {
  timeout?: number;
  skipAuth?: boolean;
  headers?: Record<string, string>;
}
