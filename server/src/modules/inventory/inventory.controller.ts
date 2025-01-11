import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { createProductSchema, CreateProductDto } from './dto/createProduct.dto';
import { updateProductSchema, UpdateProductDto } from './dto/updateProduct.dto';
import { adjustStockSchema, AdjustStockDto } from './dto/adjustStock.dto';
import { ZodValidationPipe } from '@/shared/pipes/zodValidation.pipe';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('products')
  async findAllProducts(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('categoryId', ParseIntPipe) categoryId?: number,
    @Query('brandId', ParseIntPipe) brandId?: number,
    @Query('supplierId', ParseIntPipe) supplierId?: number,
    @Query('productStatusId', ParseIntPipe) productStatusId?: number,
  ) {
    return this.inventoryService.findAllProducts({
      page,
      limit,
      filter: {
        categoryId,
        brandId,
        supplierId,
        productStatusId,
      },
    });
  }

  @Get('products/:id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.inventoryService.findProductById(id);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Producto encontrado exitosamente',
      data: product,
    };
  }

  @Post('products')
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async createProduct(@Body() data: CreateProductDto) {
    const product = await this.inventoryService.createProduct(data);
    return {
      statusCode: 201,
      type: 'products',
      message: 'Producto creado exitosamente',
      data: product,
    };
  }

  @Patch('products/:id')
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ) {
    const product = await this.inventoryService.updateProduct(id, data);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Producto actualizado exitosamente',
      data: product,
    };
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.inventoryService.deleteProduct(id);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Producto eliminado exitosamente',
      data: product,
    };
  }

  @Post('products/:id/adjust-stock')
  @UsePipes(new ZodValidationPipe(adjustStockSchema))
  async adjustStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AdjustStockDto,
  ) {
    const product = await this.inventoryService.adjustStock(id, data);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Stock ajustado exitosamente',
      data: product,
    };
  }
}
