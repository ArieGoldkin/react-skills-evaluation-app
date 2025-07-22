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
import { calculateProficiencyTrend } from "../utils/skill-helpers";

// GET /api/v1/skills/[id] - Get a single skill with full details
export async function handleGetSkill(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "skills-read", user.id);

  // Validate path parameters
  const { id } = validatePathParams(PathParamsSchema.id, params)();

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Find skill with comprehensive details
  const skill = await prisma.skill.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
          color: true,
        },
      },
      history: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          proficiency: true,
          reason: true,
          source: true,
          createdAt: true,
        },
      },
      assessments: {
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          type: true,
          score: true,
          proficiency: true,
          completedAt: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          history: true,
          assessments: true,
        },
      },
    },
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found", "SKILL_NOT_FOUND");
  }

  // Transform tags from JSON string to array
  const transformedSkill = {
    ...skill,
    tags: skill.tags ? JSON.parse(skill.tags) : [],
    proficiencyTrend: calculateProficiencyTrend(skill.history),
  };

  const response = apiResponse.success(
    { skill: transformedSkill },
    200,
    "Skill retrieved successfully"
  );
  response.headers.set("Cache-Control", "private, max-age=60");
  return response;
}
