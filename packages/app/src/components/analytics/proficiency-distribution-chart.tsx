"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProficiencyDistribution } from "@/services/analytics.service";
import { LoadingSpinner } from "@skills-eval/design-system";

interface ProficiencyDistributionChartProps {
  data?: ProficiencyDistribution[];
  isLoading?: boolean;
}

export function ProficiencyDistributionChart({
  data,
  isLoading,
}: ProficiencyDistributionChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Proficiency Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
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
          <CardTitle>Proficiency Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform data for the chart
  const chartData = [...Array(10)].map((_, i) => {
    const level = i + 1;
    const found = data.find(d => d.level === level);
    return {
      level: level.toString(),
      count: found?.count || 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proficiency Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="level"
              className="text-xs"
              label={{
                value: "Proficiency Level",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              className="text-xs"
              label={{
                value: "Number of Skills",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="font-semibold">Level:</span>
                        <span>{payload[0].payload.level}/10</span>
                        <span className="font-semibold">Skills:</span>
                        <span>{payload[0].value}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
