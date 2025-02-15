import { timestamp } from 'drizzle-orm/pg-core';
export const timestampColumns = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
};
