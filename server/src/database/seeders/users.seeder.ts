// users.seeder.ts

import { Db } from '@/shared/types/database/common/database.types';
import { users } from '../schemas/users.schema';
import { UserInsert } from '@/shared/types/database/entities/user.types';
import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const usersInitial: Omit<UserInsert, 'password'>[] = [
  {
    name: 'Admin Principal',
    email: 'admin@example.com',
    userName: 'admin',
    roleId: 1, // ADMIN
  },
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    userName: 'jperez',
    roleId: 2, // CASHIER
  },
  {
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    userName: 'mgonzalez',
    roleId: 3, // MANAGER
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    userName: 'clopez',
    roleId: 2, // CASHIER
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    userName: 'amartinez',
    roleId: 2, // CASHIER
  },
];

export const seedUsers = async (db: Db) => {
  const hashedPassword = await hashPassword('123456'); // Contraseña por defecto para todos los usuarios

  const usersWithPassword = usersInitial.map((user) => ({
    ...user,
    password: hashedPassword,
  }));

  await db.insert(users).values(usersWithPassword);
};
