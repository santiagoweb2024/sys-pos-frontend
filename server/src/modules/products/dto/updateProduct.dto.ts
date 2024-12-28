import { z } from 'zod';
import { createProductSchema } from './createProduct.dto';
import type { ProductUpdate } from '@/shared/types/database/entities/product.types';

export const updateProductSchema =
  createProductSchema.partial() satisfies z.ZodType<ProductUpdate>;

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
