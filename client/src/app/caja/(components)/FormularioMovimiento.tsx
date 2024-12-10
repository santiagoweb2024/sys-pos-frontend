"use client";

import { MovimientoCaja } from "@/interfaces/caja.interface";
import { X } from "lucide-react";
import { useState } from "react";

interface FormularioMovimientoProps {
  onSubmit: (movimiento: Omit<MovimientoCaja, 'id' | 'fecha' | 'usuario'>) => void;
  onClose: () => void;
}

export default function FormularioMovimiento({ onSubmit, onClose }: FormularioMovimientoProps) {
  const [formData, setFormData] = useState({
    tipo: 'ingreso',
    monto: '',
    concepto: '',
    metodoPago: 'efectivo',
    comprobante: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      tipo: formData.tipo as 'ingreso' | 'egreso',
      monto: Number(formData.monto),
      concepto: formData.concepto,
      metodoPago: formData.metodoPago as 'efectivo' | 'tarjeta' | 'transferencia',
      comprobante: formData.comprobante || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Nuevo Movimiento de Caja
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Movimiento
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.monto}
              onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Concepto
            </label>
            <input
              type="text"
              value={formData.concepto}
              onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de Pago
            </label>
            <select
              value={formData.metodoPago}
              onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comprobante (opcional)
            </label>
            <input
              type="text"
              value={formData.comprobante}
              onChange={(e) => setFormData({ ...formData, comprobante: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Número de comprobante"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
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
              Guardar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
