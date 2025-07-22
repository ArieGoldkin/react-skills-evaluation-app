import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import {
  handleGetSkill,
  handleUpdateSkill,
  handlePatchSkill,
  handleDeleteSkill,
} from "./handlers";

// GET /api/v1/skills/[id] - Get a single skill with full details
async function getSkillHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleGetSkill(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/v1/skills/[id] - Update a skill
async function updateSkillHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleUpdateSkill(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/v1/skills/[id] - Partial update of a skill
async function patchSkillHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handlePatchSkill(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/v1/skills/[id] - Delete a skill
async function deleteSkillHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleDeleteSkill(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handlers with middleware
export const GET = withAuthLogging(
  withApiSecurity(getSkillHandler),
  "skills-get-by-id"
);

export const PUT = withAuthLogging(
  withApiSecurity(updateSkillHandler),
  "skills-update"
);

export const PATCH = withAuthLogging(
  withApiSecurity(patchSkillHandler),
  "skills-patch"
);

export const DELETE = withAuthLogging(
  withApiSecurity(deleteSkillHandler),
  "skills-delete"
);
