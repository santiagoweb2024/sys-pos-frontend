import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const categories = pgTable('categories', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestampColumns,
});
