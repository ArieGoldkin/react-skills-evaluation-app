"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@skills-eval/design-system";
import { useSkillAssessments } from "@/hooks/queries";
import { LoadingSpinner } from "@skills-eval/design-system";
import { Alert } from "@/components/ui/alert";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  Bot,
  Users,
  Award,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AssessmentHistoryProps {
  skillId: string;
  skillName?: string;
}

export function AssessmentHistory({
  skillId,
  skillName,
}: AssessmentHistoryProps) {
  const { data, isLoading, error } = useSkillAssessments(skillId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="error">
        Failed to load assessment history. Please try again.
      </Alert>
    );
  }

  const assessments = data?.assessments || [];

  if (assessments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
          <CardDescription>
            No assessments yet{skillName ? ` for ${skillName}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Complete an assessment to track your progress over time.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getAssessmentIcon = (type: string) => {
    switch (type) {
      case "SELF_ASSESSMENT":
        return <User className="h-4 w-4" />;
      case "PEER_REVIEW":
        return <Users className="h-4 w-4" />;
      case "AUTOMATED":
        return <Bot className="h-4 w-4" />;
      case "CERTIFICATION":
        return <Award className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getAssessmentTypeLabel = (type: string) => {
    switch (type) {
      case "SELF_ASSESSMENT":
        return "Self Assessment";
      case "PEER_REVIEW":
        return "Peer Review";
      case "AUTOMATED":
        return "Automated";
      case "CERTIFICATION":
        return "Certification";
      default:
        return type;
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case "SELF_ASSESSMENT":
        return "default";
      case "PEER_REVIEW":
        return "primary";
      case "AUTOMATED":
        return "secondary";
      case "CERTIFICATION":
        return "success";
      default:
        return "default";
    }
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    if (current > previous)
      return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (current < previous)
      return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment History</CardTitle>
        <CardDescription>
          Track your progress{skillName ? ` in ${skillName}` : ""} over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment, index) => {
            const previousAssessment = assessments[index + 1];
            const proficiencyChange = previousAssessment
              ? assessment.proficiency! - previousAssessment.proficiency!
              : null;

            return (
              <div
                key={assessment.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {getAssessmentIcon(assessment.type)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getAssessmentTypeColor(assessment.type) as any}
                      >
                        {getAssessmentTypeLabel(assessment.type)}
                      </Badge>

                      {assessment.completedAt && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(
                            new Date(assessment.completedAt),
                            { addSuffix: true }
                          )}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {assessment.score !== null &&
                        assessment.score !== undefined && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Score:
                            </span>{" "}
                            <span className="font-medium">
                              {assessment.score}%
                            </span>
                          </div>
                        )}

                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">
                          Proficiency:
                        </span>
                        <span className="font-semibold text-lg">
                          {assessment.proficiency}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /10
                        </span>
                        {getTrendIcon(
                          assessment.proficiency!,
                          previousAssessment?.proficiency
                        )}
                      </div>
                    </div>
                  </div>

                  {assessment.feedback && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {assessment.feedback}
                    </p>
                  )}

                  {proficiencyChange !== null && proficiencyChange !== 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={
                          proficiencyChange > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {proficiencyChange > 0 ? "+" : ""}
                        {proficiencyChange} proficiency
                      </span>
                      <span className="text-muted-foreground">
                        compared to previous assessment
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {assessments.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Assessments</p>
                <p className="text-2xl font-bold">{assessments.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Latest Proficiency</p>
                <p className="text-2xl font-bold">
                  {assessments[0]?.proficiency ?? 0}
                  <span className="text-sm font-normal text-muted-foreground">
                    /10
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
