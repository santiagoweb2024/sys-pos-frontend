"use client";

import { useState } from "react";
import { Search, ArrowUpDown, FileText, DollarSign, Calendar, Users, Printer, Download } from "lucide-react";
import DataTable from "@/components/dataTable/dataTable";
import DetalleFactura from "./(components)/DetalleFactura";
import { Factura } from "@/interfaces/factura.interface";
import { FACTURAS_MOCK } from "@/mocks/factura.mock";

export default function Facturas() {
  const [facturas] = useState<Factura[]>(FACTURAS_MOCK);
  const [searchTerm, setSearchTerm] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura>();
  const [filtroFecha, setFiltroFecha] = useState<'hoy' | 'semana' | 'mes' | 'todo'>('todo');
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'pagadas' | 'pendientes' | 'anuladas'>('todas');

  // Estadísticas
  const estadisticas = {
    totalFacturas: facturas.length,
    facturasPagadas: facturas.filter(f => f.estado === 'pagada').length,
    ventasHoy: facturas.filter(f => 
      f.fecha.toDateString() === new Date().toDateString() && 
      f.estado === 'pagada'
    ).reduce((total, f) => total + f.total, 0),
    clientesUnicos: new Set(facturas.map(f => f.cliente.id)).size
  };

  // Filtrar facturas
  const filtrarFacturas = () => {
    return facturas.filter(factura => {
      // Búsqueda por término
      const matchSearch = 
        factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        factura.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        factura.cliente.documento.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por fecha
      const hoy = new Date();
      const fechaFactura = new Date(factura.fecha);
      let matchFecha = true;
      if (filtroFecha === 'hoy') {
        matchFecha = fechaFactura.toDateString() === hoy.toDateString();
      } else if (filtroFecha === 'semana') {
        const unaSemanAtras = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchFecha = fechaFactura >= unaSemanAtras;
      } else if (filtroFecha === 'mes') {
        matchFecha = 
          fechaFactura.getMonth() === hoy.getMonth() &&
          fechaFactura.getFullYear() === hoy.getFullYear();
      }

      // Filtro por estado
      const matchEstado = 
        filtroEstado === 'todas' || 
        (filtroEstado === 'pagadas' && factura.estado === 'pagada') ||
        (filtroEstado === 'pendientes' && factura.estado === 'pendiente') ||
        (filtroEstado === 'anuladas' && factura.estado === 'anulada');

      return matchSearch && matchFecha && matchEstado;
    });
  };

  const columns = [
    {
      key: "numero",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Número
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (factura: Factura) => (
        <div className="font-medium">{factura.numero}</div>
      ),
    },
    {
      key: "fecha",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Fecha
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (factura: Factura) => (
        <div className="space-y-1">
          <div className="text-sm">{factura.fecha.toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{factura.fecha.toLocaleTimeString()}</div>
        </div>
      ),
    },
    {
      key: "cliente",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Cliente
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (factura: Factura) => (
        <div>
          <div className="font-medium">{factura.cliente.nombre}</div>
          <div className="text-xs text-gray-500">Doc: {factura.cliente.documento}</div>
        </div>
      ),
    },
    {
      key: "total",
      header: (
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          Total
          <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      render: (factura: Factura) => (
        <div className="text-right">
          <div className="font-medium">${factura.total.toFixed(2)}</div>
          <div className="text-xs text-gray-500 capitalize">{factura.metodoPago}</div>
        </div>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (factura: Factura) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${factura.estado === 'pagada'
            ? "bg-green-50 text-green-700"
            : factura.estado === 'pendiente'
              ? "bg-yellow-50 text-yellow-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
        </span>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (factura: Factura) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFacturaSeleccionada(factura)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Ver detalle"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => console.log('Imprimir factura:', factura.numero)}
            className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Imprimir"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={() => console.log('Descargar factura:', factura.numero)}
            className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Descargar"
          >
            <Download className="w-4 h-4" />
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
            <FileText className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Total Facturas</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.totalFacturas}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-green-600">
            <DollarSign className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Ventas de Hoy</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            ${estadisticas.ventasHoy.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-green-600">
            <Calendar className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Facturas Pagadas</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.facturasPagadas}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="w-5 h-5" />
            <div className="text-sm font-medium text-gray-500">Clientes Únicos</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">
            {estadisticas.clientesUnicos}
          </div>
        </div>
      </div>

      {/* Lista de Facturas */}
      <div className="bg-white rounded-lg shadow-xs border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Facturas</h2>
          </div>

          {/* Filtros */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por número, cliente o documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todo">Todas las fechas</option>
              <option value="hoy">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
            </select>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todas">Todos los estados</option>
              <option value="pagadas">Pagadas</option>
              <option value="pendientes">Pendientes</option>
              <option value="anuladas">Anuladas</option>
            </select>
          </div>
        </div>

        <DataTable
          data={filtrarFacturas()}
          columns={columns}
          className="overflow-hidden"
          tableClassName="border-collapse"
          headerClassName="bg-gray-50"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          emptyMessage="No hay facturas que coincidan con los filtros"
        />
      </div>

      {/* Modal de Detalle */}
      {facturaSeleccionada && (
        <DetalleFactura
          factura={facturaSeleccionada}
          onClose={() => setFacturaSeleccionada(undefined)}
        />
      )}
    </div>
  );
}
