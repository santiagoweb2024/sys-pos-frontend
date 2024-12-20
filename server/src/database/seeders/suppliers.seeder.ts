import { Db } from '@/shared/types/database/common/database.types';
import { suppliers } from '../schemas/suppliers.schema';
import { SupplierInsert } from '@/shared/types/database/entities/supplier.types';

const suppliersInitial: SupplierInsert[] = [
  {
    name: 'Distribuidora Alimentos S.A.',
    description: 'Proveedor de productos alimenticios básicos',
  },
  {
    name: 'Bebidas del Norte',
    description: 'Proveedor de bebidas y refrescos',
  },
  {
    name: 'Lácteos y Más',
    description: 'Proveedor de productos lácteos',
  },
  {
    name: 'Carnes del Sur',
    description: 'Proveedor de carnes y embutidos',
  },
  {
    name: 'Panadería del Valle',
    description: 'Proveedor de productos de panadería',
  },
  {
    name: 'Higiene Personal S.A.',
    description: 'Proveedor de productos de higiene personal',
  },
  {
    name: 'Abarrotes del Centro',
    description: 'Proveedor de productos de abarrotes',
  },
  {
    name: 'Limpieza y Desinfección S.A.',
    description: 'Proveedor de productos de limpieza y desinfección',
  },
  {
    name: 'Distribuidora de Productos de Consumo S.A.',
    description: 'Proveedor de productos de consumo diario',
  },
];

export const seedSuppliers = async (db: Db) => {
  await db.insert(suppliers).values(suppliersInitial);
};
