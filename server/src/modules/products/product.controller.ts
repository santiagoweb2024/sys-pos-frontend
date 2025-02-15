import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  createProductSchema,
  updateProductSchema,
  UpdateProductDto,
} from './dto/product.dto';

import {
  GetProductQueryDto,
  getProductQuerySchema,
} from './dto/getProduct.dto';
import { ZodValidationPipe } from '@/common/pipes/zodValidation.pipe';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //product
  @Get()
  @UsePipes(new ZodValidationPipe(getProductQuerySchema))
  async getAllProducts(@Query() query: GetProductQueryDto) {
    const { items, meta } = await this.productService.getAllProducts(query);
    return {
      statusCode: 200,
      type: 'products',
      message: `Se encontraron ${items.length} productos`,
      data: items,
      ...meta,
    };
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Producto encontrado exitosamente',
      data: product,
    };
  }

  @Post('bulk')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 },{ name: 'images'}]))
  async createProductBulk(@UploadedFiles() files: { file: Express.Multer.File; images: Express.Multer.File[] }) {
    console.log(">>>files",files)
    //const product = await this.productService.createProductBulk(files);
    return {
      type: 'products',
      message: 'Producto creado exitosamente',
      data: null,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateProductDto,
  ) {
    const product = await this.productService.createProduct(file, data);
    return {
      statusCode: 201,
      type: 'products',
      message: 'Producto creado exitosamente',
      data: product,
    };
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    const product = await this.productService.updateProduct(id, data);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Producto actualizado exitosamente',
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
    return {
      statusCode: 200,
      type: 'products',
      message: 'Producto eliminado exitosamente',
      data: null,
    };
  }
}
