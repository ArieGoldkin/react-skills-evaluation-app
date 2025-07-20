/**
 * Authentication error handling utilities
 */

import { AuthError, createAuthError } from "@/types/auth";
import { AUTH_ERROR_MESSAGES } from "@/types/auth-constants";

/**
 * Handle authentication errors with appropriate error types and messages
 */
export function handleAuthError(
  error: unknown,
  type: AuthError["type"] = "unknown"
): AuthError {
  let authError: AuthError;

  if (error instanceof Error) {
    // Handle specific NextAuth errors
    if (error.message.includes("OAuthCallback")) {
      authError = createAuthError(
        "callback",
        AUTH_ERROR_MESSAGES.CALLBACK_ERROR,
        {
          code: "OAUTH_CALLBACK_ERROR",
          retryable: true,
          originalError: error,
        }
      );
    } else if (error.message.includes("SessionRequired")) {
      authError = createAuthError(
        "session",
        AUTH_ERROR_MESSAGES.SESSION_EXPIRED,
        {
          code: "SESSION_EXPIRED",
          retryable: false,
          originalError: error,
        }
      );
    } else if (error.message.includes("NetworkError")) {
      authError = createAuthError(
        "network",
        AUTH_ERROR_MESSAGES.NETWORK_ERROR,
        {
          code: "NETWORK_ERROR",
          retryable: true,
          originalError: error,
        }
      );
    } else {
      authError = createAuthError(
        type,
        error.message || AUTH_ERROR_MESSAGES.UNKNOWN_ERROR,
        {
          retryable: type !== "session",
          originalError: error,
        }
      );
    }
  } else {
    authError = createAuthError(type, AUTH_ERROR_MESSAGES.UNKNOWN_ERROR, {
      retryable: type !== "session",
      originalError: error,
    });
  }

  return authError;
}

/**
 * Calculate delay for retry attempts with exponential backoff
 */
export function calculateRetryDelay(
  attemptNumber: number,
  baseDelay: number,
  maxDelay: number,
  exponentialBackoff: boolean
): number {
  if (!exponentialBackoff) {
    return baseDelay;
  }

  const delay = baseDelay * Math.pow(2, attemptNumber - 1);
  return Math.min(delay, maxDelay);
}
