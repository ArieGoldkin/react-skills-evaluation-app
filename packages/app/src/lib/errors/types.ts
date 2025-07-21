/**
 * Custom API error class for structured error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Database error class for Prisma-related errors
 */
export class DatabaseError extends Error {
  constructor(
    message: string,
    public originalError: unknown,
    public code?: string
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

/**
 * External service error class
 */
export class ExternalServiceError extends Error {
  constructor(
    public service: string,
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ExternalServiceError";
  }
}
