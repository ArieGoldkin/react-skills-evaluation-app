"use client";

import { AuthError } from "@/types/auth";

interface ErrorStateProps {
  error: AuthError;
  canRetry: boolean;
  isRetrying: boolean;
  retryCount: number;
  onRetry: () => Promise<void>;
  onClearError: () => void;
}

export function ErrorState({
  error,
  canRetry,
  isRetrying,
  retryCount,
  onRetry,
  onClearError,
}: ErrorStateProps) {
  const handleRetry = async () => {
    if (!isRetrying && canRetry) {
      await onRetry();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-red-200">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Error
          </h2>

          <p className="text-gray-600 mb-4">{error.message}</p>

          {error.code && (
            <p className="text-sm text-gray-500 mb-4">
              Error Code: {error.code}
            </p>
          )}

          {retryCount > 0 && (
            <p className="text-sm text-gray-500 mb-4">
              Retry attempts: {retryCount}
            </p>
          )}

          <div className="flex gap-3 justify-center">
            {canRetry && (
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRetrying ? "Retrying..." : "Try Again"}
              </button>
            )}

            <button
              onClick={onClearError}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
