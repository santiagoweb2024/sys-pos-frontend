import { roles } from '@/database/schemas/roles.schema';

export type Role = typeof roles.$inferSelect;

export type RoleInsert = Omit<
  Role,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
