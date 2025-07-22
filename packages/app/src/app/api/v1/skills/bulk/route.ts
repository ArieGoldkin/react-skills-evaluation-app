import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import { handleBulkUpdateSkills, handleBulkDeleteSkills } from "./handlers";

// PATCH /api/v1/skills/bulk - Bulk update skills
async function bulkUpdateSkillsHandler(request: NextRequest) {
  try {
    return await handleBulkUpdateSkills(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/v1/skills/bulk - Bulk delete skills
async function bulkDeleteSkillsHandler(request: NextRequest) {
  try {
    return await handleBulkDeleteSkills(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handlers with middleware
export const PATCH = withAuthLogging(
  withApiSecurity(bulkUpdateSkillsHandler),
  "skills-bulk-update"
);

export const DELETE = withAuthLogging(
  withApiSecurity(bulkDeleteSkillsHandler),
  "skills-bulk-delete"
);
