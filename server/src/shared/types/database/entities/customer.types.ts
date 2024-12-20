import { customers } from '@/database/schemas/customers.schema';

export type Customer = typeof customers.$inferSelect;

export type CustomerInsert = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
