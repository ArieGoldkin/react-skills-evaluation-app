import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import { handleGetAssessments, handleCreateAssessment } from "./handlers";

// GET /api/v1/assessments - Get assessments for authenticated user
async function getAssessmentsHandler(request: NextRequest) {
  try {
    return await handleGetAssessments(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/v1/assessments - Create a new assessment
async function createAssessmentHandler(request: NextRequest) {
  try {
    return await handleCreateAssessment(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handlers with middleware
export const GET = withAuthLogging(
  withApiSecurity(getAssessmentsHandler),
  "assessments-get"
);

export const POST = withAuthLogging(
  withApiSecurity(createAssessmentHandler),
  "assessments-create"
);
