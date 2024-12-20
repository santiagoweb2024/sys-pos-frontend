import { pgTable, serial, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const movementTypeEnum = pgEnum('MovementType', ['IN', 'OUT']);
export const inventories = pgTable('inventories', {
  id: serial().primaryKey(),
  productId: integer()
    .references(() => products.id)
    .notNull(),
  quantity: integer().notNull(),
  movementType: movementTypeEnum().notNull(),
  description: varchar(),
  ...timestampColumns,
});

export const inventoriesRelations = relations(inventories, ({ one }) => ({
  product: one(products, {
    fields: [inventories.productId],
    references: [products.id],
  }),
}));
