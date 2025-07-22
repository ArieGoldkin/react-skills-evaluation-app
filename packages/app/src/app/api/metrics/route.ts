/**
 * Metrics Collection API Endpoint
 * GET /api/metrics
 *
 * Provides application metrics including:
 * - Request counts and response times
 * - Error rates and status codes
 * - Database performance metrics
 * - Memory and CPU usage
 * - User activity metrics
 */

import { apiResponse } from "@/lib/api-response";
import { withLogging } from "@/lib/middleware/with-logging";
import { withApiSecurity } from "@/lib/middleware/with-security";
import {
  DatabaseMetricsService,
  type DatabaseMetrics,
} from "@/services/database-metrics.service";
import {
  PerformanceUtils,
  type PerformanceMetrics,
} from "@/utils/performance-utils";
import { NextRequest } from "next/server";

interface MetricsData {
  timestamp: string;
  period: string;
  application: {
    version: string;
    uptime: number;
    environment: string;
  };
  performance: PerformanceMetrics;
  database: {
    connections: number;
    activeQueries: number;
    slowQueries: number;
    totalUsers: number;
    totalSkills: number;
    totalAssessments: number;
  };
  api: {
    requests: {
      total: number;
      successful: number;
      errors: number;
      averageResponseTime: number;
    };
    endpoints: {
      [key: string]: {
        count: number;
        averageTime: number;
        errorRate: number;
      };
    };
  };
  users: {
    activeUsers: number;
    newUsersToday: number;
    assessmentsToday: number;
    skillsCreatedToday: number;
  };
}

async function buildMetricsResponse(
  period: string,
  dbMetrics: DatabaseMetrics,
  perfMetrics: PerformanceMetrics
): Promise<MetricsData> {
  return {
    timestamp: new Date().toISOString(),
    period,
    application: {
      version: process.env.npm_package_version || "1.0.0",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "unknown",
    },
    performance: perfMetrics,
    database: {
      connections: dbMetrics.connections,
      activeQueries: dbMetrics.activeQueries,
      slowQueries: dbMetrics.slowQueries,
      totalUsers: dbMetrics.totalUsers,
      totalSkills: dbMetrics.totalSkills,
      totalAssessments: dbMetrics.totalAssessments,
    },
    api: {
      requests: {
        total: 0, // Would need request tracking middleware
        successful: 0,
        errors: 0,
        averageResponseTime: 0,
      },
      endpoints: {
        // Would be populated by request tracking middleware
      },
    },
    users: {
      activeUsers: dbMetrics.activeUsers,
      newUsersToday: dbMetrics.newUsersToday,
      assessmentsToday: dbMetrics.assessmentsToday,
      skillsCreatedToday: dbMetrics.skillsCreatedToday,
    },
  };
}

async function handleMetricsRequest(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "24h";

    // Gather metrics concurrently
    const [dbMetrics, perfMetrics] = await Promise.all([
      DatabaseMetricsService.collect(),
      Promise.resolve(PerformanceUtils.getPerformanceMetrics()),
    ]);

    const metrics = await buildMetricsResponse(period, dbMetrics, perfMetrics);

    return apiResponse.success(metrics, 200);
  } catch (error) {
    console.error("Metrics collection failed:", error);
    return apiResponse.error("Failed to collect metrics", "METRICS_ERROR", 500);
  }
}

// Export with security and logging middleware
export const GET = withLogging(
  withApiSecurity(handleMetricsRequest),
  "metrics-collection"
);
