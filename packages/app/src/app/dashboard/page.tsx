"use client";

import { useAuth } from "@/components/auth";
import { SignOutButton } from "@/components/auth/signout-button";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { SkillsManagement } from "@/components/dashboard/skills-management";
import { Container, Header } from "@skills-eval/design-system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/hooks/use-dashboard-data";

export default function DashboardPage() {
  const { session, status, isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Skills filtering state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Data hook
  const {
    skills,
    categories,
    stats,
    skillsLoading,
    categoriesLoading,
    skillsError,
  } = useDashboardData({ selectedCategories });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    return null; // Will redirect to sign in
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        logo={
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Skills Evaluation
            </h1>
          </div>
        }
        actions={
          <SignOutButton
            className="bg-transparent border border-border text-foreground hover:bg-muted hover:border-muted-foreground"
            callbackUrl="/"
          />
        }
        showThemeToggle={true}
      />
      <Container>
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>

          <DashboardStats
            skillsCount={stats.skillsCount}
            averageProficiency={stats.averageProficiency}
            categoriesCount={stats.categoriesCount}
            verifiedSkillsCount={stats.verifiedSkillsCount}
            isLoading={skillsLoading}
          />

          <SkillsManagement
            categories={categories.map(cat => {
              const mapped: {
                id: string;
                name: string;
                slug: string;
                color?: string;
                icon?: string;
                skillCount?: number;
              } = {
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                skillCount: cat.skillCount || 0,
              };
              if (cat.color) mapped.color = cat.color;
              if (cat.icon) mapped.icon = cat.icon;
              return mapped;
            })}
            skills={skills.map(skill => {
              const mapped: {
                id: string;
                name: string;
                proficiency: number;
                category: { name: string; color?: string };
                description?: string;
                tags?: string[];
                verified?: boolean;
                source?: string;
                lastAssessed?: Date;
              } = {
                id: skill.id,
                name: skill.name,
                proficiency: skill.proficiency,
                category: { name: skill.category.name },
              };
              if (skill.category.color)
                mapped.category.color = skill.category.color;
              if (skill.description) mapped.description = skill.description;
              if (skill.tags) mapped.tags = skill.tags;
              if (skill.verified !== undefined)
                mapped.verified = skill.verified;
              if (skill.source) mapped.source = skill.source;
              if (skill.lastAssessed)
                mapped.lastAssessed = new Date(skill.lastAssessed);
              return mapped;
            })}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            onAddSkill={() => console.log("Add skill")}
            onEditSkill={id => console.log("Edit skill:", id)}
            onDeleteSkill={id => console.log("Delete skill:", id)}
            onViewSkill={id => console.log("View skill:", id)}
            isLoadingCategories={categoriesLoading}
            isLoadingSkills={skillsLoading}
            skillsError={skillsError}
          />
        </div>
      </Container>
    </div>
  );
}
