import { z } from 'zod';

export const adjustStockSchema = z.object({
  quantity: z.number().int('Quantity must be an integer'),
  reason: z.string().min(1, 'Reason is required'),
  type: z.enum(['ADD', 'SUBTRACT'], {
    required_error: 'Type must be either ADD or SUBTRACT',
  }),
});

export type AdjustStockDto = z.infer<typeof adjustStockSchema>;
