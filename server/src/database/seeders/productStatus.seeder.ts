import { Db } from '@/shared/types/database/common/database.types';
import { productStatus } from '../schemas/productStatus.schema';
import { ProductStatusInsert } from '@/shared/types/database/entities/productStatus.types';

const productStatusInitial: ProductStatusInsert[] = [
  {
    name: 'Disponible',
    description: 'El producto está disponible para la venta',
  },
  {
    name: 'Agotado',
    description: 'El producto está temporalmente fuera de stock',
  },
  {
    name: 'Descontinuado',
    description: 'El producto ya no se venderá más',
  },
  {
    name: 'En Oferta',
    description: 'El producto está en oferta especial',
  },
  {
    name: 'Próximamente',
    description: 'El producto estará disponible próximamente',
  },
];

export const seedProductStatus = async (db: Db) => {
  await db.insert(productStatus).values(productStatusInitial);
};
