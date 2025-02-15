import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { cashMovements } from './cashMovements';
import { cashSessions } from './cashSessions';

export const cashRegisterStatusEnum = pgEnum('cashRegisterStatus', [
  'ACTIVE',
  'INACTIVE',
  'MAINTENANCE',
  'OUT_OF_SERVICE',
]);

export const cashResgisters = pgTable('cashRegisters', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  location: varchar().notNull(),
  status: cashRegisterStatusEnum().notNull(),
  ...timestampColumns,
});

export const cashRegistersRelations = relations(cashResgisters, ({ many }) => ({
  cashMovements: many(cashMovements),
  cashSessions: many(cashSessions),
}));
