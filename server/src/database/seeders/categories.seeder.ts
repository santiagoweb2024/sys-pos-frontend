import { Db } from '@/shared/types/database/common/database.types';
import { categories } from '../schemas/categories.schema';
import { CategoryInsert } from '@/shared/types/database/entities/category.types';

const categoriesInitial: CategoryInsert[] = [
  {
    name: 'Laptops',
    description: 'Computadoras portátiles',
  },
  {
    name: 'Desktops',
    description: 'Computadoras de escritorio',
  },
  {
    name: 'Tablets',
    description: 'Tabletas',
  },
  {
    name: 'Smartphones',
    description: 'Teléfonos inteligentes',
  },
  {
    name: 'Accesorios',
    description: 'Accesorios para computadoras',
  },
];

export async function seedCategories(db: Db) {
  await db.insert(categories).values(categoriesInitial);
}
