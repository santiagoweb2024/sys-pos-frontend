/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Grid2x2Check, List, Table, Plus, Minus } from "lucide-react";
import ViewToggle from "@/components/viewToggle/viewToggle";
import DataTable from "@/components/dataTable/dataTable";
import ProductCard from "@/components/productCard/productCard";
import { Producto } from "@/interfaces/producto.interface";
import { PRODUCTOS_FRECUENTES } from "@/mocks/producto.mock";

interface ProductosFrequentesProps {
  onAgregarProducto: (producto: Producto, cantidad: number) => void;
}

// Components
const BotonAgregar = ({ producto, onAgregar }: { producto: Producto; onAgregar: (cantidad: number) => void }) => {
  const [showCantidad, setShowCantidad] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    if (showCantidad) {
      onAgregar(cantidad);
      setCantidad(1);
      setShowCantidad(false);
    } else {
      setShowCantidad(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {showCantidad && (
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg">
          <button
            className="p-1 text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors"
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{cantidad}</span>
          <button
            className="p-1 text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
            onClick={() => setCantidad(cantidad + 1)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
      <button
        className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={handleAgregar}
      >
        {showCantidad ? "Confirmar" : "Agregar"}
      </button>
    </div>
  );
};

// Table Configuration
const TABLE_COLUMNS = [
  { key: "id", header: "ID" },
  {
    key: "nombre",
    header: "Producto",
    render: (producto: Producto) => (
      <div className="flex items-center gap-3">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-10 h-10 object-cover rounded-lg"
        />
        <span>{producto.nombre}</span>
      </div>
    ),
  },
  { 
    key: "precio", 
    header: "Precio",
    render: (producto: Producto) => (
      <span>${producto.precio.toFixed(2)}</span>
    ),
  },
  { 
    key: "stock", 
    header: "Stock",
    render: (producto: Producto) => (
      <span className={producto.stock < 10 ? "text-red-600" : ""}>{producto.stock}</span>
    ),
  },
  {
    key: "acciones",
    header: "Acciones",
    align: "center" as const,
    render: (producto: Producto, { onAgregarProducto }: ProductosFrequentesProps) => (
      <BotonAgregar 
        producto={producto} 
        onAgregar={(cantidad) => onAgregarProducto(producto, cantidad)} 
      />
    ),
  },
];

const VistaCards = ({ productos, onAgregarProducto }: { productos: Producto[]; onAgregarProducto: (producto: Producto, cantidad: number) => void }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[calc(100vh-60px-8px-1rem-2.75rem-0.5rem-2.5rem-0.5rem)] overflow-y-auto">
    {productos.map((producto) => (
      <div key={producto.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
        <h3 className="font-medium text-gray-900 mb-1">{producto.nombre}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-blue-600">${producto.precio.toFixed(2)}</span>
          <span className={`text-sm ${producto.stock < 10 ? "text-red-600" : "text-gray-600"}`}>
            Stock: {producto.stock}
          </span>
        </div>
        <BotonAgregar 
          producto={producto} 
          onAgregar={(cantidad) => onAgregarProducto(producto, cantidad)} 
        />
      </div>
    ))}
  </div>
);

const VistaTabla = ({ productos, onAgregarProducto }: { productos: Producto[]; onAgregarProducto: (producto: Producto, cantidad: number) => void }) => (
  <div className="max-h-[calc(100vh-60px-8px-1rem-2.75rem-0.5rem-2.5rem-0.5rem)] overflow-y-auto">
    <DataTable data={productos} columns={TABLE_COLUMNS} extraProps={{ onAgregarProducto }} />
  </div>
);

// Main Component
export default function ProductosFrecuentes({ onAgregarProducto }: ProductosFrequentesProps) {
  const [viewMode, setViewMode] = useState<"cards" | "table" | "list">("cards");

  const renderContent = () => {
    switch (viewMode) {
      case "cards":
        return <VistaCards productos={PRODUCTOS_FRECUENTES} onAgregarProducto={onAgregarProducto} />;
      case "table":
      case "list":
        return <VistaTabla productos={PRODUCTOS_FRECUENTES} onAgregarProducto={onAgregarProducto} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end h-10">
        <ViewToggle
          options={[
            { value: "cards", icon: <Grid2x2Check /> },
            { value: "table", icon: <Table /> },
            { value: "list", icon: <List /> },
          ]}
          value={viewMode}
          onChange={(value) => setViewMode(value as "cards" | "table" | "list")}
        />
      </div>
      {renderContent()}
    </div>
  );
}
