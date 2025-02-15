import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { DatabaseModule } from '@/database/database.module';
import { ImageModule } from '../image/image.module';
import { BrandController } from './brand/brand.controller';
import { SupplierService } from './supplier/supplier.service';
import { SupplierController } from './supplier/supplier.controller';
import { BrandService } from './brand/brand.service';
import { BrandRepository } from './brand/brand.repository';
import { SupplierRepository } from './supplier/supplier.repository';

@Module({
  imports: [DatabaseModule,ImageModule],
  controllers: [ProductController, BrandController, SupplierController],
  providers: [ProductService, ProductRepository, SupplierService, BrandService,  BrandRepository, SupplierRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
