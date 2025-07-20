"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { SignInOptions, createAuthError, isRetryableError } from "@/types/auth";
import {
  AUTH_ERROR_MESSAGES,
  DEFAULT_RETRY_CONFIG,
  type RetryConfig,
} from "@/types/auth-constants";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useReducer } from "react";
import {
  calculateRetryDelay,
  handleAuthError,
} from "./auth/auth-error-handler";
import { authStateReducer, initialAuthState } from "./auth/auth-state-reducer";

/**
 * Enhanced authentication state management hook with retry mechanisms
 *
 * This hook provides:
 * - Comprehensive error handling for signin, callback, and session errors
 * - Retry mechanisms with exponential backoff for failed authentication attempts
 * - State management for loading, error, and retry states
 *
 * Requirements addressed:
 * - 2.4: Error handling for signin, callback, and session errors
 * - 6.5: Authentication error handling and retry mechanisms
 */
export function useAuthState(retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG) {
  const { session, status } = useAuth();
  const [state, dispatch] = useReducer(authStateReducer, initialAuthState);

  // Sync with NextAuth session state
  useEffect(() => {
    if (status === "loading") {
      dispatch({ type: "SET_LOADING" });
    } else if (status === "authenticated" && session) {
      dispatch({ type: "SET_AUTHENTICATED", payload: { session } });
    } else if (status === "unauthenticated") {
      dispatch({ type: "SET_UNAUTHENTICATED" });
    }
  }, [session, status]);

  /**
   * Handle authentication errors and dispatch to state
   */
  const handleAuthErrorWithDispatch = useCallback(
    (
      error: unknown,
      type: Parameters<typeof handleAuthError>[1] = "unknown"
    ): void => {
      const authError = handleAuthError(error, type);
      dispatch({ type: "SET_ERROR", payload: { error: authError } });
    },
    []
  );

  /**
   * Attempt to sign in with retry logic
   */
  const attemptSignIn = useCallback(
    async (options: SignInOptions): Promise<void> => {
      try {
        dispatch({ type: "SET_LOADING" });

        const result = await signIn(options.provider, {
          callbackUrl: options.callbackUrl || "/dashboard",
          redirect: false,
          ...options.params,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        // Success - the session will be updated via useEffect
        dispatch({ type: "RESET_RETRY" });
      } catch (error) {
        handleAuthErrorWithDispatch(error, "signin");
        throw error; // Re-throw for caller to handle
      }
    },
    [handleAuthErrorWithDispatch]
  );

  /**
   * Retry failed authentication with exponential backoff
   */
  const retry = useCallback(async (): Promise<void> => {
    if (!state.error || !isRetryableError(state.error)) {
      return;
    }

    if (state.retryCount >= retryConfig.maxAttempts) {
      const maxRetriesError = createAuthError(
        "unknown",
        AUTH_ERROR_MESSAGES.MAX_RETRIES_EXCEEDED,
        {
          code: "MAX_RETRIES_EXCEEDED",
          retryable: false,
        }
      );
      dispatch({ type: "SET_ERROR", payload: { error: maxRetriesError } });
      return;
    }

    dispatch({ type: "INCREMENT_RETRY" });
    dispatch({ type: "SET_RETRYING", payload: { isRetrying: true } });

    const delay = calculateRetryDelay(
      state.retryCount + 1,
      retryConfig.baseDelay,
      retryConfig.maxDelay,
      retryConfig.exponentialBackoff
    );

    try {
      // Wait for the calculated delay
      await new Promise(resolve => setTimeout(resolve, delay));

      // Attempt to refresh the session or retry the last operation
      if (state.error.type === "session") {
        // For session errors, try to refresh
        window.location.reload();
      } else {
        // For other errors, attempt sign-in again
        await attemptSignIn({
          provider: "google", // Default to Google for retry
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      // If retry fails, handle the error but don't increment retry count again
      handleAuthErrorWithDispatch(error, state.error.type);
    } finally {
      dispatch({ type: "SET_RETRYING", payload: { isRetrying: false } });
    }
  }, [
    state.error,
    state.retryCount,
    retryConfig.maxAttempts,
    retryConfig.baseDelay,
    retryConfig.maxDelay,
    retryConfig.exponentialBackoff,
    attemptSignIn,
    handleAuthErrorWithDispatch,
  ]);

  /**
   * Clear current authentication error
   */
  const clearError = useCallback((): void => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  /**
   * Set redirecting state
   */
  const setRedirecting = useCallback((isRedirecting: boolean): void => {
    dispatch({ type: "SET_REDIRECTING", payload: { isRedirecting } });
  }, []);

  /**
   * Sign in with error handling and retry logic
   */
  const signInWithRetry = useCallback(
    async (options: SignInOptions): Promise<void> => {
      try {
        await attemptSignIn(options);
      } catch (error) {
        // Error is already handled in attemptSignIn
        console.error("Sign-in failed:", error);
      }
    },
    [attemptSignIn]
  );

  return {
    // State
    state,

    // Computed values
    isLoading: state.status === "loading" || state.isRetrying,
    isAuthenticated: state.status === "authenticated",
    hasError: !!state.error,
    canRetry: state.error
      ? isRetryableError(state.error) &&
        state.retryCount < retryConfig.maxAttempts
      : false,

    // Actions
    signIn: signInWithRetry,
    retry,
    clearError,
    setRedirecting,
  };
}
