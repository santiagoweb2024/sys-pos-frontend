"use client";

import { useState } from "react";
import { Calendar, ArrowUpDown, FileText, Download } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";
import { HistorialCaja } from "@/interfaces/historial.interface";
import { HISTORIAL_MOCK } from "@/mocks/historial.mock";
import DetalleHistorial from "./(components)/DetalleHistorial";

export default function Historial() {
  const [historial] = useState<HistorialCaja[]>(HISTORIAL_MOCK);
  const [historialSeleccionado, setHistorialSeleccionado] = useState<HistorialCaja | null>(null);
  const [filtroFecha, setFiltroFecha] = useState<'hoy' | 'semana' | 'mes' | 'todo'>('todo');

  const columns = [
    {
      key: "fecha",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Fecha
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (historial: HistorialCaja) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            {historial.fecha.toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {historial.apertura.fecha.toLocaleTimeString()} - {historial.cierre.fecha.toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: "usuario",
      header: "Usuario",
      render: (historial: HistorialCaja) => (
        <div className="space-y-1">
          <div className="font-medium">{historial.usuario}</div>
          <div className="text-xs text-gray-500">
            Apertura: {historial.apertura.usuario}
            {historial.apertura.usuario !== historial.cierre.usuario && (
              <> | Cierre: {historial.cierre.usuario}</>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "ventas",
      header: "Ventas",
      render: (historial: HistorialCaja) => (
        <div className="space-y-1">
          <div className="font-medium text-green-600">
            ${historial.resumen.ventas.total.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            {historial.resumen.ventas.cantidad} ventas
          </div>
        </div>
      ),
    },
    {
      key: "ingresos",
      header: "Ingresos",
      render: (historial: HistorialCaja) => (
        <div>
          <div className="font-medium text-green-600">
            ${historial.resumen.ingresos.total.toFixed(2)}
          </div>
          <div className="grid grid-cols-3 gap-1 text-xs text-gray-500">
            <div>E: ${historial.resumen.ingresos.efectivo.toFixed(2)}</div>
            <div>T: ${historial.resumen.ingresos.tarjeta.toFixed(2)}</div>
            <div>TR: ${historial.resumen.ingresos.transferencia.toFixed(2)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "egresos",
      header: "Egresos",
      render: (historial: HistorialCaja) => (
        <div>
          <div className="font-medium text-red-600">
            ${historial.resumen.egresos.total.toFixed(2)}
          </div>
          <div className="grid grid-cols-3 gap-1 text-xs text-gray-500">
            <div>E: ${historial.resumen.egresos.efectivo.toFixed(2)}</div>
            <div>T: ${historial.resumen.egresos.tarjeta.toFixed(2)}</div>
            <div>TR: ${historial.resumen.egresos.transferencia.toFixed(2)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "diferencia",
      header: "Diferencia",
      render: (historial: HistorialCaja) => (
        <div>
          <div className={`font-medium ${
            historial.resumen.diferencia === 0
              ? "text-gray-900"
              : historial.resumen.diferencia > 0
                ? "text-green-600"
                : "text-red-600"
          }`}>
            ${Math.abs(historial.resumen.diferencia).toFixed(2)}
          </div>
          {historial.resumen.diferencia !== 0 && (
            <div className="text-xs text-gray-500">
              {historial.resumen.diferencia > 0 ? "Sobrante" : "Faltante"}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "acciones",
      header: "",
      render: (historial: HistorialCaja) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setHistorialSeleccionado(historial)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Ver detalle"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => console.log('Descargar reporte:', historial.id)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Descargar reporte"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Historial de Cajas
          </h1>
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          <select
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value as typeof filtroFecha)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hoy">Hoy</option>
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mes</option>
            <option value="todo">Todo</option>
          </select>

          <button
            onClick={() => console.log('Descargar reporte general')}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar Reporte
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-700">Total Ventas</div>
          <div className="text-2xl font-semibold text-blue-900">
            ${historial.reduce((sum, h) => sum + h.resumen.ventas.total, 0).toFixed(2)}
          </div>
          <div className="text-sm text-blue-600">
            {historial.reduce((sum, h) => sum + h.resumen.ventas.cantidad, 0)} ventas
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-green-700">Total Ingresos</div>
          <div className="text-2xl font-semibold text-green-900">
            ${historial.reduce((sum, h) => sum + h.resumen.ingresos.total, 0).toFixed(2)}
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-green-600">
            <div>Efectivo: ${historial.reduce((sum, h) => sum + h.resumen.ingresos.efectivo, 0).toFixed(2)}</div>
            <div>Tarjeta: ${historial.reduce((sum, h) => sum + h.resumen.ingresos.tarjeta, 0).toFixed(2)}</div>
            <div>Transfer.: ${historial.reduce((sum, h) => sum + h.resumen.ingresos.transferencia, 0).toFixed(2)}</div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-red-700">Total Egresos</div>
          <div className="text-2xl font-semibold text-red-900">
            ${historial.reduce((sum, h) => sum + h.resumen.egresos.total, 0).toFixed(2)}
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-red-600">
            <div>Efectivo: ${historial.reduce((sum, h) => sum + h.resumen.egresos.efectivo, 0).toFixed(2)}</div>
            <div>Tarjeta: ${historial.reduce((sum, h) => sum + h.resumen.egresos.tarjeta, 0).toFixed(2)}</div>
            <div>Transfer.: ${historial.reduce((sum, h) => sum + h.resumen.egresos.transferencia, 0).toFixed(2)}</div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-purple-700">Diferencias</div>
          <div className="text-2xl font-semibold text-purple-900">
            ${Math.abs(historial.reduce((sum, h) => sum + h.resumen.diferencia, 0)).toFixed(2)}
          </div>
          <div className="text-sm text-purple-600">
            {historial.filter(h => h.resumen.diferencia !== 0).length} cajas con diferencias
          </div>
        </div>
      </div>

      {/* Tabla de Historial */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <DataTable
          data={historial}
          columns={columns}
          className="overflow-hidden"
          tableClassName="border-collapse"
          headerClassName="bg-gray-50"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          emptyMessage="No hay registros en el historial"
        />
      </div>

      {/* Modal de Detalle */}
      {historialSeleccionado && (
        <DetalleHistorial
          historial={historialSeleccionado}
          onClose={() => setHistorialSeleccionado(null)}
        />
      )}
    </div>
  );
}
