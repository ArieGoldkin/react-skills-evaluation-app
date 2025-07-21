import { logError } from "./middleware/logging";

export interface GlobalErrorHandler {
  handleError(error: unknown): Promise<void>;
  isTrustedError(error: unknown): boolean;
}

class ErrorHandler implements GlobalErrorHandler {
  public async handleError(error: unknown): Promise<void> {
    // Log the error with context
    const context = {
      requestId: "global",
      userId: undefined,
      startTime: Date.now(),
    };
    logError(error, context, {
      endpoint: "process",
      method: "GLOBAL_HANDLER",
    });

    // Fire monitoring metrics (placeholder for future implementation)
    await this.fireMonitoringMetric(error);

    // Send critical error notifications (placeholder for future implementation)
    await this.sendCriticalErrorNotification(error);

    // Determine if we need to crash the process
    await this.determineProcessAction(error);
  }

  public isTrustedError(error: unknown): boolean {
    // Check if it's an operational error (known error type)
    if (error instanceof Error) {
      // Check for operational error marker
      const operationalError = error as Error & { isOperational?: boolean };
      if (operationalError.isOperational === true) {
        return true;
      }

      // Check for known error types
      const knownErrorTypes = [
        "ValidationError",
        "ApiError",
        "RateLimitError",
        "DatabaseError",
        "ExternalServiceError",
      ];

      return knownErrorTypes.includes(error.constructor.name);
    }

    return false;
  }

  private async fireMonitoringMetric(error: unknown): Promise<void> {
    try {
      // TODO: Integrate with monitoring service (e.g., Sentry, DataDog)
      console.log("🔥 Firing monitoring metric for error:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });
    } catch (monitoringError) {
      console.error("Failed to fire monitoring metric:", monitoringError);
    }
  }

  private async sendCriticalErrorNotification(error: unknown): Promise<void> {
    try {
      // Only send notifications for critical errors in production
      if (process.env.NODE_ENV !== "production") {
        return;
      }

      const isCritical = !this.isTrustedError(error);
      if (isCritical) {
        // TODO: Integrate with notification service (email, Slack, etc.)
        console.log("📧 Would send critical error notification:", {
          error: error instanceof Error ? error.message : String(error),
          environment: process.env.NODE_ENV,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (notificationError) {
      console.error(
        "Failed to send critical error notification:",
        notificationError
      );
    }
  }

  private async determineProcessAction(error: unknown): Promise<void> {
    // If it's not a trusted error, we should consider exiting
    if (!this.isTrustedError(error)) {
      console.error(
        "💀 Untrusted error detected. Process may need to restart:",
        {
          name: error instanceof Error ? error.name : "Unknown",
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        }
      );

      // In production, we might want to exit the process
      // process.exit(1); // Uncomment this in production with proper process management
    }
  }
}

export const globalErrorHandler = new ErrorHandler();

// Set up global error handlers following Node.js best practices
if (typeof process !== "undefined") {
  // Handle unhandled promise rejections by re-throwing them
  // This allows the uncaughtException handler to process them
  process.on(
    "unhandledRejection",
    (reason: unknown, promise: Promise<unknown>) => {
      console.error(
        "🚨 Unhandled Promise Rejection at:",
        promise,
        "reason:",
        reason
      );
      // Re-throw to let uncaughtException handle it
      throw reason;
    }
  );

  // Handle uncaught exceptions
  process.on("uncaughtException", async (error: Error) => {
    console.error("🚨 Uncaught Exception:", error);

    try {
      await globalErrorHandler.handleError(error);
    } catch (handlerError) {
      console.error("Failed to handle uncaught exception:", handlerError);
    }

    // Exit the process if it's not a trusted error
    if (!globalErrorHandler.isTrustedError(error)) {
      console.error("💀 Exiting process due to untrusted error");
      process.exit(1);
    }
  });

  // Handle process termination signals gracefully
  const gracefulShutdown = (signal: string) => {
    console.log(`🛑 Received ${signal}. Starting graceful shutdown...`);

    // Close database connections
    import("./db")
      .then(({ prisma }) => {
        prisma
          .$disconnect()
          .then(() => {
            console.log("📡 Database connections closed");
            process.exit(0);
          })
          .catch(error => {
            console.error("Error closing database connections:", error);
            process.exit(1);
          });
      })
      .catch(() => {
        process.exit(0);
      });
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}
