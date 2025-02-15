import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { cashResgisters } from './cashRegisters';
import { users } from './users.schema';

export const cashMovementTypeEnum = pgEnum('cashMovementType', [
  'CASH_IN', // Entrada de dinero (ventas, depósitos)
  'CASH_OUT', // Salida de dinero (retiros, gastos)
  'INITIAL_BALANCE', // Saldo inicial al abrir caja
  'CLOSING_BALANCE', // Saldo final al cerrar caja
  'ADJUSTMENT', // Ajuste de caja (corrección de errores)
  'WITHDRAWAL', // Retiro de efectivo autorizado
  'DEPOSIT', // Depósito adicional durante la sesión
]);

export const cashMovements = pgTable('cashMovements', {
  id: serial().primaryKey(),
  cashRegisterId: integer()
    .references(() => cashResgisters.id)
    .notNull(),
  userId: integer()
    .references(() => users.id)
    .notNull(),
  amount: varchar().notNull(),
  reason: varchar().notNull(),
  type: cashMovementTypeEnum().notNull(),
  ...timestampColumns,
});

export const cashMovementsRelations = relations(cashMovements, ({ one }) => ({
  cashRegister: one(cashResgisters, {
    fields: [cashMovements.cashRegisterId],
    references: [cashResgisters.id],
  }),
  user: one(users, {
    fields: [cashMovements.userId],
    references: [users.id],
  }),
}));
