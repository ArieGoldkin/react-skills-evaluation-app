"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrendData } from "@/services/analytics.service";
import { LoadingSpinner } from "@skills-eval/design-system";
import { format, parseISO } from "date-fns";

interface ProgressTrendsChartProps {
  data?: TrendData[];
  isLoading?: boolean;
}

export function ProgressTrendsChart({
  data,
  isLoading,
}: ProgressTrendsChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progress Trends</CardTitle>
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
          <CardTitle>Progress Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format data for the chart
  const chartData = data.map(item => ({
    month: format(parseISO(item.month), "MMM yyyy"),
    proficiency: item.averageProficiency,
    activities: item.activitiesCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis
              yAxisId="proficiency"
              orientation="left"
              className="text-xs"
              domain={[0, 10]}
              label={{
                value: "Average Proficiency",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="activities"
              orientation="right"
              className="text-xs"
              label={{
                value: "Activities Count",
                angle: 90,
                position: "insideRight",
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <p className="font-semibold mb-1">{label}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span>Proficiency:</span>
                        <span>
                          {payload[0]?.value
                            ? Number(payload[0].value).toFixed(1)
                            : "0"}
                        </span>
                        <span>Activities:</span>
                        <span>{payload[1]?.value || 0}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              yAxisId="proficiency"
              type="monotone"
              dataKey="proficiency"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Average Proficiency"
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              yAxisId="activities"
              type="monotone"
              dataKey="activities"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              name="Activity Count"
              dot={{ fill: "hsl(var(--muted-foreground))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
