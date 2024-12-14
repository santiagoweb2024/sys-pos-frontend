import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';
export const supplierStates = pgTable('supplier_states', {
  id: serial().primaryKey(), // Identificador único del estado del proveedor
  status: varchar({ length: 100 }).notNull(), // Nombre del estado
  description: varchar({ length: 255 }), // Descripción del estado (opcional)
  ...timestampColumns, // Fechas de creación y actualización
});
