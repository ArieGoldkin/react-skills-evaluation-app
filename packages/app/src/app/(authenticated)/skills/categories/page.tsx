"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@skills-eval/design-system";
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs";
import {
  LoadingSpinner,
  ToastProvider,
  useToast,
  Badge,
} from "@skills-eval/design-system";
import { useCategories } from "@/hooks/queries/use-categories";

export default function CategoriesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categoriesData, isLoading, error } = useCategories();
  const categories = categoriesData?.categories || [];

  // Filter categories based on search
  const filteredCategories = categories.filter(
    category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <DynamicBreadcrumbs />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load categories</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              {error instanceof Error ? error.message : "An error occurred"}
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
              <h1 className="text-3xl font-bold">Skill Categories</h1>
              <p className="text-muted-foreground mt-1">
                Organize your skills by category
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>
                {filteredCategories.length}{" "}
                {filteredCategories.length === 1 ? "category" : "categories"}{" "}
                found
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map(category => (
                  <Card
                    key={category.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5 text-muted-foreground" />
                          <CardTitle className="text-lg">
                            {category.name}
                          </CardTitle>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              toast({
                                title: "Edit category",
                                description:
                                  "Category editing functionality coming soon!",
                              })
                            }
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() =>
                              toast({
                                title: "Delete category",
                                description:
                                  "Category deletion functionality coming soon!",
                                variant: "destructive",
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.color && (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {category.color}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {category._count?.skills || 0} skills
                          </Badge>
                        </div>
                        {category.description && (
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCategories.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No categories found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToastProvider>
  );
}
