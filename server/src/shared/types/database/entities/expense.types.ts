import { expenses } from '@/database/schemas/expenses.schema';

export type Expense = typeof expenses.$inferSelect;

export type ExpenseInsert = Omit<
  Expense,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
