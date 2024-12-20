import { unitsOfMeasurement } from '@/database/schemas/unitsOfMeasurement';

export type UnitOfMeasurement = typeof unitsOfMeasurement.$inferInsert;

export type UnitOfMeasurementInsert = Omit<
  UnitOfMeasurement,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
