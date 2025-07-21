import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/skills/[id] - Get a single skill
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const skill = await prisma.skill.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        category: true,
        history: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        assessments: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ skill });
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}

// PUT /api/skills/[id] - Update a skill
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, categoryId, proficiency, description, tags, verified } = body;

    // Check if skill exists and belongs to user
    const existingSkill = await prisma.skill.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Update skill
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (proficiency !== undefined) updateData.proficiency = proficiency;
    if (description !== undefined) updateData.description = description;
    if (tags !== undefined) updateData.tags = JSON.stringify(tags);
    if (verified !== undefined) updateData.verified = verified;
    if (
      proficiency !== undefined &&
      proficiency !== existingSkill.proficiency
    ) {
      updateData.lastAssessed = new Date();
    }

    const skill = await prisma.skill.update({
      where: { id: params.id },
      data: updateData,
      include: {
        category: true,
      },
    });

    // Create history entry if proficiency changed
    if (
      proficiency !== undefined &&
      proficiency !== existingSkill.proficiency
    ) {
      await prisma.skillHistory.create({
        data: {
          skillId: skill.id,
          userId: user.id,
          proficiency,
          reason: "Manual update",
          source: "MANUAL",
        },
      });
    }

    return NextResponse.json({ skill });
  } catch (error: unknown) {
    console.error("Error updating skill:", error);

    // Handle unique constraint violation
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "You already have another skill with this name" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id] - Delete a skill
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if skill exists and belongs to user
    const skill = await prisma.skill.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Delete skill (cascade will handle related records)
    await prisma.skill.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
