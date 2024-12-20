import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const suppliers = pgTable('suppliers', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestampColumns,
});

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  products: many(products),
}));
