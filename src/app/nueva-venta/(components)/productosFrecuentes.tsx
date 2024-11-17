/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Grid2x2Check, List, Table } from "lucide-react";
import ViewToggle from "@/components/viewToggle/viewToggle";
import DataTable from "@/components/dataTable/dataTable";
import ProductCard from "@/components/productCard/productCard";

// Types
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  categoria: string;
  codigoBarras: string;
  fechaCaducidad: string;
}

// Data
// ... resto del código ...

const PRODUCTOS_FRECUENTES: Producto[] = [
  {
    id: 1,
    nombre: "Coca Cola 600ml",
    precio: 18,
    imagen: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80",
    stock: 24,
    categoria: "Bebidas",
    codigoBarras: "7501055300846",
    fechaCaducidad: "2024-12-31"
  },
  {
    id: 2,
    nombre: "Sabritas Original 45g",
    precio: 15,
    imagen: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&q=80",
    stock: 36,
    categoria: "Botanas",
    codigoBarras: "7501055328566",
    fechaCaducidad: "2024-06-30"
  },
  {
    id: 3,
    nombre: "Gansito",
    precio: 20,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    stock: 48,
    categoria: "Dulces",
    codigoBarras: "7501055329273",
    fechaCaducidad: "2024-08-15"
  },
  {
    id: 4,
    nombre: "Doritos Nacho",
    precio: 15,
    imagen: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&q=80",
    stock: 30,
    categoria: "Botanas",
    codigoBarras: "7501055330987",
    fechaCaducidad: "2024-07-20"
  },
  {
    id: 5,
    nombre: "Pepsi 600ml",
    precio: 17,
    imagen: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80",
    stock: 20,
    categoria: "Bebidas",
    codigoBarras: "7501055331234",
    fechaCaducidad: "2024-12-31"
  },
  {
    id: 6,
    nombre: "Galletas Oreo",
    precio: 18,
    imagen: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?w=400&q=80",
    stock: 40,
    categoria: "Dulces",
    codigoBarras: "7501055332345",
    fechaCaducidad: "2024-09-30"
  },
  {
    id: 7,
    nombre: "Maruchan Camarón",
    precio: 16,
    imagen: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80",
    stock: 50,
    categoria: "Alimentos",
    codigoBarras: "7501055333456",
    fechaCaducidad: "2024-11-30"
  },
  {
    id: 8,
    nombre: "Panditas",
    precio: 15,
    imagen: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80",
    stock: 45,
    categoria: "Dulces",
    codigoBarras: "7501055334567",
    fechaCaducidad: "2024-10-15"
  }
];


// Table Configuration
const TABLE_COLUMNS = [
  { key: 'id', header: 'ID' },
  { 
    key: 'nombre', 
    header: 'Producto',
    render: (producto: Producto) => (
      <div className="flex items-center gap-3">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          className="w-10 h-10 object-cover rounded-lg"
        />
        <span>{producto.nombre}</span>
      </div>
    )
  },
  { key: 'precio', header: 'Precio' },
  { key: 'stock', header: 'Stock' },
  {
    key: 'acciones',
    header: 'Acciones',
    align: 'center' as const,
    render: (producto: Producto) => (
      <BotonAgregar producto={producto} />
    )
  }
];

// Components
const BotonAgregar = ({ producto }: { producto: Producto }) => {
  const handleAgregar = () => {
    // Lógica para agregar producto
    console.log('Agregando producto:', producto);
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
      <ProductCard 
        key={producto.id} 
        producto={producto} 
        as="button" 
      />
    ))}
  </div>
);

const VistaTabla = ({ productos }: { productos: Producto[] }) => (
  <div className="max-h-[calc(100vh-60px-8px-1rem-2.75rem-0.5rem-2.5rem-0.5rem)] overflow-y-auto">
    <DataTable 
      data={productos} 
      columns={TABLE_COLUMNS} 
    />
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
