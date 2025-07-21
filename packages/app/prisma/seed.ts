import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Default skill categories
const skillCategories = [
  {
    name: "Programming Languages",
    slug: "programming-languages",
    description: "Core programming languages and syntax",
    icon: "💻",
    color: "#3B82F6",
    order: 1,
  },
  {
    name: "Frontend Development",
    slug: "frontend-development",
    description: "Client-side web development technologies",
    icon: "🎨",
    color: "#8B5CF6",
    order: 2,
  },
  {
    name: "Backend Development",
    slug: "backend-development",
    description: "Server-side development and APIs",
    icon: "⚙️",
    color: "#10B981",
    order: 3,
  },
  {
    name: "Databases",
    slug: "databases",
    description: "Database systems and data management",
    icon: "🗄️",
    color: "#F59E0B",
    order: 4,
  },
  {
    name: "DevOps & Cloud",
    slug: "devops-cloud",
    description: "Cloud platforms and deployment practices",
    icon: "☁️",
    color: "#06B6D4",
    order: 5,
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "iOS, Android, and cross-platform development",
    icon: "📱",
    color: "#EC4899",
    order: 6,
  },
  {
    name: "Data Science & AI",
    slug: "data-science-ai",
    description: "Machine learning, AI, and data analysis",
    icon: "🤖",
    color: "#84CC16",
    order: 7,
  },
  {
    name: "Soft Skills",
    slug: "soft-skills",
    description: "Communication, leadership, and collaboration",
    icon: "🤝",
    color: "#F97316",
    order: 8,
  },
  {
    name: "Tools & Productivity",
    slug: "tools-productivity",
    description: "Development tools and productivity software",
    icon: "🛠️",
    color: "#6366F1",
    order: 9,
  },
  {
    name: "Security",
    slug: "security",
    description: "Cybersecurity and secure coding practices",
    icon: "🔒",
    color: "#EF4444",
    order: 10,
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing categories
  await prisma.skillCategory.deleteMany();
  console.log("✅ Cleared existing skill categories");

  // Create skill categories
  for (const category of skillCategories) {
    await prisma.skillCategory.create({
      data: category,
    });
    console.log(`✅ Created category: ${category.name}`);
  }

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch(e => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
