import { MovimientoCaja, ResumenCaja } from "@/interfaces/caja.interface";

export const MOVIMIENTOS_MOCK: MovimientoCaja[] = [
  {
    id: "1",
    fecha: new Date("2024-01-17T09:00:00"),
    tipo: "ingreso",
    monto: 1000.00,
    concepto: "Apertura de caja",
    metodoPago: "efectivo",
    usuario: "Juan Vendedor"
  },
  {
    id: "2",
    fecha: new Date("2024-01-17T10:15:00"),
    tipo: "ingreso",
    monto: 250.50,
    concepto: "Venta #F001-00001",
    metodoPago: "efectivo",
    usuario: "Juan Vendedor"
  },
  {
    id: "3",
    fecha: new Date("2024-01-17T11:30:00"),
    tipo: "ingreso",
    monto: 480.75,
    concepto: "Venta #F001-00002",
    metodoPago: "tarjeta",
    usuario: "María Vendedora"
  },
  {
    id: "4",
    fecha: new Date("2024-01-17T12:45:00"),
    tipo: "egreso",
    monto: 100.00,
    concepto: "Pago proveedor limpieza",
    metodoPago: "efectivo",
    comprobante: "R001-123456",
    usuario: "Juan Vendedor"
  },
  {
    id: "5",
    fecha: new Date("2024-01-17T14:20:00"),
    tipo: "ingreso",
    monto: 800.25,
    concepto: "Venta #F001-00003",
    metodoPago: "transferencia",
    usuario: "Pedro Vendedor"
  }
];

export const RESUMEN_CAJA_MOCK: ResumenCaja = {
  abierta: true,
  apertura: {
    id: "1",
    fecha: new Date("2024-01-17T09:00:00"),
    montoInicial: 1000.00,
    usuario: "Juan Vendedor"
  },
  movimientos: MOVIMIENTOS_MOCK,
  saldoActual: {
    efectivo: 1150.50, // 1000 inicial + 250.50 venta - 100 egreso
    tarjeta: 480.75,
    transferencia: 800.25,
    total: 2431.50
  },
  ventas: {
    cantidad: 3,
    total: 1531.50
  }
};
