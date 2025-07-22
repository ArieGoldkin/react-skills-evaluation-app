# API Monitoring & Health Check Guide

## 🔍 Overview

The Skills Evaluation App includes comprehensive monitoring capabilities to track system health, performance metrics, and usage patterns. The monitoring system is built with production-ready features including real-time health checks, performance metrics, and an administrative dashboard.

## 📊 Monitoring Endpoints

### 1. Health Check - `/api/health`

**Purpose**: Comprehensive health check for load balancers, uptime monitoring, and system status verification

**Features**:

- Database connectivity testing with response time measurement
- Redis connectivity checks (when configured)
- System memory usage monitoring
- Service-specific health validation
- Graceful degradation on service failures

**Response Format**:

```typescript
interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string; // ISO 8601
  uptime: number; // Seconds since startup
  version: string;
  checks: {
    database: {
      status: "healthy" | "unhealthy";
      responseTime: number; // milliseconds
      error?: string;
    };
    redis?: {
      status: "healthy" | "unhealthy";
      responseTime: number; // milliseconds
      error?: string;
    };
  };
  metrics: {
    memory: {
      used: number; // bytes
      total: number; // bytes
      percentage: number;
    };
    cpu: {
      percentage: number;
    };
  };
}
```

**Example Response**:

```json
{
  "status": "healthy",
  "timestamp": "2025-07-22T10:00:00Z",
  "uptime": 3600,
  "version": "1.0.0",
  "checks": {
    "database": {
      "status": "healthy",
      "responseTime": 23
    },
    "redis": {
      "status": "healthy",
      "responseTime": 5
    }
  },
  "metrics": {
    "memory": {
      "used": 134217728,
      "total": 536870912,
      "percentage": 25.0
    },
    "cpu": {
      "percentage": 15.2
    }
  }
}
```

**Status Codes**:

- `200` - System is healthy or degraded (but operational)
- `503` - System is unhealthy (critical services down)

**Health Status Logic**:

- **Healthy**: All services responding, memory < 80%
- **Degraded**: Some services slow, memory 80-90%, or minor issues
- **Unhealthy**: Critical services down, memory > 90%, or major failures

---

### 2. System Status - `/api/monitoring/status`

**Purpose**: Detailed system status including service states, feature toggles, and deployment information

**Features**:

- Service-level status aggregation
- Feature flag management and reporting
- Deployment metadata tracking
- Resource utilization monitoring
- Environment-specific configuration

**Response Format**:

```typescript
interface StatusResponse {
  status: "operational" | "maintenance" | "partial-outage" | "major-outage";
  timestamp: string;
  services: {
    api: "operational" | "degraded" | "down";
    database: "operational" | "degraded" | "down";
    authentication: "operational" | "degraded" | "down";
    redis?: "operational" | "degraded" | "down";
  };
  features: {
    assessments: boolean;
    analytics: boolean;
    bulkOperations: boolean;
    aiEvaluations?: boolean;
  };
  deployment: {
    version: string;
    environment: string;
    region: string;
    deployedAt: string;
    commitHash?: string;
  };
  resources: {
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    cpu: number;
    disk: number;
  };
}
```

**Example Response**:

```json
{
  "status": "operational",
  "timestamp": "2025-07-22T10:00:00Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "authentication": "operational",
    "redis": "operational"
  },
  "features": {
    "assessments": true,
    "analytics": true,
    "bulkOperations": true,
    "aiEvaluations": false
  },
  "deployment": {
    "version": "1.0.0",
    "environment": "production",
    "region": "us-east-1",
    "deployedAt": "2025-07-22T08:30:00Z",
    "commitHash": "abc123ef"
  },
  "resources": {
    "memory": {
      "used": 512000000,
      "total": 2048000000,
      "percentage": 25.0
    },
    "cpu": 35.2,
    "disk": 65.8
  }
}
```

---

### 3. Metrics Collection - `/api/metrics`

**Purpose**: Detailed application metrics, performance data, and usage statistics

**Query Parameters**:

- `period` - Time period for metrics (`hour`, `day`, `week`, `month`) (default: `day`)

**Features**:

- Real-time performance metrics
- Database entity counts and statistics
- User activity and engagement metrics
- Application feature usage tracking
- System resource monitoring

**Response Format**:

