import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoriesService } from "@/services";

// Re-export types from services
export type { SkillCategory } from "@/services";

// Query keys for consistent caching
export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: () => [...categoriesKeys.lists()] as const,
  details: () => [...categoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...categoriesKeys.details(), id] as const,
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

// CRUD hooks for category management
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CategoriesService.createCategory,
    onSuccess: () => {
      // Invalidate and refetch categories list
      queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() });
      // Also invalidate skills queries since they include category data
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: error => {
      console.error("Failed to create category:", error);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: { id: string } & Parameters<
      typeof CategoriesService.updateCategory
    >[1]) => CategoriesService.updateCategory(id, data),
    onSuccess: (_data, variables) => {
      // Update the specific category in cache
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.detail(variables.id),
      });
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() });
      // Also invalidate skills queries since they include category data
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: error => {
      console.error("Failed to update category:", error);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CategoriesService.deleteCategory,
    onSuccess: (_data, deletedId) => {
      // Remove the category from cache
      queryClient.removeQueries({ queryKey: categoriesKeys.detail(deletedId) });
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() });
      // Also invalidate skills queries since they might reference this category
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: error => {
      console.error("Failed to delete category:", error);
    },
  });
};
