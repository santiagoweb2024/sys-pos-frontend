import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { z } from 'zod';
import { ZodErrorExeption } from '../exeptions/zodErrorExeption';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // Verifica si el tipo de datos es 'body' (para no validar parámetros o consultas)
    if (metadata.type === 'body') {
      const result = this.schema.safeParse(value);
      console.log("value type body-->", value);
      if (!result.success) {
        // Formatea los errores
        const formattedErrors = result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        // Lanza una excepción personalizada con los errores formateados
        throw new ZodErrorExeption(formattedErrors);
      }

      return result.data;
    }

    if (metadata.type === 'query') {
      const result = this.schema.safeParse(value);
      console.log("value type query-->", value);
      if (!result.success) {
        // Formatea los errores
        const formattedErrors = result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        // Lanza una excepción personalizada con los errores formateados
        throw new ZodErrorExeption(formattedErrors);
      }

      return result.data;
    }
    // Si no es el cuerpo, pasa el valor tal cual sin validación
    return value;
  }
}
