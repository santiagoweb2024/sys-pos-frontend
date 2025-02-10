import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onPageChange,
  maxVisible = 5,
  hidePrevButton = false,
  hideNextButton = false,
  showFirstButton = false,
  showLastButton = false,
}) => {
  // Cálculo de los números de página a mostrar
  const getPageNumbers = (): (number | string)[] => {
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    pages.push(1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) pages.push("...");

    pages.push(total);

    return pages;
  };

  // Genera los ítems de la paginación (botones)
  const getPaginationItems = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map((page) => {
      let type = "";
      let pageNumber = null;
      let disabled = false;

      if (page === "...") {
        type = "ellipsis";
        pageNumber = null;
      } else if (typeof page === "number") {
        type = "page";
        pageNumber = page;
        disabled = current === page;
      }

      return {
        type,
        page: pageNumber,
        onClick: () => page !== "..." && onPageChange(page as number),
        selected: current === page,
        disabled: disabled,
      };
    });
  };

  const items = getPaginationItems();

  return (
    <div className="flex items-center gap-2">
      {/* Botón "Primero" */}
      {showFirstButton && (
        <button
          onClick={() => onPageChange(1)}
          disabled={current === 1}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-surface-600 bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      )}

      {/* Botón "Anterior" */}
      {!hidePrevButton && (
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-surface-600 bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Botones de páginas */}
      {items.map((item, index) => {
        if (item.type === "ellipsis") {
          return (
            <span key={index} className="text-surface-400 dark:text-surface-500">
              ...
            </span>
          );
        } else {
          return (
            <button
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              className={`h-9 w-9 flex items-center justify-center rounded-lg font-medium transition-colors ${
                item.selected
                  ? "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
                  : "text-surface-600 bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700"
              }`}
            >
              {item.page}
            </button>
          );
        }
      })}

      {/* Botón "Siguiente" */}
      {!hideNextButton && (
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === total}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-surface-600 bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Botón "Último" */}
      {showLastButton && (
        <button
          onClick={() => onPageChange(total)}
          disabled={current === total}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-surface-600 bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
