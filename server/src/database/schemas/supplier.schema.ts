import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { timestampColumns } from '@/utils/colums.util';

export const suppliers = pgTable('suppliers', {
  id: serial().primaryKey(), // Identificador único del proveedor
  name: varchar({ length: 100 }).notNull(), // Nombre del proveedor
  contactPerson: varchar({ length: 100 }), // Persona de contacto
  email: varchar({ length: 100 }), // Correo electrónico
  phone: varchar({ length: 20 }), // Número de teléfono
  address: varchar({ length: 255 }), // Dirección
  city: varchar({ length: 100 }), // Ciudad
  state: varchar({ length: 100 }), // Estado
  country: varchar({ length: 100 }), // País
  postalCode: varchar({ length: 20 }), // Código postal
  statusId: integer().notNull(), // Clave foránea que referencia el estado en supplierStates
  ...timestampColumns, // Fechas de creación y actualización
});
