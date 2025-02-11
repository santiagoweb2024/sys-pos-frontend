// Datos de mockup
const mockVentas = [
  { id: '001', cliente: 'Juan Pérez', total: '$150.00', estado: 'Completado' },
  { id: '002', cliente: 'María García', total: '$85.50', estado: 'Pendiente' },
  { id: '003', cliente: 'Carlos López', total: '$200.00', estado: 'Completado' },
  { id: '004', cliente: 'Ana Martínez', total: '$45.00', estado: 'Completado' },
];

const mockProductosPopulares = [
  { nombre: 'Hamburguesa Clásica', cantidad: 45, porcentaje: 25 },
  { nombre: 'Pizza Familiar', cantidad: 38, porcentaje: 20 },
  { nombre: 'Refresco 500ml', cantidad: 30, porcentaje: 15 },
  { nombre: 'Papas Fritas', cantidad: 25, porcentaje: 12 },
];

// Datos de mockup adicionales
const mockInventarioBajo = [
  { producto: 'Coca Cola 500ml', stock: 5, minimo: 10 },
  { producto: 'Pan de Hamburguesa', stock: 8, minimo: 15 },
  { producto: 'Queso Cheddar', stock: 3, minimo: 8 },
];

const mockVentasPorHora = [
  { hora: '10:00', ventas: 12 },
  { hora: '11:00', ventas: 18 },
  { hora: '12:00', ventas: 25 },
  { hora: '13:00', ventas: 30 },
  { hora: '14:00', ventas: 22 },
];

const mockMetodosPago = [
  { metodo: 'Efectivo', cantidad: 45, total: '$850.00' },
  { metodo: 'Tarjeta', cantidad: 32, total: '$1,250.00' },
  { metodo: 'Transferencia', cantidad: 12, total: '$450.00' },
];

export default function Dashboard() {
  return (
    <div className="px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Ventas de Hoy</h3>
          <p className="text-2xl font-bold">$1,234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Productos Vendidos</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Clientes Atendidos</h3>
          <p className="text-2xl font-bold">28</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Productos Bajos en Stock</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Últimas ventas */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Últimas Ventas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Cliente</th>
                  <th className="text-left p-2">Total</th>
                  <th className="text-left p-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockVentas.map((venta) => (
                  <tr key={venta.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{venta.id}</td>
                    <td className="p-2">{venta.cliente}</td>
                    <td className="p-2">{venta.total}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        venta.estado === 'Completado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {venta.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Productos Más Vendidos</h2>
          <div className="space-y-4">
            {mockProductosPopulares.map((producto) => (
              <div key={producto.nombre} className="flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{producto.nombre}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${producto.porcentaje}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-gray-500">{producto.cantidad} uds.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nuevas secciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Alertas de Inventario */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Alertas de Inventario Bajo
          </h2>
          <div className="space-y-3">
            {mockInventarioBajo.map((item) => (
              <div key={item.producto} className="flex items-center justify-between p-2 bg-red-50 rounded-sm">
                <div>
                  <h3 className="font-medium">{item.producto}</h3>
                  <p className="text-sm text-red-600">
                    Stock: {item.stock}/{item.minimo}
                  </p>
                </div>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  Ordenar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ventas por Hora */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Ventas por Hora</h2>
          <div className="space-y-3">
            {mockVentasPorHora.map((hora) => (
              <div key={hora.hora} className="flex items-center">
                <span className="w-16">{hora.hora}</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(hora.ventas/30)*100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-gray-600">{hora.ventas}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Métodos de Pago</h2>
          <div className="divide-y">
            {mockMetodosPago.map((metodo) => (
              <div key={metodo.metodo} className="py-3 flex justify-between">
                <div>
                  <h3 className="font-medium">{metodo.metodo}</h3>
                  <p className="text-sm text-gray-500">{metodo.cantidad} transacciones</p>
                </div>
                <span className="font-bold text-green-600">{metodo.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}