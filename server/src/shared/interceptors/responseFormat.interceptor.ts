import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../types/response.type';

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next
      .handle()
      .pipe(map((responseData) => this.formatSuccess(responseData, context)));
  }

  private formatSuccess(
    responseData: any,
    context: ExecutionContext,
  ): ApiResponse<T> {
    // Si ya tiene el formato correcto, retornarlo como está
    if (responseData?.statusCode && responseData?.message) {
      return responseData;
    }

    // Obtener el status de la respuesta HTTP
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    // Extraer type, data, message y meta del responseData
    const { type, data, meta, message } = responseData;

    // Construir la respuesta con el formato correcto
    return {
      statusCode,
      message: message || this.getDefaultMessage(statusCode),
      type: type || 'success',
      data: data || responseData,
      ...(meta && { meta }),
    };
  }

  private getDefaultMessage(statusCode: number): string {
    switch (statusCode) {
      case HttpStatus.OK:
        return 'Operation successful';
      case HttpStatus.CREATED:
        return 'Resource created successfully';
      case HttpStatus.ACCEPTED:
        return 'Request accepted';
      case HttpStatus.NO_CONTENT:
        return 'Resource deleted successfully';
      default:
        return 'Operation completed';
    }
  }
}