```typescript
interface MetricsResponse {
  timestamp: string;
  period: string;
  application: {
    version: string;
    uptime: number;
    environment: string;
  };
  performance: {
    averageResponseTime: number; // milliseconds
    requestsPerMinute: number;
    errorRate: number; // percentage
    throughput: number; // requests per second
  };
  database: {
    totalUsers: number;
    totalSkills: number;
    totalAssessments: number;
    totalCategories: number;
    totalGoals: number;
    activeUsers24h: number;
    newUsersToday: number;
    connectionsActive: number;
    slowQueries: number;
  };
  features: {
    skillsCreated24h: number;
    assessmentsCompleted24h: number;
    goalsAchieved24h: number;
    bulkOperationsToday: number;
  };
  system: {
    memory: {
      used: number;
      total: number;
      percentage: number;
      heapUsed: number;
      heapTotal: number;
    };
    cpu: {
      percentage: number;
      loadAverage: number[];
    };
    disk: {
      used: number;
      total: number;
      percentage: number;
    };
  };
  api: {
    endpoints: {
      [endpoint: string]: {
        requests: number;
        averageResponseTime: number;
        errorRate: number;
      };
    };
    rateLimiting: {
      requestsBlocked: number;
      topBlockedIPs: string[];
    };
  };
}
```

**Example Response**:

```json
{
  "timestamp": "2025-07-22T10:00:00Z",
  "period": "day",
  "application": {
    "version": "1.0.0",
    "uptime": 86400,
    "environment": "production"
  },
  "performance": {
    "averageResponseTime": 145,
    "requestsPerMinute": 23.5,
    "errorRate": 0.2,
    "throughput": 0.39
  },
  "database": {
    "totalUsers": 1247,
    "totalSkills": 8934,
    "totalAssessments": 2156,
    "totalCategories": 24,
    "totalGoals": 567,
    "activeUsers24h": 89,
    "newUsersToday": 12,
    "connectionsActive": 5,
    "slowQueries": 2
  },
  "features": {
    "skillsCreated24h": 45,
    "assessmentsCompleted24h": 23,
    "goalsAchieved24h": 8,
    "bulkOperationsToday": 3
  },
  "system": {
    "memory": {
      "used": 524288000,
      "total": 2147483648,
      "percentage": 24.4,
      "heapUsed": 89456640,
      "heapTotal": 134217728
    },
    "cpu": {
      "percentage": 18.5,
      "loadAverage": [0.25, 0.18, 0.12]
    },
    "disk": {
      "used": 5368709120,
      "total": 21474836480,
      "percentage": 25.0
    }
  },
  "api": {
    "endpoints": {
      "/api/v1/skills": {
        "requests": 1247,
        "averageResponseTime": 123,
        "errorRate": 0.1
      },
      "/api/v1/assessments": {
        "requests": 456,
        "averageResponseTime": 234,
        "errorRate": 0.3
      }
    },
    "rateLimiting": {
      "requestsBlocked": 12,
      "topBlockedIPs": ["192.168.1.100", "10.0.0.25"]
    }
  }
}
```

---

## 🖥️ Monitoring Dashboard

### Administrative Dashboard

**Location**: `/admin/monitoring`

**Features**:

- Real-time system health overview
- Live performance metrics with auto-refresh
- Service status indicators
- Historical trend visualization
- Alert management interface
- Resource usage monitoring

**Dashboard Sections**:

1. **System Overview**:
   - Overall system status indicator
   - Key performance metrics summary
   - Recent alerts and issues
   - Quick action buttons

2. **Service Health**:
   - Individual service status cards
   - Response time graphs
   - Error rate trending
   - Service dependency mapping

3. **Performance Metrics**:
   - Real-time CPU and memory usage
   - API request throughput
   - Database performance
   - Cache hit rates

4. **Application Metrics**:
   - User activity statistics
   - Feature usage analytics
   - Business metric tracking
   - Growth indicators

5. **Infrastructure**:
   - Server resource utilization
   - Database connection pools
   - Storage usage
   - Network metrics

**Dashboard Configuration**:

```typescript
interface DashboardConfig {
  refreshIntervals: {
    health: number; // 30 seconds
    metrics: number; // 60 seconds
    alerts: number; // 15 seconds
  };
  thresholds: {
    memory: { warning: 80; critical: 90 };
    cpu: { warning: 70; critical: 85 };
    responseTime: { warning: 500; critical: 1000 };
    errorRate: { warning: 1; critical: 5 };
  };
  features: {
    autoRefresh: boolean;
    alertNotifications: boolean;
    exportMetrics: boolean;
  };
}
```

---

## 🚨 Alerting & Notifications

### Alert Configuration

The monitoring system supports configurable alerts based on various thresholds:

**Alert Types**:

- **Service Down**: Critical service failures
- **High Error Rate**: API error rate exceeds threshold
- **Resource Exhaustion**: Memory/CPU/disk usage limits
- **Performance Degradation**: Response time increases
- **Database Issues**: Connection or query problems

**Alert Configuration**:

