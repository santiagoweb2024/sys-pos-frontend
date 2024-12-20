import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';

export const roles = pgTable('roles', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  ...timestampColumns,
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
