import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const productStatus = pgTable('productStatus', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...timestampColumns,
});

export const productStatusRelations = relations(productStatus, ({ many }) => ({
  products: many(products),
}));
