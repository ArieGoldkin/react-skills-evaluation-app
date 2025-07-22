import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateRequestBody } from "@/lib/middleware/validation";
import { apiResponse } from "@/lib/api-response";
import { getUserFromAuth } from "../utils/user-helpers";
import {
  BulkDeleteSkillsSchema,
  validateSkillsForDeletion,
  performBulkDelete,
} from "../utils/bulk-helpers";

// DELETE /api/v1/skills/bulk - Bulk delete skills
export async function handleBulkDeleteSkills(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "skills-write", user.id);

  // Validate request body
  const validatedData = await validateRequestBody(BulkDeleteSkillsSchema)(
    request
  );

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Validate skills can be deleted
  const skillsToDelete = await validateSkillsForDeletion(
    validatedData.skillIds,
    dbUser.id
  );

  // Perform bulk delete
  const deletedCount = await performBulkDelete(validatedData.skillIds);

  return apiResponse.success(
    {
      deletedSkills: skillsToDelete.map(skill => ({
        id: skill.id,
        name: skill.name,
        relatedRecords: skill._count,
      })),
      summary: {
        totalDeleted: deletedCount,
        assessmentsRemoved: skillsToDelete.reduce(
          (sum, skill) => sum + skill._count.assessments,
          0
        ),
        historyEntriesRemoved: skillsToDelete.reduce(
          (sum, skill) => sum + skill._count.history,
          0
        ),
      },
    },
    200,
    `Successfully deleted ${deletedCount} skills`
  );
}
