import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/skills - Get all skills for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Build query filters
    const where: Record<string, unknown> = { userId: user.id };
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    // Get skills with category information
    const skills = await prisma.skill.findMany({
      where,
      include: {
        category: true,
        _count: {
          select: { assessments: true, history: true },
        },
      },
      orderBy: { [sortBy]: order },
    });

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      // Create user if doesn't exist
      const newUser = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name ?? null,
          image: session.user.image ?? null,
          provider: session.provider ?? null,
          providerId: session.providerAccountId ?? null,
        },
      });
      user = newUser;
    }

    const body = await request.json();
    const { name, categoryId, proficiency, description, tags } = body;

    // Validate required fields
    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Name and categoryId are required" },
        { status: 400 }
      );
    }

    // Create skill
    const skill = await prisma.skill.create({
      data: {
        userId: user.id,
        name,
        categoryId,
        proficiency: proficiency || 0,
        description,
        tags: tags || [],
        source: "MANUAL",
      },
      include: {
        category: true,
      },
    });

    // Create initial history entry
    await prisma.skillHistory.create({
      data: {
        skillId: skill.id,
        userId: user.id,
        proficiency: skill.proficiency,
        reason: "Skill created",
        source: "MANUAL",
      },
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating skill:", error);

    // Handle unique constraint violation
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "You already have a skill with this name" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
