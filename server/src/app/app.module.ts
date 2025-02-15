import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from '../database/database.module';
import { ProductModule } from '../modules/products/product.module';
import { AppService } from './app.service';
import { ImageModule } from '@/modules/image/image.module';
@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    ImageModule
  ],
  controllers: [AppController],
  providers:[AppService]
})
export class AppModule {}
