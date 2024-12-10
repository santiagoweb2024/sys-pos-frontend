"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ModalCobroProps {
  total: number;
  onClose: () => void;
  onConfirm: (metodoPago: string, montoRecibido: number) => void;
}

export default function ModalCobro({ total, onClose, onConfirm }: ModalCobroProps) {
  const [metodoPago, setMetodoPago] = useState<string>("efectivo");
  const [montoRecibido, setMontoRecibido] = useState<string>(total.toString());
  const [error, setError] = useState<string>("");

  const cambio = Number(montoRecibido) - total;

  const handleConfirmar = () => {
    if (metodoPago === "efectivo" && Number(montoRecibido) < total) {
      setError("El monto recibido debe ser mayor o igual al total");
      return;
    }
    onConfirm(metodoPago, Number(montoRecibido));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Cobrar Venta</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Total */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total a Cobrar
            </label>
            <div className="text-3xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </div>
          </div>

          {/* Método de Pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`p-2 rounded-lg border text-sm font-medium transition-colors
                  ${metodoPago === "efectivo"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => setMetodoPago("efectivo")}
              >
                Efectivo
              </button>
              <button
                className={`p-2 rounded-lg border text-sm font-medium transition-colors
                  ${metodoPago === "tarjeta"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => setMetodoPago("tarjeta")}
              >
                Tarjeta
              </button>
              <button
                className={`p-2 rounded-lg border text-sm font-medium transition-colors
                  ${metodoPago === "transferencia"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => setMetodoPago("transferencia")}
              >
                Transferencia
              </button>
            </div>
          </div>

          {/* Monto Recibido (solo para efectivo) */}
          {metodoPago === "efectivo" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto Recibido
              </label>
              <input
                type="number"
                value={montoRecibido}
                onChange={(e) => {
                  setMontoRecibido(e.target.value);
                  setError("");
                }}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
          )}

          {/* Cambio (solo para efectivo) */}
          {metodoPago === "efectivo" && Number(montoRecibido) >= total && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cambio
              </label>
              <div className="text-2xl font-bold text-green-600">
                ${cambio.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
}
