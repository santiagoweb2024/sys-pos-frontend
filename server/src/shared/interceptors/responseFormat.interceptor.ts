import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Response,
  HttpExceptionResponse,
  SuccessResponse,
  ErrorResponse,
} from '../types/http/response.types';

// Type guard for HttpExceptionResponse
function isHttpExceptionResponse(
  response: unknown,
): response is HttpExceptionResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    (typeof (response as any).message === 'string' ||
      Array.isArray((response as any).message))
  );
}

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map(
        (data): SuccessResponse<T> => ({
          statusCode,
          message: 'Success',
          data,
        }),
      ),
      catchError((error) => {
        if (error instanceof HttpException) {
          const response = error.getResponse();
          const exceptionResponse: HttpExceptionResponse =
            typeof response === 'string'
              ? { message: response }
              : isHttpExceptionResponse(response)
                ? response
                : { message: 'Unknown error' };

          const errorMessage = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message[0]
            : exceptionResponse.message;

          return throwError(
            (): ErrorResponse => ({
              statusCode: error.getStatus(),
              message: errorMessage,
              error: exceptionResponse.error || error.name,
            }),
          );
        }
        return throwError(
          (): ErrorResponse => ({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            error: error.message || 'Unknown error',
          }),
        );
      }),
    );
  }
}
