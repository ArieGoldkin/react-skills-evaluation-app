/**
 * System Status API Endpoint
 * GET /api/monitoring/status
 *
 * Provides comprehensive system status including:
 * - Service dependencies status
 * - Feature toggles and configurations
 * - Deployment information
 * - Resource utilization
 */

import { apiResponse } from "@/lib/api-response";
import { withLogging } from "@/lib/middleware/with-logging";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { PerformanceUtils } from "@/utils/performance-utils";
import {
  SystemStatusUtils,
  type DeploymentInfo,
  type FeatureToggle,
  type ResourceMetrics,
  type ServiceInfo,
  type SystemHealth,
} from "@/utils/system-status-utils";
import { NextRequest } from "next/server";

interface SystemStatus {
  status: SystemHealth;
  timestamp: string;
  services: Record<string, ServiceInfo>;
  features: Record<string, FeatureToggle>;
  deployment: DeploymentInfo;
  resources: ResourceMetrics;
}

async function buildSystemStatus(): Promise<SystemStatus> {
  // Get performance metrics
  const performanceMetrics = PerformanceUtils.getPerformanceMetrics();
  const memoryUsagePercent = PerformanceUtils.calculateMemoryUsagePercent(
    performanceMetrics.memory
  );
  const uptimeString = PerformanceUtils.getFormattedUptime();

  // Get system components
  const services = SystemStatusUtils.getServiceStatuses(uptimeString);
  const features = SystemStatusUtils.getFeatureToggles();
  const deployment = SystemStatusUtils.getDeploymentInfo();
  const resources = SystemStatusUtils.getResourceMetrics(memoryUsagePercent);

  // Calculate overall status
  const overallStatus = SystemStatusUtils.calculateOverallStatus(
    services,
    memoryUsagePercent
  );

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    services,
    features,
    deployment,
    resources,
  };
}

async function handleStatusRequest(_request: NextRequest) {
  try {
    const systemStatus = await buildSystemStatus();

    // Return appropriate HTTP status
    const httpStatus = {
      operational: 200,
      degraded: 200,
      major_outage: 503,
    }[systemStatus.status];

    return apiResponse.success(systemStatus, httpStatus);
  } catch (error) {
    console.error("Status check failed:", error);
    return apiResponse.error(
      "Failed to retrieve system status",
      "STATUS_ERROR",
      500
    );
  }
}

// Export with security and logging middleware (no auth required for status)
export const GET = withLogging(
  withApiSecurity(handleStatusRequest),
  "system-status"
);
