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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useSkill } from "@/hooks/queries/use-skills";
import { useCreateAssessment } from "@/hooks/queries/use-assessments";
import { LoadingSpinner } from "@skills-eval/design-system";
import { toast } from "sonner";
import { useState } from "react";

interface AssessSkillPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AssessSkillPage({ params }: AssessSkillPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: skillData, isLoading: skillLoading } = useSkill(id);
  const { mutate: createAssessment, isPending: isSubmitting } =
    useCreateAssessment();

  const [proficiency, setProficiency] = useState<number>(5);
  const [confidence, setConfidence] = useState<number>(3);
  const [notes, setNotes] = useState("");

  const skill = skillData?.skill;

  const handleSubmit = () => {
    if (!skill) return;

    createAssessment(
      {
        skillId: skill.id,
        type: "SELF_ASSESSMENT",
        proficiency,
        ...(notes.trim() && { feedback: notes.trim() }),
        metadata: {
          confidence,
          previousProficiency: skill.proficiency,
        },
      },
      {
        onSuccess: () => {
          toast.success("Assessment completed successfully!");
          router.push(`/skills/${skill.id}`);
        },
        onError: () => {
          toast.error("Failed to submit assessment. Please try again.");
        },
      }
    );
  };

  if (skillLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!skill) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Skill not found</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => router.push("/skills")}>
            Back to Skills
          </Button>
        </CardContent>
      </Card>
    );
  }

  const proficiencyLabels = [
    "No Experience",
    "Beginner",
    "Basic",
    "Developing",
    "Competent",
    "Proficient",
    "Advanced",
    "Expert",
    "Master",
    "Thought Leader",
  ];

  const confidenceLabels = [
    "Very Unsure",
    "Unsure",
    "Neutral",
    "Confident",
    "Very Confident",
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
          <h1 className="text-3xl font-bold">Assess {skill.name}</h1>
          <p className="text-muted-foreground">
            Evaluate your current proficiency level
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Self Assessment</CardTitle>
          <CardDescription>
            Rate your proficiency and confidence in this skill
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Current Proficiency</Label>
              <span className="text-sm text-muted-foreground">
                Previously: {skill.proficiency}/10
              </span>
            </div>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[proficiency]}
              onValueChange={([value]) => setProficiency(value ?? 5)}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0</span>
              <span className="font-medium">
                {proficiencyLabels[proficiency] || ""}
              </span>
              <span>10</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Confidence Level</Label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[confidence]}
              onValueChange={([value]) => setConfidence(value ?? 3)}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1</span>
              <span className="font-medium">
                {confidenceLabels[confidence - 1]}
              </span>
              <span>5</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your experience with this skill, recent projects, or areas for improvement..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="pt-4 space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">Assessment Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skill:</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    New Proficiency:
                  </span>
                  <span className="font-medium">{proficiency}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Change:</span>
                  <span
                    className={`font-medium ${
                      proficiency > skill.proficiency
                        ? "text-green-600"
                        : proficiency < skill.proficiency
                          ? "text-red-600"
                          : ""
                    }`}
                  >
                    {proficiency > skill.proficiency ? "+" : ""}
                    {proficiency - skill.proficiency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-medium">
                    {confidenceLabels[confidence - 1]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Submitting...
                  </>
                ) : (
                  "Complete Assessment"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
