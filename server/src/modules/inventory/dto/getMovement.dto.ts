import { z } from 'zod';
import { InventoryInsert } from '@/shared/types/database/entities/inventory.types';
type MovementQuery = {
  page?: number;
  limit?: number;
  productId?: string;
  type?: Pick<InventoryInsert, 'movementType'>;
  startDate?: string;
  endDate?: string;
};
export const getMovementQuerySchema: z.ZodType<MovementQuery> = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  productId: z.string().optional(),
  type: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type GetMovementQueryDto = z.infer<typeof getMovementQuerySchema>;
