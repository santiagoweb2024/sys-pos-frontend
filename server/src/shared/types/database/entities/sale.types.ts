import { sales } from '@/database/schemas/sales.schema';

export type Sale = typeof sales.$inferSelect;

export type SaleInsert = Omit<
  Sale,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;