import {
  pgTable,
  pgEnum,
  serial,
  decimal,
  date,
  integer,
} from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { cashResgisters } from './cashRegisters';
import { users } from './users.schema';

export const cashSessionStatusEnum = pgEnum('cashSessionStatus', [
  'OPEN', // Sesión activa
  'CLOSED', // Sesión cerrada normalmente
  'FORCE_CLOSED', // Sesión cerrada forzadamente (por supervisor)
]);

export const cashSessions = pgTable('cashSessions', {
  id: serial().primaryKey(),
  cashRegisterId: integer()
    .references(() => cashResgisters.id)
    .notNull(),
  userId: integer()
    .references(() => users.id)
    .notNull(),
  openingBalance: decimal({ precision: 10, scale: 2 }).notNull(),
  closingBalance: decimal({ precision: 10, scale: 2 }).notNull(),
  startTime: date({ mode: 'date' }).notNull(),
  endTime: date({ mode: 'date' }).notNull(),
  status: cashSessionStatusEnum().notNull(),
  ...timestampColumns,
});

export const cashSessionsRelations = relations(cashSessions, ({ one }) => ({
  cashRegister: one(cashResgisters, {
    fields: [cashSessions.cashRegisterId],
    references: [cashResgisters.id],
  }),
  user: one(users, {
    fields: [cashSessions.userId],
    references: [users.id],
  }),
}));
