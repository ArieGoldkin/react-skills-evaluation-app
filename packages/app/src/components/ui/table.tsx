"use client";

import {
  Table as BaseTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@skills-eval/design-system";
import * as React from "react";

interface TableProps<T> {
  table: {
    data: T[];
    columns: Array<{
      accessorKey: string;
      header: string;
      cell?: (props: { row: { original: T } }) => React.ReactNode;
    }>;
  };
}

export function Table<T>({ table }: TableProps<T>) {
  const { data, columns } = table;

  return (
    <div className="rounded-md border">
      <BaseTable>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(column => (
                  <TableCell key={column.accessorKey}>
                    {column.cell
                      ? column.cell({ row: { original: row } })
                      : String(
                          (row as Record<string, unknown>)[
                            column.accessorKey
                          ] ?? ""
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </BaseTable>
    </div>
  );
}
