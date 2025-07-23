"use client";

import { SidebarTrigger } from "@skills-eval/design-system";
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs";
import { useAnalytics } from "@/hooks/queries/use-analytics";
import {
  OverviewCards,
  ProficiencyDistributionChart,
  CategoryDistributionChart,
  ProgressTrendsChart,
  TopSkills,
  ImprovingSkills,
} from "@/components/analytics";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <DynamicBreadcrumbs />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your skill development progress and insights
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load analytics data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Overview Cards */}
        <OverviewCards
          {...(data && { data: data.overview })}
          isLoading={isLoading}
        />

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <ProficiencyDistributionChart
            {...(data && { data: data.distributions.byProficiency })}
            isLoading={isLoading}
          />
          <CategoryDistributionChart
            {...(data && { data: data.distributions.byCategory })}
            isLoading={isLoading}
          />
        </div>

        {/* Progress Trends */}
        <ProgressTrendsChart
          {...(data && { data: data.trends.monthly })}
          isLoading={isLoading}
        />

        {/* Skills Highlights */}
        <div className="grid gap-6 md:grid-cols-2">
          <TopSkills
            {...(data && { data: data.highlights.topSkills })}
            isLoading={isLoading}
          />
          <ImprovingSkills
            {...(data && { data: data.highlights.improving })}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
