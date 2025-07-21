/**
 * API Client Error Handling
 *
 * Error classes and interfaces for API client
 */

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ApiClientError extends Error {
  public status: number;
  public code?: string | undefined;

  constructor(message: string, status: number, code?: string | undefined) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}
