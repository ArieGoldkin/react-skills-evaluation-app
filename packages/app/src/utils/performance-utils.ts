/**
 * Performance Utilities
 *
 * Handles system performance metrics collection including:
 * - Memory usage statistics
 * - CPU usage metrics
 * - Process performance data
 */

export interface PerformanceMetrics {
  memory: {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
  };
  cpu: {
    userCPUTime: number;
    systemCPUTime: number;
  };
}

export class PerformanceUtils {
  /**
   * Get current system performance metrics
   * @returns PerformanceMetrics
   */
  static getPerformanceMetrics(): PerformanceMetrics {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    return {
      memory: {
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        external: memUsage.external,
        rss: memUsage.rss,
      },
      cpu: {
        userCPUTime: cpuUsage.user,
        systemCPUTime: cpuUsage.system,
      },
    };
  }

  /**
   * Calculate memory usage percentage
   * @param memoryMetrics - Memory metrics from getPerformanceMetrics
   * @returns Memory usage percentage (0-100)
   */
  static calculateMemoryUsagePercent(
    memoryMetrics: PerformanceMetrics["memory"]
  ): number {
    return Math.round((memoryMetrics.heapUsed / memoryMetrics.heapTotal) * 100);
  }

  /**
   * Get process uptime formatted as a human-readable string
   * @returns Formatted uptime string (e.g., "2d 5h 30m")
   */
  static getFormattedUptime(): string {
    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  }

  /**
   * Check if memory usage is above threshold
   * @param threshold - Memory usage threshold percentage (0-100)
   * @returns Boolean indicating if memory usage is high
   */
  static isMemoryUsageHigh(threshold: number = 85): boolean {
    const memoryMetrics = this.getPerformanceMetrics().memory;
    const usagePercent = this.calculateMemoryUsagePercent(memoryMetrics);
    return usagePercent > threshold;
  }
}
