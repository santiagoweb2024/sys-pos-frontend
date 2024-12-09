"use client";

import { HistorialCaja } from "@/interfaces/historial.interface";
import { MovimientoCaja } from "@/interfaces/caja.interface";
import { X, ArrowUpDown } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";

interface DetalleHistorialProps {
  historial: HistorialCaja;
  onClose: () => void;
}

export default function DetalleHistorial({ historial, onClose }: DetalleHistorialProps) {
  const columns = [
    {
      key: "fecha",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Hora
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (movimiento: MovimientoCaja) => (
        <div className="text-sm">
          {movimiento.fecha.toLocaleTimeString()}
        </div>
      ),
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (movimiento: MovimientoCaja) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${movimiento.tipo === 'ingreso'
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
          }`}
        >
          {movimiento.tipo.charAt(0).toUpperCase() + movimiento.tipo.slice(1)}
        </span>
      ),
    },
    {
      key: "concepto",
      header: "Concepto",
      render: (movimiento: MovimientoCaja) => (
        <div>
          <div className="font-medium">{movimiento.concepto}</div>
          {movimiento.comprobante && (
            <div className="text-xs text-gray-500">
              Comprobante: {movimiento.comprobante}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "metodoPago",
      header: "Método",
      render: (movimiento: MovimientoCaja) => (
        <span className="capitalize">{movimiento.metodoPago}</span>
      ),
    },
    {
      key: "monto",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Monto
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (movimiento: MovimientoCaja) => (
        <span className={`font-medium
          ${movimiento.tipo === 'ingreso'
            ? "text-green-600"
            : "text-red-600"
          }`}
        >
          {movimiento.tipo === 'ingreso' ? '+' : '-'}${movimiento.monto.toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Detalle de Caja - {historial.fecha.toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          {/* Información General */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Apertura</h3>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-blue-700">Hora</div>
                    <div className="font-medium">
                      {historial.apertura.fecha.toLocaleTimeString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">Monto Inicial</div>
                    <div className="font-medium">
                      ${historial.apertura.montoInicial.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-blue-700">Usuario</div>
                    <div className="font-medium">{historial.apertura.usuario}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Cierre</h3>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-blue-700">Hora</div>
                    <div className="font-medium">
                      {historial.cierre.fecha.toLocaleTimeString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">Diferencia</div>
                    <div className={`font-medium ${
                      historial.cierre.diferencia === 0
                        ? "text-gray-900"
                        : historial.cierre.diferencia > 0
                          ? "text-green-600"
                          : "text-red-600"
                    }`}>
                      ${Math.abs(historial.cierre.diferencia).toFixed(2)}
                      {historial.cierre.diferencia !== 0 && (
                        <span className="text-xs ml-1">
                          ({historial.cierre.diferencia > 0 ? "sobrante" : "faltante"})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-blue-700">Usuario</div>
                    <div className="font-medium">{historial.cierre.usuario}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Resumen del Día</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-700">Ventas</div>
                <div className="text-lg font-medium text-gray-900">
                  ${historial.resumen.ventas.total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {historial.resumen.ventas.cantidad} ventas
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-700">Ingresos</div>
                <div className="text-lg font-medium text-green-900">
                  ${historial.resumen.ingresos.total.toFixed(2)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-green-600">
                  <div>Efectivo: ${historial.resumen.ingresos.efectivo.toFixed(2)}</div>
                  <div>Tarjeta: ${historial.resumen.ingresos.tarjeta.toFixed(2)}</div>
                  <div>Transfer.: ${historial.resumen.ingresos.transferencia.toFixed(2)}</div>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-sm text-red-700">Egresos</div>
                <div className="text-lg font-medium text-red-900">
                  ${historial.resumen.egresos.total.toFixed(2)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-red-600">
                  <div>Efectivo: ${historial.resumen.egresos.efectivo.toFixed(2)}</div>
                  <div>Tarjeta: ${historial.resumen.egresos.tarjeta.toFixed(2)}</div>
                  <div>Transfer.: ${historial.resumen.egresos.transferencia.toFixed(2)}</div>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-700">Montos Finales</div>
                <div className="text-lg font-medium text-blue-900">
                  ${(historial.cierre.montoFinal.efectivo + 
                     historial.cierre.montoFinal.tarjeta + 
                     historial.cierre.montoFinal.transferencia).toFixed(2)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-blue-600">
                  <div>Efectivo: ${historial.cierre.montoFinal.efectivo.toFixed(2)}</div>
                  <div>Tarjeta: ${historial.cierre.montoFinal.tarjeta.toFixed(2)}</div>
                  <div>Transfer.: ${historial.cierre.montoFinal.transferencia.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Movimientos */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Movimientos</h3>
            <DataTable
              data={historial.movimientos}
              columns={columns}
              className="overflow-hidden"
              tableClassName="border-collapse"
              headerClassName="bg-gray-50"
              rowClassName="border-b hover:bg-gray-50 transition-colors"
              emptyMessage="No hay movimientos registrados"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
