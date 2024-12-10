import { Cliente } from "./cliente.interface";
import { Producto } from "./producto.interface";

export interface DetalleFactura {
  id: string;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  descuento?: number;
}

export interface Factura {
  id: string;
  numero: string;
  fecha: Date;
  cliente: Cliente;
  detalles: DetalleFactura[];
  subtotal: number;
  descuento: number;
  impuestos: number;
  total: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
  estado: 'pagada' | 'pendiente' | 'anulada';
  notas?: string;
  vendedor: string;
}
