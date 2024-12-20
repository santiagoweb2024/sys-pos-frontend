import { pgTable, serial, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { currencies } from './currencies.schema';

export const businessTypeEnum = pgEnum('businessType', [
  'INDIVIDUAL',
  'COMPANY',
]);

export const businessInfo = pgTable('businessInfo', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  legalName: varchar().notNull(),
  email: varchar().notNull(),
  phone: varchar().notNull(),
  address: varchar().notNull(),
  websiteUrl: varchar().notNull(),
  logoUrl: varchar().notNull(),
  businessType: businessTypeEnum().notNull(),
  taxId: varchar().notNull(),
  timeZone: varchar().notNull(),
  currencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  ...timestampColumns,
});

export const businessInfoRelations = relations(businessInfo, ({ one }) => ({
  currency: one(currencies, {
    fields: [businessInfo.currencyId],
    references: [currencies.id],
  }),
}));
