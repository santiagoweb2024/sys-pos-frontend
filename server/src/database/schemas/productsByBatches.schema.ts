import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const productByBatches = pgTable('productsByBatches', {
  id: serial().primaryKey(),
  productId: integer()
    .references(() => products.id)
    .notNull(),
  batchId: varchar().notNull(),
  quantity: integer().notNull(),
  ...timestampColumns,
});

export const productByBatchesRelations = relations(
  productByBatches,
  ({ one }) => ({
    product: one(products, {
      fields: [productByBatches.productId],
      references: [products.id],
    }),
  }),
);
