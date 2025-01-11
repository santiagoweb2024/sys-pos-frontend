import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { config } from './shared/config/config';
import { ProductModule } from './modules/products/product.module';
import { SaleModule } from './modules/sales/sale.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    DatabaseModule,
    ProductModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
