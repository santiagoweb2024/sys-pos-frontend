import {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
  date,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { paymentMethods } from './paymentMethods.schema';

export const categoryEnum = pgEnum('expenseCategory', [
  'FOOD',
  'ENTERTAINMENT',
  'TRAVEL',
  'MEDICAL',
  'INVENTARIO',
  'OTHER',
]);

export const expenses = pgTable('expenses', {
  id: serial().primaryKey(),
  description: varchar().notNull(),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  paymentMethodId: integer()
    .references(() => paymentMethods.id)
    .notNull(),
  date: date({ mode: 'date' }).notNull(),
  note: varchar(),
  category: categoryEnum().notNull(),
  ...timestampColumns,
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  paymentMethod: one(paymentMethods, {
    fields: [expenses.paymentMethodId],
    references: [paymentMethods.id],
  }),
}));
