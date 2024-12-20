import { products } from '@/database/schemas/products.schema';

export type Product = typeof products.$inferSelect;

export type ProductInsert = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
