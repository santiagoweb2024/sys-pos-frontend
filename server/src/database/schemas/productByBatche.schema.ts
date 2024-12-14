import { pgTable, serial, varchar, integer, date } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const productByBatches = pgTable('productByBatches', {
  id: serial().primaryKey(),
  productId: integer().notNull(),
  batchNumber: varchar({ length: 100 }).notNull(),
  quantity: integer().notNull(),
  expirationDate: date().notNull(),
  ...timestampColumns,
});
