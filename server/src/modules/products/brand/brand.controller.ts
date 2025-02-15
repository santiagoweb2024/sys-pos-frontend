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
import {
  CreateBrandDto,
  QueryPaginationWithSearchDto,
  UpdateBrandDto,
} from './brand.dto';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Post()
  async createBrand(@Body() data: CreateBrandDto) {
    const brand = await this.brandService.createBrand(data);
    return {
      type: 'brand',
      data: brand,
    };
  }

  @Get()
  async getAllBrands(@Query() query: QueryPaginationWithSearchDto) {
    const { brandList, meta } = await this.brandService.getAllBrands(query);
    return {
      type: 'brand',
      data: brandList,
      meta,
    };
  }

  @Put(':id')
  async updateBrand(@Param('id') id: number, @Body() data: UpdateBrandDto) {
    await this.brandService.updateBrand(id, data);
    return {
      type: 'brand'
    };
  }

  @Delete(':id')
  async deleteSoftBrand(@Param('id') id: number) {
    await this.brandService.deleteSoftBrand(id);
    return {
      type: 'brand',
    };
  }
}
