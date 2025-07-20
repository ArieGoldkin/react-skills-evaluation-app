/**
 * Authentication-related TypeScript interfaces and types
 *
 * This file contains all type definitions for authentication state management,
 * error handling, and retry mechanisms.
 *
 * Requirements addressed:
 * - 2.4: Error handling for signin, callback, and session errors
 * - 6.5: Authentication error handling and session management
 */

import { Session } from "next-auth";

/**
 * Authentication state interface that tracks the current authentication status
 */
export interface AuthState {
  /** Current authentication status */
  status: "loading" | "authenticated" | "unauthenticated";
  /** Current session data if authenticated */
  session: Session | null;
  /** Current authentication error if any */
  error: AuthError | null;
  /** Whether a redirect is in progress */
  isRedirecting: boolean;
  /** Retry attempt count for failed operations */
  retryCount: number;
  /** Whether a retry is currently in progress */
  isRetrying: boolean;
}

/**
 * Authentication error interface for different types of auth failures
 */
export interface AuthError {
  /** Type of authentication error */
  type: "signin" | "callback" | "session" | "network" | "unknown";
  /** Human-readable error message */
  message: string;
  /** Optional error code for debugging */
  code?: string;
  /** Whether this error is retryable */
  retryable: boolean;
  /** Timestamp when the error occurred */
  timestamp: Date;
  /** Original error object for debugging */
  originalError?: unknown;
}

/**
 * Authentication action types for state management
 */
export type AuthAction =
  | { type: "SET_LOADING" }
  | { type: "SET_AUTHENTICATED"; payload: { session: Session } }
  | { type: "SET_UNAUTHENTICATED" }
  | { type: "SET_ERROR"; payload: { error: AuthError } }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_REDIRECTING"; payload: { isRedirecting: boolean } }
  | { type: "INCREMENT_RETRY" }
  | { type: "RESET_RETRY" }
  | { type: "SET_RETRYING"; payload: { isRetrying: boolean } };

/**
 * Authentication context interface for provider
 */
export interface AuthContextValue {
  /** Current authentication state */
  state: AuthState;
  /** Function to dispatch authentication actions */
  dispatch: (action: AuthAction) => void;
  /** Function to retry failed authentication */
  retry: () => Promise<void>;
  /** Function to clear current error */
  clearError: () => void;
}

/**
 * Sign-in options interface
 */
export interface SignInOptions {
  /** OAuth provider to use */
  provider: "google" | "github";
  /** Redirect URL after successful sign-in */
  callbackUrl?: string;
  /** Additional parameters for the OAuth flow */
  params?: Record<string, string>;
}

/**
 * Authentication event interface for logging
 */
export interface AuthEvent {
  /** Type of authentication event */
  type: import("./auth-constants").AuthEventType;
  /** Timestamp when the event occurred */
  timestamp: Date;
  /** Additional event data */
  data?: Record<string, unknown>;
  /** Error information if applicable */
  error?: AuthError;
}

/**
 * Type guard to check if an error is retryable
 */
export function isRetryableError(error: AuthError): boolean {
  return error.retryable && error.type !== "session";
}

/**
 * Helper function to create an AuthError
 */
export function createAuthError(
  type: AuthError["type"],
  message: string,
  options: {
    code?: string;
    retryable?: boolean;
    originalError?: unknown;
  } = {}
): AuthError {
  const result: AuthError = {
    type,
    message,
    retryable: options.retryable ?? (type === "network" || type === "unknown"),
    timestamp: new Date(),
  };

  if (options.code) {
    result.code = options.code;
  }

  if (options.originalError) {
    result.originalError = options.originalError;
  }

  return result;
}
