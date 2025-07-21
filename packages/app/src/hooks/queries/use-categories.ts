import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "@/services";

// Re-export types from services
export type { SkillCategory } from "@/services";

// Query keys for consistent caching
export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: () => [...categoriesKeys.lists()] as const,
};

// Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: CategoriesService.getCategories,
    staleTime: 15 * 60 * 1000, // 15 minutes - categories change less frequently
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Helper hook to get categories formatted for CategoryFilter component
export const useCategoriesForFilter = () => {
  const { data, ...rest } = useCategories();

  const categories =
    data?.categories?.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      color: cat.color,
      skillCount: cat._count.skills,
    })) || [];

  return {
    ...rest,
    data: { categories },
    categories,
  };
};
