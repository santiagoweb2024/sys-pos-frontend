import { AperturaCaja, CierreCaja, MovimientoCaja } from "./caja.interface";

export interface HistorialCaja {
  id: string;
  fecha: Date;
  apertura: AperturaCaja;
  cierre: CierreCaja;
  movimientos: MovimientoCaja[];
  resumen: {
    ventas: {
      cantidad: number;
      total: number;
    };
    ingresos: {
      efectivo: number;
      tarjeta: number;
      transferencia: number;
      total: number;
    };
    egresos: {
      efectivo: number;
      tarjeta: number;
      transferencia: number;
      total: number;
    };
    diferencia: number;
  };
  usuario: string;
}
