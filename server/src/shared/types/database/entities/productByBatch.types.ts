import { productByBatches } from '@/database/schemas/productsByBatches.schema';

export type ProductByBatch = typeof productByBatches.$inferSelect;

export type ProductByBatchInsert = Omit<
  ProductByBatch,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
