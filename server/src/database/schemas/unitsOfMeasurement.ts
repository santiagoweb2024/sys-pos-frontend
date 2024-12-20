import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/shared/utils/colums.util';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const unitsOfMeasurement = pgTable('unitsOfMeasurment', {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(), // Ejemplo: "Kilogramo", "Litro"
  symbol: varchar().notNull(), // Ejemplo: "kg", "L"
  type: varchar().notNull(), // "WEIGHT", "VOLUME", "UNIT", "LENGTH"
  baseUnit: boolean().default(false), // Si es una unidad base (kg, L, m)
  conversionFactor: decimal({ precision: 10, scale: 4 }), // Factor de conversión a unidad base
  displayOrder: integer(), // Para ordenar en la UI
  description: varchar(),
  ...timestampColumns,
});
export const unitsOfMeasurementRelations = relations(
  unitsOfMeasurement,
  ({ many }) => ({
    products: many(products),
  }),
);
