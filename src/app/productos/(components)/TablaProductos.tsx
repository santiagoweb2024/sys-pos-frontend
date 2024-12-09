import { Producto } from "@/interfaces/producto.interface";
import { 
  Edit, 
  Trash2, 
  Plus,
  ArrowUpDown,
  Search
} from "lucide-react";
import { useState } from "react";

interface TablaProductosProps {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (producto: Producto) => void;
  onAdd: () => void;
}

export default function TablaProductos({
  productos,
  onEdit,
  onDelete,
  onAdd,
}: TablaProductosProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Producto>("nombre");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Producto) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredProducts = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header y Búsqueda */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort("codigo")}
              >
                <div className="flex items-center gap-2">
                  Código
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort("nombre")}
              >
                <div className="flex items-center gap-2">
                  Nombre
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort("precio")}
              >
                <div className="flex items-center gap-2">
                  Precio
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort("stock")}
              >
                <div className="flex items-center gap-2">
                  Stock
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{producto.codigo}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="flex items-center gap-3">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    {producto.nombre}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  ${producto.precio.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${producto.stock > 10 
                      ? "bg-green-50 text-green-700" 
                      : producto.stock > 0 
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {producto.stock} unidades
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(producto)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(producto)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
