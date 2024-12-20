import type { ProductInsert } from '@/shared/types/database/entities/product.types';
import { createProductSchema } from './create-product.dto';

// Hacemos todos los campos opcionales
export const updateProductSchema = createProductSchema.partial();

// El tipo es el mismo que CreateProductDto pero con todos los campos opcionales
export type UpdateProductDto = Partial<ProductInsert>;
