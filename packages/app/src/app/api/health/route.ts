import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiResponse } from "@/lib/api-response";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withLogging } from "@/lib/middleware/with-logging";

interface HealthCheckResult {
  status: "healthy" | "unhealthy" | "degraded";
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  services: {
    database: {
      status: "up" | "down";
      responseTime?: number;
      error?: string;
    };
    redis?: {
      status: "up" | "down";
      responseTime?: number;
      error?: string;
    };
  };
  system: {
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    nodeVersion: string;
    platform: string;
  };
}

async function checkDatabase(): Promise<{
  status: "up" | "down";
  responseTime?: number;
  error?: string;
}> {
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const responseTime = Date.now() - startTime;

    return {
      status: "up",
      responseTime,
    };
  } catch (error) {
    return {
      status: "down",
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
}

async function checkRedis(): Promise<{
  status: "up" | "down";
  responseTime?: number;
  error?: string;
}> {
  try {
    // Only check Redis if it's configured
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return { status: "up" }; // Redis is optional
    }

    const startTime = Date.now();
    const { redis } = await import("@/lib/middleware/rate-limit/config");
    if (redis) {
      await redis.ping();
    }
    const responseTime = Date.now() - startTime;

    return {
      status: "up",
      responseTime,
    };
  } catch (error) {
    return {
      status: "down",
      error: error instanceof Error ? error.message : "Unknown Redis error",
    };
  }
}

function getSystemInfo() {
  const memUsage = process.memoryUsage();
  const totalMemory = memUsage.heapTotal + memUsage.external;
  const usedMemory = memUsage.heapUsed;

  return {
    memory: {
      used: usedMemory,
      total: totalMemory,
      percentage: Math.round((usedMemory / totalMemory) * 100),
    },
    nodeVersion: process.version,
    platform: process.platform,
  };
}

async function performHealthCheck(): Promise<HealthCheckResult> {
  // Check all services concurrently
  const [databaseCheck, redisCheck] = await Promise.all([
    checkDatabase(),
    checkRedis(),
  ]);

  // Determine overall status
  let overallStatus: "healthy" | "unhealthy" | "degraded" = "healthy";

  if (databaseCheck.status === "down") {
    overallStatus = "unhealthy"; // Database is critical
  } else if (
    redisCheck.status === "down" &&
    process.env.UPSTASH_REDIS_REST_URL
  ) {
    overallStatus = "degraded"; // Redis is important but not critical
  }

  const result: HealthCheckResult = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "unknown",
    environment: process.env.NODE_ENV || "unknown",
    services: {
      database: databaseCheck,
      ...(process.env.UPSTASH_REDIS_REST_URL && { redis: redisCheck }),
    },
    system: getSystemInfo(),
  };

  return result;
}

async function handleHealthCheck(_request: NextRequest) {
  try {
    const healthCheck = await performHealthCheck();

    // Return appropriate HTTP status based on health
    const httpStatus = {
      healthy: 200,
      degraded: 200, // Still operational
      unhealthy: 503, // Service unavailable
    }[healthCheck.status];

    return apiResponse.success(healthCheck, httpStatus);
  } catch {
    // If health check itself fails, return unhealthy status
    const fallbackResult: HealthCheckResult = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "unknown",
      environment: process.env.NODE_ENV || "unknown",
      services: {
        database: {
          status: "down",
          error: "Health check failed",
        },
      },
      system: getSystemInfo(),
    };

    return apiResponse.success(fallbackResult, 503);
  }
}

// Export with security and logging middleware
export const GET = withLogging(
  withApiSecurity(handleHealthCheck),
  "health-check"
);
