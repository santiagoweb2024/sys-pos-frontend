import { pgTable, serial, integer, decimal } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { sales } from './sales.schema';
import { products } from './products.schema';

export const saleDetails = pgTable('saleDetails', {
  id: serial().primaryKey(),
  saleId: integer()
    .references(() => sales.id)
    .notNull(),
  productId: integer()
    .references(() => products.id)
    .notNull(),
  quantity: integer().notNull(),
  unitPrice: decimal({ precision: 10, scale: 2 }).notNull(),
  subTotal: decimal({ precision: 10, scale: 2 }).notNull(),
  ...timestampColumns,
});

export const saleDetailsRelations = relations(saleDetails, ({ one }) => ({
  sale: one(sales, {
    fields: [saleDetails.saleId],
    references: [sales.id],
  }),
  product: one(products, {
    fields: [saleDetails.productId],
    references: [products.id],
  }),
}));
