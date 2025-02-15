import { z } from 'zod';

export const createImageSchema = z.object({
  imageUrl: z.string().url(),
  publicId: z.string().optional(),
  productId: z.number()
});

export type CreateImageDto = z.infer<typeof createImageSchema>;
