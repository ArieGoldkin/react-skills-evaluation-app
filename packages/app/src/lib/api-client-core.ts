/**
 * API Client Core Implementation
 * 
 * Core HTTP client functionality
 */

import type { ApiClientConfig, RequestOptions } from "./api-client-config";
import { HttpRequestHandler } from "./api-client-http";

export class ApiClient {
  private httpHandler: HttpRequestHandler;

  constructor(config: ApiClientConfig = {}) {
    this.httpHandler = new HttpRequestHandler(config);
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.httpHandler.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.httpHandler.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.httpHandler.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.httpHandler.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.httpHandler.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}