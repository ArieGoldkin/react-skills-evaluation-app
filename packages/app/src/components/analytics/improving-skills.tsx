"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@skills-eval/design-system";
import type { ImprovingSkill } from "@/services/analytics.service";
import { LoadingSpinner } from "@skills-eval/design-system";
import { TrendingUp, ArrowUp } from "lucide-react";

interface ImprovingSkillsProps {
  data?: ImprovingSkill[];
  isLoading?: boolean;
}

export function ImprovingSkills({ data, isLoading }: ImprovingSkillsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Most Improved Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Most Improved Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            No improving skills to display
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Most Improved Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 5).map(skill => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex-1">
                <p className="font-medium">{skill.name}</p>
                <p className="text-sm text-muted-foreground">
                  {skill.category.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="text-muted-foreground">
                    {skill.previousProficiency} → {skill.currentProficiency}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <Badge
                  variant="success"
                  className="bg-green-100 text-green-700"
                >
                  +{skill.improvement}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
