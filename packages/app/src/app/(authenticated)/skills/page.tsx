"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { SidebarTrigger } from "@skills-eval/design-system";
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  CategoryFilter,
  useTable,
  LoadingSpinner,
  ToastProvider,
  useToast,
  Badge,
} from "@skills-eval/design-system";
import { useSkills, useDeleteSkill } from "@/hooks/queries/use-skills";
import { useCategories } from "@/hooks/queries/use-categories";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";

export default function SkillsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    data: skillsData,
    isLoading: skillsLoading,
    error: skillsError,
  } = useSkills();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const deleteSkillMutation = useDeleteSkill();

  const skills = skillsData?.skills || [];
  const categories = categoriesData?.categories || [];

  // Filter skills based on search and categories
  const filteredSkills = skills.filter(skill => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(skill.category.id);
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (skill: any) => {
    if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      try {
        await deleteSkillMutation.mutateAsync(skill.id);
        toast({
          title: "Skill deleted",
          description: `"${skill.name}" has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete skill. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const { table } = useTable({
    data: filteredSkills,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.name}</div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          return row.original.category ? (
            <Badge variant="secondary">{row.original.category.name}</Badge>
          ) : null;
        },
      },
      {
        accessorKey: "proficiency",
        header: "Proficiency",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.original.proficiency}/10</span>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(row.original.proficiency / 10) * 100}%` }}
              />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "assessments",
        header: "Assessments",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {(row.original as any).assessments?.length ||
              row.original._count?.assessments ||
              0}{" "}
            completed
          </span>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/skills/${row.original.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/skills/${row.original.id}/edit`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(row.original)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  });

  if (skillsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (skillsError) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <DynamicBreadcrumbs />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load skills</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              {skillsError instanceof Error
                ? skillsError.message
                : "An error occurred"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <DynamicBreadcrumbs />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Skills</h1>
              <p className="text-muted-foreground mt-1">
                Manage your skills and track your progress
              </p>
            </div>
            <Button onClick={() => router.push("/skills/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>

        <Card>
          <CardHeader>
            <CardTitle>All Skills</CardTitle>
            <CardDescription>
              {filteredSkills.length}{" "}
              {filteredSkills.length === 1 ? "skill" : "skills"} found
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onSelectionChange={setSelectedCategories}
                trigger={
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                }
              />
            </div>

            <Table table={table} />
          </CardContent>
        </Card>
        </div>
      </div>
    </ToastProvider>
  );
}
