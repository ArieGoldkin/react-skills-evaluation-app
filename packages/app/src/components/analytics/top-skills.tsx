"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@skills-eval/design-system";
import type { TopSkill } from "@/services/analytics.service";
import { LoadingSpinner } from "@skills-eval/design-system";
import { Star } from "lucide-react";

interface TopSkillsProps {
  data?: TopSkill[];
  isLoading?: boolean;
}

export function TopSkills({ data, isLoading }: TopSkillsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Top Skills
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
            <Star className="h-5 w-5 text-yellow-500" />
            Top Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            No skills to display
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Top Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 5).map((skill, index) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {skill.category.name}
                  </p>
                </div>
              </div>
              <Badge variant="default">{skill.proficiency}/10</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
