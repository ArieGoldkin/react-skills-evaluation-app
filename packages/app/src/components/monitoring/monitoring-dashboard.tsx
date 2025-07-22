"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@skills-eval/design-system";
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs";
import { apiClient } from "@/lib/api-client";
import { LoadingSpinner } from "@skills-eval/design-system";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Database,
  MemoryStick,
} from "lucide-react";

interface HealthData {
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

interface MetricsData {
  timestamp: string;
  period: string;
  application: {
    version: string;
    uptime: number;
    environment: string;
  };
  performance: {
    memory: {
      heapUsed: number;
      heapTotal: number;
      external: number;
      rss: number;
    };
    cpu: {
      user: number;
      system: number;
    };
  };
  database: {
    connections: number;
    activeQueries: number;
    slowQueries: number;
    totalUsers: number;
    totalSkills: number;
    totalAssessments: number;
  };
  users: {
    activeUsers: number;
    newUsersToday: number;
    assessmentsToday: number;
    skillsCreatedToday: number;
  };
}

export function MonitoringDashboard() {
  const { data: health, isLoading: healthLoading } = useQuery<HealthData>({
    queryKey: ["health"],
    queryFn: () => apiClient.get<HealthData>("/api/health"),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery<MetricsData>({
    queryKey: ["metrics"],
    queryFn: () => apiClient.get<MetricsData>("/api/metrics"),
    refetchInterval: 60000, // Refresh every minute
  });

  if (healthLoading || metricsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes: number) => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "up":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "unhealthy":
      case "down":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <DynamicBreadcrumbs />
      </div>
      <h1 className="text-2xl font-bold">System Monitoring Dashboard</h1>

      {/* Health Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {getStatusIcon(health?.status || "unknown")}
              <span className="text-2xl font-bold capitalize">
                {health?.status || "Unknown"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Uptime: {formatUptime(health?.uptime || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {getStatusIcon(health?.services.database.status || "unknown")}
              <span className="text-2xl font-bold capitalize">
                {health?.services.database.status || "Unknown"}
              </span>
            </div>
            {health?.services.database.responseTime && (
              <p className="text-xs text-muted-foreground mt-2">
                Response time: {health.services.database.responseTime}ms
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {health?.system.memory.percentage || 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {formatBytes(health?.system.memory.used || 0)} /{" "}
              {formatBytes(health?.system.memory.total || 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Database Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Database Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <p className="text-2xl font-bold">
                {metrics?.database.totalUsers || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Skills
              </p>
              <p className="text-2xl font-bold">
                {metrics?.database.totalSkills || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Assessments
              </p>
              <p className="text-2xl font-bold">
                {metrics?.database.totalAssessments || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Queries
              </p>
              <p className="text-2xl font-bold">
                {metrics?.database.activeQueries || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Activity */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity (Today)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <p className="text-2xl font-bold">
                {metrics?.users.activeUsers || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                New Users
              </p>
              <p className="text-2xl font-bold">
                {metrics?.users.newUsersToday || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Assessments
              </p>
              <p className="text-2xl font-bold">
                {metrics?.users.assessmentsToday || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Skills Created
              </p>
              <p className="text-2xl font-bold">
                {metrics?.users.skillsCreatedToday || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Version
              </span>
              <span className="text-sm">{health?.version || "Unknown"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Environment
              </span>
              <span className="text-sm">
                {health?.environment || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Node Version
              </span>
              <span className="text-sm">
                {health?.system.nodeVersion || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Platform
              </span>
              <span className="text-sm">
                {health?.system.platform || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Last Updated
              </span>
              <span className="text-sm">
                {health?.timestamp
                  ? new Date(health.timestamp).toLocaleString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
