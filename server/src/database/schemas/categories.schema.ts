import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const categories = pgTable('categories', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...timestampColumns,
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdateCategory = Omit<
  Partial<NewCategory>,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>;
