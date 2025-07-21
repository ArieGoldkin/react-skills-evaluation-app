/**
 * API Client HTTP Handler
 * 
 * Low-level HTTP request handling functionality
 */

import { getSession } from "next-auth/react";
import type { ApiClientConfig, RequestOptions } from "./api-client-config";
import { ApiClientError } from "./api-client-errors";

export class HttpRequestHandler {
  private baseUrl: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || "";
    this.timeout = config.timeout || 10000;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    };
  }

  /**
   * Get authentication headers if available
   */
  private async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const session = await getSession();
      if (session?.user) {
        // If using API tokens or custom auth, add them here
        return {};
      }
      return {};
    } catch {
      return {};
    }
  }

  /**
   * Create a timeout promise for request cancellation
   */
  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApiClientError("Request timeout", 408, "TIMEOUT"));
      }, timeout);
    });
  }

  /**
   * Handle API response and errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    try {
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const errorMessage =
          typeof data === "object" && data.error
            ? data.error
            : data.message || data || `HTTP ${response.status}`;

        throw new ApiClientError(
          errorMessage,
          response.status,
          data.code || response.statusText
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      // Handle JSON parsing errors
      throw new ApiClientError(
        "Invalid response format",
        response.status,
        "INVALID_RESPONSE"
      );
    }
  }

  /**
   * Make HTTP request with proper error handling and authentication
   */
  async request<T>(
    endpoint: string,
    options: RequestOptions & {
      method?: string;
      body?: string | undefined;
    } = {}
  ): Promise<T> {
    const {
      timeout = this.timeout,
      skipAuth = false,
      headers: customHeaders = {},
      method,
      body,
    } = options;

    // Build headers
    const headers = { ...this.defaultHeaders, ...customHeaders };

    if (!skipAuth) {
      const authHeaders = await this.getAuthHeaders();
      Object.assign(headers, authHeaders);
    }

    // Build URL
    const url = `${this.baseUrl}${endpoint}`;

    // Create fetch promise
    const fetchOptions: globalThis.RequestInit = {
      headers,
    };

    if (method) fetchOptions.method = method;
    if (body !== undefined) fetchOptions.body = body;

    const fetchPromise = fetch(url, fetchOptions);

    // Create timeout promise
    const timeoutPromise = this.createTimeoutPromise(timeout);

    try {
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      // Handle network errors
      throw new ApiClientError("Network error occurred", 0, "NETWORK_ERROR");
    }
  }
}