/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, ArrowUpDown, Search } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";
import FormularioProducto from "./(components)/FormularioProducto";
import { Producto } from "@/interfaces/producto.interface";
import { PRODUCTOS_FRECUENTES } from "@/mocks/producto.mock";

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_FRECUENTES);
  const [productoEditar, setProductoEditar] = useState<Producto | undefined>();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setProductoEditar(undefined);
    setMostrarFormulario(true);
  };

  const handleEdit = (producto: Producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
  };

  const handleDelete = (producto: Producto) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== producto.id));
    }
  };

  const handleSubmit = (productoData: Partial<Producto>) => {
    if (productoEditar) {
      setProductos(
        productos.map((p) =>
          p.id === productoEditar.id ? { ...p, ...productoData } : p
        )
      );
    } else {
      const nuevoProducto = {
        ...productoData,
        id: Math.random().toString(36).substr(2, 9),
      } as Producto;
      setProductos([...productos, nuevoProducto]);
    }
    setMostrarFormulario(false);
  };

  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: "codigo",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Código
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      className: "text-sm text-gray-900",
    },
    {
      key: "nombre",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Nombre
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      className: "text-sm text-gray-900",
      render: (producto: Producto) => (
        <div className="flex items-center gap-3">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-8 h-8 rounded-lg object-cover"
          />
          {producto.nombre}
        </div>
      ),
    },
    {
      key: "precio",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Precio
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      className: "text-sm text-gray-900",
      render: (producto: Producto) => `$${producto.precio.toFixed(2)}`,
    },
    {
      key: "stock",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Stock
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (producto: Producto) => (
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
      ),
    },
    {
      key: "acciones",
      header: (
        <div className="text-sm font-medium text-gray-500">
          Acciones
        </div>
      ),
      render: (producto: Producto) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(producto)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(producto)}
            className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
            <button
              onClick={handleAdd}
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

        <DataTable
          data={filteredProducts}
          columns={columns}
          className="overflow-hidden"
          tableClassName="border-collapse"
          headerClassName="bg-gray-50"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          emptyMessage="No hay productos disponibles"
        />
      </div>

      {mostrarFormulario && (
        <FormularioProducto
          producto={productoEditar}
          onSubmit={handleSubmit}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}