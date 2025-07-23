"use client";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../navigation/dropdown-menu";
import { Star, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import * as React from "react";
import {
  DataTable,
  type Column,
  type SortingState,
  type FilterState,
} from "./data-table";

// Skill data interface based on the API response structure
export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  description?: string;
  tags: string[];
  source: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    color?: string;
  };
  _count: {
    assessments: number;
    history: number;
  };
}

export interface SkillsTableProps {
  data: Skill[];
  loading?: boolean;
  error?: string;
  onView?: (skill: Skill) => void;
  onEdit?: (skill: Skill) => void;
  onDelete?: (skill: Skill) => void;
  onSortingChange?: (sorting: SortingState[]) => void;
  onFilteringChange?: (filtering: FilterState[]) => void;
  onGlobalFilterChange?: (filter: string) => void;
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };
  sorting?: SortingState[];
  filtering?: FilterState[];
  globalFilter?: string;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  className?: string;
}

// Proficiency indicator component
function ProficiencyIndicator({ proficiency }: { proficiency: number }) {
  const getColor = (level: number) => {
    if (level <= 3) return "bg-red-500";
    if (level <= 6) return "bg-yellow-500";
    if (level <= 8) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i < proficiency ? getColor(proficiency) : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{proficiency}/10</span>
    </div>
  );
}

// Source badge component
function SourceBadge({ source }: { source: Skill["source"] }) {
  const getVariant = (source: string) => {
    switch (source) {
      case "MANUAL":
        return "default" as const;
      case "ASSESSMENT":
        return "secondary" as const;
      case "GITHUB":
        return "outline" as const;
      case "AI_SUGGESTED":
        return "destructive" as const;
      case "IMPORTED":
        return "secondary" as const;
      default:
        return "default" as const;
    }
  };

  const getLabel = (source: string) => {
    switch (source) {
      case "MANUAL":
        return "Manual";
      case "ASSESSMENT":
        return "Assessment";
      case "GITHUB":
        return "GitHub";
      case "AI_SUGGESTED":
        return "AI";
      case "IMPORTED":
        return "Import";
      default:
        return source;
    }
  };

  return (
    <Badge variant={getVariant(source)} className="text-xs">
      {getLabel(source)}
    </Badge>
  );
}

// Category badge component
function CategoryBadge({ category }: { category: Skill["category"] }) {
  return (
    <Badge
      variant="outline"
      className="text-xs"
      style={{
        borderColor: category.color || undefined,
        color: category.color || undefined,
      }}
    >
      {category.icon && (
        <span className="mr-1" role="img" aria-label={category.name}>
          {category.icon}
        </span>
      )}
      {category.name}
    </Badge>
  );
}

// Row actions component
function RowActions({
  skill,
  onView,
  onEdit,
  onDelete,
}: {
  skill: Skill;
  onView?: (skill: Skill) => void;
  onEdit?: (skill: Skill) => void;
  onDelete?: (skill: Skill) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          aria-label={`Actions for ${skill.name}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onView && (
          <DropdownMenuItem onClick={() => onView(skill)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(skill)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Skill
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(skill)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Skill
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SkillsTable({
  data,
  loading = false,
  error,
  onView,
  onEdit,
  onDelete,
  onSortingChange,
  onFilteringChange,
  onGlobalFilterChange,
  onPaginationChange,
  pagination,
  sorting = [],
  filtering = [],
  globalFilter = "",
  manualPagination = true,
  manualSorting = true,
  manualFiltering = true,
  className,
}: SkillsTableProps) {
  const columns: Column<Skill>[] = [
    {
      id: "name",
      header: "Skill Name",
      accessorKey: "name",
      sortable: true,
      filterable: true,
      cell: (value, row) => (
        <div className="flex items-center space-x-2">
          <div>
            <div className="font-medium">{value}</div>
            {row.description && (
              <div className="text-sm text-muted-foreground line-clamp-1">
                {row.description}
              </div>
            )}
          </div>
          {row.verified && (
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          )}
        </div>
      ),
      className: "min-w-[200px]",
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      sortable: true,
      filterable: true,
      cell: value => <CategoryBadge category={value} />,
    },
    {
      id: "proficiency",
      header: "Proficiency",
      accessorKey: "proficiency",
      sortable: true,
      filterable: true,
      filterType: "range",
      cell: value => <ProficiencyIndicator proficiency={value} />,
      className: "min-w-[180px]",
    },
    {
      id: "source",
      header: "Source",
      accessorKey: "source",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { label: "Manual", value: "MANUAL" },
        { label: "Assessment", value: "ASSESSMENT" },
        { label: "GitHub", value: "GITHUB" },
        { label: "AI Suggested", value: "AI_SUGGESTED" },
        { label: "Imported", value: "IMPORTED" },
      ],
      cell: value => <SourceBadge source={value} />,
    },
    {
      id: "tags",
      header: "Tags",
      accessorKey: "tags",
      filterable: true,
      cell: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {value.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{value.length - 3}
            </Badge>
          )}
        </div>
      ),
      className: "min-w-[150px]",
    },
    {
      id: "assessments",
      header: "Assessments",
      accessorKey: "_count",
      sortable: true,
      cell: value => (
        <div className="text-sm">
          <div>{value.assessments} assessments</div>
          <div className="text-muted-foreground">{value.history} updates</div>
        </div>
      ),
    },
    {
      id: "updatedAt",
      header: "Last Updated",
      accessorKey: "updatedAt",
      sortable: true,
      cell: value => (
        <div className="text-sm text-muted-foreground">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: (_, row) => (
        <RowActions
          skill={row}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
      className: "w-[50px]",
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      error={error}
      sorting={sorting}
      onSortingChange={onSortingChange}
      filtering={filtering}
      onFilteringChange={onFilteringChange}
      globalFilter={globalFilter}
      onGlobalFilterChange={onGlobalFilterChange}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      manualPagination={manualPagination}
      manualSorting={manualSorting}
      manualFiltering={manualFiltering}
      className={className}
      emptyMessage="No skills found. Start by creating your first skill!"
      searchPlaceholder="Search skills by name, category, or tags..."
    />
  );
}
