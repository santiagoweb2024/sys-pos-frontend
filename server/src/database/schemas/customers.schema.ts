import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { sales } from './sales.schema';

export const customers = pgTable('customers', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  phone: varchar().notNull(),
  ...timestampColumns,
});

export const customersRelations = relations(customers, ({ many }) => ({
  sales: many(sales),
}));
