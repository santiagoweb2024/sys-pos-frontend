import SearchBar from "@/components/searchBar/searchBar";
import { Plus } from "lucide-react";
export default function ProductToolbar() {
  return (
    <div className="p-4 bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 shadow-xs sticky top-[68px] z-50 backdrop-blur-xs h-[130px]">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Productos</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Plus className="size-4" color="#fff"/>
          <span>Nuevo Producto</span>
        </button>
      </div>
      {/* Barra de búsqueda */}
      <SearchBar placeholder="Buscar por nombre o codigo..."/>
    </div>
  );
}
