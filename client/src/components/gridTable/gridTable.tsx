import { ReactNode } from "react";
import clsx from "clsx";

interface Column<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (item: T) => ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

interface GridTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((item: T) => string);
  emptyMessage?: string;
}

export default function GridTable<T>({
  data,
  columns,
  className,
  headerClassName,
  bodyClassName,
  rowClassName,
  emptyMessage = "No hay datos disponibles",
}: GridTableProps<T>) {
  return (
    <div className={clsx("grid ", className)}>
      {/* Header */}
      <div
        className={clsx(
          "grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] sticky top-[207px] z-50 ",
          headerClassName
        )}
      >
        {columns.map((column) => (
          <div
            key={column.key.toString()}
            className={clsx(
              "p-2",
              column.align === "right" && "text-right",
              column.align === "center" && "text-center",
              column.className
            )}
          >
            {column.header}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className={clsx("grid gap-0 relative", bodyClassName)}>
        {data.length === 0 ? (
          <div className="text-center py-4 text-gray-500">{emptyMessage}</div>
        ) : (
          <div className="grid gap-0">
            {data.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  "grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
                  typeof rowClassName === "function"
                    ? rowClassName(item)
                    : rowClassName
                )}
              >
                {columns.map((column) => (
                  <div
                    key={column.key.toString()}
                    className={clsx(
                      "p-2",
                      column.align === "right" && "text-right",
                      column.align === "center" && "text-center",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T])}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
