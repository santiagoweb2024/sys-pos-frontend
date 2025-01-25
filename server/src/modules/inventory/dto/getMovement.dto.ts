import { z } from 'zod';
import { InventoryInsert } from '@/shared/types/database/entities/inventory.types';
import { movementTypeEnum } from '@/database/schemas/inventories.schema';
const movementTypeValues = movementTypeEnum.enumValues;

type MovementQueryIn = {
  page?: string;
  limit?: string;
  productId?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
};

type MovementQueryOut = {
  page?: number;
  limit?: number;
  productId?: InventoryInsert['productId'];
  type?: InventoryInsert['movementType'];
  startDate?: string;
  endDate?: string;
};

export const getMovementQuerySchema: z.ZodType<
  MovementQueryOut,
  z.ZodTypeDef,
  MovementQueryIn
> = z.object({
  page: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  limit: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  productId: z
    .string()
    .transform((val) => {
      if (val === '') return undefined;
      return Number(val);
    })
    .optional(),
  type: z.enum(movementTypeValues).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type GetMovementQueryDto = z.infer<typeof getMovementQuerySchema>;
