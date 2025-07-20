"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { AuthError, SignInOptions, isRetryableError } from "@/types/auth";
import { DEFAULT_RETRY_CONFIG, type RetryConfig } from "@/types/auth-constants";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { handleAuthError } from "./auth/auth-error-handler";
import { AuthRetryHandler } from "./auth/auth-retry-handler";
import { AuthSignInHandler } from "./auth/auth-signin-handler";
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
    (error: unknown, type: AuthError["type"] = "unknown"): void => {
      const authError = handleAuthError(error, type);
      dispatch({ type: "SET_ERROR", payload: { error: authError } });
    },
    []
  );

  // Create handlers with memoization for performance
  const signInHandler = useMemo(
    () => new AuthSignInHandler({ dispatch, handleAuthErrorWithDispatch }),
    [handleAuthErrorWithDispatch]
  );

  const retryHandler = useMemo(
    () => new AuthRetryHandler(retryConfig, state, { dispatch }),
    [retryConfig, state]
  );

  /**
   * Retry failed authentication with exponential backoff
   */
  const retry = useCallback(async (): Promise<void> => {
    await retryHandler.executeRetry(
      signInHandler.attemptSignIn.bind(signInHandler)
    );
  }, [retryHandler, signInHandler]);

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
      await signInHandler.signInWithRetry(options);
    },
    [signInHandler]
  );

  // Computed values with memoization
  const computedValues = useMemo(
    () => ({
      isLoading: state.status === "loading" || state.isRetrying,
      isAuthenticated: state.status === "authenticated",
      hasError: !!state.error,
      canRetry: state.error
        ? isRetryableError(state.error) &&
          state.retryCount < retryConfig.maxAttempts
        : false,
    }),
    [
      state.status,
      state.isRetrying,
      state.error,
      state.retryCount,
      retryConfig.maxAttempts,
    ]
  );

  return {
    // State
    state,

    // Computed values
    ...computedValues,

    // Actions
    signIn: signInWithRetry,
    retry,
    clearError,
    setRedirecting,
  };
}
