import { Db } from '@/shared/types/database/common/database.types';
import { saleDetails } from '../schemas/saleDetails.schema';
import { SaleDetailInsert } from '@/shared/types/database/entities/saleDetail.types';

const saleDetailsInitial: SaleDetailInsert[] = [
  // Detalles de la venta 1
  {
    saleId: 1,
    productId: 1, // Coca Cola 600ml
    quantity: 2,
    unitPrice: '2.50',
    subTotal: '5.00',
  },
  {
    saleId: 1,
    productId: 2, // Leche Gloria
    quantity: 3,
    unitPrice: '4.20',
    subTotal: '12.60',
  },

  // Detalles de la venta 2
  {
    saleId: 2,
    productId: 3, // Arroz Costeño
    quantity: 2,
    unitPrice: '22.90',
    subTotal: '45.80',
  },
  {
    saleId: 2,
    productId: 4, // Aceite Primor
    quantity: 1,
    unitPrice: '11.90',
    subTotal: '11.90',
  },

  // Detalles de la venta 3
  {
    saleId: 3,
    productId: 6, // Galletas Oreo
    quantity: 5,
    unitPrice: '3.90',
    subTotal: '19.50',
  },
  {
    saleId: 3,
    productId: 7, // Yogurt Gloria
    quantity: 3,
    unitPrice: '5.90',
    subTotal: '17.70',
  },

  // Detalles de la venta 4
  {
    saleId: 4,
    productId: 8, // Fideos Don Vittorio
    quantity: 4,
    unitPrice: '3.20',
    subTotal: '12.80',
  },
  {
    saleId: 4,
    productId: 9, // Azúcar Rubia
    quantity: 2,
    unitPrice: '4.50',
    subTotal: '9.00',
  },

  // Detalles de la venta 5
  {
    saleId: 5,
    productId: 11, // Detergente Bolivar
    quantity: 1,
    unitPrice: '23.90',
    subTotal: '23.90',
  },
  {
    saleId: 5,
    productId: 12, // Jabón Protex
    quantity: 2,
    unitPrice: '8.90',
    subTotal: '17.80',
  },

  // Detalles de la venta 6 (en proceso)
  {
    saleId: 6,
    productId: 14, // Agua San Luis
    quantity: 3,
    unitPrice: '3.50',
    subTotal: '10.50',
  },
  {
    saleId: 6,
    productId: 15, // Chocolate Sublime
    quantity: 4,
    unitPrice: '2.50',
    subTotal: '10.00',
  },
];

export const seedSaleDetails = async (db: Db) => {
  await db.insert(saleDetails).values(saleDetailsInitial);
};
