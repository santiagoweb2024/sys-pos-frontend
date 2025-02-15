import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { relations } from 'drizzle-orm';
import { businessInfo } from './businessInfo.schema';

export const currencies = pgTable('currencies', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  symbol: varchar().notNull(),
  code: varchar().notNull(),
  description: varchar().notNull(),
  ...timestampColumns,
});

export const currenciesRelations = relations(currencies, ({ many }) => ({
  businessInfo: many(businessInfo),
}));
