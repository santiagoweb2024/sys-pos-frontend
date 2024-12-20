import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    const schema = metadata.metatype as unknown as ZodSchema;
    if (!schema?.parse) {
      return value;
    }

    try {
      return schema.parse(value);
    } catch (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors:
          error instanceof Error ? error.message : 'Unknown validation error',
      });
    }
  }
}
