import { DollarSign } from "lucide-react";
import { Producto } from "@/interfaces/producto.interface";

interface CarritoVentaProps {
  carrito: Array<{producto: Producto, cantidad: number}>;
}

export default function CarritoVenta({ carrito }: CarritoVentaProps) {
  return (
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
          {carrito.map((item, index) => (
            <div key={index} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.producto.imagen}
                  alt={item.producto.nombre}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{item.producto.nombre}</h3>
                  <p className="text-sm text-gray-500">${item.producto.precio} x {item.cantidad}</p>
                </div>
              </div>
              <span className="font-medium text-gray-900">
                ${(item.producto.precio * item.cantidad).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
