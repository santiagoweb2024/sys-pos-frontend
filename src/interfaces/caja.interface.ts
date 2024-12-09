export interface MovimientoCaja {
  id: string;
  fecha: Date;
  tipo: 'ingreso' | 'egreso';
  monto: number;
  concepto: string;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
  comprobante?: string;
  usuario: string;
}

export interface AperturaCaja {
  id: string;
  fecha: Date;
  montoInicial: number;
  usuario: string;
}

export interface CierreCaja {
  id: string;
  fecha: Date;
  montoFinal: {
    efectivo: number;
    tarjeta: number;
    transferencia: number;
  };
  diferencia: number;
  observaciones?: string;
  usuario: string;
}

export interface ResumenCaja {
  abierta: boolean;
  apertura?: AperturaCaja;
  cierre?: CierreCaja;
  movimientos: MovimientoCaja[];
  saldoActual: {
    efectivo: number;
    tarjeta: number;
    transferencia: number;
    total: number;
  };
  ventas: {
    cantidad: number;
    total: number;
  };
}
