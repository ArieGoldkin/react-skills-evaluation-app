// Skills queries
export {
  useSkills,
  useSkill,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
  useOptimisticSkillUpdate,
  usePrefetchSkill,
  skillsKeys,
} from "./use-skills";

// Categories queries
export {
  useCategories,
  useCategoriesForFilter,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  categoriesKeys,
} from "./use-categories";

// Assessments queries
export {
  useAssessments,
  useSkillAssessments,
  useAssessment,
  useAssessmentStats,
  useCreateAssessment,
  useUpdateAssessment,
  useDeleteAssessment,
  useSelfAssessmentWizard,
  useBulkCreateAssessments,
  useExportAssessments,
  useOptimisticAssessmentUpdate,
  usePrefetchAssessment,
  assessmentsKeys,
} from "./use-assessments";

// Re-export types
export type {
  Skill,
  CreateSkillData,
  UpdateSkillData,
  SkillsFilters,
} from "./use-skills";

export type { SkillCategory } from "./use-categories";

export type {
  Assessment,
  CreateAssessmentData,
  UpdateAssessmentData,
  AssessmentsFilters,
  SelfAssessmentWizardData,
} from "./use-assessments";