```typescript
interface AlertConfig {
  enabled: boolean;
  channels: ("email" | "webhook" | "dashboard")[];
  thresholds: {
    errorRate: number; // percentage
    responseTime: number; // milliseconds
    memoryUsage: number; // percentage
    cpuUsage: number; // percentage
    diskUsage: number; // percentage
  };
  cooldownPeriod: number; // seconds between same alerts
  escalation: {
    enabled: boolean;
    levels: AlertLevel[];
  };
}
```

### Health Check Automation

**Automated Monitoring**:

- Health endpoint polling every 30 seconds
- Service status validation
- Automatic failover detection
- Performance baseline tracking

**Integration Points**:

- Load balancer health checks
- Container orchestration (Docker/Kubernetes)
- External monitoring services (Uptime Robot, Pingdom)
- CI/CD pipeline integration

---

## 🔧 Configuration & Environment Variables

### Environment Variables

```bash
# Monitoring Configuration
ENABLE_MONITORING="true"
MONITORING_SECRET="your-monitoring-secret-key"
MONITORING_REFRESH_INTERVAL="30000" # milliseconds

# Alert Configuration
ALERT_EMAIL_ENABLED="true"
ALERT_WEBHOOK_URL="https://hooks.slack.com/your-webhook"
ALERT_COOLDOWN_PERIOD="300" # 5 minutes

# Performance Thresholds
MEMORY_WARNING_THRESHOLD="80" # percentage
MEMORY_CRITICAL_THRESHOLD="90" # percentage
CPU_WARNING_THRESHOLD="70" # percentage
RESPONSE_TIME_WARNING="500" # milliseconds

# Dashboard Configuration
DASHBOARD_AUTO_REFRESH="true"
DASHBOARD_EXPORT_ENABLED="true"
DASHBOARD_ALERT_NOTIFICATIONS="true"

# Database Monitoring
DB_SLOW_QUERY_THRESHOLD="1000" # milliseconds
DB_CONNECTION_POOL_ALERTS="true"

# Feature Toggles for Monitoring
ENABLE_DETAILED_METRICS="true"
ENABLE_REQUEST_TRACING="false" # Coming soon
ENABLE_PERFORMANCE_PROFILING="false" # Coming soon
```

### Monitoring Service Configuration

```typescript
interface MonitoringServiceConfig {
  healthCheck: {
    enabled: boolean;
    interval: number; // milliseconds
    timeout: number; // milliseconds
    retries: number;
  };
  metrics: {
    collection: {
      enabled: boolean;
      interval: number;
      retention: number; // days
    };
    aggregation: {
      enabled: boolean;
      intervals: ("minute" | "hour" | "day")[];
    };
  };
  alerts: {
    enabled: boolean;
    channels: AlertChannel[];
    thresholds: AlertThresholds;
  };
  dashboard: {
    enabled: boolean;
    realTime: boolean;
    caching: boolean;
  };
}
```

---

## 📈 Performance Monitoring

### Key Performance Indicators (KPIs)

**System KPIs**:

- System uptime and availability
- Average response time across all endpoints
- Error rate and success rate
- Throughput (requests per second)

**Application KPIs**:

- User engagement metrics
- Feature adoption rates
- Business conversion metrics
- Data quality indicators

**Infrastructure KPIs**:

- Resource utilization (CPU, Memory, Disk)
- Database performance metrics
- Cache efficiency
- Network latency

### Monitoring Best Practices

1. **Proactive Monitoring**:
   - Set up automated health checks
   - Configure meaningful alerts with proper thresholds
   - Monitor business metrics alongside technical metrics
   - Implement proper error tracking and logging

2. **Performance Optimization**:
   - Regular performance baseline reviews
   - Database query optimization based on metrics
   - Resource scaling based on usage patterns
   - Caching strategy optimization

3. **Incident Response**:
   - Clear escalation procedures
   - Automated incident detection
   - Performance degradation alerts
   - Recovery time monitoring

4. **Continuous Improvement**:
   - Regular monitoring system reviews
   - Alert tuning to reduce noise
   - Dashboard optimization for usability
   - Metric correlation analysis

---

## 🔮 Future Enhancements

### Planned Monitoring Features

1. **Advanced Analytics**:
   - Historical trend analysis
   - Predictive monitoring with ML
   - Anomaly detection algorithms
   - Custom metric correlation

2. **Enhanced Alerting**:
   - Smart alert grouping
   - Alert fatigue reduction
   - Multi-channel notification routing
   - SLA monitoring and reporting

3. **Extended Integration**:
   - External monitoring service APIs
   - Business intelligence tool integration
   - Real-time dashboard streaming
   - Mobile monitoring app

4. **Security Monitoring**:
   - Security event detection
   - Intrusion attempt monitoring
   - Data access audit trails
   - Compliance reporting

This comprehensive monitoring system provides robust visibility into the application's health, performance, and usage patterns, enabling proactive maintenance and optimization.
