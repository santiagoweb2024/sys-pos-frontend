interface ResumenVentaProps {
  subtotal: number;
  iva: number;
  total: number;
}

export default function ResumenVenta({ subtotal, iva, total }: ResumenVentaProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100 mb-4">
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600 text-sm">
        <span>IVA (16%)</span>
        <span className="font-medium">${iva.toFixed(2)}</span>
      </div>
      <div className="h-px bg-gray-200"></div>
      <div className="flex justify-between items-center">
        <span className="text-gray-800">Total</span>
        <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
