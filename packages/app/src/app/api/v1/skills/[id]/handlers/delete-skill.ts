import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import {
  validatePathParams,
  PathParamsSchema,
} from "@/lib/middleware/validation";
import { apiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";
import { getUserFromAuth } from "../utils/user-helpers";

// DELETE /api/v1/skills/[id] - Delete a skill
export async function handleDeleteSkill(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "skills-write", user.id);

  // Validate path parameters
  const { id } = validatePathParams(PathParamsSchema.id, params)();

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Check if skill exists and belongs to user
  const skill = await prisma.skill.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          assessments: true,
          history: true,
        },
      },
    },
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found", "SKILL_NOT_FOUND");
  }

  // Delete skill (Prisma cascade will handle related records)
  await prisma.skill.delete({
    where: { id },
  });

  return apiResponse.success(
    {
      deletedSkill: {
        id: skill.id,
        name: skill.name,
        relatedRecords: {
          assessments: skill._count.assessments,
          history: skill._count.history,
        },
      },
    },
    200,
    "Skill deleted successfully"
  );
}
