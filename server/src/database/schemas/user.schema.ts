import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestampColumns } from '@utils/colums.util';
import { roles } from './role.schema';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  userName: varchar({ length: 100 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  roleId: integer().references(() => roles.id),
  ...timestampColumns,
});

export const userRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));
