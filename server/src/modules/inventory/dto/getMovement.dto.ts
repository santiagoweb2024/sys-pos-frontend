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
  startDate?: Date;
  endDate?: Date;
};

export const getMovementQuerySchema: z.ZodType<
  MovementQueryOut,
  z.ZodTypeDef,
  MovementQueryIn
> = z
  .object({
    page: z
      .string()
      .regex(/^\d+$/, 'La página debe ser un número')
      .transform((val) => Number(val))
      .refine((val) => val > 0, 'La página debe ser mayor a 0')
      .optional(),
    limit: z
      .string()
      .regex(/^\d+$/, 'El límite debe ser un número')
      .transform((val) => Number(val))
      .refine(
        (val) => val > 0 && val <= 100,
        'El límite debe estar entre 1 y 100',
      )
      .optional(),
    productId: z
      .string()
      .regex(/^\d+$/, 'El ID del producto debe ser un número')
      .transform((val) => {
        if (val === '') return undefined;
        const num = Number(val);
        if (isNaN(num)) return undefined;
        return num;
      })
      .refine((val) => !val || val > 0, 'El ID del producto debe ser positivo')
      .optional(),
    type: z
      .enum(movementTypeValues, {
        errorMap: () => ({ message: 'Tipo de movimiento inválido' }),
      })
      .optional(),
    startDate: z
      .string()
      .datetime({ message: 'Fecha de inicio inválida' })
      .transform((val) => new Date(val))
      .refine(
        (date) => !isNaN(date.getTime()),
        'Fecha de inicio debe ser una fecha válida',
      )
      .optional(),
    endDate: z
      .string()
      .datetime({ message: 'Fecha de fin inválida' })
      .transform((val) => new Date(val))
      .refine(
        (date) => !isNaN(date.getTime()),
        'Fecha de fin debe ser una fecha válida',
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: 'La fecha de inicio debe ser menor o igual a la fecha de fin',
      path: ['startDate'],
    },
  )
  .refine(
    (data) => {
      if (data.startDate || data.endDate) {
        return data.startDate && data.endDate;
      }
      return true;
    },
    {
      message: 'Debe proporcionar ambas fechas o ninguna',
      path: ['endDate'],
    },
  );
export type GetMovementQueryDto = z.infer<typeof getMovementQuerySchema>;
