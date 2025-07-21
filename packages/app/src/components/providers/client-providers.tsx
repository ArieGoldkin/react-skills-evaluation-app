"use client";

import { AuthProvider } from "@/components/auth/auth-provider";
import { QueryProvider } from "@/components/providers";
import { ThemeProvider } from "@skills-eval/design-system";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
