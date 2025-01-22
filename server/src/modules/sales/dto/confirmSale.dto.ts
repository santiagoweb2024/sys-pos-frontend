import { z } from 'zod';

export const confirmSaleSchema = z.object({
  paymentMethodId: z.number(),
});

export type ConfirmSaleDto = z.infer<typeof confirmSaleSchema>;
