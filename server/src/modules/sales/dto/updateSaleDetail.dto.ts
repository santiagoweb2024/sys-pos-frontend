import { z } from 'zod';

export const updateSaleDetailSchema = z.object({
  quantity: z.number().int().positive('Cantidad debe ser mayor a 0'),
});

export type UpdateSaleDetailDto = z.infer<typeof updateSaleDetailSchema>;
