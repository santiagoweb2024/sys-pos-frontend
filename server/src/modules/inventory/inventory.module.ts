import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryRepository } from './inventory.repository';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [ProductModule], // Importamos ProductModule para usar su servicio
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [],
})
export class InventoryModule {}
