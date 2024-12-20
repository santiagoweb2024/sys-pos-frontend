import { inventories } from '@/database/schemas/inventories.schema';

export type Inventory = typeof inventories.$inferSelect;

export type InventoryInsert = Omit<
  Inventory,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
