import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const productImages = pgTable('productImages', {
  id: serial().primaryKey(),
  productId: integer()
    .references(() => products.id)
    .notNull(),
  imageUrl: varchar().notNull(),
  ...timestampColumns,
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
