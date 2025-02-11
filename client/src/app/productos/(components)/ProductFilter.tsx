import { useState } from "react";
import SearchBar from "@/components/searchBar/searchBar";
import { useDropDown } from "@/hooks/useDropDown";
import { ChevronDown } from "lucide-react";

export const ProductFilter = () => {
  const categoryDropdown = useDropDown<HTMLButtonElement, HTMLDivElement>({
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });

  const brandDropdown = useDropDown<HTMLButtonElement, HTMLDivElement>({
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });

  const columnDropdown = useDropDown<HTMLButtonElement, HTMLDivElement>({
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });

  // Estado para manejar las columnas seleccionadas
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Función para manejar el cambio de selección
  const handleColumnToggle = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column) // Desmarcar si ya está seleccionado
        : [...prev, column] // Marcar si no está seleccionado
    );
  };

  return (
    <div className="flex gap-4 bg-surface-100 dark:bg-surface-900 shadow-md p-4 rounded-lg">
      <SearchBar placeholder="Buscar por nombre o por código..." />

      {/* Dropdown categoría */}
      <div className="relative">
        <button
          ref={categoryDropdown.triggerRef}
          className="flex items-center gap-2 bg-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 dark:bg-surface-700 shadow-lg hover:shadow-xl px-4 py-2 border border-surface-300 focus:border-primary-500 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-800 dark:text-surface-50 transition-all duration-200 ease-in-out"
          onClick={categoryDropdown.toggleDropDown}
        >
          Filtrar por categoría
          <ChevronDown className="size-6" />
        </button>
        {categoryDropdown.isOpen && (
          <div
            ref={categoryDropdown.menuRef}
            className="top-full left-0 absolute bg-white dark:bg-surface-900 shadow-2xl mt-2 border border-surface-200 dark:border-surface-700 rounded-lg w-56 overflow-hidden transition-all duration-200 ease-in-out"
          >
            <ul className="p-2">
              <li className="hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer" onClick={categoryDropdown.closeDropDown}>
                Categoría 1
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer" onClick={categoryDropdown.closeDropDown}>
                Categoría 2
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer" onClick={categoryDropdown.closeDropDown}>
                Categoría 3
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Dropdown marca */}
      <div className="relative">
        <button
          ref={brandDropdown.triggerRef}
          className="flex items-center gap-2 bg-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 dark:bg-surface-700 shadow-lg hover:shadow-xl px-4 py-2 border border-surface-300 focus:border-primary-500 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-800 dark:text-surface-50 transition-all duration-200 ease-in-out"
          onClick={brandDropdown.toggleDropDown}
        >
          Filtrar por marca
          <ChevronDown className="size-6" />
        </button>
        {brandDropdown.isOpen && (
          <div
            ref={brandDropdown.menuRef}
            className="top-full left-0 absolute bg-white dark:bg-surface-900 shadow-2xl mt-2 border border-surface-200 dark:border-surface-700 rounded-lg w-56 overflow-hidden transition-all duration-200 ease-in-out"
          >
            <ul className="p-2">
              <li className="hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer" onClick={brandDropdown.closeDropDown}>
                Marca 1
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer" onClick={brandDropdown.closeDropDown}>
                Marca 2
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer" onClick={brandDropdown.closeDropDown}>
                Marca 3
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Dropdown columnas (selección múltiple) */}
      <div className="relative">
        <button
          ref={columnDropdown.triggerRef}
          className="flex items-center gap-2 bg-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 dark:bg-surface-700 shadow-lg hover:shadow-xl px-4 py-2 border border-surface-300 focus:border-primary-500 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-800 dark:text-surface-50 transition-all duration-200 ease-in-out"
          onClick={columnDropdown.toggleDropDown}
        >
          Filtrar columnas
          <ChevronDown className="size-6" />
        </button>
        {columnDropdown.isOpen && (
          <div
            ref={columnDropdown.menuRef}
            className="top-full left-0 absolute bg-white dark:bg-surface-900 shadow-2xl mt-2 border border-surface-200 dark:border-surface-700 rounded-lg w-56 overflow-hidden transition-all duration-200 ease-in-out"
          >
            <ul className="p-2">
              {["Columna 1", "Columna 2", "Columna 3"].map((column) => (
                <li
                  key={column}
                  className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-surface-700 p-2 rounded-md transition-colors duration-200 ease-in-out cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el dropdown se cierre al hacer clic en un checkbox
                    handleColumnToggle(column);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column)}
                    onChange={() => handleColumnToggle(column)}
                    className="border-gray-300 rounded focus:ring-primary-500 w-4 h-4 text-primary-500"
                  />
                  <span>{column}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};