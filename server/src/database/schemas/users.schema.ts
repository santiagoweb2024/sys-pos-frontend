import { pgTable, varchar, serial, integer } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/common/utils/colums.util';
import { roles } from './roles.schema';
import { relations } from 'drizzle-orm';
import { cashMovements } from './cashMovements';
import { cashSessions } from './cashSessions';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  userName: varchar().notNull().unique(),
  password: varchar().notNull(),
  roleId: integer()
    .references(() => roles.id)
    .notNull(),
  ...timestampColumns,
});

export const userRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  cashMovements: many(cashMovements),
  cashSessions: many(cashSessions),
}));
