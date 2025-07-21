"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryFilter, SkillCard } from "@skills-eval/design-system";
import { Plus } from "lucide-react";

export interface SkillsManagementProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
    skillCount?: number;
  }>;
  skills: Array<{
    id: string;
    name: string;
    proficiency: number;
    category: {
      name: string;
      color?: string;
    };
    description?: string;
    tags?: string[];
    verified?: boolean;
    source?: string;
    lastAssessed?: Date;
  }>;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onAddSkill: () => void;
  onEditSkill: (id: string) => void;
  onDeleteSkill: (id: string) => void;
  onViewSkill: (id: string) => void;
  isLoadingCategories: boolean;
  isLoadingSkills: boolean;
  skillsError?: Error | null;
}

export const SkillsManagement: React.FC<SkillsManagementProps> = ({
  categories,
  skills,
  selectedCategories,
  onCategoriesChange,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
  onViewSkill,
  isLoadingCategories,
  isLoadingSkills,
  skillsError,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your Skills</h2>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={onAddSkill}
        >
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
          onSelectionChange={onCategoriesChange}
          loading={isLoadingCategories}
          variant="default"
        />
      </div>

      {/* Skills Grid */}
      <div className="bg-card rounded-lg shadow">
        {isLoadingSkills ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
            <p className="text-sm text-muted-foreground">Loading skills...</p>
          </div>
        ) : skillsError ? (
          <div className="p-8 text-center">
            <p className="text-destructive mb-2">Error loading skills</p>
            <p className="text-sm text-muted-foreground">
              Please try refreshing the page
            </p>
          </div>
        ) : !skills?.length ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No skills found</p>
            <p className="text-sm text-muted-foreground mb-6">
              Start building your skill profile by adding your first skill.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={onAddSkill}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Skill
            </Button>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skills.map(skillData => (
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
                    ...(skillData.source && {
                      source: skillData.source as
                        | "MANUAL"
                        | "ASSESSMENT"
                        | "GITHUB"
                        | "AI_SUGGESTED"
                        | "IMPORTED",
                    }),
                    ...(skillData.lastAssessed && {
                      lastAssessed: skillData.lastAssessed,
                    }),
                  }}
                  variant={skillData.verified ? "verified" : "default"}
                  size="default"
                  onEdit={onEditSkill}
                  onDelete={onDeleteSkill}
                  onClick={() => onViewSkill(skillData.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
