import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
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
import {
  UpdateSaleDetailDto,
  updateSaleDetailSchema,
} from './dto/updateSaleDetail.dto';
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

  @Get(':saleId')
  async getSaleById(@Param('saleId') saleId: string) {
    const sale = await this.saleService.getSaleWithDetails(parseInt(saleId));
    return {
      statusCode: HttpStatus.OK,
      type: 'sale',
      message: 'Venta encontrada exitosamente',
      data: sale,
    };
  }

  @Post(':saleId/products')
  @UsePipes(new ZodValidationPipe(addProductToSaleSchema))
  async addProductToSale(
    @Param('saleId') saleId: string,
    @Body()
    data: AddProductToSaleDto,
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

  @Patch(':saleId/status')
  @UsePipes(new ZodValidationPipe(confirmSaleSchema))
  async confirmSale(
    @Param('saleId') saleId: string,
    @Body() data: ConfirmSaleDto,
  ) {
    const updatedSale = await this.saleService.confirmSale(
      parseInt(saleId),
      data.paymentMethodId,
    );
    return {
      statusCode: HttpStatus.OK,
      type: 'sale',
      message: 'Venta confirmada exitosamente',
      data: updatedSale,
    };
  }

  @Delete(':saleId/products/:productId')
  async removeProductFromSale(
    @Param('saleId') saleId: string,
    @Param('productId') productId: string,
  ) {
    const removedDetail = await this.saleService.removeProductFromSale(
      parseInt(saleId),
      parseInt(productId),
    );

    return {
      statusCode: HttpStatus.OK,
      type: 'saleDetail',
      message: 'Producto eliminado de la venta exitosamente',
      data: removedDetail,
    };
  }

  @Patch(':saleId/products/:detailId')
  @UsePipes(new ZodValidationPipe(updateSaleDetailSchema))
  async updateProductInSale(
    @Param('saleId') saleId: string,
    @Param('detailId') detailId: string,
    @Body() data: UpdateSaleDetailDto,
  ) {
    const updatedDetail = await this.saleService.updateProductInSale(
      parseInt(saleId),
      parseInt(detailId),
      data,
    );

    return {
      statusCode: HttpStatus.OK,
      type: 'saleDetail',
      message: 'Producto actualizado exitosamente',
      data: updatedDetail,
    };
  }
}
