import { suppliers } from '@/database/schemas/suppliers.schema';

export type Supplier = typeof suppliers.$inferSelect;

export type SupplierInsert = Omit<
  Supplier,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
