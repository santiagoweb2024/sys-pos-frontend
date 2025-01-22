import { z } from 'zod';
import { SaleDetailInsert } from '@/shared/types/database/entities/saleDetail.types';

type AddProductToSaleData = Omit<
  SaleDetailInsert,
  'saleId' | 'subTotal' | 'unitPrice'
>;

export const addProductToSaleSchema: z.ZodType<AddProductToSaleData> = z.object(
  {
    productId: z.number().int().positive('Producto es requerido'),
    quantity: z.number().int().positive('Cantidad debe ser mayor a 0'),
  },
);

export type AddProductToSaleDto = z.infer<typeof addProductToSaleSchema>;
