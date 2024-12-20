import { Db } from '@/shared/types/database/common/database.types';
import { paymentMethods } from '../schemas/paymentMethods.schema';
import { PaymentMethodInsert } from '@/shared/types/database/entities/paymentMethod.types';

const paymentMethodsInitial: PaymentMethodInsert[] = [
  {
    name: 'Efectivo',
    status: 'ACTIVE',
  },
  {
    name: 'Tarjeta de Crédito',
    status: 'ACTIVE',
  },
  {
    name: 'Tarjeta de Débito',
    status: 'ACTIVE',
  },
  {
    name: 'Transferencia Bancaria',
    status: 'ACTIVE',
  },
  {
    name: 'Cheque',
    status: 'INACTIVE',
  },
  {
    name: 'Pago Móvil',
    status: 'ACTIVE',
  },
];

export const seedPaymentMethods = async (db: Db) => {
  await db.insert(paymentMethods).values(paymentMethodsInitial);
};
