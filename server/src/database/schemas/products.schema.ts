import {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { unitsOfMeasurement } from './unitsOfMeasurement';
import { brands } from './brands.schema';
import { categories } from './categories.schema';
import { suppliers } from './suppliers.schema';
import { productStatus } from './productStatus.schema';
import { productByBatches } from './productsByBatches.schema';
import { inventories } from './inventories.schema';
import { saleDetails } from './saleDetails.schema';

export const products = pgTable('products', {
  id: serial().primaryKey(),
  sku: varchar().notNull().unique(),
  upc: varchar({ length: 13 }).notNull().unique(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  salePrice: decimal({ precision: 10, scale: 2 }).notNull(),
  purchasePrice: decimal({ precision: 10, scale: 2 }).notNull(),
  unitOfMeasurementId: integer()
    .references(() => unitsOfMeasurement.id)
    .notNull(),
  stock: integer().notNull(),
  brandId: integer()
    .references(() => brands.id)
    .notNull(),
  categoryId: integer()
    .references(() => categories.id)
    .notNull(),
  supplierId: integer()
    .references(() => suppliers.id)
    .notNull(),
  productStatusId: integer()
    .references(() => productStatus.id)
    .notNull(),
  ...timestampColumns,
});

export const productsRelations = relations(products, ({ one, many }) => ({
  unitsOfMeasurment: one(unitsOfMeasurement, {
    fields: [products.unitOfMeasurementId],
    references: [unitsOfMeasurement.id],
  }),
  brands: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  categories: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  suppliers: one(suppliers, {
    fields: [products.supplierId],
    references: [suppliers.id],
  }),
  productStatus: one(productStatus, {
    fields: [products.productStatusId],
    references: [productStatus.id],
  }),
  productByBatches: many(productByBatches),
  inventories: many(inventories),
  saleDetails: many(saleDetails),
}));
