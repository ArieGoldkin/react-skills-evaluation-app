"use client";

import { useAuth } from "@/components/auth";
import { SignOutButton } from "@/components/auth/signout-button";
import { Button } from "@/components/ui/button";
import {
  Container,
  SkillCard,
  CategoryFilter,
} from "@skills-eval/design-system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSkills, useCategoriesForFilter } from "@/hooks/queries";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const { session, status, isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Skills filtering state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Data hooks
  const skillsFilters = {
    search: searchQuery,
    sortBy: "updatedAt" as const,
    order: "desc" as const,
    ...(selectedCategories.length > 0 && { categoryId: selectedCategories[0] }),
  };

  const {
    data: skillsData,
    isLoading: skillsLoading,
    error: skillsError,
  } = useSkills(skillsFilters);

  const { categories, isLoading: categoriesLoading } = useCategoriesForFilter();

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
      <Container>
        <div className="py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}!
              </p>
            </div>
            <SignOutButton
              className="bg-transparent border border-border text-foreground hover:bg-muted hover:border-muted-foreground"
              callbackUrl="/"
            />
          </div>

          {/* Skills Overview Stats */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
            <div className="rounded-lg bg-card p-6 shadow">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Skills
              </h3>
              <p className="text-2xl font-bold text-card-foreground">
                {skillsLoading ? "..." : skillsData?.skills?.length || 0}
              </p>
            </div>

            <div className="rounded-lg bg-card p-6 shadow">
              <h3 className="text-sm font-medium text-muted-foreground">
                Avg Proficiency
              </h3>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-card-foreground">
                  {skillsLoading
                    ? "..."
                    : skillsData?.skills?.length
                      ? Math.round(
                          skillsData.skills.reduce(
                            (sum, skill) => sum + skill.proficiency,
                            0
                          ) / skillsData.skills.length
                        )
                      : 0}
                </p>
                <div className="text-sm text-muted-foreground">/10</div>
              </div>
            </div>

            <div className="rounded-lg bg-card p-6 shadow">
              <h3 className="text-sm font-medium text-muted-foreground">
                Categories
              </h3>
              <p className="text-2xl font-bold text-card-foreground">
                {categoriesLoading ? "..." : categories?.length || 0}
              </p>
            </div>

            <div className="rounded-lg bg-card p-6 shadow">
              <h3 className="text-sm font-medium text-muted-foreground">
                Verified Skills
              </h3>
              <p className="text-2xl font-bold text-card-foreground">
                {skillsLoading
                  ? "..."
                  : skillsData?.skills?.filter(skill => skill.verified)
                      .length || 0}
              </p>
            </div>
          </div>

          {/* Skills Management Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Your Skills
              </h2>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>

            {/* Category Filter */}
            <div className="bg-card p-4 rounded-lg shadow">
              <CategoryFilter
                categories={categories.map(cat => ({
                  id: cat.id,
                  name: cat.name,
                  slug: cat.slug,
                  ...(cat.color && { color: cat.color }),
                  ...(cat.icon && { icon: cat.icon }),
                  skillCount: cat.skillCount || 0,
                }))}
                selectedCategories={selectedCategories}
                onSelectionChange={setSelectedCategories}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                isLoading={categoriesLoading}
                variant="default"
              />
            </div>

            {/* Skills Grid */}
            <div className="bg-card rounded-lg shadow">
              {skillsLoading ? (
                <div className="p-8 text-center">
                  <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
                  <p className="text-sm text-muted-foreground">
                    Loading skills...
                  </p>
                </div>
              ) : skillsError ? (
                <div className="p-8 text-center">
                  <p className="text-destructive mb-2">Error loading skills</p>
                  <p className="text-sm text-muted-foreground">
                    Please try refreshing the page
                  </p>
                </div>
              ) : !skillsData?.skills?.length ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No skills found</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Start building your skill profile by adding your first
                    skill.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Skill
                  </Button>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skillsData.skills.map(skillData => (
                      <SkillCard
                        key={skillData.id}
                        skill={{
                          id: skillData.id,
                          name: skillData.name,
                          proficiency: skillData.proficiency,
                          category: {
                            name: skillData.category.name,
                            ...(skillData.category.color && {
                              color: skillData.category.color,
                            }),
                          },
                          ...(skillData.description && {
                            description: skillData.description,
                          }),
                          ...(skillData.tags &&
                            skillData.tags.length > 0 && {
                              tags: skillData.tags,
                            }),
                          ...(skillData.verified !== undefined && {
                            verified: skillData.verified,
                          }),
                          ...(skillData.source && { source: skillData.source }),
                          ...(skillData.lastAssessed && {
                            lastAssessed: skillData.lastAssessed,
                          }),
                        }}
                        variant={skillData.verified ? "verified" : "default"}
                        size="default"
                        onEdit={id => console.log("Edit skill:", id)}
                        onDelete={id => console.log("Delete skill:", id)}
                        onClick={() => console.log("View skill:", skillData.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
