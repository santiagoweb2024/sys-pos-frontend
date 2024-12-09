import { HistorialCaja } from "@/interfaces/historial.interface";
import { MOVIMIENTOS_MOCK } from "./caja.mock";

export const HISTORIAL_MOCK: HistorialCaja[] = [
  {
    id: "1",
    fecha: new Date("2024-01-17"),
    apertura: {
      id: "1",
      fecha: new Date("2024-01-17T09:00:00"),
      montoInicial: 1000.00,
      usuario: "Juan Vendedor"
    },
    cierre: {
      id: "1",
      fecha: new Date("2024-01-17T18:00:00"),
      montoFinal: {
        efectivo: 2150.50,
        tarjeta: 480.75,
        transferencia: 800.25
      },
      diferencia: 0,
      usuario: "Juan Vendedor"
    },
    movimientos: MOVIMIENTOS_MOCK,
    resumen: {
      ventas: {
        cantidad: 15,
        total: 2531.50
      },
      ingresos: {
        efectivo: 1250.50,
        tarjeta: 480.75,
        transferencia: 800.25,
        total: 2531.50
      },
      egresos: {
        efectivo: 100.00,
        tarjeta: 0,
        transferencia: 0,
        total: 100.00
      },
      diferencia: 0
    },
    usuario: "Juan Vendedor"
  },
  {
    id: "2",
    fecha: new Date("2024-01-16"),
    apertura: {
      id: "2",
      fecha: new Date("2024-01-16T09:00:00"),
      montoInicial: 1000.00,
      usuario: "María Vendedora"
    },
    cierre: {
      id: "2",
      fecha: new Date("2024-01-16T18:00:00"),
      montoFinal: {
        efectivo: 1850.00,
        tarjeta: 620.50,
        transferencia: 450.75
      },
      diferencia: -50,
      observaciones: "Faltante en caja",
      usuario: "María Vendedora"
    },
    movimientos: MOVIMIENTOS_MOCK.map(m => ({
      ...m,
      fecha: new Date("2024-01-16T" + m.fecha.toTimeString())
    })),
    resumen: {
      ventas: {
        cantidad: 12,
        total: 1921.25
      },
      ingresos: {
        efectivo: 950.00,
        tarjeta: 620.50,
        transferencia: 450.75,
        total: 2021.25
      },
      egresos: {
        efectivo: 100.00,
        tarjeta: 0,
        transferencia: 0,
        total: 100.00
      },
      diferencia: -50
    },
    usuario: "María Vendedora"
  }
];
