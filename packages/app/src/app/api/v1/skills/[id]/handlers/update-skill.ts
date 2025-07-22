import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import {
  validateRequestBody,
  validatePathParams,
  PathParamsSchema,
} from "@/lib/middleware/validation";
import { apiResponse } from "@/lib/api-response";
import { UpdateSkillSchema } from "@/lib/validations/skills";
import { prisma } from "@/lib/db";
import { getUserFromAuth } from "../utils/user-helpers";
import {
  checkSkillOwnership,
  checkDuplicateName,
  buildUpdateData,
} from "../utils/skill-helpers";

// PUT /api/v1/skills/[id] - Update a skill
export async function handleUpdateSkill(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "skills-write", user.id);

  // Validate path parameters and request body
  const { id } = validatePathParams(PathParamsSchema.id, params)();
  const validatedData = await validateRequestBody(UpdateSkillSchema)(request);

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Check if skill exists and belongs to user
  const existingSkill = await checkSkillOwnership(id, dbUser.id);

  // Check for duplicate name if name is being updated
  if (validatedData.name && validatedData.name !== existingSkill.name) {
    await checkDuplicateName(validatedData.name, dbUser.id);
  }

  // Prepare update data
  const updateData = buildUpdateData(validatedData);

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
}
