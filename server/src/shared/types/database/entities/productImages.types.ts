import { productImages } from '@/database/schemas/productImages.schema';

export type ProductImages = typeof productImages.$inferSelect;
export type ProductImagesInsert = Omit<
  ProductImages,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
