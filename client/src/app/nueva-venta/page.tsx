/* eslint-disable @next/next/no-img-element */
"use client";

import SearchBar from "@/components/searchBar/searchBar";
import ProductosFrequentes from "./(components)/productosFrecuentes";
import CarritoVenta from "./(components)/CarritoVenta";
import ResumenVenta from "./(components)/ResumenVenta";
import BotonesAccion from "./(components)/BotonesAccion";
import ModalCobro from "./(components)/ModalCobro";
import { useState, useMemo } from "react";
import { Producto } from "@/interfaces/producto.interface";
import { useRouter } from "next/navigation";

export default function NuevaVenta() {
  const router = useRouter();
  const [carrito, setCarrito] = useState<Array<{producto: Producto, cantidad: number}>>([]);
  const [showModalCobro, setShowModalCobro] = useState(false);
  
  const { subtotal, iva, total } = useMemo(() => {
    const subtotal = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    return { subtotal, iva, total };
  }, [carrito]);

  const handleAgregarProducto = (producto: Producto, cantidad: number) => {
    setCarrito(prevCarrito => {
      // Buscar si el producto ya está en el carrito
      const index = prevCarrito.findIndex(item => item.producto.id === producto.id);
      
      if (index >= 0) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        const newCarrito = [...prevCarrito];
        newCarrito[index] = {
          ...newCarrito[index],
          cantidad: newCarrito[index].cantidad + cantidad
        };
        return newCarrito;
      } else {
        // Si el producto no está en el carrito, agregarlo
        return [...prevCarrito, { producto, cantidad }];
      }
    });
  };

  const handleRemoverProducto = (productoId: string) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.producto.id !== productoId));
  };

  const handleActualizarCantidad = (productoId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      handleRemoverProducto(productoId);
      return;
    }

    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.producto.id === productoId 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const handleCobrar = () => {
    if (carrito.length === 0) {
      alert("Agregue productos al carrito antes de cobrar");
      return;
    }
    setShowModalCobro(true);
  };

  const handleConfirmarPago = async (metodoPago: string, montoRecibido: number) => {
    try {
      // Aquí iría la llamada al API para registrar la venta
      const venta = {
        productos: carrito,
        subtotal,
        iva,
        total,
        metodoPago,
        montoRecibido,
        cambio: metodoPago === "efectivo" ? montoRecibido - total : 0,
        fecha: new Date(),
      };
      
      console.log("Venta registrada:", venta);
      
      // Limpiar carrito y cerrar modal
      setCarrito([]);
      setShowModalCobro(false);
      
      // Redirigir a la página de facturas
      router.push("/facturas");
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Error al procesar la venta. Por favor intente nuevamente.");
    }
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
        <ProductosFrequentes onAgregarProducto={handleAgregarProducto} />
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

          <CarritoVenta 
            carrito={carrito} 
            onRemoverProducto={handleRemoverProducto}
            onActualizarCantidad={handleActualizarCantidad}
          />
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

      {/* Modal de Cobro */}
      {showModalCobro && (
        <ModalCobro
          total={total}
          onClose={() => setShowModalCobro(false)}
          onConfirm={handleConfirmarPago}
        />
      )}
    </section>
  );
}
