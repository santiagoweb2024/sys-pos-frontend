import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './shared/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Desactivar el ValidationPipe por defecto
    bodyParser: true,
    cors: true,
  });

  setupApp(app);

  await app.listen(3000);
}

bootstrap();
