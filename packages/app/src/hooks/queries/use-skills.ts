import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  SkillsService,
  type Skill,
  type CreateSkillData,
  type UpdateSkillData,
  type SkillsFilters,
} from "@/services";

// Re-export types for convenience
export type { Skill, CreateSkillData, UpdateSkillData, SkillsFilters };

// Query keys for consistent caching
export const skillsKeys = {
  all: ["skills"] as const,
  lists: () => [...skillsKeys.all, "list"] as const,
  list: (filters: SkillsFilters) => [...skillsKeys.lists(), filters] as const,
  details: () => [...skillsKeys.all, "detail"] as const,
  detail: (id: string) => [...skillsKeys.details(), id] as const,
};

// Hooks
export const useSkills = (filters: SkillsFilters = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: skillsKeys.list(filters),
    queryFn: () => SkillsService.getSkills(filters),
    enabled: !!session?.user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSkill = (id: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: skillsKeys.detail(id),
    queryFn: () => SkillsService.getSkill(id),
    enabled: !!session?.user && !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SkillsService.createSkill,
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
    mutationFn: ({ id, ...data }: UpdateSkillData & { id: string }) =>
      SkillsService.updateSkill(id, data),
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
    mutationFn: SkillsService.deleteSkill,
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
      queryFn: () => SkillsService.getSkill(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchSkill };
};
