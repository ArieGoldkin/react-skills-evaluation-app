"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";
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
  SimpleTooltip,
  Badge,
} from "@skills-eval/design-system";
import { useSkill, useDeleteSkill } from "@/hooks/queries/use-skills";
import { useCategories } from "@/hooks/queries/use-categories";
import { format } from "date-fns";

interface SkillDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SkillDetailPage({ params }: SkillDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const {
    data: skillData,
    isLoading: skillLoading,
    error: skillError,
  } = useSkill(id);
  const { data: categoriesData } = useCategories();
  const deleteSkillMutation = useDeleteSkill();

  const skill = skillData?.skill;
  const categories = categoriesData?.categories || [];
  const category = categories.find(c => c.id === skill?.category.id);

  const handleDelete = async () => {
    if (!skill) return;

    if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      try {
        await deleteSkillMutation.mutateAsync(skill.id);
        toast({
          title: "Skill deleted",
          description: `"${skill.name}" has been deleted successfully.`,
        });
        router.push("/skills");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete skill. Please try again.",
          variant: "destructive",
        });
      }
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
            <CardDescription>Failed to load skill details</CardDescription>
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

  const proficiencyPercentage = (skill.proficiency / 10) * 100;
  const proficiencyLabel =
    skill.proficiency <= 3
      ? "Beginner"
      : skill.proficiency <= 7
        ? "Intermediate"
        : "Expert";

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
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{skill.name}</h1>
            {category && (
              <Badge variant="secondary" className="mt-2">
                {category.name}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <SimpleTooltip content="Edit skill">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/skills/${skill.id}/edit`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </SimpleTooltip>
            <SimpleTooltip content="Delete skill">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </SimpleTooltip>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Proficiency Level</CardTitle>
              <CardDescription>Current skill assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">
                    {skill.proficiency}/10
                  </span>
                  <Badge variant="outline">{proficiencyLabel}</Badge>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${proficiencyPercentage}%` }}
                  />
                </div>
              </div>

              {(skill as any).yearsOfExperience && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {(skill as any).yearsOfExperience} years of experience
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Added {format(new Date(skill.createdAt), "MMMM d, yyyy")}
                </span>
              </div>

              {skill.updatedAt !== skill.createdAt && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    Updated {format(new Date(skill.updatedAt), "MMMM d, yyyy")}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment History</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              {(skill as any).assessments &&
              (skill as any).assessments.length > 0 ? (
                <div className="space-y-3">
                  {(skill as any).assessments
                    .slice(0, 5)
                    .map((assessment: any, index: number) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div>
                          <p className="font-medium">
                            Assessment #
                            {(skill as any).assessments.length - index}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(assessment.createdAt),
                              "MMM d, yyyy"
                            )}
                          </p>
                        </div>
                        <Badge variant="outline">{assessment.score}/10</Badge>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No assessments yet</p>
              )}
              <Button
                className="w-full mt-4"
                onClick={() => router.push(`/skills/${skill.id}/assess`)}
              >
                Take Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {skill.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: skill.description }}
              />
            </CardContent>
          </Card>
        )}

        {skill.tags && skill.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {(skill as any).notes && (
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: (skill as any).notes }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </ToastProvider>
  );
}
