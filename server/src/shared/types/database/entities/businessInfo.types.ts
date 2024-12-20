import { businessInfo } from '@/database/schemas/businessInfo.schema';

export type BusinessInfo = typeof businessInfo.$inferSelect;

export type BusinessInfoInsert = Omit<
  BusinessInfo,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
