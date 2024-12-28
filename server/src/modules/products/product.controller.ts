import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, createProductSchema } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import {
  GetProductQueryDto,
  getProductQuerySchema,
} from './dto/getProduct.dto';
import { ZodValidationPipe } from '@/shared/pipes/zodValidation.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(getProductQuerySchema))
  getAllProducts(@Query() query: GetProductQueryDto) {
    return this.productService.getAllProducts(query);
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productService.updateProduct(id, data);
  }
}
