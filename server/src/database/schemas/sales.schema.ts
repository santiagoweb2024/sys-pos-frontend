import { pgTable, pgEnum, serial, integer } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { cashResgisters } from './cashRegisters';
import { users } from './users.schema';
import { customers } from './customers.schema';
import { saleDetails } from './saleDetails.schema';
import { paymentMethods } from './paymentMethods.schema';

export const salesStatusEnum = pgEnum('salesStatus', ['OPEN', 'CLOSED']);

export const sales = pgTable('sales', {
  id: serial().primaryKey(),
  cashRegisterId: integer()
    .references(() => cashResgisters.id)
    .notNull(),
  userId: integer()
    .references(() => users.id)
    .notNull(),
  customerId: integer().references(() => customers.id),
  paymentMethodId: integer().references(() => paymentMethods.id),
  status: salesStatusEnum().notNull(),
  ...timestampColumns,
});

export const salesRelations = relations(sales, ({ one, many }) => ({
  cashRegister: one(cashResgisters, {
    fields: [sales.cashRegisterId],
    references: [cashResgisters.id],
  }),
  user: one(users, {
    fields: [sales.userId],
    references: [users.id],
  }),
  customer: one(customers, {
    fields: [sales.customerId],
    references: [customers.id],
  }),
  paymentMethods: one(paymentMethods, {
    fields: [sales.paymentMethodId],
    references: [paymentMethods.id],
  }),
  saleDetails: many(saleDetails),
}));
