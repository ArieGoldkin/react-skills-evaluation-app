"use client";

import * as React from "react";
import type { SortingState, FilterState } from "./data-table";
import type { Skill } from "./skills-table";

export interface SkillsApiParams {
  search?: string;
  categoryId?: string;
  sortBy?: "name" | "proficiency" | "createdAt" | "updatedAt";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
  source?: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  verified?: boolean;
  minProficiency?: number;
  maxProficiency?: number;
}

export interface SkillsApiResponse {
  data: Skill[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
    offset: number;
  };
}

export interface UseSkillsTableOptions {
  initialPageSize?: number;
  initialSorting?: SortingState[];
  initialFiltering?: FilterState[];
  initialGlobalFilter?: string;
  onError?: (error: Error) => void;
  apiEndpoint?: string;
}

export interface UseSkillsTableReturn {
  // Data
  data: Skill[];
  loading: boolean;
  error: string | null;

  // Table state
  sorting: SortingState[];
  filtering: FilterState[];
  globalFilter: string;
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };

  // Handlers
  onSortingChange: (sorting: SortingState[]) => void;
  onFilteringChange: (filtering: FilterState[]) => void;
  onGlobalFilterChange: (filter: string) => void;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;

  // Actions
  refetch: () => Promise<void>;
  reset: () => void;
}

export function useSkillsTable({
  initialPageSize = 20,
  initialSorting = [{ id: "name", desc: false }],
  initialFiltering = [],
  initialGlobalFilter = "",
  onError,
  apiEndpoint = "/api/v1/skills",
}: UseSkillsTableOptions = {}): UseSkillsTableReturn {
  // State
  const [data, setData] = React.useState<Skill[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Table state
  const [sorting, setSorting] = React.useState<SortingState[]>(initialSorting);
  const [filtering, setFiltering] =
    React.useState<FilterState[]>(initialFiltering);
  const [globalFilter, setGlobalFilter] = React.useState(initialGlobalFilter);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialPageSize,
    pageCount: 1,
    totalCount: 0,
  });

  // Build API parameters
  const buildApiParams = React.useCallback((): SkillsApiParams => {
    const params: SkillsApiParams = {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    };

    // Add global search
    if (globalFilter) {
      params.search = globalFilter;
    }

    // Add sorting
    if (sorting.length > 0) {
      const sort = sorting[0];
      params.sortBy = sort.id as any;
      params.order = sort.desc ? "desc" : "asc";
    }

    // Add column filters
    filtering.forEach(filter => {
      switch (filter.id) {
        case "categoryId":
          params.categoryId = filter.value;
          break;
        case "source":
          params.source = filter.value;
          break;
        case "verified":
          params.verified = filter.value === "true";
          break;
        case "minProficiency":
          params.minProficiency = parseInt(filter.value, 10);
          break;
        case "maxProficiency":
          params.maxProficiency = parseInt(filter.value, 10);
          break;
      }
    });

    return params;
  }, [
    sorting,
    filtering,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  // Fetch data
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = buildApiParams();
      const queryString = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              acc[key] = value.toString();
            }
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString();

      const response = await fetch(`${apiEndpoint}?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch skills: ${response.statusText}`);
      }

      const result: SkillsApiResponse = await response.json();

      setData(result.data);
      setPagination(prev => ({
        ...prev,
        pageCount: result.meta.totalPages,
        totalCount: result.meta.totalCount,
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch skills";
      setError(errorMessage);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
    } finally {
      setLoading(false);
    }
  }, [buildApiParams, apiEndpoint, onError]);

  // Handlers
  const onSortingChange = React.useCallback((newSorting: SortingState[]) => {
    setSorting(newSorting);
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset to first page
  }, []);

  const onFilteringChange = React.useCallback((newFiltering: FilterState[]) => {
    setFiltering(newFiltering);
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset to first page
  }, []);

  const onGlobalFilterChange = React.useCallback((filter: string) => {
    setGlobalFilter(filter);
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset to first page
  }, []);

  const onPaginationChange = React.useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      setPagination(prev => ({
        ...prev,
        ...newPagination,
      }));
    },
    []
  );

  // Reset function
  const reset = React.useCallback(() => {
    setSorting(initialSorting);
    setFiltering(initialFiltering);
    setGlobalFilter(initialGlobalFilter);
    setPagination({
      pageIndex: 0,
      pageSize: initialPageSize,
      pageCount: 1,
      totalCount: 0,
    });
  }, [initialSorting, initialFiltering, initialGlobalFilter, initialPageSize]);

  // Effect to fetch data when dependencies change
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounce global filter changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [globalFilter]);

  return {
    // Data
    data,
    loading,
    error,

    // Table state
    sorting,
    filtering,
    globalFilter,
    pagination,

    // Handlers
    onSortingChange,
    onFilteringChange,
    onGlobalFilterChange,
    onPaginationChange,

    // Actions
    refetch: fetchData,
    reset,
  };
}
