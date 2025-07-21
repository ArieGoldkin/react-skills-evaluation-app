import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/categories - Get all skill categories
export async function GET(_request: NextRequest) {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { skills: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
