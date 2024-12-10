/* eslint-disable @next/next/no-img-element */
import { ElementType, ReactNode } from "react";

interface ProductCardProps {
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    stock: number;
  };
  as?: ElementType;
  onClick?: () => void;
  renderActions?: () => ReactNode;
}
export default function ProductCard({
  producto,
  as = "div",
  onClick,
  renderActions,
}: ProductCardProps) {
  const Element = as;
  return (
    <Element
      onClick={onClick}
      className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border  border-gray-20`}
    >
      <div className="relative flex-1">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-32 object-contain mb-2"
        />
        {producto.stock < 5 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            ¡Último!
          </span>
        )}
      </div>

      <div className="text-left">
        <h3 className="font-medium text-gray-800 truncate">
          {producto.nombre}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-600 font-bold">
            ${producto.precio.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">Stock: {producto.stock}</span>
        </div>
      </div>

      {renderActions && <div className="mt-3">{renderActions()}</div>}
    </Element>
  );
}
