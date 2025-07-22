import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateRequestBody } from "@/lib/middleware/validation";
import { apiResponse } from "@/lib/api-response";
import { getUserFromAuth } from "../utils/user-helpers";
import {
  BulkUpdateSkillsSchema,
  validateSkillsOwnership,
  performBulkUpdate,
} from "../utils/bulk-helpers";

// PATCH /api/v1/skills/bulk - Bulk update skills
export async function handleBulkUpdateSkills(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "skills-write", user.id);

  // Validate request body
  const validatedData = await validateRequestBody(BulkUpdateSkillsSchema)(
    request
  );

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Validate all skills belong to the user
  await validateSkillsOwnership(validatedData.skills, dbUser.id);

  // Perform bulk update in transaction
  const result = await performBulkUpdate(validatedData.skills, dbUser.id);

  return apiResponse.success(
    {
      updatedSkills: result.updatedSkills,
      historyEntries: result.historyEntries,
      summary: {
        totalUpdated: result.updatedSkills.length,
        proficiencyChanges: result.historyEntries.length,
      },
    },
    200,
    `Successfully updated ${result.updatedSkills.length} skills`
  );
}
