/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Grid2x2Check, List, Table } from "lucide-react";
import ViewToggle from "@/components/viewToggle/viewToggle";
import DataTable from "@/components/dataTable/dataTable";
import ProductCard from "@/components/productCard/productCard";
import { Producto } from "@/interfaces/producto.interface";
import { PRODUCTOS_FRECUENTES } from "@/mocks/producto.mock";

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
  { key: "precio", header: "Precio" },
  { key: "stock", header: "Stock" },
  {
    key: "acciones",
    header: "Acciones",
    align: "center" as const,
    render: (producto: Producto) => <BotonAgregar producto={producto} />,
  },
];

// Components
const BotonAgregar = ({ producto }: { producto: Producto }) => {
  const handleAgregar = () => {
    // Lógica para agregar producto
    console.log("Agregando producto:", producto);
  };

  return (
    <button
      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      onClick={handleAgregar}
    >
      Agregar
    </button>
  );
};

const VistaCards = ({ productos }: { productos: Producto[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[calc(100vh-60px-8px-1rem-2.75rem-0.5rem-2.5rem-0.5rem)] overflow-y-auto">
    {productos.map((producto) => (
      <ProductCard key={producto.id} producto={producto} as="button" />
    ))}
  </div>
);

const VistaTabla = ({ productos }: { productos: Producto[] }) => (
  <div className="max-h-[calc(100vh-60px-8px-1rem-2.75rem-0.5rem-2.5rem-0.5rem)] overflow-y-auto">
    <DataTable data={productos} columns={TABLE_COLUMNS} />
  </div>
);

// Main Component
export default function ProductosFrecuentes() {
  const [viewMode, setViewMode] = useState<"cards" | "table" | "list">("cards");

  const renderContent = () => {
    switch (viewMode) {
      case "cards":
        return <VistaCards productos={PRODUCTOS_FRECUENTES} />;
      case "table":
      case "list":
        return <VistaTabla productos={PRODUCTOS_FRECUENTES} />;
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
