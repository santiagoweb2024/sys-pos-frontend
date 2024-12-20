import { Db } from '@/shared/types/database/common/database.types';
import { categories } from '../schemas/categories.schema';
import { CategoryInsert } from '@/shared/types/database/entities/categorie.types';

const categoriesInitial: CategoryInsert[] = [
  {
    name: 'Alimentos',
    description: 'Productos alimenticios básicos como arroz, frijoles, etc.',
  },
  {
    name: 'Bebidas',
    description: 'Refrescos, jugos, agua embotellada, etc.',
  },
  {
    name: 'Lácteos',
    description: 'Leche, queso, yogur, etc.',
  },
  {
    name: 'Carnes',
    description: 'Carne de res, pollo, cerdo, etc.',
  },
  {
    name: 'Panadería',
    description: 'Pan, galletas, pasteles, etc.',
  },
  {
    name: 'Higiene Personal',
    description: 'Jabón, champú, pasta dental, etc.',
  },
  {
    name: 'Limpieza',
    description: 'Detergentes, desinfectantes, etc.',
  },
  {
    name: 'Enlatados',
    description: 'Productos enlatados como atún, vegetales, etc.',
  },
  {
    name: 'Snacks',
    description: 'Botanas, papas fritas, galletas, etc.',
  },
  {
    name: 'Condimentos',
    description: 'Salsas, especias, aderezos, etc.',
  },
];

export const seedCategories = async (db: Db) => {
  await db.insert(categories).values(categoriesInitial);
};
