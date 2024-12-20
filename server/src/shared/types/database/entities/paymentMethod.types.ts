import { paymentMethods } from '@/database/schemas/paymentMethods.schema';

export type PaymentMethod = typeof paymentMethods.$inferInsert;

export type PaymentMethodInsert = Omit<
  PaymentMethod,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
