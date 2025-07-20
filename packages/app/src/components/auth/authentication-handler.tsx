"use client";

import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useAuthState } from "@/hooks/use-auth-state";
import { ComponentType, ReactNode } from "react";
import { ErrorState, LoadingState } from "./components";

interface AuthenticationHandlerProps {
  children: ReactNode;
  redirectTo?: string;
  loadingComponent?: ComponentType;
}

/**
 * AuthenticationHandler component that manages authentication state and automatic redirects
 *
 * This component:
 * - Monitors session status using enhanced authentication state management
 * - Automatically redirects authenticated users to the dashboard
 * - Manages loading states during authentication processes
 * - Provides comprehensive error handling with retry mechanisms
 * - Handles error boundary functionality for auth-related errors
 *
 * Requirements addressed:
 * - 6.1: Check session status immediately when authenticated user visits home page
 * - 6.2: Redirect to dashboard within 1 second when valid session exists
 * - 6.3: Allow sign in again when session is expired
 * - 6.4: Show brief loading state during redirect
 * - 2.4: Error handling for signin, callback, and session errors
 * - 6.5: Authentication error handling and retry mechanisms
 */
export function AuthenticationHandler({
  children,
  redirectTo = "/dashboard",
  loadingComponent,
}: AuthenticationHandlerProps) {
  const {
    state,
    isLoading,
    isAuthenticated,
    hasError,
    canRetry,
    retry,
    clearError,
    setRedirecting,
  } = useAuthState();

  // Handle automatic redirect for authenticated users
  useAuthRedirect({
    isAuthenticated,
    hasSession: !!state.session,
    isRedirecting: state.isRedirecting,
    redirectTo,
    setRedirecting,
  });

  // Show loading state during initial load, retry, or redirect
  if (isLoading || state.isRedirecting) {
    return (
      <LoadingState
        {...(loadingComponent && { loadingComponent })}
        isRedirecting={state.isRedirecting}
        isRetrying={state.isRetrying}
      />
    );
  }

  // Show error state with retry option if there's an authentication error
  if (hasError && state.error) {
    return (
      <ErrorState
        error={state.error}
        canRetry={canRetry}
        isRetrying={state.isRetrying}
        retryCount={state.retryCount}
        onRetry={retry}
        onClearError={clearError}
      />
    );
  }

  // Render children for unauthenticated users (show the homepage)
  return <>{children}</>;
}
