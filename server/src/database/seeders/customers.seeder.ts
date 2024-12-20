// customers.seeder.ts

import { Db } from '@/shared/types/database/common/database.types';
import { customers } from '../schemas/customers.schema';
import { CustomerInsert } from '@/shared/types/database/entities/customer.types';

const customersInitial: CustomerInsert[] = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+521234567890',
  },
  {
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+521234567891',
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    phone: '+521234567892',
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    phone: '+521234567893',
  },
  {
    name: 'Luis Ramírez',
    email: 'luis.ramirez@example.com',
    phone: '+521234567894',
  },
];

export const seedCustomers = async (db: Db) => {
  await db.insert(customers).values(customersInitial);
};
