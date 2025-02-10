import { Plus } from "lucide-react";

interface ProductsHeaderProps {
  onAdd: () => void;
}

export function ProductsHeader({ onAdd }: ProductsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-surface-900 dark:text-surface-50">
        Productos
      </h1>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        Agregar Producto
      </button>
    </div>
  );
}
