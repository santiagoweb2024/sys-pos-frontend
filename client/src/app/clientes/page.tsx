"use client";

import { useState } from "react";
import { Search, ArrowUpDown, UserPlus, FileText, UserCheck, DollarSign, Calendar, ShoppingBag } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";
import FormularioCliente from "./(components)/FormularioCliente";
import { Cliente, CompraCliente } from "@/interfaces/cliente.interface";
import { CLIENTES_MOCK, COMPRAS_MOCK } from "@/mocks/cliente.mock";

export default function Clientes() {
  const [clientes] = useState<Cliente[]>(CLIENTES_MOCK);
  const [compras] = useState<CompraCliente[]>(COMPRAS_MOCK);
  const [searchTerm, setSearchTerm] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente>();
  const [mostrarCompras, setMostrarCompras] = useState(false);
  const [comprasCliente, setComprasCliente] = useState<CompraCliente[]>([]);

  // Estadísticas
  const estadisticas = {
    totalClientes: clientes.length,
    clientesActivos: clientes.filter(c => c.estado === 'activo').length,
    comprasUltimaSemana: compras.filter(c => 
      new Date(c.fecha).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    ).length,
    ventasTotales: clientes.reduce((total, cliente) => total + cliente.totalCompras, 0)
  };

  const handleNuevoCliente = () => {
    setClienteSeleccionado(undefined);
    setMostrarFormulario(true);
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarFormulario(true);
  };

  const handleVerCompras = (cliente: Cliente) => {
    setComprasCliente(compras.filter(c => c.id === cliente.id));
    setMostrarCompras(true);
  };

  const handleSubmitCliente = (clienteData: Omit<Cliente, 'id' | 'fechaRegistro' | 'totalCompras' | 'ultimaCompra'>) => {
    // Aquí iría la lógica para guardar el cliente
    console.log('Guardando cliente:', clienteData);
    setMostrarFormulario(false);
  };

  const columns = [
    {
      key: "nombre",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Cliente
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (cliente: Cliente) => (
        <div>
          <div className="font-medium">{cliente.nombre}</div>
          <div className="text-xs text-gray-500">Doc: {cliente.documento}</div>
        </div>
      ),
    },
    {
      key: "contacto",
      header: "Contacto",
      render: (cliente: Cliente) => (
        <div className="space-y-1">
          <div className="text-sm">{cliente.telefono}</div>
          <div className="text-xs text-gray-500">{cliente.email}</div>
        </div>
      ),
    },
    {
      key: "compras",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Compras
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (cliente: Cliente) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">${cliente.totalCompras.toFixed(2)}</div>
          {cliente.ultimaCompra && (
            <div className="text-xs text-gray-500">
              Última: {cliente.ultimaCompra.toLocaleDateString()}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (cliente: Cliente) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${cliente.estado === 'activo' 
            ? "bg-green-50 text-green-700" 
            : "bg-gray-50 text-gray-700"
          }`}
        >
          {cliente.estado.charAt(0).toUpperCase() + cliente.estado.slice(1)}
        </span>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (cliente: Cliente) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditarCliente(cliente)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar cliente"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleVerCompras(cliente)}
            className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Ver compras"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-blue-600">
            <UserCheck className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Total Clientes</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.totalClientes}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-green-600">
            <UserCheck className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Clientes Activos</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.clientesActivos}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-orange-600">
            <Calendar className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Compras Última Semana</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.comprasUltimaSemana}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-green-600">
            <DollarSign className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Ventas Totales</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            ${estadisticas.ventasTotales.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-lg shadow-xs border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Clientes</h2>
            <button
              onClick={handleNuevoCliente}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Nuevo Cliente
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <DataTable
          data={clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.documento.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          columns={columns}
          className="overflow-hidden"
          tableClassName="border-collapse"
          headerClassName="bg-gray-50"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          emptyMessage="No hay clientes registrados"
        />
      </div>

      {/* Modal de Compras */}
      {mostrarCompras && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Historial de Compras
              </h2>
              <button
                onClick={() => setMostrarCompras(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <DataTable
                data={comprasCliente}
                columns={[
                  {
                    key: "fecha",
                    header: "Fecha",
                    render: (compra: CompraCliente) => compra.fecha.toLocaleDateString(),
                  },
                  {
                    key: "productos",
                    header: "Productos",
                    render: (compra: CompraCliente) => (
                      <div className="space-y-1">
                        {compra.productos.map((p, i) => (
                          <div key={i} className="text-sm">
                            {p.cantidad}x {p.nombre}
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    key: "total",
                    header: "Total",
                    render: (compra: CompraCliente) => (
                      <span className="font-medium">${compra.total.toFixed(2)}</span>
                    ),
                  },
                  {
                    key: "metodoPago",
                    header: "Método de Pago",
                    render: (compra: CompraCliente) => (
                      <span className="capitalize">{compra.metodoPago}</span>
                    ),
                  },
                  {
                    key: "estado",
                    header: "Estado",
                    render: (compra: CompraCliente) => (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${compra.estado === 'completada'
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                        }`}
                      >
                        {compra.estado.charAt(0).toUpperCase() + compra.estado.slice(1)}
                      </span>
                    ),
                  },
                ]}
                className="overflow-hidden"
                tableClassName="border-collapse"
                headerClassName="bg-gray-50"
                rowClassName="border-b hover:bg-gray-50 transition-colors"
                emptyMessage="No hay compras registradas"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cliente */}
      {mostrarFormulario && (
        <FormularioCliente
          cliente={clienteSeleccionado}
          onSubmit={handleSubmitCliente}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}