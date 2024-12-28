import { brands } from '@/database/schemas/brands.schema';

export type Brand = typeof brands.$inferSelect;
export type BrandInsert = Omit<Brand, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
