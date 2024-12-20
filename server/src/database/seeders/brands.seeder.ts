// brands.seeder.ts

import type { Db } from '@/shared/types/database/common/database.types';
import { brands } from '../schemas/brands.schema';
import type { BrandInsert } from '@/shared/types/database/entities/brand.types';

const brandsInitial: BrandInsert[] = [
  {
    name: 'Nestlé',
    description: 'Productos alimenticios y bebidas',
  },
  {
    name: 'Unilever',
    description: 'Productos de cuidado personal y del hogar',
  },
  {
    name: 'Procter & Gamble',
    description: 'Productos de cuidado personal y del hogar',
  },
  {
    name: 'Coca-Cola',
    description: 'Bebidas y refrescos',
  },
  {
    name: 'PepsiCo',
    description: 'Bebidas y snacks',
  },
  {
    name: 'Colgate-Palmolive',
    description: 'Productos de higiene personal y del hogar',
  },
  {
    name: 'Kimberly-Clark',
    description: 'Productos de higiene personal y del hogar',
  },
  {
    name: 'Elite',
    description: 'Productos de higiene personal y del hogar',
  },
];

export const seedBrands = async (db: Db) => {
  await db.insert(brands).values(brandsInitial);
};
