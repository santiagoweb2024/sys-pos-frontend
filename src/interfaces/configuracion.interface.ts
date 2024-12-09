export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'cajero' | 'vendedor';
  estado: 'activo' | 'inactivo';
  ultimoAcceso?: Date;
  fechaCreacion: Date;
}

export interface ConfiguracionEmpresa {
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  logo?: string;
  moneda: string;
  zonaHoraria: string;
}

export interface ConfiguracionImpuestos {
  iva: number;
  ivaIncluido: boolean;
  otrosImpuestos: {
    nombre: string;
    porcentaje: number;
    activo: boolean;
  }[];
}

export interface ConfiguracionFacturacion {
  serieFactura: string;
  correlativoFactura: number;
  serieBoleta: string;
  correlativoBoleta: number;
  pieFactura: string;
  formatoImpresion: 'a4' | 'ticket';
  impresora: string;
  copias: number;
}

export interface ConfiguracionNotificaciones {
  stockBajo: boolean;
  limiteStockBajo: number;
  ventasAltas: boolean;
  limiteVentasAltas: number;
  diferenciaCaja: boolean;
  limiteDiferenciaCaja: number;
  emailNotificaciones: string[];
}
