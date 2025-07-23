import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  AssessmentsService,
  type Assessment,
  type CreateAssessmentData,
  type UpdateAssessmentData,
  type AssessmentsFilters,
  type SelfAssessmentWizardData,
} from "@/services";

// Re-export types for convenience
export type {
  Assessment,
  CreateAssessmentData,
  UpdateAssessmentData,
  AssessmentsFilters,
  SelfAssessmentWizardData,
};

// Query keys for consistent caching
export const assessmentsKeys = {
  all: ["assessments"] as const,
  lists: () => [...assessmentsKeys.all, "list"] as const,
  list: (filters: AssessmentsFilters) =>
    [...assessmentsKeys.lists(), filters] as const,
  details: () => [...assessmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentsKeys.details(), id] as const,
  stats: () => [...assessmentsKeys.all, "stats"] as const,
  stat: (filters: any) => [...assessmentsKeys.stats(), filters] as const,
  skillAssessments: (skillId: string) =>
    [...assessmentsKeys.all, "skill", skillId] as const,
};

// Hooks
export const useAssessments = (filters: AssessmentsFilters = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: assessmentsKeys.list(filters),
    queryFn: () => AssessmentsService.getAssessments(filters),
    enabled: !!session?.user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSkillAssessments = (
  skillId: string,
  filters?: Omit<AssessmentsFilters, "skillId">
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: assessmentsKeys.skillAssessments(skillId),
    queryFn: () => AssessmentsService.getSkillAssessments(skillId, filters),
    enabled: !!session?.user && !!skillId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAssessment = (id: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: assessmentsKeys.detail(id),
    queryFn: () => AssessmentsService.getAssessment(id),
    enabled: !!session?.user && !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAssessmentStats = (filters?: {
  skillId?: string;
  type?: string;
  fromDate?: string;
  toDate?: string;
  groupBy?: "type" | "skill" | "month" | "week";
}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: assessmentsKeys.stat(filters || {}),
    queryFn: () => AssessmentsService.getAssessmentStats(filters),
    enabled: !!session?.user,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AssessmentsService.createAssessment,
    onSuccess: (_data, variables) => {
      // Invalidate assessments list
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.lists() });

      // Invalidate skill-specific assessments if skillId is present
      if (variables.skillId) {
        queryClient.invalidateQueries({
          queryKey: assessmentsKeys.skillAssessments(variables.skillId),
        });

        // Also invalidate the skill detail to update assessment count
        queryClient.invalidateQueries({
          queryKey: ["skills", "detail", variables.skillId],
        });
      }

      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.stats() });
    },
    onError: error => {
      console.error("Failed to create assessment:", error);
    },
  });
};

export const useUpdateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateAssessmentData & { id: string }) =>
      AssessmentsService.updateAssessment(id, data),
    onSuccess: (_data, variables) => {
      // Update the specific assessment in cache
      queryClient.setQueryData(assessmentsKeys.detail(variables.id), _data);

      // Invalidate assessments list
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.lists() });

      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.stats() });
    },
    onError: error => {
      console.error("Failed to update assessment:", error);
    },
  });
};

export const useDeleteAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AssessmentsService.deleteAssessment,
    onSuccess: (_, deletedId) => {
      // Remove the assessment from cache
      queryClient.removeQueries({
        queryKey: assessmentsKeys.detail(deletedId),
      });

      // Invalidate assessments list
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.lists() });

      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.stats() });
    },
    onError: error => {
      console.error("Failed to delete assessment:", error);
    },
  });
};

export const useSelfAssessmentWizard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AssessmentsService.submitSelfAssessmentWizard,
    onSuccess: (_data, variables) => {
      // Invalidate all assessments queries
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.all });

      // Invalidate skills to update their assessment counts and proficiency
      const skillIds = variables.assessments.map(a => a.skillId);
      skillIds.forEach(skillId => {
        queryClient.invalidateQueries({
          queryKey: ["skills", "detail", skillId],
        });
      });

      // Invalidate skills list
      queryClient.invalidateQueries({ queryKey: ["skills", "list"] });
    },
    onError: error => {
      console.error("Failed to submit self-assessment wizard:", error);
    },
  });
};

export const useBulkCreateAssessments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      assessments: Array<Omit<CreateAssessmentData, "assessorId">>
    ) => AssessmentsService.bulkCreateAssessments(assessments),
    onSuccess: () => {
      // Invalidate all assessments and skills queries
      queryClient.invalidateQueries({ queryKey: assessmentsKeys.all });
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: error => {
      console.error("Failed to bulk create assessments:", error);
    },
  });
};

export const useExportAssessments = () => {
  return useMutation({
    mutationFn: AssessmentsService.exportAssessments,
    onError: error => {
      console.error("Failed to export assessments:", error);
    },
  });
};

// Optimistic updates for better UX
export const useOptimisticAssessmentUpdate = () => {
  const queryClient = useQueryClient();

  const updateAssessmentOptimistically = (
    assessmentId: string,
    updates: Partial<Assessment>
  ) => {
    queryClient.setQueryData(
      assessmentsKeys.detail(assessmentId),
      (old: { assessment: Assessment } | undefined) => {
        if (!old) return old;

        return {
          assessment: {
            ...old.assessment,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        };
      }
    );
  };

  return { updateAssessmentOptimistically };
};

// Prefetch helpers
export const usePrefetchAssessment = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const prefetchAssessment = (id: string) => {
    if (!session?.user) return;

    queryClient.prefetchQuery({
      queryKey: assessmentsKeys.detail(id),
      queryFn: () => AssessmentsService.getAssessment(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchAssessment };
};
