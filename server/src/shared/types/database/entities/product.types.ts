import { products } from '@/database/schemas/products.schema';
import type { Brand } from './brand.types';
import type { Category } from './category.types';
import type { Supplier } from './supplier.types';
import type { UnitOfMeasurement } from './unitOfMeasurement.types';
import type { ProductStatus } from './productStatus.types';

export type Product = typeof products.$inferSelect;

export type ProductInsert = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ProductUpdate = Partial<ProductInsert>;

export type ProductWithRelations = Product & {
  brand?: Brand;
  category?: Category;
  supplier?: Supplier;
  unitOfMeasurement?: UnitOfMeasurement;
  productStatus?: ProductStatus;
};
