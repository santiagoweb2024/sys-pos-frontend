import { pgTable, serial, integer, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestampColumns } from '@/utils/colums.util';
import { sales } from './sales.schema';
import { products } from './product.schema';
import { productByBatches } from './productByBatche.schema';

export const saleDetails = pgTable('saleDetails', {
  id: serial().primaryKey(),
  saleId: integer()
    .notNull()
    .references(() => sales.id),
  productId: integer()
    .notNull()
    .references(() => products.id),
  batchId: integer().references(() => productByBatches.id), // Opcional, para productos con lote
  quantity: decimal({ precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal({ precision: 10, scale: 2 }).notNull(),
  discount: decimal({ precision: 10, scale: 2 }).notNull().default('0'),
  subtotal: decimal({ precision: 10, scale: 2 }).notNull(),
  ...timestampColumns,
});

// Relaciones
export const saleDetailsRelations = relations(saleDetails, ({ one }) => ({
  sale: one(sales, {
    fields: [saleDetails.saleId],
    references: [sales.id],
  }),
  product: one(products, {
    fields: [saleDetails.productId],
    references: [products.id],
  }),
  batch: one(productByBatches, {
    fields: [saleDetails.batchId],
    references: [productByBatches.id],
  }),
}));
