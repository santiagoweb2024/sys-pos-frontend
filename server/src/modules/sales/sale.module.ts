import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleRepository } from './sale.repository';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
})
export class SaleModule {}
