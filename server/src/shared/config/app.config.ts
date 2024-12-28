import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatInterceptor } from '../interceptors/responseFormat.interceptor';
/**
 * Configuración global de la aplicación
 * @param app Instancia de la aplicación NestJS
 */
export function setupApp(app: INestApplication) {
  const configService = app.get(ConfigService);

  // Configuración global de pipes
  app.useGlobalPipes();

  // Configuración global de interceptores
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  // Configuración de CORS
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Obtener el prefijo de la URL base

  // Configuración de prefijo global para la API

  const prefix = configService.getOrThrow('api.apiPrefix');
  console.log(prefix);
  app.setGlobalPrefix(prefix);
}
