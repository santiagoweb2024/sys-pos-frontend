import { z } from 'zod';

type ProductQuery = {
  page?: number;
  limit?: number;
  name?: string;
  sku?: string;
  upc?: string;
};

// Usando coerción para transformar la entrada de tipo string a number
export const getProductQuerySchema = z.object({
  page: z.coerce.number().optional(), // Coerce: transforma string a number
  limit: z.coerce.number().optional(), // Coerce: transforma string a number
  name: z.string().optional(), // Se mantiene como string
  sku: z.string().optional(), // Búsqueda exacta por SKU
  upc: z.string().optional(), // Búsqueda exacta por UPC
}) satisfies z.ZodType<ProductQuery>;

export type GetProductQueryDto = z.infer<typeof getProductQuerySchema>;
