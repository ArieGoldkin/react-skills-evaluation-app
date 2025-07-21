"use client";

import { useCategoriesForFilter, useSkills } from "@/hooks/queries";
import { useMemo } from "react";

export interface UseDashboardDataProps {
  selectedCategories: string[];
  searchQuery: string;
}

export const useDashboardData = ({
  selectedCategories,
  searchQuery,
}: UseDashboardDataProps) => {
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

  // Compute stats
  const stats = useMemo(() => {
    if (!skillsData?.skills) {
      return {
        skillsCount: 0,
        averageProficiency: 0,
        categoriesCount: categories?.length || 0,
        verifiedSkillsCount: 0,
      };
    }

    const skills = skillsData.skills;
    const skillsCount = skills.length;
    const averageProficiency = skillsCount
      ? Math.round(
          skills.reduce((sum, skill) => sum + skill.proficiency, 0) /
            skillsCount
        )
      : 0;
    const categoriesCount = categories?.length || 0;
    const verifiedSkillsCount = skills.filter(skill => skill.verified).length;

    return {
      skillsCount,
      averageProficiency,
      categoriesCount,
      verifiedSkillsCount,
    };
  }, [skillsData, categories]);

  return {
    // Data
    skills: skillsData?.skills || [],
    categories: categories || [],

    // Stats
    stats,

    // Loading states
    skillsLoading,
    categoriesLoading,

    // Error states
    skillsError,
  };
};
