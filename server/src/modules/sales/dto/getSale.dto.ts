import { z } from 'zod';
type SaleQuery = {
  page?: number;
  limit?: number;
  status?: 'OPEN' | 'CLOSED';
};
export const getSaleQuerySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  status: z.enum(['OPEN', 'CLOSED']).optional(),
}) satisfies z.ZodType<SaleQuery>;

export type GetSaleQueryDto = z.infer<typeof getSaleQuerySchema>;
