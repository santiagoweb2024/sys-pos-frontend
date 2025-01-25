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
    return this.inventoryService.getAllMovements(movementQuery);
  }

/*   @Get('movements/:productId')
  getProductMovements(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: 'IN' | 'OUT',
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {}

  // Stock
  @Get('stock/:productId')
  getProductStock(@Param('productId', ParseIntPipe) productId: number) {}

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
