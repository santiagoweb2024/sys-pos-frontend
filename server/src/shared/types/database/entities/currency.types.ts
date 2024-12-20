import { currencies } from '@/database/schemas/currencies.schema';

export type Currency = typeof currencies.$inferSelect;

export type CurrencyInsert = Omit<
  Currency,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
