import { INestApplication } from '@nestjs/common';
import { ResponseFormatInterceptor } from '../interceptors/responseFormat.interceptor';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';
import { LoggerService } from '../services/logger.service';
import { config } from './config';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';

/**
 * Configuración global de la aplicación
 * @param app Instancia de la aplicación NestJS
 */
export function setupApp(app: INestApplication) {
  // Inicializar servicios
  const logger = new LoggerService();

  // Configuración global de pipes
  app.useGlobalPipes(new ZodValidationPipe());

  // Configuración global de interceptores
  app.useGlobalInterceptors(
    new LoggerInterceptor(logger),
    new ResponseFormatInterceptor(),
  );

  // Configuración de CORS
  app.enableCors({
    origin: config.api.allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Configuración de prefijo global para la API
  // Formato: /v{version}/api/store
  // Ejemplo: /v1/api/store/products
  const API_PREFIX = `v${config.api.version}/api/store`;
  logger.log(`API Prefix configured as: ${API_PREFIX}`);
  app.setGlobalPrefix(API_PREFIX);
}
