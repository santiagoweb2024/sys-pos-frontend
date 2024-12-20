import { users } from '@/database/schemas/users.schema';

export type User = typeof users.$inferSelect;

export type UserInsert = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
