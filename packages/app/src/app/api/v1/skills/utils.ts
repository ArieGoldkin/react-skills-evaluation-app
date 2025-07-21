import { prisma } from "@/lib/db";

export async function getSkillsProficiencyDistribution(userId: string) {
  const distribution = await prisma.skill.groupBy({
    by: ["proficiency"],
    where: { userId },
    _count: true,
    orderBy: { proficiency: "asc" },
  });

  return distribution.map(item => ({
    proficiency: item.proficiency,
    count: item._count,
  }));
}

export async function getSkillsCategoryDistribution(userId: string) {
  const distribution = await prisma.skill.groupBy({
    by: ["categoryId"],
    where: { userId },
    _count: true,
  });

  return distribution.map(item => ({
    categoryId: item.categoryId,
    count: item._count,
  }));
}

export async function getAverageProficiency(userId: string) {
  const result = await prisma.skill.aggregate({
    where: { userId },
    _avg: { proficiency: true },
  });

  return Math.round((result._avg.proficiency || 0) * 100) / 100;
}
