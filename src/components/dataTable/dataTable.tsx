import { ReactNode } from "react";
import clsx from "clsx";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((item: T) => string);
  emptyMessage?: string;
}

export default function DataTable<T>({
  data,
  columns,
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  emptyMessage = "No hay datos disponibles"
}: DataTableProps<T>) {
  return (
    <div className={clsx("overflow-x-auto", className)}>
      <table className={clsx("w-full border-collapse", tableClassName)}>
        <thead className={clsx("bg-gray-50", headerClassName)}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className={clsx(
                  "p-2",
                  column.align === 'right' && "text-right",
                  column.align === 'center' && "text-center",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={clsx(
                  "border-b hover:bg-gray-50",
                  typeof rowClassName === 'function' 
                    ? rowClassName(item) 
                    : rowClassName
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key.toString()}
                    className={clsx(
                      "p-2",
                      column.align === 'right' && "text-right",
                      column.align === 'center' && "text-center",
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
    </div>
  );
} 