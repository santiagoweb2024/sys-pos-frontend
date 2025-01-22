import { z } from 'zod';

export const updateBatchSchema = z.object({
  batchNumber: z.string().optional(),
  quantity: z.number().positive().optional(),
  expirationDate: z.string().datetime().optional(),
});

export type UpdateBatchDto = z.infer<typeof updateBatchSchema>;
