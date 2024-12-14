import {
  pgTable,
  serial,
  varchar,
  decimal,
  integer,
  date,
} from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const sessionBoxes = pgTable('sessionBoxes', {
  id: serial().primaryKey(),
  userId: integer().notNull(),
  initialAmount: decimal({ precision: 10, scale: 2 }).notNull(), // Monto inicial en la caja
  finalAmount: decimal({ precision: 10, scale: 2 }).notNull(), // Monto final en la caja
  totalSales: decimal({ precision: 10, scale: 2 }).notNull(), // Total de ventas
  totalReturns: decimal({ precision: 10, scale: 2 }).notNull(), // Total de devoluciones
  date: date().notNull(), // Fecha de la sesión de caja
  notes: varchar({ length: 255 }), // Notas opcionales
  status: varchar({ length: 20 }).notNull(), // Estado de la sesión de caja (abierta, cerrada)
  ...timestampColumns,
});
