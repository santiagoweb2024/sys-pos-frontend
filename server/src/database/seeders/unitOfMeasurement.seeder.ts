import { unitsOfMeasurement } from '../schemas/unitOfMeasurement.schema';
import { DatabaseConfig } from '../config/database.config';

const initialUnitsOfMeasurement = [
  {
    name: 'Kilogramo',
    description: 'Unidad de medida de peso equivalente a 1000 gramos.',
  },
  {
    name: 'Gramo',
    description: 'Unidad de medida de peso, 1/1000 de un kilogramo.',
  },
  {
    name: 'Litro',
    description: 'Unidad de medida de volumen equivalente a 1000 mililitros.',
  },
  {
    name: 'Mililitro',
    description: 'Unidad de medida de volumen, 1/1000 de un litro.',
  },
  {
    name: 'Unidad',
    description: 'Se utiliza para contar productos individuales.',
  },
  {
    name: 'Caja',
    description: 'Unidad de medida para productos vendidos en cajas.',
  },
  {
    name: 'Paquete',
    description: 'Unidad de medida para productos envasados.',
  },
  { name: 'Metro', description: 'Unidad de medida de longitud.' },
  {
    name: 'Bolsa',
    description: 'Unidad de medida para productos vendidos en bolsas.',
  },
  {
    name: 'Tarro',
    description: 'Unidad de medida para productos envasados en tarros.',
  },
  {
    name: 'Botella',
    description: 'Unidad de medida para productos envasados en botellas.',
  },
  {
    name: 'Caja de cartón',
    description: 'Unidad de medida para productos vendidos en cajas de cartón.',
  },
];

export async function seedUnitsOfMeasurement(
  db: ReturnType<typeof DatabaseConfig.getDrizzle>,
) {
  await db.insert(unitsOfMeasurement).values(initialUnitsOfMeasurement);
}
