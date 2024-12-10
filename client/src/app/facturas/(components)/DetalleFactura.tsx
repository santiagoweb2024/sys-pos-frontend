"use client";

import { Factura } from "@/interfaces/factura.interface";
import { X, Printer, Download } from "lucide-react";

interface DetalleFacturaProps {
  factura: Factura;
  onClose: () => void;
}

export default function DetalleFactura({ factura, onClose }: DetalleFacturaProps) {
  const handleImprimir = () => {
    // Aquí iría la lógica de impresión
    console.log('Imprimiendo factura:', factura.numero);
  };

  const handleDescargar = () => {
    // Aquí iría la lógica de descarga
    console.log('Descargando factura:', factura.numero);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Factura {factura.numero}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleImprimir}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Imprimir factura"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={handleDescargar}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Descargar factura"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Información General */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Información de Cliente
              </h3>
              <div className="space-y-1">
                <p className="text-sm font-medium">{factura.cliente.nombre}</p>
                <p className="text-sm text-gray-600">Doc: {factura.cliente.documento}</p>
                <p className="text-sm text-gray-600">{factura.cliente.direccion}</p>
                <p className="text-sm text-gray-600">{factura.cliente.telefono}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Detalles de Factura
              </h3>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-gray-600">Fecha:</span>{" "}
                  {factura.fecha.toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Vendedor:</span>{" "}
                  {factura.vendedor}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Método de Pago:</span>{" "}
                  <span className="capitalize">{factura.metodoPago}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Estado:</span>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${factura.estado === 'pagada'
                      ? "bg-green-50 text-green-700"
                      : factura.estado === 'pendiente'
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Tabla de Productos */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Productos
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Precio Unit.
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {factura.detalles.map((detalle) => (
                    <tr key={detalle.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {detalle.producto.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {detalle.cantidad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${detalle.precioUnitario.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${detalle.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totales */}
          <div className="border-t pt-4">
            <div className="w-64 ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${factura.subtotal.toFixed(2)}</span>
              </div>
              {factura.descuento > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento:</span>
                  <span className="font-medium text-red-600">
                    -${factura.descuento.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Impuestos:</span>
                <span className="font-medium">${factura.impuestos.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium border-t pt-2">
                <span>Total:</span>
                <span>${factura.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {factura.notas && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Notas
              </h3>
              <p className="text-sm text-gray-600">
                {factura.notas}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
