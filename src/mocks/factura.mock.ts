import { Factura } from "@/interfaces/factura.interface";
import { CLIENTES_MOCK } from "./cliente.mock";
import { PRODUCTOS_FRECUENTES } from "./producto.mock";

export const FACTURAS_MOCK: Factura[] = [
  {
    id: "1",
    numero: "F001-00001",
    fecha: new Date("2024-01-15T14:30:00"),
    cliente: CLIENTES_MOCK[0],
    detalles: [
      {
        id: "1",
        producto: PRODUCTOS_FRECUENTES[0],
        cantidad: 2,
        precioUnitario: 50.25,
        subtotal: 100.50
      },
      {
        id: "2",
        producto: PRODUCTOS_FRECUENTES[1],
        cantidad: 1,
        precioUnitario: 150.00,
        subtotal: 150.00
      }
    ],
    subtotal: 250.50,
    descuento: 0,
    impuestos: 45.09,
    total: 295.59,
    metodoPago: "efectivo",
    estado: "pagada",
    vendedor: "Juan Vendedor"
  },
  {
    id: "2",
    numero: "F001-00002",
    fecha: new Date("2024-01-15T16:45:00"),
    cliente: CLIENTES_MOCK[1],
    detalles: [
      {
        id: "3",
        producto: PRODUCTOS_FRECUENTES[2],
        cantidad: 3,
        precioUnitario: 85.25,
        subtotal: 255.75
      },
      {
        id: "4",
        producto: PRODUCTOS_FRECUENTES[3],
        cantidad: 2,
        precioUnitario: 45.00,
        subtotal: 90.00
      }
    ],
    subtotal: 345.75,
    descuento: 34.57,
    impuestos: 56.01,
    total: 367.19,
    metodoPago: "tarjeta",
    estado: "pagada",
    vendedor: "María Vendedora"
  },
  {
    id: "3",
    numero: "F001-00003",
    fecha: new Date("2024-01-16T09:15:00"),
    cliente: CLIENTES_MOCK[2],
    detalles: [
      {
        id: "5",
        producto: PRODUCTOS_FRECUENTES[4],
        cantidad: 1,
        precioUnitario: 350.00,
        subtotal: 350.00
      }
    ],
    subtotal: 350.00,
    descuento: 0,
    impuestos: 63.00,
    total: 413.00,
    metodoPago: "transferencia",
    estado: "pendiente",
    vendedor: "Pedro Vendedor"
  },
  {
    id: "4",
    numero: "F001-00004",
    fecha: new Date("2024-01-16T11:30:00"),
    cliente: CLIENTES_MOCK[3],
    detalles: [
      {
        id: "6",
        producto: PRODUCTOS_FRECUENTES[0],
        cantidad: 4,
        precioUnitario: 50.25,
        subtotal: 201.00
      }
    ],
    subtotal: 201.00,
    descuento: 20.10,
    impuestos: 32.56,
    total: 213.46,
    metodoPago: "efectivo",
    estado: "anulada",
    notas: "Cliente solicitó anulación",
    vendedor: "Ana Vendedora"
  }
];
