import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import {
  validateRequestBody,
  validatePathParams,
  PathParamsSchema,
} from "@/lib/middleware/validation";
import { handleApiError } from "@/lib/errors/handlers";
import { apiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/errors/types";
import { UpdateSkillSchema } from "@/lib/validations/skills";
import { prisma } from "@/lib/db";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";

// GET /api/v1/skills/[id] - Get a single skill with full details
async function handleGetSkill(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Apply middleware
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-read", user.id);

    // Validate path parameters
    const { id } = validatePathParams(PathParamsSchema.id, params)();

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      throw new ApiError(404, "User not found", "USER_NOT_FOUND");
    }

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
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/v1/skills/[id] - Update a skill
async function handleUpdateSkill(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Apply middleware
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-write", user.id);

    // Validate path parameters and request body
    const { id } = validatePathParams(PathParamsSchema.id, params)();
    const validatedData = await validateRequestBody(UpdateSkillSchema)(request);

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      throw new ApiError(404, "User not found", "USER_NOT_FOUND");
    }

    // Check if skill exists and belongs to user
    const existingSkill = await prisma.skill.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!existingSkill) {
      throw new ApiError(404, "Skill not found", "SKILL_NOT_FOUND");
    }

    // Check for duplicate name if name is being updated
    if (validatedData.name && validatedData.name !== existingSkill.name) {
      const duplicateSkill = await prisma.skill.findUnique({
        where: {
          userId_name: {
            userId: dbUser.id,
            name: validatedData.name,
          },
        },
      });

      if (duplicateSkill) {
        throw new ApiError(
          409,
          "You already have another skill with this name",
          "DUPLICATE_SKILL_NAME",
          { skillId: duplicateSkill.id }
        );
      }
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.categoryId !== undefined)
      updateData.categoryId = validatedData.categoryId;
    if (validatedData.description !== undefined)
      updateData.description = validatedData.description;
    if (validatedData.tags !== undefined)
      updateData.tags = JSON.stringify(validatedData.tags);
    if (validatedData.verified !== undefined)
      updateData.verified = validatedData.verified;
    if (validatedData.source !== undefined)
      updateData.source = validatedData.source;

    // Handle proficiency change
    const proficiencyChanged =
      validatedData.proficiency !== undefined &&
      validatedData.proficiency !== existingSkill.proficiency;

    if (proficiencyChanged) {
      updateData.proficiency = validatedData.proficiency;
      updateData.lastAssessed = new Date();
    }

    // Update skill in a transaction
    const result = await prisma.$transaction(async tx => {
      // Update the skill
      const updatedSkill = await tx.skill.update({
        where: { id },
        data: updateData,
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
        },
      });

      // Create history entry if proficiency changed
      if (proficiencyChanged) {
        await tx.skillHistory.create({
          data: {
            skillId: id,
            userId: dbUser.id,
            proficiency: validatedData.proficiency!,
            reason: "Manual update",
            source: validatedData.source || "MANUAL",
          },
        });
      }

      return updatedSkill;
    });

    // Transform tags back to array for response
    const responseSkill = {
      ...result,
      tags: result.tags ? JSON.parse(result.tags) : [],
    };

    return apiResponse.success(
      { skill: responseSkill },
      200,
      "Skill updated successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/v1/skills/[id] - Delete a skill
async function handleDeleteSkill(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Apply middleware
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-write", user.id);

    // Validate path parameters
    const { id } = validatePathParams(PathParamsSchema.id, params)();

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      throw new ApiError(404, "User not found", "USER_NOT_FOUND");
    }

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
  } catch (error) {
    return handleApiError(error);
  }
}

// Helper function to calculate proficiency trend
function calculateProficiencyTrend(
  history: Array<{ proficiency: number; createdAt: Date }>
) {
  if (history.length < 2) return "stable";

  const recent = history.slice(0, 3); // Last 3 entries
  const oldest = recent[recent.length - 1];
  const newest = recent[0];

  if (!newest || !oldest) return "stable";

  if (newest.proficiency > oldest.proficiency) return "improving";
  if (newest.proficiency < oldest.proficiency) return "declining";
  return "stable";
}

// Export handlers with middleware
export const GET = withAuthLogging(
  withApiSecurity(handleGetSkill),
  "skills-get-by-id"
);

export const PUT = withAuthLogging(
  withApiSecurity(handleUpdateSkill),
  "skills-update"
);

export const DELETE = withAuthLogging(
  withApiSecurity(handleDeleteSkill),
  "skills-delete"
);
