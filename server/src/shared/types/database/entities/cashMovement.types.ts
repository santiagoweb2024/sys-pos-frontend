import { cashMovements } from '@/database/schemas/cashMovements';

export type CashMovement = typeof cashMovements.$inferSelect;

export type CashMovementInsert = Omit<
  CashMovement,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
