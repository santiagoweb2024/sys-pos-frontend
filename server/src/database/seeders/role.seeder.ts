import { roles } from '../schemas/role.schema';
import { DatabaseConfig } from '../config/database.config';

const initialRoles = [
  {
    name: 'Administrador',
    description: 'Usuario con acceso total al sistema',
  },
  {
    name: 'Usuario',
    description: 'Usuario con acceso limitado al sistema',
  },
  {
    name: 'Vendedor',
    description: 'Usuario con acceso a módulos de ventas',
  },
  {
    name: 'Almacenero',
    description: 'Usuario con acceso a módulos de inventario',
  },
];

export async function seedRoles(
  db: ReturnType<typeof DatabaseConfig.getDrizzle>,
) {
  try {
    console.log('Starting roles seeding...');

    await db.insert(roles).values(initialRoles);

    console.log('Roles seeding completed successfully');
  } catch (error) {
    console.error('Error during roles seeding:', error);
    throw error;
  }
}
