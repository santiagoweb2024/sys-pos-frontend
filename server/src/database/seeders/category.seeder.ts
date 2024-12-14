import { DatabaseConfig } from '../config/database.config';
import { categories } from '../schemas/category.schema';
const initialCategories = [
  { name: 'Frutas', description: 'Todo tipo de frutas frescas' },
  { name: 'Verduras', description: 'Verduras frescas y saludables' },
  {
    name: 'Productos Lácteos',
    description: 'Leche, queso y otros productos lácteos',
  },
  { name: 'Carnes y Aves', description: 'Carnes rojas, pollo y pavo' },
  { name: 'Bebidas', description: 'Bebidas refrescantes y naturales' },
  { name: 'Snacks', description: 'Botanas y aperitivos' },
  { name: 'Panadería', description: 'Pan y productos de repostería' },
  { name: 'Productos enlatados', description: 'Alimentos enlatados' },
  { name: 'Alimentos Congelados', description: 'Comidas congeladas' },
  { name: 'Artículos de Hogar', description: 'Productos para el hogar' },
];

export async function seedCategories(
  db: ReturnType<typeof DatabaseConfig.getDrizzle>,
) {
  await db.insert(categories).values(initialCategories);
}
