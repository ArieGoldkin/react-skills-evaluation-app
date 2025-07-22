"use client";

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
  ToastProvider,
  useToast,
} from "@skills-eval/design-system";
import { SkillForm } from "@/components/skills/skill-form";
import { useCreateSkill } from "@/hooks/queries/use-skills";
import type { SkillFormData } from "@/lib/validations/skills";
import type { CreateSkillData } from "@/services";

export default function NewSkillPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createSkillMutation = useCreateSkill();

  const handleSubmit = async (data: SkillFormData) => {
    try {
      // Filter out undefined values for the API call
      const createData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) {
            acc[key as keyof typeof data] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      const result = await createSkillMutation.mutateAsync(
        createData as CreateSkillData
      );
      toast({
        title: "Skill created",
        description: `"${data.name}" has been created successfully.`,
      });
      router.push(`/skills/${result.skill.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ToastProvider>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <DynamicBreadcrumbs />
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Create New Skill</h1>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Skill Details</CardTitle>
              <CardDescription>
                Add a new skill to track your proficiency and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillForm
                onSubmit={handleSubmit}
                isSubmitting={createSkillMutation.isPending}
                submitLabel="Create Skill"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToastProvider>
  );
}
