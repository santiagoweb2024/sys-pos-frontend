import { z } from 'zod';
import type { ProductInsert } from '@/shared/types/database/entities/product.types';

export const createProductSchema = z.object({
  sku: z.string().min(1, 'SKU es requerido'),
  upc: z.string().length(13, 'UPC debe tener 13 caracteres'),
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().min(1, 'Descripción es requerida'),
  salePrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Precio de venta debe ser un número con hasta 2 decimales',
    ),
  purchasePrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Precio de compra debe ser un número con hasta 2 decimales',
    ),
  unitOfMeasurementId: z
    .number()
    .int()
    .positive('Unidad de medida es requerida'),
  stock: z.number().int().min(0, 'Stock no puede ser negativo'),
  brandId: z.number().int().positive('Marca es requerida'),
  categoryId: z.number().int().positive('Categoría es requerida'),
  supplierId: z.number().int().positive('Proveedor es requerido'),
  productStatusId: z
    .number()
    .int()
    .positive('Estado del producto es requerido'),
}) satisfies z.ZodType<ProductInsert>;

export type CreateProductDto = z.infer<typeof createProductSchema>;
