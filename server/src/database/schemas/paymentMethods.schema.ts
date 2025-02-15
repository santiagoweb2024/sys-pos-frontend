import { pgTable, pgEnum, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { sales } from './sales.schema';
import { expenses } from './expenses.schema';

export const paymentMethodStatusEnum = pgEnum('PaymentMethodStatus', [
  'ACTIVE',
  'INACTIVE',
]);

export const paymentMethods = pgTable('paymentMethods', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  status: paymentMethodStatusEnum().notNull(),
  ...timestampColumns,
});

export const paymentMethodsRelations = relations(
  paymentMethods,
  ({ many }) => ({
    sales: many(sales),
    expenses: many(expenses),
  }),
);
