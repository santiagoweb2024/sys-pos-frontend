export interface Cliente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaRegistro: Date;
  totalCompras: number;
  ultimaCompra?: Date;
  estado: 'activo' | 'inactivo';
}

export interface CompraCliente {
  id: string;
  fecha: Date;
  total: number;
  productos: {
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
  estado: 'completada' | 'cancelada';
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
}
