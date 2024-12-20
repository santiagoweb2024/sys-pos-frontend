import { cashSessions } from '@/database/schemas/cashSessions';

export type CashSession = typeof cashSessions.$inferSelect;

export type CashSessionInsert = Omit<
  CashSession,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
