"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import type { AnalyticsOverview } from "@/services/analytics.service";
import { LoadingSpinner } from "@skills-eval/design-system";

interface OverviewCardsProps {
  data?: AnalyticsOverview;
  isLoading?: boolean;
}

export function OverviewCards({ data, isLoading }: OverviewCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-16">
                <LoadingSpinner />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const cards = [
    {
      title: "Total Skills",
      value: data.totalSkills,
      description: "Skills tracked",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Average Proficiency",
      value: `${data.averageProficiency.toFixed(1)}`,
      description: "Out of 10",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Verified Skills",
      value: data.verified,
      description: `${((data.verified / data.totalSkills) * 100).toFixed(0)}% of total`,
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      title: "Unverified Skills",
      value: data.unverified,
      description: "Need assessment",
      icon: XCircle,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
