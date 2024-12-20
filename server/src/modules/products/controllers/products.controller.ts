import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  createProductSchema,
} from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import type { Product } from '@/shared/types/database/entities/product.types';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import { LoggerService } from '@/shared/services/logger.service';
import {
  PaginationOptions,
  PaginatedResponse,
} from '@/shared/types/http/response.types';

@Controller('products')
export class ProductsController {
  private readonly logger = new LoggerService(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): Promise<PaginatedResponse<Product>> {
    this.logger.debug('GET /products - Retrieving all products');
    const options: PaginationOptions = {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    };
    return this.productsService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }

  @Get('barcode/:upc')
  async findByUpc(@Param('upc') upc: string): Promise<Product> {
    return this.productsService.findByUpc(upc);
  }

  @Patch(':id/stock')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<Product> {
    return this.productsService.updateStock(id, quantity);
  }
}
