import { brands } from '../schemas/brand.schema';
import { DatabaseConfig } from '../config/database.config';
const initialBrands = [
  {
    name: 'Coca-Cola',
    description: 'Bebida carbonatada famosa a nivel mundial.',
  },
  { name: 'Pepsi', description: 'Competidor directo de Coca-Cola.' },
  { name: 'Nestlé', description: 'Multinacional de alimentos y bebidas.' },
  { name: 'Bimbo', description: 'Marca de pan y productos de panadería.' },
  { name: 'La Costeña', description: 'Productos enlatados y salsas.' },
  { name: 'Fabuloso', description: 'Limpiador multiusos.' },
  { name: 'Clorox', description: 'Productos de limpieza y desinfección.' },
  { name: 'Ajax', description: 'Limpiadores y detergentes.' },
  { name: 'Colgate', description: 'Productos de higiene dental.' },
  { name: 'Dove', description: 'Productos de cuidado personal.' },
  { name: 'Del Monte', description: 'Frutas y vegetales enlatados.' },
  { name: 'Hormel', description: 'Carnes enlatadas y productos procesados.' },
  { name: 'Maseca', description: 'Harina de maíz.' },
  { name: 'Goya', description: 'Productos alimenticios latinos.' },
];

export const seedBrands = async (
  db: ReturnType<typeof DatabaseConfig.getDrizzle>,
) => {
  await db.insert(brands).values(initialBrands);
};
