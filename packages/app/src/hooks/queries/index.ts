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
  categoriesKeys,
} from "./use-categories";

// Re-export types
export type {
  Skill,
  CreateSkillData,
  UpdateSkillData,
  SkillsFilters,
} from "./use-skills";

export type { SkillCategory } from "./use-categories";
