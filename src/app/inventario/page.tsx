/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Search, ArrowUpDown, PlusCircle, MinusCircle, FileEdit, AlertTriangle } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";
import FormularioMovimiento from "./(components)/FormularioMovimiento";
import { Producto } from "@/interfaces/producto.interface";
import { PRODUCTOS_FRECUENTES } from "@/mocks/producto.mock";

interface MovimientoInventario {
  id: string;
  fecha: Date;
  tipo: 'entrada' | 'salida' | 'ajuste';
  cantidad: number;
  motivo: string;
  producto: Producto;
}

interface EstadisticasInventario {
  totalProductos: number;
  stockBajo: number;
  movimientosHoy: number;
  valorTotal: number;
}

export default function Inventario() {
  const [productos] = useState<Producto[]>(PRODUCTOS_FRECUENTES);
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Calcular estadísticas
  const estadisticas: EstadisticasInventario = {
    totalProductos: productos.length,
    stockBajo: productos.filter(p => p.stock <= 10).length,
    movimientosHoy: movimientos.filter(m => 
      m.fecha.toDateString() === new Date().toDateString()
    ).length,
    valorTotal: productos.reduce((total, p) => total + (p.precio * p.stock), 0)
  };

  const handleMovimiento = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setMostrarFormulario(true);
  };

  const handleSubmitMovimiento = (movimiento: Omit<MovimientoInventario, 'id' | 'fecha'>) => {
    const nuevoMovimiento: MovimientoInventario = {
      ...movimiento,
      id: Math.random().toString(36).substr(2, 9),
      fecha: new Date(),
    };
    setMovimientos([nuevoMovimiento, ...movimientos]);
    setMostrarFormulario(false);
  };

  const productosStockBajo = productos.filter(p => p.stock <= 10);

  const columns = [
    {
      key: "nombre",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Producto
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
          <div>
            <div className="font-medium">{producto.nombre}</div>
            <div className="text-xs text-gray-500">Código: {producto.codigo}</div>
          </div>
        </div>
      ),
    },
    {
      key: "stock",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Stock Actual
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (producto: Producto) => (
        <div className="space-y-1">
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
          {producto.stock <= 10 && (
            <div className="flex items-center gap-1 text-xs text-yellow-600">
              <AlertTriangle className="w-3 h-3" />
              Stock bajo
            </div>
          )}
        </div>
      ),
    },
    {
      key: "valor",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Valor en Stock
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (producto: Producto) => (
        <div className="text-sm text-gray-900">
          ${(producto.precio * producto.stock).toFixed(2)}
        </div>
      ),
    },
    {
      key: "acciones",
      header: (
        <div className="text-sm font-medium text-gray-500">
          Movimientos
        </div>
      ),
      render: (producto: Producto) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMovimiento(producto)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Entrada de stock"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleMovimiento(producto)}
            className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            title="Salida de stock"
          >
            <MinusCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleMovimiento(producto)}
            className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Ajuste de inventario"
          >
            <FileEdit className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Productos</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.totalProductos}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Productos Stock Bajo</div>
          <div className="text-2xl font-semibold text-yellow-600 mt-1">
            {estadisticas.stockBajo}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Movimientos Hoy</div>
          <div className="text-2xl font-semibold text-blue-600 mt-1">
            {estadisticas.movimientosHoy}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Valor Total Inventario</div>
          <div className="text-2xl font-semibold text-green-600 mt-1">
            ${estadisticas.valorTotal.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Stock Bajo */}
      {productosStockBajo.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-medium">Productos con Stock Bajo</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productosStockBajo.map(producto => (
              <div key={producto.id} className="flex items-center gap-3 bg-white p-2 rounded-lg">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className="text-sm font-medium">{producto.nombre}</div>
                  <div className="text-xs text-red-600">{producto.stock} unidades</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control de Inventario */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Control de Inventario</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <DataTable
          data={productos.filter(p => 
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          columns={columns}
          className="overflow-hidden"
          tableClassName="border-collapse"
          headerClassName="bg-gray-50"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          emptyMessage="No hay productos disponibles"
        />
      </div>

      {/* Movimientos Recientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Últimos Movimientos</h2>
        </div>

        <DataTable
          data={movimientos.slice(0, 5)}
          columns={[
            {
              key: "fecha",
              header: "Fecha",
              render: (m: MovimientoInventario) => m.fecha.toLocaleString(),
            },
            {
              key: "producto",
              header: "Producto",
              render: (m: MovimientoInventario) => (
                <div className="flex items-center gap-3">
                  <img
                    src={m.producto.imagen}
                    alt={m.producto.nombre}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  {m.producto.nombre}
                </div>
              ),
            },
            {
              key: "tipo",
              header: "Tipo",
              render: (m: MovimientoInventario) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${m.tipo === 'entrada'
                    ? "bg-green-50 text-green-700"
                    : m.tipo === 'salida'
                      ? "bg-red-50 text-red-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {m.tipo.charAt(0).toUpperCase() + m.tipo.slice(1)}
                </span>
              ),
            },
            {
              key: "cantidad",
              header: "Cantidad",
              render: (m: MovimientoInventario) => (
                <span className={`font-medium
                  ${m.tipo === 'entrada'
                    ? "text-green-600"
                    : m.tipo === 'salida'
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  {m.tipo === 'entrada' ? '+' : '-'}{m.cantidad}
                </span>
              ),
            },
            {
              key: "motivo",
              header: "Motivo",
              className: "text-sm text-gray-600",
            },
          ]}
          className="overflow-hidden"
          tableClassName="border-collapse"
          headerClassName="bg-gray-50"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          emptyMessage="No hay movimientos registrados"
        />
      </div>

      {/* Modal de Movimiento */}
      {mostrarFormulario && productoSeleccionado && (
        <FormularioMovimiento
          producto={productoSeleccionado}
          onSubmit={handleSubmitMovimiento}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}