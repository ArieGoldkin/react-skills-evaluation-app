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

// PATCH /api/v1/skills/[id] - Partial update of a skill
export async function handlePatchSkill(
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

  // Build update data only for provided fields
  const updateData = buildUpdateData(validatedData);

  // Only update provided fields
  if (validatedData.name !== undefined) {
    // Check for duplicate name if name is being updated
    if (validatedData.name !== existingSkill.name) {
      await checkDuplicateName(validatedData.name, dbUser.id);
    }
  }

  // Handle proficiency change
  const proficiencyChanged =
    validatedData.proficiency !== undefined &&
    validatedData.proficiency !== existingSkill.proficiency;

  if (proficiencyChanged) {
    updateData.proficiency = validatedData.proficiency;
    updateData.lastAssessed = new Date();
  }

  // Update skill
  const updatedSkill = await prisma.skill.update({
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
    await prisma.skillHistory.create({
      data: {
        skillId: id,
        userId: dbUser.id,
        proficiency: validatedData.proficiency!,
        reason: "Partial update",
        source: validatedData.source || "MANUAL",
      },
    });
  }

  // Transform tags back to array for response
  const responseSkill = {
    ...updatedSkill,
    tags: updatedSkill.tags ? JSON.parse(updatedSkill.tags) : [],
  };

  return apiResponse.success(
    { skill: responseSkill },
    200,
    "Skill updated successfully"
  );
}
