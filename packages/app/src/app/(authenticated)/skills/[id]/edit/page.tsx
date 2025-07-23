"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "@skills-eval/design-system";
import { SkillForm } from "@/components/skills/skill-form";
import { useSkill, useUpdateSkill } from "@/hooks/queries/use-skills";
import type { SkillFormData } from "@/lib/validations/skills";

interface EditSkillPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const {
    data: skillData,
    isLoading: skillLoading,
    error: skillError,
  } = useSkill(id);
  const updateSkillMutation = useUpdateSkill();

  const skill = skillData?.skill;

  const handleSubmit = async (data: SkillFormData) => {
    if (!skill) return;

    try {
      // Filter out undefined values for the API call
      const updateData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) {
            acc[key as keyof typeof data] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      await updateSkillMutation.mutateAsync({
        id: skill.id,
        ...updateData,
      });
      toast({
        title: "Skill updated",
        description: `"${data.name}" has been updated successfully.`,
      });
      router.push(`/skills/${skill.id}`);
    } catch {
      toast({
        title: "Error",
        description: "Failed to update skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (skillLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (skillError || !skill) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <DynamicBreadcrumbs />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load skill</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              {skillError instanceof Error
                ? skillError.message
                : "Skill not found"}
            </p>
            <Button
              variant="outline"
              onClick={() => router.push("/skills")}
              className="mt-4"
            >
              Back to Skills
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const defaultValues: Partial<SkillFormData> = {
    name: skill.name,
    categoryId: skill.category.id,
    description: skill.description || undefined,
    proficiency: skill.proficiency,
    yearsOfExperience: (skill as any).yearsOfExperience || undefined,
    tags: skill.tags || [],
    notes: (skill as any).notes || undefined,
  };

  return (
    <ToastProvider>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <DynamicBreadcrumbs />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Edit Skill</h1>
                <p className="text-muted-foreground mt-1">
                  Update your skill information and proficiency level
                </p>
              </div>
            </div>
          </div>

          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Skill Details</CardTitle>
              <CardDescription>
                Modify the information below to update your skill
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillForm
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
                isSubmitting={updateSkillMutation.isPending}
                submitLabel="Update Skill"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToastProvider>
  );
}
