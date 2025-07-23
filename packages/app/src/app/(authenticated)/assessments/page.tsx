"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssessments } from "@/hooks/queries";
import { LoadingSpinner, DataTable, Badge, SidebarTrigger } from "@skills-eval/design-system";
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs";
import { Plus, Search, Calendar, TrendingUp, Award } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Assessment } from "@/services/types";

export default function AssessmentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdAt");

  const { data, isLoading } = useAssessments({
    type: typeFilter === "all" ? undefined : typeFilter as any,
    sortBy: sortBy as any,
    order: "desc",
  });

  const filteredAssessments =
    data?.assessments?.filter(assessment => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        assessment.skill?.name.toLowerCase().includes(searchLower) ||
        assessment.type.toLowerCase().includes(searchLower) ||
        assessment.feedback?.toLowerCase().includes(searchLower)
      );
    }) || [];

  const columns = [
    {
      id: "skill",
      header: "Skill",
      cell: (_value: any, row: Assessment) => (
        <div className="font-medium">
          {row.skill?.name || "General Assessment"}
        </div>
      ),
    },
    {
      id: "type",
      accessorKey: "type" as keyof Assessment,
      header: "Type",
      cell: (_value: any, row: Assessment) => {
        const typeLabels: Record<string, string> = {
          SELF_ASSESSMENT: "Self Assessment",
          PEER_REVIEW: "Peer Review",
          AUTOMATED: "Automated",
          CERTIFICATION: "Certification",
        };
        const typeColors: Record<string, string> = {
          SELF_ASSESSMENT: "default",
          PEER_REVIEW: "primary",
          AUTOMATED: "secondary",
          CERTIFICATION: "success",
        };
        return (
          <Badge variant={typeColors[row.type] as any}>
            {typeLabels[row.type] || row.type}
          </Badge>
        );
      },
    },
    {
      id: "proficiency",
      accessorKey: "proficiency" as keyof Assessment,
      header: "Proficiency",
      cell: (_value: any, row: Assessment) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">{row.proficiency || 0}</span>
          <span className="text-sm text-muted-foreground">/10</span>
        </div>
      ),
    },
    {
      id: "score",
      accessorKey: "score" as keyof Assessment,
      header: "Score",
      cell: (_value: any, row: Assessment) => {
        const score = row.score;
        if (score === null || score === undefined) return "-";
        return <span>{score}%</span>;
      },
    },
    {
      id: "completedAt",
      accessorKey: "completedAt" as keyof Assessment,
      header: "Completed",
      cell: (_value: any, row: Assessment) => {
        const date = row.completedAt || row.createdAt;
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </div>
        );
      },
    },
  ];

  const stats = {
    total: data?.total || 0,
    avgProficiency:
      filteredAssessments.length > 0
        ? (
            filteredAssessments.reduce(
              (acc, a) => acc + (a.proficiency || 0),
              0
            ) / filteredAssessments.length
          ).toFixed(1)
        : "0",
    recentCount: filteredAssessments.filter(a => {
      const date = new Date(a.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date > weekAgo;
    }).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <DynamicBreadcrumbs />
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">
            Track your skill progress over time
          </p>
        </div>
        <Link href="/assessments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assessments
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Proficiency
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgProficiency}
              <span className="text-sm font-normal text-muted-foreground">
                /10
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentCount}</div>
            <p className="text-xs text-muted-foreground">
              assessments completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
          <CardDescription>
            View and manage all your skill assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">
                  Search assessments
                </Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search assessments..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="SELF_ASSESSMENT">
                      Self Assessment
                    </SelectItem>
                    <SelectItem value="PEER_REVIEW">Peer Review</SelectItem>
                    <SelectItem value="AUTOMATED">Automated</SelectItem>
                    <SelectItem value="CERTIFICATION">Certification</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Recent first</SelectItem>
                    <SelectItem value="proficiency">Proficiency</SelectItem>
                    <SelectItem value="score">Score</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredAssessments}
              emptyMessage={
                search || typeFilter
                  ? "No assessments found. Try adjusting your filters."
                  : "No assessments yet. Start by creating your first assessment."
              }
            />
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
