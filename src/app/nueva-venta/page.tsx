/* eslint-disable @next/next/no-img-element */
"use client";

import SearchBar from "@/components/searchBar/searchBar";
import ProductosFrequentes from "./(components)/productosFrecuentes";
import { useState } from "react";
import {
  DollarSign,
} from "lucide-react";

export default function NuevaVenta() {
  const [carrito, setCarrito] = useState<Array<{producto: Producto, cantidad: number}>>([]);
  
  return (
    <section className="flex min-h-[calc(100vh-60px-8px)] max-h-[calc(100vh-60px-8px)]">
      {/* seccion de productos frecuentes */}
      <div className="flex-1 p-4">
        <SearchBar className="mb-2" placeholder="Buscar producto" />
        <ProductosFrequentes />
      </div>
      {/* seccion de punto de venta*/}
      <div className="w-[40%] flex flex-col bg-white shadow-lg">
        <div className="flex-1 flex flex-col p-4 bg-gradient-to-br from-gray-50/50 to-white">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-blue-600">Terminal #01</span>
              <h2 className="text-xl font-semibold text-gray-900">Nueva Venta</h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
              <span className="text-sm font-medium text-gray-900">#0001</span>
            </div>
          </div>

          {/* Lista de productos - ajustado el max-height */}
          <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-sm mb-4">
            {carrito.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <DollarSign className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-500 font-medium text-sm">Sin productos</p>
                <p className="text-xs text-gray-400">Agregue productos para iniciar</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {/* Aquí irán los productos */}
              </div>
            )}
          </div>

          {/* Totales */}
          <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100 mb-4">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>IVA (16%)</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800">Total</span>
              <span className="text-xl font-bold text-blue-600">$0.00</span>
            </div>
          </div>

          {/* Botones de acción principales */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <button className="flex items-center justify-center p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <span className="font-medium text-sm">Cobrar</span>
            </button>
            <button className="flex items-center justify-center p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <span className="font-medium text-sm">Pausar</span>
            </button>
            <button className="flex items-center justify-center p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
              <span className="font-medium text-sm">Cancelar</span>
            </button>
          </div>

          {/* Acciones secundarias */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <span>Descuento</span>
            </button>
            <button className="flex items-center justify-center p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <span>Notas</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
