import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/httpException.filter';
import { setupApp } from './shared/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Desactivar el ValidationPipe por defecto
    bodyParser: true,
    cors: true,
  });

  setupApp(app);

  // Registrar el filtro global de excepciones
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3500);
}

bootstrap();
