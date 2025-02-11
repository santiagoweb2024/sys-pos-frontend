"use client";

import { ResumenCaja } from "@/interfaces/caja.interface";
import { X } from "lucide-react";
import { useState } from "react";

interface FormularioCierreProps {
  resumen: ResumenCaja;
  onSubmit: (cierre: { montoFinal: { efectivo: number; tarjeta: number; transferencia: number; }; observaciones?: string; }) => void;
  onClose: () => void;
}

export default function FormularioCierre({ resumen, onSubmit, onClose }: FormularioCierreProps) {
  const [formData, setFormData] = useState({
    efectivo: resumen.saldoActual.efectivo.toString(),
    tarjeta: resumen.saldoActual.tarjeta.toString(),
    transferencia: resumen.saldoActual.transferencia.toString(),
    observaciones: ""
  });

  const calcularDiferencia = () => {
    const efectivoContado = Number(formData.efectivo);
    const efectivoSistema = resumen.saldoActual.efectivo;
    return efectivoContado - efectivoSistema;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      montoFinal: {
        efectivo: Number(formData.efectivo),
        tarjeta: Number(formData.tarjeta),
        transferencia: Number(formData.transferencia)
      },
      observaciones: formData.observaciones || undefined
    });
  };

  const diferencia = calcularDiferencia();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Cierre de Caja
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Resumen del día */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Resumen del Día</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Ventas Totales</div>
                <div className="text-lg font-medium">${resumen.ventas.total.toFixed(2)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Cantidad de Ventas</div>
                <div className="text-lg font-medium">{resumen.ventas.cantidad}</div>
              </div>
            </div>
          </div>

          {/* Montos según sistema */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Montos según Sistema</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-700">Efectivo</div>
                <div className="text-lg font-medium">${resumen.saldoActual.efectivo.toFixed(2)}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-700">Tarjeta</div>
                <div className="text-lg font-medium">${resumen.saldoActual.tarjeta.toFixed(2)}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-purple-700">Transferencia</div>
                <div className="text-lg font-medium">${resumen.saldoActual.transferencia.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Montos contados */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Montos Contados</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Efectivo
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.efectivo}
                  onChange={(e) => setFormData({ ...formData, efectivo: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-xs p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tarjeta
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.tarjeta}
                  onChange={(e) => setFormData({ ...formData, tarjeta: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-xs p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transferencia
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.transferencia}
                  onChange={(e) => setFormData({ ...formData, transferencia: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-xs p-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Diferencia */}
          {diferencia !== 0 && (
            <div className="mb-6">
              <div className={`p-3 rounded-lg ${
                diferencia > 0 
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}>
                <div className="text-sm font-medium">
                  {diferencia > 0 ? "Sobrante" : "Faltante"} en Efectivo
                </div>
                <div className="text-lg font-medium">
                  ${Math.abs(diferencia).toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Observaciones */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-xs p-2"
              rows={3}
              placeholder="Ingrese cualquier observación relevante..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Confirmar Cierre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
