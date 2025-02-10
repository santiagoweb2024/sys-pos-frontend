import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { AdjustStockDto } from './dto/adjustStock.dto';
import { CreateBatchDto } from './dto/createBatch.dto';
import { UpdateBatchDto } from './dto/updateBatch.dto';
import {
  GetMovementQueryDto,
  getMovementQuerySchema,
} from './dto/getMovement.dto';
import { ZodValidationPipe } from '@/shared/pipes/zodValidation.pipe';
import { InventoryService } from './inventory.service';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  // Movimientos de Inventario
  @Get('movements')
  @UsePipes(new ZodValidationPipe(getMovementQuerySchema))
  async getAllMovements(
    @Query()
    movementQuery: GetMovementQueryDto,
  ) {
    const { items, meta } =
      await this.inventoryService.getAllMovements(movementQuery);
    return {
      statusCode: 200,
      type: 'movements',
      message: `Se encontraron ${items.length} movimientos`,
      data: items,
      ...meta,
    };
  }

  // Stock
  @Get('stock/:productId')
  async getProductStock(@Param('productId', ParseIntPipe) productId: number) {
    const stock = await this.inventoryService.getProductStock(productId);
    return {
      statusCode: 200,
      type: 'stock',
      message: `Stock actual del producto ${productId}`,
      data: stock,
    };
  }
  /* 
  @Patch('stock/:productId/adjust')
  adjustStock(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() adjustStockDto: AdjustStockDto,
  ) {}
  
  // Lotes (Batches)
  @Get('batches')
  getBatches(
    @Query('productId', ParseIntPipe) productId?: number,
    @Query('expirationBefore') expirationBefore?: string,
    @Query('expirationAfter') expirationAfter?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {}

  @Get('batches/:batchId')
  getBatchById(@Param('batchId', ParseIntPipe) batchId: number) {}

  @Post('batches')
  createBatch(@Body() createBatchDto: CreateBatchDto) {}

  @Patch('batches/:batchId')
  updateBatch(
    @Param('batchId', ParseIntPipe) batchId: number,
    @Body() updateBatchDto: UpdateBatchDto,
  ) {}

  @Delete('batches/:batchId')
  deleteBatch(@Param('batchId', ParseIntPipe) batchId: number) {} */
}
