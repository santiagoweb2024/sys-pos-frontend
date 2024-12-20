import { Db } from '@/shared/types/database/common/database.types';
import { unitsOfMeasurement } from '../schemas/unitsOfMeasurement';
import { UnitOfMeasurementInsert } from '@/shared/types/database/entities/unitOfMeasuremen.types';

const unitsOfMeasurementInitial: UnitOfMeasurementInsert[] = [
  {
    name: 'Kilogramo',
    symbol: 'kg',
    type: 'WEIGHT',
    baseUnit: true,
    conversionFactor: '1',
    description: 'Unidad de masa',
  },
  {
    name: 'Gramo',
    symbol: 'g',
    type: 'WEIGHT',
    baseUnit: false,
    conversionFactor: '0.001',
    description: 'Unidad de masa',
  },
  {
    name: 'Litro',
    symbol: 'L',
    type: 'VOLUME',
    baseUnit: true,
    conversionFactor: '1',
    description: 'Unidad de volumen',
  },
  {
    name: 'Mililitro',
    symbol: 'ml',
    type: 'VOLUME',
    baseUnit: false,
    conversionFactor: '0.001',
    description: 'Unidad de volumen',
  },
  {
    name: 'Unidad',
    symbol: 'u',
    type: 'UNIT',
    baseUnit: true,
    conversionFactor: '1',
    description: 'Unidad básica',
  },
];

export const seedUnitsOfMeasurement = async (db: Db) => {
  await db.insert(unitsOfMeasurement).values(unitsOfMeasurementInitial);
};
