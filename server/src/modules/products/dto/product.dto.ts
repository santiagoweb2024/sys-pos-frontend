import { z } from 'zod';

export const createProductSchema = z.object({
  sku: z
    .string()
    .min(1, 'SKU es requerido')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'SKU debe ser alfanumérico con guiones o guiones bajos',
    ), // Asegura que sea alfanumérico

  upc: z
    .string()
    .length(13, 'UPC debe tener exactamente 13 caracteres')
    .regex(/^\d+$/, 'UPC debe contener solo números'), // Asegura que el UPC sea solo numérico

  name: z
    .string()
    .min(1, 'Nombre es requerido')
    .max(100, 'El nombre no puede exceder los 100 caracteres'), // Asegura que el nombre no sea demasiado largo

  description: z.string().min(1, 'Descripción es requerida'),

  purchasePrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Precio de compra debe ser un número con hasta 2 decimales',
    )
    .refine(
      (val) => parseFloat(val) > 0,
      'El precio de compra debe ser mayor a 0',
    ), // Asegura que el precio de compra sea positivo

    markupPercentage: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Porcentaje de ganancia debe ser un número con hasta 2 decimales',
    )
    .optional()
    .refine(
      (val) => val === undefined || (parseFloat(val) >= 0 && parseFloat(val) <= 100),
      'El porcentaje de ganancia debe estar entre 0 y 100',
    ),

  unitOfMeasurementId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine(
      (val) => val > 0,
      'Unidad de medida es requerida y debe ser mayor a 0',
    ),

  stock: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0, 'Stock no puede ser negativo'),

  brandId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Marca es requerida y debe ser mayor a 0'),

  categoryId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Categoría es requerida y debe ser mayor a 0'),

  supplierId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Proveedor es requerido y debe ser mayor a 0'),

  productStatusId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine(
      (val) => val > 0,
      'Estado del producto es requerido y debe ser mayor a 0',
    ),
});

export const updateProductSchema = createProductSchema.partial();
export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
