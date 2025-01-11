import { z } from 'zod';

export const confirmSaleSchema = z.object({
  paymentMethodId: z.number().int().positive('Método de pago es requerido'),
  customerId: z.number().int().positive('Cliente es requerido').optional(),
});

export type ConfirmSaleDto = z.infer<typeof confirmSaleSchema>;
