"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that wraps the application with NextAuth's SessionProvider
 * and provides a custom context for easier access to authentication state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

/**
 * Custom hook to access authentication state
 * This provides a convenient way to access the session and authentication status
 * throughout the application
 */
export function useAuth() {
  const session = useSession();

  return {
    session: session.data,
    status: session.status,
    isAuthenticated: session.status === "authenticated",
    isLoading: session.status === "loading",
    user: session.data?.user,
  };
}
