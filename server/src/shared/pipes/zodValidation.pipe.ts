import { Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';
import { ZodErrorExeption } from '../exeptions/zodErrorExeption';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      throw new ZodErrorExeption(formattedErrors);
    }
    return result.data;
  }
}
