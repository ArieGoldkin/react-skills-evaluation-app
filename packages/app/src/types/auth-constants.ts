/**
 * Authentication constants and configuration
 */

/**
 * Retry configuration for failed authentication attempts
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Base delay between retries in milliseconds */
  baseDelay: number;
  /** Whether to use exponential backoff */
  exponentialBackoff: boolean;
  /** Maximum delay between retries in milliseconds */
  maxDelay: number;
}

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  exponentialBackoff: true,
  maxDelay: 10000, // 10 seconds
};

/**
 * Error messages for different authentication scenarios
 */
export const AUTH_ERROR_MESSAGES = {
  SIGNIN_FAILED: "Failed to sign in. Please try again.",
  CALLBACK_ERROR:
    "Authentication callback failed. Please try signing in again.",
  SESSION_EXPIRED: "Your session has expired. Please sign in again.",
  NETWORK_ERROR:
    "Network error occurred. Please check your connection and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  MAX_RETRIES_EXCEEDED:
    "Maximum retry attempts exceeded. Please refresh the page and try again.",
} as const;

/**
 * Authentication event types for logging and monitoring
 */
export type AuthEventType =
  | "signin_attempt"
  | "signin_success"
  | "signin_error"
  | "signout"
  | "session_refresh"
  | "session_error"
  | "redirect"
  | "retry_attempt";
