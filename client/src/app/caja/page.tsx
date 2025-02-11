"use client";

import { useState } from "react";
import { ArrowUpDown, DollarSign, PlusCircle, MinusCircle, FileText, AlertTriangle, X } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";
import FormularioMovimiento from "./(components)/FormularioMovimiento";
import FormularioCierre from "./(components)/FormularioCierre";
import { MovimientoCaja, ResumenCaja } from "@/interfaces/caja.interface";
import { MOVIMIENTOS_MOCK, RESUMEN_CAJA_MOCK } from "@/mocks/caja.mock";

export default function Caja() {
  const [resumen, setResumen] = useState<ResumenCaja>(RESUMEN_CAJA_MOCK);
  const [movimientos] = useState<MovimientoCaja[]>(MOVIMIENTOS_MOCK);
  const [mostrarFormularioMovimiento, setMostrarFormularioMovimiento] = useState(false);
  const [mostrarFormularioCierre, setMostrarFormularioCierre] = useState(false);

  const handleAperturaCaja = () => {
    // Aquí iría la lógica de apertura de caja
    console.log('Abriendo caja...');
  };

  const handleNuevoMovimiento = (movimiento: Omit<MovimientoCaja, 'id' | 'fecha' | 'usuario'>) => {
    // Aquí iría la lógica para guardar el movimiento
    console.log('Nuevo movimiento:', movimiento);
    setMostrarFormularioMovimiento(false);
  };

  const handleCierreCaja = (cierre: { montoFinal: { efectivo: number; tarjeta: number; transferencia: number; }; observaciones?: string; }) => {
    // Aquí iría la lógica de cierre de caja
    console.log('Cerrando caja:', cierre);
    setMostrarFormularioCierre(false);
  };

  const columns = [
    {
      key: "fecha",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Fecha
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (movimiento: MovimientoCaja) => (
        <div className="space-y-1">
          <div className="text-sm">{movimiento.fecha.toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{movimiento.fecha.toLocaleTimeString()}</div>
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
    <div className="p-6 space-y-6">
      {/* Estado de Caja */}
      <div className="bg-white rounded-lg shadow-xs border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Estado de Caja</h2>
          </div>
          {resumen.abierta ? (
            <button
              onClick={() => setMostrarFormularioCierre(true)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar Caja
            </button>
          ) : (
            <button
              onClick={handleAperturaCaja}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Abrir Caja
            </button>
          )}
        </div>

        {resumen.abierta && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-700">Efectivo</div>
                <div className="text-2xl font-semibold text-blue-900">
                  ${resumen.saldoActual.efectivo.toFixed(2)}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-green-700">Tarjeta</div>
                <div className="text-2xl font-semibold text-green-900">
                  ${resumen.saldoActual.tarjeta.toFixed(2)}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-purple-700">Transferencia</div>
                <div className="text-2xl font-semibold text-purple-900">
                  ${resumen.saldoActual.transferencia.toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-700">Total en Caja</div>
                <div className="text-2xl font-semibold text-gray-900">
                  ${resumen.saldoActual.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-700">Ventas del Día</div>
                <div className="mt-1">
                  <div className="text-2xl font-semibold text-gray-900">
                    ${resumen.ventas.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {resumen.ventas.cantidad} ventas realizadas
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-700">Apertura de Caja</div>
                <div className="mt-1">
                  <div className="text-2xl font-semibold text-blue-900">
                    ${resumen.apertura?.montoInicial.toFixed(2)}
                  </div>
                  <div className="text-sm text-blue-600">
                    {resumen.apertura?.fecha.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Movimientos */}
      {resumen.abierta && (
        <div className="bg-white rounded-lg shadow-xs border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Movimientos</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setMostrarFormularioMovimiento(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Ingreso
                </button>
                <button
                  onClick={() => setMostrarFormularioMovimiento(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <MinusCircle className="w-4 h-4" />
                  Egreso
                </button>
              </div>
            </div>
          </div>

          <DataTable
            data={movimientos}
            columns={columns}
            className="overflow-hidden"
            tableClassName="border-collapse"
            headerClassName="bg-gray-50"
            rowClassName="border-b hover:bg-gray-50 transition-colors"
            emptyMessage="No hay movimientos registrados"
          />
        </div>
      )}

      {/* Modal de Movimiento */}
      {mostrarFormularioMovimiento && (
        <FormularioMovimiento
          onSubmit={handleNuevoMovimiento}
          onClose={() => setMostrarFormularioMovimiento(false)}
        />
      )}

      {/* Modal de Cierre */}
      {mostrarFormularioCierre && (
        <FormularioCierre
          resumen={resumen}
          onSubmit={handleCierreCaja}
          onClose={() => setMostrarFormularioCierre(false)}
        />
      )}
    </div>
  );
}
