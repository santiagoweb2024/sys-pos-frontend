interface BotonesAccionProps {
  onCobrar: () => void;
  onPausar: () => void;
  onCancelar: () => void;
  onDescuento: () => void;
  onNotas: () => void;
}

export default function BotonesAccion({
  onCobrar,
  onPausar,
  onCancelar,
  onDescuento,
  onNotas
}: BotonesAccionProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <button
          onClick={onCobrar}
          className="flex items-center justify-center p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span className="font-medium text-sm">Cobrar</span>
        </button>
        <button
          onClick={onPausar}
          className="flex items-center justify-center p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span className="font-medium text-sm">Pausar</span>
        </button>
        <button
          onClick={onCancelar}
          className="flex items-center justify-center p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <span className="font-medium text-sm">Cancelar</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onDescuento}
          className="flex items-center justify-center p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <span>Descuento</span>
        </button>
        <button
          onClick={onNotas}
          className="flex items-center justify-center p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <span>Notas</span>
        </button>
      </div>
    </>
  );
}
