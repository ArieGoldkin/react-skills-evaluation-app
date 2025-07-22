/**
 * Monitoring Configuration
 *
 * Central configuration for application monitoring including:
 * - Health check intervals
 * - Metric collection settings
 * - Alert thresholds
 * - Dashboard settings
 */

export interface MonitoringConfig {
  healthCheck: {
    interval: number; // milliseconds
    timeout: number; // milliseconds
    retries: number;
    endpoints: string[];
  };
  metrics: {
    collection: {
      interval: number; // milliseconds
      batchSize: number;
      retention: number; // days
    };
    thresholds: {
      memory: number; // percentage
      responseTime: number; // milliseconds
      errorRate: number; // percentage
      cpuUsage: number; // percentage
    };
  };
  alerts: {
    enabled: boolean;
    channels: string[];
    thresholds: {
      critical: {
        memoryUsage: number;
        errorRate: number;
        responseTime: number;
        uptime: number;
      };
      warning: {
        memoryUsage: number;
        errorRate: number;
        responseTime: number;
        diskUsage: number;
      };
    };
  };
  dashboard: {
    refreshInterval: number; // milliseconds
    maxDataPoints: number;
    defaultPeriod: string;
    charts: {
      responseTime: boolean;
      errorRate: boolean;
      memoryUsage: boolean;
      requestVolume: boolean;
      userActivity: boolean;
    };
  };
}

export const monitoringConfig: MonitoringConfig = {
  healthCheck: {
    interval: 30000, // 30 seconds
    timeout: 5000, // 5 seconds
    retries: 3,
    endpoints: ["/api/health", "/api/monitoring/status"],
  },
  metrics: {
    collection: {
      interval: 60000, // 1 minute
      batchSize: 100,
      retention: 30, // 30 days
    },
    thresholds: {
      memory: 85, // 85% memory usage
      responseTime: 2000, // 2 seconds
      errorRate: 5, // 5% error rate
      cpuUsage: 80, // 80% CPU usage
    },
  },
  alerts: {
    enabled: process.env.NODE_ENV === "production",
    channels: ["console", "webhook"], // Could extend to email, slack, etc.
    thresholds: {
      critical: {
        memoryUsage: 95, // 95% memory usage
        errorRate: 10, // 10% error rate
        responseTime: 5000, // 5 seconds
        uptime: 95, // 95% uptime
      },
      warning: {
        memoryUsage: 85, // 85% memory usage
        errorRate: 5, // 5% error rate
        responseTime: 2000, // 2 seconds
        diskUsage: 80, // 80% disk usage
      },
    },
  },
  dashboard: {
    refreshInterval: 30000, // 30 seconds
    maxDataPoints: 100,
    defaultPeriod: "24h",
    charts: {
      responseTime: true,
      errorRate: true,
      memoryUsage: true,
      requestVolume: true,
      userActivity: true,
    },
  },
};

// Environment-specific overrides
if (process.env.NODE_ENV === "development") {
  monitoringConfig.healthCheck.interval = 60000; // 1 minute in dev
  monitoringConfig.metrics.collection.interval = 300000; // 5 minutes in dev
  monitoringConfig.alerts.enabled = false; // Disable alerts in dev
}

if (process.env.NODE_ENV === "test") {
  monitoringConfig.healthCheck.interval = 10000; // 10 seconds in test
  monitoringConfig.metrics.collection.interval = 10000; // 10 seconds in test
  monitoringConfig.alerts.enabled = false; // Disable alerts in test
}

export default monitoringConfig;
