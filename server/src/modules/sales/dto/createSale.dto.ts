import { z } from 'zod';
import { SaleInsert } from '@/shared/types/database/entities/sale.types';

export const createSaleSchema: z.ZodType<SaleInsert> = z.object({
  status: z.enum(['OPEN', 'CLOSED']),
  cashRegisterId: z.number().int().positive('Caja es requerida'),
  userId: z.number().int().positive('Usuario es requerido'),
  customerId: z.number().int().positive('Cliente es requerido').nullable(),
  paymentMethodId: z
    .number()
    .int()
    .positive('Método de pago es requerido')
    .nullable(),
});

export type CreateSaleDto = z.infer<typeof createSaleSchema>;
