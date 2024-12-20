import { Db } from '@/shared/types/database/common/database.types';
import { sales } from '../schemas/sales.schema';
import { SaleInsert } from '@/shared/types/database/entities/sale.types';

const salesInitial: SaleInsert[] = [
  {
    cashRegisterId: 1, // Caja 1
    userId: 2, // Juan Pérez (Cajero)
    customerId: 1, // Cliente regular
    paymentMethodId: 1, // Efectivo
    status: 'CLOSED',
  },
  {
    cashRegisterId: 1, // Caja 1
    userId: 2, // Juan Pérez (Cajero)
    customerId: 2, // Cliente frecuente
    paymentMethodId: 2, // Tarjeta de Crédito
    status: 'CLOSED',
  },
  {
    cashRegisterId: 2, // Caja 2
    userId: 4, // Carlos López (Cajero)
    customerId: 3, // Cliente empresarial
    paymentMethodId: 3, // Transferencia Bancaria
    status: 'CLOSED',
  },
  {
    cashRegisterId: 3, // Caja 3
    userId: 5, // Ana Martínez (Cajero)
    customerId: 1, // Cliente regular
    paymentMethodId: 1, // Efectivo
    status: 'CLOSED',
  },
  {
    cashRegisterId: 6, // Caja Express
    userId: 4, // Carlos López (Cajero)
    customerId: 4, // Otro cliente
    paymentMethodId: 2, // Tarjeta de Crédito
    status: 'CLOSED',
  },
  {
    cashRegisterId: 1, // Caja 1
    userId: 2, // Juan Pérez (Cajero)
    customerId: 2, // Cliente frecuente
    paymentMethodId: 1, // Efectivo
    status: 'OPEN', // Venta en proceso
  },
];

export const seedSales = async (db: Db) => {
  await db.insert(sales).values(salesInitial);
};
