import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/httpException.filter';
import { appConfig } from './config/app/env.loader';
import { ResponseFormatInterceptor } from './common/interceptors/responseFormat.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  // Registrar el filtro global de excepciones
  app.useGlobalInterceptors(new ResponseFormatInterceptor())
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix(appConfig.API_ROUTE_PREFIX);
  await app.listen(appConfig.API_PORT);
}

bootstrap();
