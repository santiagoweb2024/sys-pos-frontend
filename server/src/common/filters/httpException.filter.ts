import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseError } from 'pg';
import { ErrorResponse } from '../utils/errorResponse.util';
import { ZodErrorExeption } from '../exeptions/zodErrorExeption';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // Mensajes de error específicos para códigos de error de PostgreSQL
  static readonly DATABASE_ERROR_MESSAGES: { [key: string]: string } = {
    '23503': 'No se puede procesar porque una entidad relacionada no existe',
    '23505': 'Ya existe un registro con estos datos',
  };

  // Mapeo de tipos de error a métodos de manejo
  private readonly errorMapping: Record<
    string,
    (error: any, request: Request, response: Response) => void
  > = {
    DatabaseError: this.handleDatabaseError.bind(this),
    ZodErrorExeption: this.handleZodErrorExeption.bind(this),
    NotFoundException: this.handleNotFoundException.bind(this),
    default: this.handleGenericError.bind(this),
  };

  // Método principal del filtro
  catch(error: unknown, host: ArgumentsHost): void {
    const { request, response } = this.getRequestAndResponse(host);
    const errorType = this.getErrorTypeInstance(error);
    const handler =
      this.errorMapping[errorType] || this.errorMapping['default'];
    handler(error, request, response);
  }

  // Identifica el tipo de error basado en su instancia
  private getErrorTypeInstance(error: unknown): string {
    if (error instanceof DatabaseError) return 'DatabaseError';
    if (error instanceof ZodErrorExeption) return 'ZodErrorExeption';
    if (error instanceof NotFoundException) return 'NotFoundException';
    return 'default';
  }

  // Manejo de errores de base de datos
  private handleDatabaseError(
    error: DatabaseError,
    request: Request,
    response: Response,
  ): void {
    const { code } = error;
    if (!code) return;

    const message =
      GlobalExceptionFilter.DATABASE_ERROR_MESSAGES[code] ||
      'Error en la operación de base de datos';

    ErrorResponse.databaseError(message, request.url).send(response);
  }

  // Manejo de errores de validación (Zod)
  private handleZodErrorExeption(
    error: ZodErrorExeption,
    request: Request,
    response: Response,
  ): void {
    const responseError = error.getResponse();
    const status = error.getStatus();

    if (this.isObjectWithErrors(responseError)) {
      ErrorResponse.validationError(
        request.url,
        responseError.errors,
        status,
      ).send(response);
    }
  }

  // Manejo de errores de tipo NotFoundException
  private handleNotFoundException(
    error: NotFoundException,
    request: Request,
    response: Response,
  ): void {
    ErrorResponse.notFoundError(error.message, request.url).send(response);
  }

  // Manejo de errores genéricos
  private handleGenericError(
    error: any,
    request: Request,
    response: Response,
  ): void {
    console.error(`Error no manejado${error.name}:`,error);
    ErrorResponse.genericError(error.message, request.url).send(response);
  }

  // Verifica si un objeto tiene la estructura { errors: any[] }
  private isObjectWithErrors(obj: any): obj is { errors: any[] } {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'errors' in obj &&
      Array.isArray(obj.errors)
    );
  }

  // Extrae request y response del contexto
  private getRequestAndResponse(host: ArgumentsHost): {
    request: Request;
    response: Response;
  } {
    const context = host.switchToHttp();
    return {
      request: context.getRequest(),
      response: context.getResponse(),
    };
  }
}
