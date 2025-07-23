import { AssessmentWizard } from "@/components/assessments";

export default function NewAssessmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Assessment</h1>
        <p className="text-muted-foreground">
          Evaluate your skills and track your progress
        </p>
      </div>

      <AssessmentWizard />
    </div>
  );
}
