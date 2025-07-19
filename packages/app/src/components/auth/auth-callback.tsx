"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthCallbackProps {
  defaultRedirect?: string;
}

export function AuthCallback({
  defaultRedirect = "/dashboard",
}: AuthCallbackProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for authentication errors
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(getErrorMessage(errorParam));
      return;
    }

    // Handle successful authentication
    if (status === "authenticated" && session) {
      const callbackUrl = searchParams.get("callbackUrl") || defaultRedirect;

      // Small delay to ensure session is fully established
      setTimeout(() => {
        router.push(callbackUrl);
      }, 100);
    }
  }, [session, status, router, searchParams, defaultRedirect]);

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case "OAuthSignin":
        return "Error occurred during OAuth sign-in process.";
      case "OAuthCallback":
        return "Error occurred during OAuth callback.";
      case "OAuthCreateAccount":
        return "Could not create OAuth account.";
      case "EmailCreateAccount":
        return "Could not create email account.";
      case "Callback":
        return "Error occurred during callback.";
      case "OAuthAccountNotLinked":
        return "OAuth account is not linked to an existing account.";
      case "EmailSignin":
        return "Error occurred during email sign-in.";
      case "CredentialsSignin":
        return "Invalid credentials provided.";
      case "SessionRequired":
        return "Session is required to access this page.";
      case "AccessDenied":
        return "Access denied. You don't have permission to access this resource.";
      default:
        return "An unexpected authentication error occurred.";
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 p-3">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Authentication Error
            </h2>
            <p className="mb-4 text-sm text-gray-600">{error}</p>
            <button
              onClick={() => router.push("/auth/signin")}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm text-gray-600">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-sm text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-green-600"></div>
        <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
