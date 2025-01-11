import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { GetSaleQueryDto, getSaleQuerySchema } from './dto/getSale.dto';
import { ZodValidationPipe } from '@/shared/pipes/zodValidation.pipe';
import { SaleService } from './sale.service';
import { CreateSaleDto, createSaleSchema } from './dto/createSale.dto';
import {
  AddProductToSaleDto,
  addProductToSaleSchema,
} from './dto/addProductToSale.dto';
import { ConfirmSaleDto, confirmSaleSchema } from './dto/confirmSale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(getSaleQuerySchema))
  async getAllSales(@Query() query: GetSaleQueryDto) {
    const { items, meta } = await this.saleService.getAllSales(query);
    return {
      statusCode: HttpStatus.OK,
      type: 'sales',
      message: `Se encontraron ${items.length} ventas`,
      data: items,
      ...meta,
    };
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createSaleSchema))
  async createSale(@Body() data: CreateSaleDto) {
    const sale = await this.saleService.createSale(data);
    return {
      statusCode: HttpStatus.CREATED,
      type: 'sale',
      message: 'Venta creada exitosamente',
      data: sale,
    };
  }

  @Get(':id')
  async getSaleById(@Param('id') saleId: string) {
    const sale = await this.saleService.getSaleWithDetails(parseInt(saleId));
    return {
      statusCode: HttpStatus.OK,
      type: 'sale',
      message: 'Venta encontrada exitosamente',
      data: sale,
    };
  }

  @Post(':id/add-product')
  @UsePipes(new ZodValidationPipe(addProductToSaleSchema))
  async addProductToSale(
    @Param('id') saleId: string,
    @Body() data: AddProductToSaleDto,
  ) {
    const updatedSale = await this.saleService.addProductToSale(
      parseInt(saleId),
      data,
    );
    return {
      statusCode: HttpStatus.OK,
      type: 'sale',
      message: 'Producto agregado exitosamente',
      data: updatedSale,
    };
  }

  @Post(':id/confirm')
  @UsePipes(new ZodValidationPipe(confirmSaleSchema))
  async confirmSale(@Param('id') saleId: string, @Body() data: ConfirmSaleDto) {
    const confirmedSale = await this.saleService.confirmSale(
      parseInt(saleId),
      data,
    );
    return {
      statusCode: HttpStatus.OK,
      type: 'sale',
      message: 'Venta confirmada exitosamente',
      data: confirmedSale,
    };
  }
}
