import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {
  CreateSupplierDto,
  QueryPaginationWithSearchDto,
  UpdateSupplierDto,
} from './supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}
  @Post()
  async createBrand(@Body() data: CreateSupplierDto) {
    const brand = await this.supplierService.createSupplier(data);
    return {
      type: 'brand',
      data: brand,
    };
  }

  @Get()
  async getAllBrands(@Query() query: QueryPaginationWithSearchDto) {
    const { supplierList, meta } =
      await this.supplierService.getAllSuppliers(query);
    return {
      type: 'brand',
      data: supplierList,
      meta,
    };
  }

  @Put(':id')
  async updateBrand(@Param('id') id: number, @Body() data: UpdateSupplierDto) {
    await this.supplierService.updateSupplier(id, data);
    return {
      type: 'brand',
    };
  }

  @Delete(':id')
  async deleteSoftBrand(@Param('id') id: number) {
    await this.supplierService.deleteSoftSupplier(id);
    return {
      type: 'brand',
    };
  }
}
