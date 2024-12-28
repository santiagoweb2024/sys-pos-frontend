import { unitsOfMeasurement } from '@/database/schemas/unitsOfMeasurement';

export type UnitOfMeasurement = typeof unitsOfMeasurement.$inferSelect;
export type UnitOfMeasurementInsert = Omit<
  UnitOfMeasurement,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
