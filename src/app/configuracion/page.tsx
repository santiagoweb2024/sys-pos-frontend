"use client";

import { useState } from "react";
import { Settings, UserPlus, Building, FileText, Bell } from "lucide-react";
import FormularioUsuario from "./(components)/FormularioUsuario";
import {
  Usuario,
  ConfiguracionEmpresa,
  ConfiguracionImpuestos,
  ConfiguracionFacturacion,
  ConfiguracionNotificaciones
} from "@/interfaces/configuracion.interface";
import {
  USUARIOS_MOCK,
  CONFIGURACION_EMPRESA_MOCK,
  CONFIGURACION_IMPUESTOS_MOCK,
  CONFIGURACION_FACTURACION_MOCK,
  CONFIGURACION_NOTIFICACIONES_MOCK
} from "@/mocks/configuracion.mock";

export default function Configuracion() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(USUARIOS_MOCK);
  const [empresa, setEmpresa] = useState<ConfiguracionEmpresa>(CONFIGURACION_EMPRESA_MOCK);
  const [impuestos, setImpuestos] = useState<ConfiguracionImpuestos>(CONFIGURACION_IMPUESTOS_MOCK);
  const [facturacion, setFacturacion] = useState<ConfiguracionFacturacion>(CONFIGURACION_FACTURACION_MOCK);
  const [notificaciones, setNotificaciones] = useState<ConfiguracionNotificaciones>(CONFIGURACION_NOTIFICACIONES_MOCK);
  const [mostrarFormularioUsuario, setMostrarFormularioUsuario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  const handleNuevoUsuario = (usuario: Omit<Usuario, 'id' | 'fechaCreacion' | 'ultimoAcceso'>) => {
    // Lógica para agregar un nuevo usuario
    console.log('Nuevo usuario:', usuario);
    setMostrarFormularioUsuario(false);
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarFormularioUsuario(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Configuración
          </h1>
        </div>
      </div>

      {/* Usuarios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Usuarios</h2>
          <button
            onClick={() => {
              setUsuarioSeleccionado(null);
              setMostrarFormularioUsuario(true);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Nuevo Usuario
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {usuarios.map(usuario => (
            <li key={usuario.id} className="py-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{usuario.nombre}</div>
                <div className="text-xs text-gray-500">{usuario.email}</div>
              </div>
              <button
                onClick={() => handleEditarUsuario(usuario)}
                className="text-blue-600 hover:text-blue-800"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Empresa */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Empresa</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-700">Nombre</div>
            <div className="font-medium">{empresa.nombre}</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">RUC</div>
            <div className="font-medium">{empresa.ruc}</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Dirección</div>
            <div className="font-medium">{empresa.direccion}</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Teléfono</div>
            <div className="font-medium">{empresa.telefono}</div>
          </div>
        </div>
      </div>

      {/* Impuestos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Impuestos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-700">IVA</div>
            <div className="font-medium">{impuestos.iva}% {impuestos.ivaIncluido ? '(Incluido)' : '(No Incluido)'}</div>
          </div>
          {impuestos.otrosImpuestos.map((impuesto, index) => (
            <div key={index}>
              <div className="text-sm text-gray-700">{impuesto.nombre}</div>
              <div className="font-medium">{impuesto.porcentaje}% {impuesto.activo ? '(Activo)' : '(Inactivo)'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Facturación */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Facturación</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-700">Serie Factura</div>
            <div className="font-medium">{facturacion.serieFactura}</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Correlativo Factura</div>
            <div className="font-medium">{facturacion.correlativoFactura}</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Serie Boleta</div>
            <div className="font-medium">{facturacion.serieBoleta}</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Correlativo Boleta</div>
            <div className="font-medium">{facturacion.correlativoBoleta}</div>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-700">Stock Bajo</div>
            <div className="font-medium">{notificaciones.stockBajo ? 'Activado' : 'Desactivado'} (Límite: {notificaciones.limiteStockBajo})</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Ventas Altas</div>
            <div className="font-medium">{notificaciones.ventasAltas ? 'Activado' : 'Desactivado'} (Límite: {notificaciones.limiteVentasAltas})</div>
          </div>
          <div>
            <div className="text-sm text-gray-700">Diferencia Caja</div>
            <div className="font-medium">{notificaciones.diferenciaCaja ? 'Activado' : 'Desactivado'} (Límite: {notificaciones.limiteDiferenciaCaja})</div>
          </div>
        </div>
      </div>

      {/* Modal de Usuario */}
      {mostrarFormularioUsuario && (
        <FormularioUsuario
          usuario={usuarioSeleccionado}
          onSubmit={handleNuevoUsuario}
          onClose={() => setMostrarFormularioUsuario(false)}
        />
      )}
    </div>
  );
}