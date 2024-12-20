import { Db } from '@/shared/types/database/common/database.types';
import { inventories } from '../schemas/inventories.schema';
import { InventoryInsert } from '@/shared/types/database/entities/inventory.types';

const inventoriesInitial: InventoryInsert[] = [
  // Entradas iniciales de stock
  {
    productId: 1, // Coca Cola 600ml
    quantity: 100,
    movementType: 'IN',
    description: 'Stock inicial',
  },
  {
    productId: 2, // Leche Gloria
    quantity: 50,
    movementType: 'IN',
    description: 'Stock inicial',
  },
  {
    productId: 3, // Arroz Costeño
    quantity: 30,
    movementType: 'IN',
    description: 'Stock inicial',
  },

  // Movimientos de venta
  {
    productId: 1, // Coca Cola 600ml
    quantity: 2,
    movementType: 'OUT',
    description: 'Venta #1001',
  },
  {
    productId: 2, // Leche Gloria
    quantity: 3,
    movementType: 'OUT',
    description: 'Venta #1001',
  },

  // Reposición de stock
  {
    productId: 4, // Aceite Primor
    quantity: 40,
    movementType: 'IN',
    description: 'Reposición semanal',
  },
  {
    productId: 5, // Atún Florida
    quantity: 60,
    movementType: 'IN',
    description: 'Reposición semanal',
  },

  // Ajustes de inventario
  {
    productId: 3, // Arroz Costeño
    quantity: 2,
    movementType: 'OUT',
    description: 'Merma por rotura',
  },
  {
    productId: 6, // Galletas Oreo
    quantity: 80,
    movementType: 'IN',
    description: 'Nuevo producto',
  },

  // Movimientos recientes
  {
    productId: 14, // Agua San Luis
    quantity: 75,
    movementType: 'IN',
    description: 'Compra mayorista',
  },
  {
    productId: 15, // Chocolate Sublime
    quantity: 90,
    movementType: 'IN',
    description: 'Compra mayorista',
  },
  {
    productId: 11, // Detergente Bolivar
    quantity: 35,
    movementType: 'IN',
    description: 'Reposición mensual',
  },
];

export const seedInventories = async (db: Db) => {
  await db.insert(inventories).values(inventoriesInitial);
};
