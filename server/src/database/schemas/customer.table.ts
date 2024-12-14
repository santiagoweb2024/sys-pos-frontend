import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const customers = pgTable('customers', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }).notNull(),
  phone: varchar({ length: 20 }),
  ...timestampColumns,
});
