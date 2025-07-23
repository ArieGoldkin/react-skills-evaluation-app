"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Filter,
  X,
} from "lucide-react";
import * as React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../navigation/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { DataTablePagination } from "./data-table-pagination";

export interface Column<TData> {
  id: string;
  header: string | React.ReactNode;
  accessorKey?: keyof TData;
  cell?: (value: any, row: TData) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "range";
  filterOptions?: Array<{ label: string; value: string }>;
  className?: string;
  headerClassName?: string;
}

export interface SortingState {
  id: string;
  desc: boolean;
}

export interface FilterState {
  id: string;
  value: any;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: Column<TData>[];
  loading?: boolean;
  error?: string;
  sorting?: SortingState[];
  onSortingChange?: (sorting: SortingState[]) => void;
  filtering?: FilterState[];
  onFilteringChange?: (filtering: FilterState[]) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (filter: string) => void;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  className?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData>({
  data,
  columns,
  loading = false,
  error,
  sorting = [],
  onSortingChange,
  filtering = [],
  onFilteringChange,
  globalFilter = "",
  onGlobalFilterChange,
  pagination,
  onPaginationChange,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  className,
  emptyMessage = "No data available",
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const [internalSorting, setInternalSorting] =
    React.useState<SortingState[]>(sorting);
  const [internalFiltering, setInternalFiltering] =
    React.useState<FilterState[]>(filtering);
  const [internalGlobalFilter, setInternalGlobalFilter] =
    React.useState(globalFilter);

  // Use controlled or internal state for sorting
  const currentSorting = manualSorting ? sorting : internalSorting;
  const setSorting = manualSorting ? onSortingChange : setInternalSorting;

  // Use controlled or internal state for filtering
  const currentFiltering = manualFiltering ? filtering : internalFiltering;
  const setFiltering = manualFiltering
    ? onFilteringChange
    : setInternalFiltering;

  // Use controlled or internal state for global filter
  const currentGlobalFilter = manualFiltering
    ? globalFilter
    : internalGlobalFilter;
  const setGlobalFilter = manualFiltering
    ? onGlobalFilterChange
    : setInternalGlobalFilter;

  // Handle column sorting
  const handleSort = (columnId: string) => {
    if (!setSorting) return;

    const existingSort = currentSorting.find(sort => sort.id === columnId);
    let newSorting: SortingState[];

    if (!existingSort) {
      // Add new sort (ascending)
      newSorting = [{ id: columnId, desc: false }];
    } else if (!existingSort.desc) {
      // Change to descending
      newSorting = [{ id: columnId, desc: true }];
    } else {
      // Remove sort
      newSorting = [];
    }

    setSorting(newSorting);
  };

  // Handle column filtering
  const handleFilter = (columnId: string, value: any) => {
    if (!setFiltering) return;

    const newFiltering = currentFiltering.filter(
      filter => filter.id !== columnId
    );
    if (value !== undefined && value !== null && value !== "") {
      newFiltering.push({ id: columnId, value });
    }

    setFiltering(newFiltering);
  };

  // Clear all filters
  const clearFilters = () => {
    if (setFiltering) {
      setFiltering([]);
    }
    if (setGlobalFilter) {
      setGlobalFilter("");
    }
  };

  // Get sort icon for column
  const getSortIcon = (columnId: string) => {
    const sort = currentSorting.find(s => s.id === columnId);
    if (!sort) return <ChevronsUpDown className="h-4 w-4" />;
    return sort.desc ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronUp className="h-4 w-4" />
    );
  };

  // Apply local filtering and sorting if not manual
  let processedData = data;

  if (!manualFiltering) {
    // Apply global filter
    if (currentGlobalFilter) {
      processedData = processedData.filter(row =>
        Object.values(row as any)
          .join(" ")
          .toLowerCase()
          .includes(currentGlobalFilter.toLowerCase())
      );
    }

    // Apply column filters
    currentFiltering.forEach(filter => {
      processedData = processedData.filter(row => {
        const value = (row as any)[filter.id];
        return value
          ?.toString()
          .toLowerCase()
          .includes(filter.value.toString().toLowerCase());
      });
    });
  }

  if (!manualSorting && currentSorting.length > 0) {
    const sort = currentSorting[0];
    processedData = [...processedData].sort((a, b) => {
      const aValue = (a as any)[sort.id];
      const bValue = (b as any)[sort.id];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sort.desc ? -comparison : comparison;
    });
  }

  // Handle local pagination if not manual
  if (!manualPagination && pagination) {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    processedData = processedData.slice(start, end);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={currentGlobalFilter}
              onChange={e => setGlobalFilter?.(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Filter dropdown for filterable columns */}
          {columns.some(col => col.filterable) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {currentFiltering.length > 0 && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                      {currentFiltering.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {columns
                    .filter(col => col.filterable)
                    .map(column => (
                      <DropdownMenuItem
                        key={column.id}
                        onClick={() => {
                          // This would open a filter dialog for the specific column
                          // For now, we'll just clear the filter
                          const hasFilter = currentFiltering.some(
                            f => f.id === column.id
                          );
                          if (hasFilter) {
                            handleFilter(column.id, "");
                          }
                        }}
                      >
                        {column.header as string}
                        {currentFiltering.some(f => f.id === column.id) && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            Filtered
                          </span>
                        )}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                {currentFiltering.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearFilters}>
                      <X className="mr-2 h-4 w-4" />
                      Clear all filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.id}
                  className={cn(
                    column.headerClassName,
                    column.sortable &&
                      "cursor-pointer select-none hover:bg-muted/50"
                  )}
                  onClick={() =>
                    column.sortable ? handleSort(column.id) : undefined
                  }
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable && getSortIcon(column.id)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : processedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map(column => {
                    const cellValue = column.accessorKey
                      ? (row as any)[column.accessorKey]
                      : undefined;

                    const cellContent = column.cell
                      ? column.cell(cellValue, row)
                      : cellValue?.toString() || "";

                    return (
                      <TableCell key={column.id} className={column.className}>
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <DataTablePagination
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      )}
    </div>
  );
}
