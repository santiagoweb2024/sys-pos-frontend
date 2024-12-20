import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '../services/logger.service';
import { LogContext } from '../types/logger/logger.types';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, body, query } = request;
    const requestId = uuidv4();
    const startTime = Date.now();

    const logContext: LogContext = {
      requestId,
      method,
      url,
      ip,
      userId: request.user?.id,
    };

    // Debug para detalles de la petición (útil durante desarrollo)
    this.logger.debug(`Request details: ${method} ${url}`, {
      ...logContext,
      body,
      query,
    });

    // Verbose para cada petición entrante (muy frecuente)
    this.logger.verbose(`Incoming ${method} ${url}`, logContext);

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;

          // Log normal para respuestas exitosas
          if (statusCode < 400) {
            this.logger.log(`${method} ${url} completed successfully`, {
              ...logContext,
              statusCode,
              duration,
            });
          }
          // Warn para respuestas con código 4xx
          else if (statusCode < 500) {
            this.logger.warn(`${method} ${url} client error`, {
              ...logContext,
              statusCode,
              duration,
            });
          }
          // Error para respuestas con código 5xx
          else {
            this.logger.error(`${method} ${url} server error`, {
              ...logContext,
              statusCode,
              duration,
            });
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          // Error para excepciones no manejadas
          this.logger.error(`${method} ${url} failed`, {
            ...logContext,
            statusCode: error.status,
            duration,
            error: {
              message: error.message,
              stack: error.stack,
            },
          });
        },
      }),
    );
  }
}
