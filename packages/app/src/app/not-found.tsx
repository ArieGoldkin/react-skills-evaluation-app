import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-muted">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Page not found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
