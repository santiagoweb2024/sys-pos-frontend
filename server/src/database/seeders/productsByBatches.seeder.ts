import { Db } from '@/shared/types/database/common/database.types';
import { productByBatches } from '../schemas/productsByBatches.schema';
import { ProductByBatchInsert } from '@/shared/types/database/entities/productByBatch.types';

const productsByBatchesInitial: ProductByBatchInsert[] = [
  // Lotes de bebidas
  {
    productId: 1, // Coca Cola 600ml
    batchId: 'CC24011501', // 2024-01-15 Lote 01
    quantity: 60,
  },
  {
    productId: 1, // Coca Cola 600ml
    batchId: 'CC24011502', // 2024-01-15 Lote 02
    quantity: 40,
  },

  // Lotes de lácteos
  {
    productId: 2, // Leche Gloria
    batchId: 'LG24011801', // 2024-01-18 Lote 01
    quantity: 30,
  },
  {
    productId: 2, // Leche Gloria
    batchId: 'LG24011802', // 2024-01-18 Lote 02
    quantity: 20,
  },

  // Lotes de abarrotes
  {
    productId: 3, // Arroz Costeño
    batchId: 'AC24011001', // 2024-01-10 Lote 01
    quantity: 30,
  },
  {
    productId: 4, // Aceite Primor
    batchId: 'AP24011201', // 2024-01-12 Lote 01
    quantity: 40,
  },

  // Lotes de galletas
  {
    productId: 6, // Galletas Oreo
    batchId: 'GO24011601', // 2024-01-16 Lote 01
    quantity: 50,
  },
  {
    productId: 6, // Galletas Oreo
    batchId: 'GO24011602', // 2024-01-16 Lote 02
    quantity: 30,
  },

  // Lotes de productos de limpieza
  {
    productId: 11, // Detergente Bolivar
    batchId: 'DB24011401', // 2024-01-14 Lote 01
    quantity: 35,
  },

  // Lotes de productos de higiene
  {
    productId: 12, // Jabón Protex
    batchId: 'JP24011701', // 2024-01-17 Lote 01
    quantity: 50,
  },

  // Lotes de agua
  {
    productId: 14, // Agua San Luis
    batchId: 'AS24011901', // 2024-01-19 Lote 01
    quantity: 45,
  },
  {
    productId: 14, // Agua San Luis
    batchId: 'AS24011902', // 2024-01-19 Lote 02
    quantity: 30,
  },
];

export const seedProductsByBatches = async (db: Db) => {
  await db.insert(productByBatches).values(productsByBatchesInitial);
};
