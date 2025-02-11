import { DollarSign, Plus, Minus, Trash2 } from "lucide-react";
import { Producto } from "@/interfaces/producto.interface";

interface CarritoVentaProps {
  carrito: Array<{producto: Producto, cantidad: number}>;
  onRemoverProducto: (productoId: string) => void;
  onActualizarCantidad: (productoId: string, nuevaCantidad: number) => void;
}

interface ItemCarritoProps {
  producto: Producto;
  cantidad: number;
  onRemover: () => void;
  onActualizarCantidad: (nuevaCantidad: number) => void;
}

const ItemCarrito = ({ producto, cantidad, onRemover, onActualizarCantidad }: ItemCarritoProps) => (
  <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-12 h-12 object-cover rounded-lg"
      />
      <div>
        <h3 className="font-medium text-gray-900">{producto.nombre}</h3>
        <p className="text-sm text-gray-500">${producto.precio.toFixed(2)} x {cantidad}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg">
        <button
          className="p-1 text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors"
          onClick={() => onActualizarCantidad(cantidad - 1)}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{cantidad}</span>
        <button
          className="p-1 text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
          onClick={() => onActualizarCantidad(cantidad + 1)}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onRemover}
        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Eliminar producto"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <span className="font-medium text-gray-900 min-w-[80px] text-right">
        ${(producto.precio * cantidad).toFixed(2)}
      </span>
    </div>
  </div>
);

export default function CarritoVenta({ carrito, onRemoverProducto, onActualizarCantidad }: CarritoVentaProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-xs mb-4">
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
            <ItemCarrito
              key={index}
              producto={item.producto}
              cantidad={item.cantidad}
              onRemover={() => onRemoverProducto(item.producto.id)}
              onActualizarCantidad={(nuevaCantidad) => 
                onActualizarCantidad(item.producto.id, nuevaCantidad)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
