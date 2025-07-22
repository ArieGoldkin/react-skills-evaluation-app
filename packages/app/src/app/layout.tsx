import { ClientProviders } from "@/components/providers";
import { ThemeScript } from "@/components/theme/theme-script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skills Evaluation App",
  description:
    "A React 19-based application that evaluates user skills through multiple data sources including personal information, Git repository analysis, and Google account integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
