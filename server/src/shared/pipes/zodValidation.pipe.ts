import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      // Formatear los errores para que se devuelvan de manera más amigable
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      // Lanzar una excepción con los errores formateados
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
    return result.data;
  }
}
