import { z } from 'zod';

export const createBatchSchema = z.object({
  productId: z.number(),
  batchNumber: z.string(),
  quantity: z.number().positive(),
  expirationDate: z.string().datetime().optional(),
});

export type CreateBatchDto = z.infer<typeof createBatchSchema>;
