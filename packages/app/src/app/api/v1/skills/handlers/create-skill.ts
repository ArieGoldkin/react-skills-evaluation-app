import { apiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handlers";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateRequestBody } from "@/lib/middleware/validation";
import { CreateSkillSchema } from "@/lib/validations/skills";
import { NextRequest } from "next/server";
import {
  checkSkillExists,
  ensureUserExists,
  transformSkillsResponse,
} from "../utils/";

/**
 * Creates skill with history entry in transaction
 */
async function createSkillWithHistory(
  userId: string,
  validatedData: {
    name: string;
    categoryId: string;
    proficiency: number;
    description?: string | undefined;
    tags?: string[] | undefined;
    source: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
    verified: boolean;
  }
) {
  return await prisma.$transaction(async tx => {
    // Create the skill
    const skill = await tx.skill.create({
      data: {
        userId,
        name: validatedData.name,
        categoryId: validatedData.categoryId,
        proficiency: validatedData.proficiency,
        description: validatedData.description || null,
        tags: JSON.stringify(validatedData.tags || []),
        source: validatedData.source,
        verified: validatedData.verified,
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
      },
    });

    // Create initial history entry
    await tx.skillHistory.create({
      data: {
        skillId: skill.id,
        userId,
        proficiency: skill.proficiency,
        reason: "Skill created",
        source: validatedData.source,
      },
    });

    return skill;
  });
}

/**
 * POST /api/v1/skills - Create a new skill
 */
export async function handleCreateSkill(request: NextRequest) {
  try {
    // Apply middleware
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-write", user.id);

    // Validate request body
    const validatedData = await validateRequestBody(CreateSkillSchema)(request);

    // Ensure user exists and get their ID
    const userId = await ensureUserExists(user);

    // Check if skill name already exists
    const duplicateError = await checkSkillExists(userId, validatedData.name);
    if (duplicateError) {
      return duplicateError;
    }

    // Create skill with history
    const skill = await createSkillWithHistory(userId, validatedData);

    // Transform response
    const [responseSkill] = transformSkillsResponse([skill]);

    return apiResponse.success(
      { skill: responseSkill },
      201,
      "Skill created successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
