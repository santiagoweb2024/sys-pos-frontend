import { Db } from '@/shared/types/database/common/database.types';
import { unitsOfMeasurement } from '../schemas/unitsOfMeasurement';
import { UnitOfMeasurementInsert } from '@/shared/types/database/entities/unitOfMeasurement.types';

const unitsOfMeasurementInitial: UnitOfMeasurementInsert[] = [
  {
    name: 'Kilogramo',
    symbol: 'kg',
    type: 'WEIGHT',
    baseUnit: true,
    conversionFactor: '1',
    description: 'Unidad de masa',
    displayOrder: 1,
  },
  {
    name: 'Gramo',
    symbol: 'g',
    type: 'WEIGHT',
    baseUnit: false,
    conversionFactor: '0.001',
    description: 'Unidad de masa',
    displayOrder: 2,
  },
  {
    name: 'Litro',
    symbol: 'L',
    type: 'VOLUME',
    baseUnit: true,
    conversionFactor: '1',
    description: 'Unidad de volumen',
    displayOrder: 3,
  },
  {
    name: 'Mililitro',
    symbol: 'ml',
    type: 'VOLUME',
    baseUnit: false,
    conversionFactor: '0.001',
    description: 'Unidad de volumen',
    displayOrder: 4,
  },
  {
    name: 'Unidad',
    symbol: 'u',
    type: 'UNIT',
    baseUnit: true,
    conversionFactor: '1',
    description: 'Unidad básica',
    displayOrder: 5,
  },
];

export const seedUnitsOfMeasurement = async (db: Db) => {
  await db.insert(unitsOfMeasurement).values(unitsOfMeasurementInitial);
};
