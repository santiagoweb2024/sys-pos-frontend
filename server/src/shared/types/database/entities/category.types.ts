import { categories } from '@/database/schemas/categories.schema';

export type Category = typeof categories.$inferSelect;
export type CategoryInsert = Omit<
  Category,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
