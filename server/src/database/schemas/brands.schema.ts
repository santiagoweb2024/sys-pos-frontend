import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';
export const brands = pgTable('brands', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...timestampColumns,
});

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));
