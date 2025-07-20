import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Experimental features for React 19 and Next.js 15
  experimental: {
    // Enable React 19 features
    reactCompiler: false, // Will be enabled when stable

    // Performance optimizations
    optimizePackageImports: [
      "@radix-ui/react-slot",
      "lucide-react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },

  // Image optimization configuration
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src"],
  },

  // Output configuration
  output: "standalone",

  // Compression
  compress: true,

  // Power by header
  poweredByHeader: false,
};

export default nextConfig;
