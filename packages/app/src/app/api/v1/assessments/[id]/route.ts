import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import {
  handleGetAssessment,
  handleUpdateAssessment,
  handleDeleteAssessment,
} from "./handlers";

// GET /api/v1/assessments/[id] - Get a single assessment
async function getAssessmentHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleGetAssessment(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/v1/assessments/[id] - Update an assessment
async function updateAssessmentHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleUpdateAssessment(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/v1/assessments/[id] - Delete an assessment
async function deleteAssessmentHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleDeleteAssessment(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handlers with middleware
export const GET = withAuthLogging(
  withApiSecurity(getAssessmentHandler),
  "assessments-get-by-id"
);

export const PUT = withAuthLogging(
  withApiSecurity(updateAssessmentHandler),
  "assessments-update"
);

export const DELETE = withAuthLogging(
  withApiSecurity(deleteAssessmentHandler),
  "assessments-delete"
);
