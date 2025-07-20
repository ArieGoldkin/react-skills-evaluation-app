"use client";

import { useAuth } from "@/components/auth";
import { SignOutButton } from "@/components/auth/signout-button";
import { Button } from "@/components/ui/button";
import { Container } from "@skills-eval/design-system";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { session, status, isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    return null; // Will redirect to sign in
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <SignOutButton
              className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              callbackUrl="/"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-2 text-lg font-semibold">User Information</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {user?.name || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "Not provided"}
                </p>
                <p>
                  <strong>Provider:</strong> {session?.provider || "Google"}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-2 text-lg font-semibold">Skills Analysis</h2>
              <p className="text-sm text-gray-600">
                Connect your repositories to start analyzing your skills.
              </p>
              <Button className="mt-4" size="sm" disabled>
                Connect GitHub (Coming Soon)
              </Button>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-2 text-lg font-semibold">AI Recommendations</h2>
              <p className="text-sm text-gray-600">
                Get personalized recommendations based on your skill profile.
              </p>
              <Button className="mt-4" size="sm" disabled>
                Get Recommendations (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
