"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useSelfAssessmentWizard, useSkills } from "@/hooks/queries";
import { LoadingSpinner } from "@skills-eval/design-system";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AssessmentData {
  skillId: string;
  proficiency: number;
  confidence: number;
  notes?: string;
  wantToImprove?: boolean;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}

export function AssessmentWizard() {
  const router = useRouter();
  const { data: skillsData, isLoading: skillsLoading } = useSkills();
  const { mutate: submitWizard, isPending: isSubmitting } =
    useSelfAssessmentWizard();

  const [currentStep, setCurrentStep] = useState(0);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [overallReflection, setOverallReflection] = useState("");
  const [goals, setGoals] = useState<string[]>([""]);

  const skills = skillsData?.skills || [];
  const assessedSkillIds = new Set(assessments.map(a => a.skillId));
  const unassessedSkills = skills.filter(
    skill => !assessedSkillIds.has(skill.id)
  );

  if (skillsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <div>
          <p className="font-semibold">No skills found</p>
          <p className="text-sm">
            Please add some skills before starting an assessment.
          </p>
        </div>
      </Alert>
    );
  }

  const handleSkillAssessment = (assessment: AssessmentData) => {
    setAssessments(prev => {
      const existing = prev.findIndex(a => a.skillId === assessment.skillId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = assessment;
        return updated;
      }
      return [...prev, assessment];
    });
  };

  const handleSubmit = () => {
    const filteredGoals = goals.filter(g => g.trim() !== "");

    const wizardData: any = {
      assessments,
    };

    if (overallReflection.trim()) {
      wizardData.overallReflection = overallReflection.trim();
    }

    if (filteredGoals.length > 0) {
      wizardData.goals = filteredGoals;
    }

    submitWizard(wizardData, {
      onSuccess: data => {
        toast.success(`Successfully assessed ${data.assessments} skills!`);
        router.push("/assessments");
      },
      onError: error => {
        toast.error("Failed to submit assessment. Please try again.");
        console.error("Assessment submission error:", error);
      },
    });
  };

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Self-Assessment
              </h2>
              <p className="text-muted-foreground">
                This wizard will help you assess your proficiency in various
                skills. Take your time and be honest with your evaluations.
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">What you'll do:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Rate your proficiency level for each skill (0-10)</li>
                    <li>• Indicate your confidence in your assessment</li>
                    <li>• Add notes and mark skills you want to improve</li>
                    <li>• Reflect on your overall skills and set goals</li>
                  </ul>
                </CardContent>
              </Card>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <div>
                  <p className="font-semibold">
                    Found {skills.length} skills to assess
                  </p>
                  <p className="text-sm">
                    You can assess all or select specific skills.
                  </p>
                </div>
              </Alert>
            </div>
          </div>
        );

      case 1: {
        const currentSkill = unassessedSkills[0];
        const currentAssessment = assessments.find(
          a => a.skillId === currentSkill?.id
        );

        if (!currentSkill) {
          setCurrentStep(2);
          return null;
        }

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{currentSkill.name}</h2>
              {currentSkill.description && (
                <p className="text-muted-foreground text-sm">
                  {currentSkill.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">
                  {currentSkill.category.name}
                </span>
                {currentSkill.tags.length > 0 && (
                  <>
                    <span className="text-muted-foreground">Tags:</span>
                    <span className="font-medium">
                      {currentSkill.tags.join(", ")}
                    </span>
                  </>
                )}
              </div>
            </div>

            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label>Proficiency Level</Label>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[
                      currentAssessment?.proficiency ||
                        currentSkill.proficiency,
                    ]}
                    onValueChange={([value]) => {
                      handleSkillAssessment({
                        skillId: currentSkill.id,
                        proficiency: value ?? 5,
                        confidence: currentAssessment?.confidence ?? 3,
                      });
                    }}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0</span>
                    <span className="font-medium">
                      {proficiencyLabels[
                        currentAssessment?.proficiency ||
                          currentSkill.proficiency
                      ] || ""}
                    </span>
                    <span>10</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Confidence in Assessment</Label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[currentAssessment?.confidence || 3]}
                    onValueChange={([value]) => {
                      handleSkillAssessment({
                        ...currentAssessment!,
                        skillId: currentSkill.id,
                        proficiency:
                          currentAssessment?.proficiency ??
                          currentSkill.proficiency,
                        confidence: value ?? 3,
                      });
                    }}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span className="font-medium">
                      {
                        confidenceLabels[
                          (currentAssessment?.confidence || 3) - 1
                        ]
                      }
                    </span>
                    <span>5</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about your experience with this skill..."
                    value={currentAssessment?.notes || ""}
                    onChange={e => {
                      handleSkillAssessment({
                        ...currentAssessment!,
                        skillId: currentSkill.id,
                        proficiency:
                          currentAssessment?.proficiency ??
                          currentSkill.proficiency,
                        confidence: currentAssessment?.confidence ?? 3,
                        notes: e.target.value,
                      });
                    }}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="improve"
                      checked={currentAssessment?.wantToImprove || false}
                      onCheckedChange={checked => {
                        handleSkillAssessment({
                          ...currentAssessment!,
                          skillId: currentSkill.id,
                          proficiency:
                            currentAssessment?.proficiency ||
                            currentSkill.proficiency,
                          confidence: currentAssessment?.confidence ?? 3,
                          wantToImprove: checked as boolean,
                        });
                      }}
                    />
                    <Label htmlFor="improve" className="cursor-pointer">
                      I want to improve this skill
                    </Label>
                  </div>

                  {currentAssessment?.wantToImprove && (
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select
                        value={currentAssessment.priority || "MEDIUM"}
                        onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") => {
                          handleSkillAssessment({
                            ...currentAssessment,
                            priority: value,
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">Low Priority</SelectItem>
                          <SelectItem value="MEDIUM">
                            Medium Priority
                          </SelectItem>
                          <SelectItem value="HIGH">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>
                Assessed {assessments.length} of {skills.length} skills
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const index = skills.findIndex(s => s.id === currentSkill.id);
                  if (index < skills.length - 1) {
                    // Skip to next unassessed skill
                    const nextUnassessed = skills
                      .slice(index + 1)
                      .find(s => !assessedSkillIds.has(s.id));
                    if (nextUnassessed) {
                      // Force re-render by updating assessments
                      setAssessments([...assessments]);
                    }
                  }
                }}
              >
                Skip this skill
              </Button>
            </div>
          </div>
        );
      }

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Reflection</h2>
              <p className="text-muted-foreground">
                Take a moment to reflect on your skills and set some goals for
                improvement.
              </p>
            </div>

            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="reflection">
                    Overall Reflection (Optional)
                  </Label>
                  <Textarea
                    id="reflection"
                    placeholder="How do you feel about your current skill levels? What areas excite you? What challenges do you face?"
                    value={overallReflection}
                    onChange={e => setOverallReflection(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Goals (Optional)</Label>
                  <p className="text-sm text-muted-foreground">
                    Set up to 10 goals for skill improvement
                  </p>
                  <div className="space-y-2">
                    {goals.map((goal, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Goal ${index + 1}`}
                          value={goal}
                          onChange={e => {
                            const newGoals = [...goals];
                            newGoals[index] = e.target.value;
                            setGoals(newGoals);
                          }}
                        />
                        {goals.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setGoals(goals.filter((_, i) => i !== index));
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    {goals.length < 10 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGoals([...goals, ""])}
                      >
                        Add Goal
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <div>
                <p className="font-semibold">Assessment Summary</p>
                <p className="text-sm">
                  You've assessed {assessments.length} skills.
                  {assessments.filter(a => a.wantToImprove).length > 0 &&
                    ` ${assessments.filter(a => a.wantToImprove).length} marked for improvement.`}
                </p>
              </div>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Self-Assessment Wizard</CardTitle>
          <CardDescription>Step {currentStep + 1} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === 0) {
                  router.push("/assessments");
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
              disabled={isSubmitting}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>

            {currentStep < 2 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={isSubmitting}
              >
                {currentStep === 1 && unassessedSkills.length === 0
                  ? "Continue"
                  : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || assessments.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Complete Assessment
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
