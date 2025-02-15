import { z } from 'zod';
export const paginationWithSearchSchema = z.object({
  page: z.preprocess(
    (val) => (val === '' ? 1 : val), // Si el valor es vacío, usa 1
    z.coerce
      .number()
      .min(1)
      .refine((val) => !isNaN(val), {
        message: 'Page debe ser un número válido',
      })
      .default(1),
  ),
  limit: z.preprocess(
    (val) => (val === '' ? 10 : val), // Si el valor es vacío, usa 10
    z.coerce
      .number()
      .min(1)
      .max(100)
      .refine((val) => !isNaN(val), {
        message: 'Limit debe ser un número válido entre 1 y 100',
      })
      .default(10),
  ),
  search: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9\s\-&.]*$/, {
      message: 'El término de búsqueda contiene caracteres no permitidos',
    }) // Solo permite letras, números, espacios, guiones, "&" y "."
    .optional(),
});

export const createSupplierSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export type QueryPaginationWithSearchDto = z.infer<
  typeof paginationWithSearchSchema
>;

export type CreateSupplierDto = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierDto = z.infer<typeof updateSupplierSchema>;
