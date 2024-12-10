import {
  Usuario,
  ConfiguracionEmpresa,
  ConfiguracionImpuestos,
  ConfiguracionFacturacion,
  ConfiguracionNotificaciones
} from "@/interfaces/configuracion.interface";

export const USUARIOS_MOCK: Usuario[] = [
  {
    id: "1",
    nombre: "Juan Administrador",
    email: "juan@empresa.com",
    rol: "admin",
    estado: "activo",
    ultimoAcceso: new Date("2024-01-17T10:30:00"),
    fechaCreacion: new Date("2023-12-01")
  },
  {
    id: "2",
    nombre: "María Vendedora",
    email: "maria@empresa.com",
    rol: "vendedor",
    estado: "activo",
    ultimoAcceso: new Date("2024-01-17T09:15:00"),
    fechaCreacion: new Date("2023-12-15")
  },
  {
    id: "3",
    nombre: "Pedro Cajero",
    email: "pedro@empresa.com",
    rol: "cajero",
    estado: "activo",
    ultimoAcceso: new Date("2024-01-17T08:45:00"),
    fechaCreacion: new Date("2024-01-02")
  }
];

export const CONFIGURACION_EMPRESA_MOCK: ConfiguracionEmpresa = {
  nombre: "Mi Tienda S.A.C.",
  ruc: "20123456789",
  direccion: "Av. Principal 123",
  telefono: "(01) 234-5678",
  email: "contacto@mitienda.com",
  moneda: "PEN",
  zonaHoraria: "America/Lima"
};

export const CONFIGURACION_IMPUESTOS_MOCK: ConfiguracionImpuestos = {
  iva: 18,
  ivaIncluido: true,
  otrosImpuestos: [
    {
      nombre: "ISC",
      porcentaje: 10,
      activo: false
    }
  ]
};

export const CONFIGURACION_FACTURACION_MOCK: ConfiguracionFacturacion = {
  serieFactura: "F001",
  correlativoFactura: 1234,
  serieBoleta: "B001",
  correlativoBoleta: 5678,
  pieFactura: "Gracias por su compra",
  formatoImpresion: "ticket",
  impresora: "EPSON TM-T20III",
  copias: 2
};

export const CONFIGURACION_NOTIFICACIONES_MOCK: ConfiguracionNotificaciones = {
  stockBajo: true,
  limiteStockBajo: 10,
  ventasAltas: true,
  limiteVentasAltas: 5000,
  diferenciaCaja: true,
  limiteDiferenciaCaja: 50,
  emailNotificaciones: ["gerencia@mitienda.com", "admin@mitienda.com"]
};
