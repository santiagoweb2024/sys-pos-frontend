import { HttpException, HttpStatus } from '@nestjs/common';

export class ZodErrorExeption extends HttpException {
  constructor(validationErrors: Array<{ field: string; message: string }>) {
    super(
      {
        message: 'Validation failed',
        errors: validationErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
