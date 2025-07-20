"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-9xl font-bold text-gray-200">500</h1>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Something went wrong!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                An error occurred while loading this page.
              </p>
              <div className="mt-6 space-x-4">
                <button
                  onClick={reset}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Try again
                </button>
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Go back home
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
