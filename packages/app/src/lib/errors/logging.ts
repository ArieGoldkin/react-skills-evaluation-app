/**
 * Log structured error information
 */
export function logError(
  error: unknown,
  context: {
    userId?: string;
    endpoint?: string;
    method?: string;
    requestId?: string;
  } = {}
) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    error: {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    },
    context,
  };

  // In production, you might want to send this to a logging service
  console.error("Structured Error Log:", JSON.stringify(errorInfo, null, 2));

  // TODO: Integrate with logging service (e.g., Sentry, LogRocket)
  // await sendToLoggingService(errorInfo);
}
