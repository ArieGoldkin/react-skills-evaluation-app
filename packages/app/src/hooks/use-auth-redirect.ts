"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseAuthRedirectProps {
  isAuthenticated: boolean;
  hasSession: boolean;
  isRedirecting: boolean;
  redirectTo: string;
  setRedirecting: (isRedirecting: boolean) => void;
}

/**
 * Custom hook to handle automatic redirects for authenticated users
 *
 * Requirements addressed:
 * - 6.1: Check session status immediately when authenticated user visits home page
 * - 6.2: Redirect to dashboard within 1 second when valid session exists
 * - 6.4: Show brief loading state during redirect
 */
export function useAuthRedirect({
  isAuthenticated,
  hasSession,
  isRedirecting,
  redirectTo,
  setRedirecting,
}: UseAuthRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && hasSession && !isRedirecting) {
      setRedirecting(true);

      // Small delay to show loading state, then redirect
      const redirectTimer = setTimeout(() => {
        router.push(redirectTo);
      }, 500); // Brief loading state as required

      return () => {
        clearTimeout(redirectTimer);
      };
    }
    // No cleanup needed for other cases
    return undefined;
  }, [
    isAuthenticated,
    hasSession,
    isRedirecting,
    redirectTo,
    setRedirecting,
    router,
  ]);
}
