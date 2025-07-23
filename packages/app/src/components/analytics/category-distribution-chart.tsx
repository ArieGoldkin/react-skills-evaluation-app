"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryDistribution } from "@/services/analytics.service";
import { LoadingSpinner } from "@skills-eval/design-system";

interface CategoryDistributionChartProps {
  data?: CategoryDistribution[];
  isLoading?: boolean;
}

export function CategoryDistributionChart({
  data,
  isLoading,
}: CategoryDistributionChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skills by Category</CardTitle>
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
          <CardTitle>Skills by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort by count and take top 8 categories
  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map(item => ({
      name: item.name,
      value: item.count,
      color: item.color || "#8884d8",
    }));

  // If there are more categories, add an "Others" category
  if (data.length > 8) {
    const othersCount = data
      .slice(8)
      .reduce((sum, item) => sum + item.count, 0);
    sortedData.push({
      name: "Others",
      value: othersCount,
      color: "#94a3b8",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="font-semibold">Category:</span>
                        <span>{payload[0].name}</span>
                        <span className="font-semibold">Skills:</span>
                        <span>{payload[0].value}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
