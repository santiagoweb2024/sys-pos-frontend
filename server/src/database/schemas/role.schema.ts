import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestampColumns } from '@utils/colums.util';
import { users } from './user.schema';

export const roles = pgTable('roles', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestampColumns,
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
