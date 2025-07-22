import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import { handleGetSkillsAnalytics } from "./handlers";

// GET /api/v1/skills/analytics - Get comprehensive skills analytics
async function getSkillsAnalyticsHandler(request: NextRequest) {
  try {
    return await handleGetSkillsAnalytics(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handler with middleware
export const GET = withAuthLogging(
  withApiSecurity(getSkillsAnalyticsHandler),
  "skills-analytics"
);
