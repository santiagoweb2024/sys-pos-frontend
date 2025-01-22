import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleRepository } from './sale.repository';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
  exports: [SaleService],
})
export class SaleModule {}
