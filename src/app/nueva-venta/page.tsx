/* eslint-disable @next/next/no-img-element */
"use client";

import SearchBar from "@/components/searchBar/searchBar";
import ProductosFrequentes from "./(components)/productosFrecuentes";
import CarritoVenta from "./(components)/CarritoVenta";
import ResumenVenta from "./(components)/ResumenVenta";
import BotonesAccion from "./(components)/BotonesAccion";
import { useState, useMemo } from "react";
import { Producto } from "@/interfaces/producto.interface";

export default function NuevaVenta() {
  const [carrito, setCarrito] = useState<Array<{producto: Producto, cantidad: number}>>([]);
  
  const { subtotal, iva, total } = useMemo(() => {
    const subtotal = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    return { subtotal, iva, total };
  }, [carrito]);

  const handleCobrar = () => {
    // Implementar lógica de cobro
  };

  const handlePausar = () => {
    // Implementar lógica de pausar venta
  };

  const handleCancelar = () => {
    setCarrito([]);
  };

  const handleDescuento = () => {
    // Implementar lógica de descuento
  };

  const handleNotas = () => {
    // Implementar lógica de notas
  };
  
  return (
    <section className="flex min-h-[calc(100vh-60px-8px)] max-h-[calc(100vh-60px-8px)]">
      {/* sección de productos frecuentes */}
      <div className="flex-1 p-4">
        <SearchBar className="mb-2" placeholder="Buscar producto" />
        <ProductosFrequentes />
      </div>

      {/* sección de punto de venta*/}
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

          <CarritoVenta carrito={carrito} />
          <ResumenVenta subtotal={subtotal} iva={iva} total={total} />
          <BotonesAccion
            onCobrar={handleCobrar}
            onPausar={handlePausar}
            onCancelar={handleCancelar}
            onDescuento={handleDescuento}
            onNotas={handleNotas}
          />
        </div>
      </div>
    </section>
  );
}
