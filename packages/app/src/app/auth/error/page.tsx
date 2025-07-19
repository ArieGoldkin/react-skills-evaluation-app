"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null): string => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "Access denied. You don't have permission to access this resource.";
      case "Verification":
        return "The verification token has expired or has already been used.";
      case "Default":
      default:
        return "An unexpected authentication error occurred.";
    }
  };

  const getErrorTitle = (error: string | null): string => {
    switch (error) {
      case "Configuration":
        return "Configuration Error";
      case "AccessDenied":
        return "Access Denied";
      case "Verification":
        return "Verification Error";
      case "Default":
      default:
        return "Authentication Error";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
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

            <h1 className="mb-2 text-xl font-semibold text-gray-900">
              {getErrorTitle(error)}
            </h1>

            <p className="mb-6 text-sm text-gray-600">
              {getErrorMessage(error)}
            </p>

            <div className="space-y-3">
              <Link href="/auth/signin" className="block">
                <Button className="w-full" variant="default">
                  Try Again
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button className="w-full" variant="outline">
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
