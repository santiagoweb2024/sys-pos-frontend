import {
  pgTable,
  serial,
  integer,
  decimal,
  varchar,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestampColumns } from '@/utils/colums.util';
import { users } from './user.schema';
import { customers } from './customer.table';
import { sessionBoxes } from './sessionBox.schema';

export const sales = pgTable('sales', {
  id: serial().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  customerId: integer().references(() => customers.id), // Opcional, para ventas a clientes registrados
  sessionBoxId: integer()
    .notNull()
    .references(() => sessionBoxes.id),
  date: date().notNull(),
  subtotal: decimal({ precision: 10, scale: 2 }).notNull(),
  discount: decimal({ precision: 10, scale: 2 }).notNull().default('0'),
  taxPercentage: decimal({ precision: 5, scale: 2 }).notNull().default('0'), // Ejemplo: 18.00 para IGV, 16.00 para IVA, etc.
  taxAmount: decimal({ precision: 10, scale: 2 }).notNull().default('0'), // Monto calculado del impuesto
  total: decimal({ precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar({ length: 50 }).notNull(), // efectivo, tarjeta, etc.
  paymentStatus: varchar({ length: 20 }).notNull().default('completed'), // completed, pending, cancelled
  notes: varchar({ length: 255 }),
  ...timestampColumns,
});

export const salesRelations = relations(sales, ({ one }) => ({
  user: one(users, {
    fields: [sales.userId],
    references: [users.id],
  }),
  customer: one(customers, {
    fields: [sales.customerId],
    references: [customers.id],
  }),
  sessionBox: one(sessionBoxes, {
    fields: [sales.sessionBoxId],
    references: [sessionBoxes.id],
  }),
}));
