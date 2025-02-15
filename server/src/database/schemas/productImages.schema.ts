import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const productImages = pgTable('productImages', {
  id: serial().primaryKey(),
  productId: integer()
    .references(() => products.id)
    .notNull(),
  imageUrl: varchar().notNull(),
  publicId: varchar(),
  ...timestampColumns,
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export type ProductImage = typeof productImages.$inferSelect;
export type NewImage = typeof productImages.$inferInsert;
export type UpdateImage = Partial<NewImage>;
