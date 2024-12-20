import { z } from 'zod';
import type { ProductInsert } from '@/shared/types/database/entities/product.types';

export const createProductSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  upc: z
    .string()
    .min(1, 'UPC is required')
    .max(13, 'UPC must be at most 13 characters'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  salePrice: z.number().min(0, 'Sale price must be greater than or equal to 0'),
  purchasePrice: z
    .number()
    .min(0, 'Purchase price must be greater than or equal to 0'),
  unitOfMeasurementId: z
    .number()
    .int()
    .positive('Unit of measurement ID is required'),
  stock: z.number().min(0, 'Stock must be greater than or equal to 0'),
  brandId: z.number().int().positive('Brand ID is required'),
  categoryId: z.number().int().positive('Category ID is required'),
  supplierId: z.number().int().positive('Supplier ID is required'),
  productStatusId: z.number().int().positive('Product status ID is required'),
});

export type CreateProductDto = ProductInsert;
