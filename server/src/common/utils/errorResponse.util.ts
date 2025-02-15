import { Response } from 'express';

export class ErrorResponse {
  constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly status: number,
    public readonly detail: string,
    public readonly instance: string,
    public readonly validationErrors?: {
      field: string;
      value: any;
      message: string;
    }[],
    public readonly errorCode?: string,
    public readonly timestamp?: string,
    public readonly traceId?: string,
  ) {}

  /**
   * Convierte la instancia de ErrorResponse a un objeto JSON.
   */
  toJSON() {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      detail: this.detail,
      instance: this.instance,
      validationErrors: this.validationErrors,
      errorCode: this.errorCode,
      timestamp: this.timestamp,
      traceId: this.traceId,
    };
  }

  /**
   * Envía el error como respuesta HTTP.
   *
   * @param response Objeto de respuesta HTTP de Express.
   */
  send(response: Response) {
    response.status(this.status).json(this.toJSON());
  }

  /**
   * Método estático para errores de base de datos.
   */
  static databaseError(detail: string, instance: string): ErrorResponse {
    return new ErrorResponse(
      'https://example.com/database-error',
      'Database Error',
      500,
      detail,
      instance,
      undefined,
      'DATABASE_ERROR',
      new Date().toISOString(),
    );
  }

  /**
   * Método estático para errores de validación.
   */
  static validationError(
    instance: string,
    validationErrors: any[],
    status: number,
  ): ErrorResponse {
    return new ErrorResponse(
      'https://example.com/validation-error',
      'Validation Error',
      status,
      'Validation failed',
      instance,
      validationErrors,
      'VALIDATION_ERROR',
      new Date().toISOString(),
    );
  }

  static notFoundError(
    detail: string,
    instance: string,
    errorCode: string = 'NOT_FOUND',
  ): ErrorResponse {
    return new ErrorResponse(
      'https://example.com/not-found',
      'Not Found',
      404,
      detail,
      instance,
      undefined,
      errorCode,
      new Date().toISOString(),
    );
  }
  /**
   * Método estático para errores genéricos.
   */
  static genericError(
    detail: string,
    instance: string,
    status: number = 500,
    errorCode: string = 'GENERIC_ERROR',
  ): ErrorResponse {
    return new ErrorResponse(
      'https://example.com/generic-error',
      'Internal Server Error',
      status,
      detail,
      instance,
      undefined,
      errorCode,
      new Date().toISOString(),
    );
  }
}
