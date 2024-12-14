import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const imagesOfProducts = pgTable('imagesOfProducts', {
  id: serial().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  productId: integer(),
  ...timestampColumns,
});
