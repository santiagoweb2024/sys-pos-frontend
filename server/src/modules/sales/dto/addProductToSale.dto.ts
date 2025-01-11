import { z } from 'zod';

export const addProductToSaleSchema = z.object({
  productId: z.number().int().positive('Producto es requerido'),
  quantity: z.number().int().positive('Cantidad debe ser mayor a 0'),
  unitPrice: z.number().positive('Precio unitario debe ser mayor a 0'),
});

export type AddProductToSaleDto = z.infer<typeof addProductToSaleSchema>;
