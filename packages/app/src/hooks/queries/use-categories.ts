import { useQuery } from "@tanstack/react-query";

// Types based on our Prisma schema
export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    skills: number;
  };
}

// Query keys for consistent caching
export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: () => [...categoriesKeys.lists()] as const,
};

// API functions
const fetchCategories = async (): Promise<{ categories: SkillCategory[] }> => {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
};

// Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: fetchCategories,
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
