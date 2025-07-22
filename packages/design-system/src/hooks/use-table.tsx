"use client";

import * as React from "react";

export interface Column<T> {
  accessorKey: string;
  header: string;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
}

export interface UseTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function useTable<T>({ data, columns }: UseTableProps<T>) {
  return {
    table: {
      data,
      columns,
    },
  };
}