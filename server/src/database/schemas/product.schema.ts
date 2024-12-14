import {
  pgTable,
  serial,
  varchar,
  decimal,
  integer,
} from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const products = pgTable('products', {
  id: serial().primaryKey(),
  sku: varchar({ length: 100 }).notNull(), // Código único para identificación
  upc: varchar({ length: 13 }).notNull(), // Código de barras único
  name: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  imageOfProductId: varchar({ length: 100 }).notNull(),
  salePrice: decimal({ precision: 10, scale: 2 }).notNull(),
  purchasePrice: decimal({ precision: 10, scale: 2 }).notNull(),
  stock: integer().notNull(),
  minStockLevel: integer().notNull(),
  unitOfMeasurementId: integer().notNull(),
  brandId: integer().notNull(),
  categoryId: integer().notNull(),
  supplierId: integer().notNull(),
  statusId: integer().notNull(),
  ...timestampColumns,
});
