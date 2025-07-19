import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // SWC minification is enabled by default in Next.js 15

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

  // Webpack configuration for bundle analysis and optimizations
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("@next/bundle-analyzer")();
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: true,
        })
      );
    }

    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors. Only enable in emergency situations.
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only enable in emergency situations.
    ignoreDuringBuilds: true, // Temporarily disabled due to @rushstack/eslint-patch issue
    dirs: ["src"],
  },

  // Output configuration for different deployment targets
  output: "standalone", // For Docker deployments

  // Compression
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Trailing slash handling
  trailingSlash: false,

  // Redirects and rewrites can be added here as needed
  async redirects() {
    return [];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
