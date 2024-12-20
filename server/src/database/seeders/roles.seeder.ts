import { Db } from '@/shared/types/database/common/database.types';
import { roles } from '../schemas/roles.schema';
import { RoleInsert } from '@/shared/types/database/entities/role.types';

const rolesInitial: RoleInsert[] = [
  {
    name: 'ADMIN',
    description: 'Administrador del sistema con acceso completo',
  },
  {
    name: 'CASHIER',
    description: 'Cajero con acceso a funciones de venta y caja',
  },
  {
    name: 'MANAGER',
    description: 'Gerente con acceso a reportes y gestión de inventario',
  },
];

export const seedRoles = async (db: Db) => {
  await db.insert(roles).values(rolesInitial);
};
