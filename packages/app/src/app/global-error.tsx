"use client";

import { useEffect } from "react";

export const dynamic = 'force-dynamic';

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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-muted">500</h1>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Something went wrong!
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            An error occurred while loading this page.
          </p>
          <div className="mt-6 space-x-4">
            <button
              onClick={reset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-foreground bg-background hover:bg-muted"
            >
              Go back home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
