import { productStatus } from '@/database/schemas/productStatus.schema';

export type ProductStatus = typeof productStatus.$inferInsert;

export type ProductStatusInsert = Omit<
  ProductStatus,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
