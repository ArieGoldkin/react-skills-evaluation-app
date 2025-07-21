"use client";

import React from "react";

export interface DashboardStatsProps {
  skillsCount: number;
  averageProficiency: number;
  categoriesCount: number;
  verifiedSkillsCount: number;
  isLoading: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  skillsCount,
  averageProficiency,
  categoriesCount,
  verifiedSkillsCount,
  isLoading,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
      <div className="rounded-lg bg-card p-6 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Total Skills
        </h3>
        <p className="text-2xl font-bold text-card-foreground">
          {isLoading ? "..." : skillsCount}
        </p>
      </div>

      <div className="rounded-lg bg-card p-6 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Avg Proficiency
        </h3>
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold text-card-foreground">
            {isLoading ? "..." : averageProficiency}
          </p>
          <div className="text-sm text-muted-foreground">/10</div>
        </div>
      </div>

      <div className="rounded-lg bg-card p-6 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Categories
        </h3>
        <p className="text-2xl font-bold text-card-foreground">
          {isLoading ? "..." : categoriesCount}
        </p>
      </div>

      <div className="rounded-lg bg-card p-6 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Verified Skills
        </h3>
        <p className="text-2xl font-bold text-card-foreground">
          {isLoading ? "..." : verifiedSkillsCount}
        </p>
      </div>
    </div>
  );
};
