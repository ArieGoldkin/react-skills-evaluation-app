import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// Types based on our Prisma schema
export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  description?: string;
  tags: string[];
  verified: boolean;
  lastAssessed?: string;
  source: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    color?: string;
  };
  _count: {
    assessments: number;
    history: number;
  };
}

export interface CreateSkillData {
  name: string;
  categoryId: string;
  proficiency?: number;
  description?: string;
  tags?: string[];
}

export interface UpdateSkillData extends Partial<CreateSkillData> {
  verified?: boolean;
}

export interface SkillsFilters {
  categoryId?: string;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

// Query keys for consistent caching
export const skillsKeys = {
  all: ["skills"] as const,
  lists: () => [...skillsKeys.all, "list"] as const,
  list: (filters: SkillsFilters) => [...skillsKeys.lists(), filters] as const,
  details: () => [...skillsKeys.all, "detail"] as const,
  detail: (id: string) => [...skillsKeys.details(), id] as const,
};

// API functions
const fetchSkills = async (
  filters: SkillsFilters = {}
): Promise<{ skills: Skill[] }> => {
  const params = new URLSearchParams();

  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.search) params.set("search", filters.search);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.order) params.set("order", filters.order);

  const response = await fetch(`/api/skills?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch skills: ${response.statusText}`);
  }

  return response.json();
};

const fetchSkill = async (id: string): Promise<{ skill: Skill }> => {
  const response = await fetch(`/api/skills/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch skill: ${response.statusText}`);
  }

  return response.json();
};

const createSkill = async (
  data: CreateSkillData
): Promise<{ skill: Skill }> => {
  const response = await fetch("/api/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create skill");
  }

  return response.json();
};

const updateSkill = async ({
  id,
  ...data
}: UpdateSkillData & { id: string }): Promise<{ skill: Skill }> => {
  const response = await fetch(`/api/skills/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update skill");
  }

  return response.json();
};

const deleteSkill = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`/api/skills/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete skill");
  }

  return response.json();
};

// Hooks
export const useSkills = (filters: SkillsFilters = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: skillsKeys.list(filters),
    queryFn: () => fetchSkills(filters),
    enabled: !!session?.user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSkill = (id: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: skillsKeys.detail(id),
    queryFn: () => fetchSkill(id),
    enabled: !!session?.user && !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      // Invalidate and refetch skills list
      queryClient.invalidateQueries({ queryKey: skillsKeys.lists() });
    },
    onError: error => {
      console.error("Failed to create skill:", error);
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onSuccess: (data, variables) => {
      // Update the specific skill in cache
      queryClient.setQueryData(skillsKeys.detail(variables.id), data);

      // Invalidate skills list to refetch with updated data
      queryClient.invalidateQueries({ queryKey: skillsKeys.lists() });
    },
    onError: error => {
      console.error("Failed to update skill:", error);
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: (_, deletedId) => {
      // Remove the skill from cache
      queryClient.removeQueries({ queryKey: skillsKeys.detail(deletedId) });

      // Invalidate skills list to refetch without deleted skill
      queryClient.invalidateQueries({ queryKey: skillsKeys.lists() });
    },
    onError: error => {
      console.error("Failed to delete skill:", error);
    },
  });
};

// Optimistic updates for better UX
export const useOptimisticSkillUpdate = () => {
  const queryClient = useQueryClient();

  const updateSkillOptimistically = (
    skillId: string,
    updates: Partial<Skill>
  ) => {
    queryClient.setQueryData(
      skillsKeys.detail(skillId),
      (old: { skill: Skill } | undefined) => {
        if (!old) return old;

        return {
          skill: {
            ...old.skill,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        };
      }
    );
  };

  return { updateSkillOptimistically };
};

// Prefetch helpers
export const usePrefetchSkill = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const prefetchSkill = (id: string) => {
    if (!session?.user) return;

    queryClient.prefetchQuery({
      queryKey: skillsKeys.detail(id),
      queryFn: () => fetchSkill(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchSkill };
};
