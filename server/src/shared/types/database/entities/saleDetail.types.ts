import { saleDetails } from '@/database/schemas/saleDetails.schema';

export type SaleDetail = typeof saleDetails.$inferSelect;

export type SaleDetailInsert = Omit<
  SaleDetail,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
