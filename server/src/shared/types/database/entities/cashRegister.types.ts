import { cashResgisters } from '@/database/schemas/cashRegisters';

export type CashRegister = typeof cashResgisters.$inferSelect;

export type CashRegisterInsert = Omit<
  CashRegister,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
