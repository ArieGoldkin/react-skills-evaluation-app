/**
 * System Status Utilities
 *
 * Handles system status calculations and resource monitoring including:
 * - Overall system health assessment
 * - Service status aggregation
 * - Resource usage monitoring
 * - Feature toggle management
 */

export type SystemHealth = "operational" | "degraded" | "major_outage";
export type ServiceStatus = "operational" | "degraded" | "outage";

export interface ServiceInfo {
  status: ServiceStatus;
  uptime: string;
  responseTime?: number;
  lastIncident?: string;
}

export interface ResourceMetrics {
  cpu: {
    usage: number;
    threshold: number;
  };
  memory: {
    usage: number;
    threshold: number;
  };
  disk: {
    usage: number;
    threshold: number;
  };
}

export interface FeatureToggle {
  enabled: boolean;
  percentage?: number;
  description: string;
}

export interface DeploymentInfo {
  version: string;
  commitHash: string;
  deployedAt: string;
  environment: string;
  region: string;
}

export class SystemStatusUtils {
  /**
   * Calculate overall system health based on service statuses
   * @param services - Map of service statuses
   * @param memoryUsagePercent - Current memory usage percentage
   * @returns Overall system health status
   */
  static calculateOverallStatus(
    services: Record<string, ServiceInfo>,
    memoryUsagePercent: number
  ): SystemHealth {
    const serviceStatuses = Object.values(services);
    const hasOutages = serviceStatuses.some(
      service => service.status === "outage"
    );
    const hasDegradations = serviceStatuses.some(
      service => service.status === "degraded"
    );

    if (hasOutages) {
      return "major_outage";
    }

    if (hasDegradations || memoryUsagePercent > 85) {
      return "degraded";
    }

    return "operational";
  }

  /**
   * Get current resource usage metrics
   * @param memoryUsagePercent - Current memory usage percentage
   * @returns Resource metrics object
   */
  static getResourceMetrics(memoryUsagePercent: number): ResourceMetrics {
    return {
      cpu: {
        usage: 0, // Would need CPU monitoring implementation
        threshold: 80,
      },
      memory: {
        usage: memoryUsagePercent,
        threshold: 85,
      },
      disk: {
        usage: 0, // Would need disk monitoring implementation
        threshold: 90,
      },
    };
  }

  /**
   * Get service status information for all system services
   * @param uptimeString - Formatted uptime string
   * @returns Map of service status information
   */
  static getServiceStatuses(uptimeString: string): Record<string, ServiceInfo> {
    return {
      api: {
        status: "operational",
        uptime: uptimeString,
        responseTime: 0, // Would be calculated from recent requests
      },
      database: {
        status: "operational",
        uptime: uptimeString,
        responseTime: 0, // Would be from health checks
      },
      redis: {
        status: process.env.UPSTASH_REDIS_REST_URL ? "operational" : "degraded",
        uptime: uptimeString,
        responseTime: 0, // Would be from health checks
      },
      authentication: {
        status: "operational",
        uptime: uptimeString,
        responseTime: 0,
      },
    };
  }

  /**
   * Get current feature toggle states
   * @returns Map of feature toggle information
   */
  static getFeatureToggles(): Record<string, FeatureToggle> {
    return {
      skill_management: {
        enabled: true,
        percentage: 100,
        description: "Full skill CRUD operations",
      },
      assessments: {
        enabled: true,
        percentage: 100,
        description: "Assessment creation and history",
      },
      analytics: {
        enabled: true,
        percentage: 100,
        description: "Skill analytics and insights",
      },
      bulk_operations: {
        enabled: true,
        percentage: 100,
        description: "Bulk skill updates and deletions",
      },
      rate_limiting: {
        enabled: Boolean(process.env.UPSTASH_REDIS_REST_URL),
        percentage: process.env.UPSTASH_REDIS_REST_URL ? 100 : 0,
        description: "API rate limiting protection",
      },
      monitoring: {
        enabled: true,
        percentage: 100,
        description: "Health checks and metrics collection",
      },
    };
  }

  /**
   * Get current deployment information
   * @returns Deployment information object
   */
  static getDeploymentInfo(): DeploymentInfo {
    return {
      version: process.env.npm_package_version || "1.0.0",
      commitHash:
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.GIT_COMMIT ||
        "unknown",
      deployedAt:
        process.env.VERCEL_GIT_COMMIT_DATE || new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      region: process.env.VERCEL_REGION || "local",
    };
  }
}
