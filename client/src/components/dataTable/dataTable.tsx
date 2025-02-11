import { ReactNode } from "react";
import { cn } from "@/utils/cn.util";

interface Column<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (item: T) => ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((item: T) => string);
  emptyMessage?: string;
}

export default function DataTable<T>({
  data,
  columns,
  tableClassName,
  headerClassName,
  bodyClassName,
  rowClassName,
  emptyMessage = "No hay datos disponibles",
}: DataTableProps<T>) {
  return (
      <table className={cn(tableClassName)}>
        <thead
          className={cn(
            "truncate bg-surface-50/80 dark:bg-surface-800/80 border-b border-surface-200 dark:border-surface-700/50 sticky top-0",
            headerClassName
          )}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className={cn(
                  "text-left font-semibold uppercase tracking-wide",
                  column.align === "right" && "text-right",
                  column.align === "center" && "text-center",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn('divide-y divide-surface-200/75 dark:divide-surface-700/50',bodyClassName)}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-surface-500 dark:text-surface-400 text-center"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={cn(
                  "hover:bg-surface-50/50 dark:hover:bg-surface-700/50 transition-colors",
                  typeof rowClassName === "function"
                    ? rowClassName(item)
                    : rowClassName
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key.toString()}
                    className={cn(
                      "p-2 text-surface-700 dark:text-surface-300",
                      column.align === "right" && "text-right",
                      column.align === "center" && "text-center",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>   
  );
}
