import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { GetProductQueryDto } from './dto/getProduct.dto';
import { PaginationHelper } from '@/common/helpers/pagination.helper';
import { buildGenericFilter } from '@/common/utils/filterBuilder.util';
import { ImageService } from '../image/image.service';
import {
  CreateBrandDto,
  QueryPaginationWithSearchDto,
} from './brand/brand.dto';
import Decimal from 'decimal.js-light';
import { NewProduct } from '@/database/schemas/products.schema';
@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly imageService: ImageService,
  ) {}

  private validatePrices(salePrice: number, purchasePrice: number) {
    if (salePrice <= purchasePrice) {
      throw new BadRequestException(
        'El precio de venta debe ser mayor al precio de compra',
      );
    }

    const margin = ((salePrice - purchasePrice) / purchasePrice) * 100;
    if (margin < 10) {
      throw new BadRequestException(
        'El margen de ganancia debe ser al menos 10%',
      );
    }
  }
  // product
  async getAllProducts(query: GetProductQueryDto) {
    const { name, sku, upc, ...paginationQuery } = query;
    const { limit, offset, page } =
      PaginationHelper.generatePaginationParams(paginationQuery);
    const filters = buildGenericFilter({ name, sku, upc });
    const { items, total } = { items: [], total: 0 };

    return {
      items,
      meta: PaginationHelper.getPaginationMeta(
        total,
        page,
        limit,
        items.length,
      ),
    };
  }

  async getProductById(id: number) {
    const product = 1;
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProductBulk(files:{ file: Express.Multer.File; images: Express.Multer.File[]}) {
    return 'esto crea productos masicvos'
  }

  async createProduct(file: Express.Multer.File, data: CreateProductDto) {
    let productData: NewProduct = { ...data, salePrice: '' };

    if (data.markupPercentage) {
      const markupPercentage = new Decimal(data.markupPercentage);
      const salePrice = new Decimal(data.purchasePrice)
        .mul(new Decimal(1).add(markupPercentage.div(100)))
        .toDecimalPlaces(2);
      productData.salePrice = salePrice.toString();
    }

    const newProduct = await this.productRepository.createProduct(productData);
    
    const { public_id: publicId, secure_url: imageUrl } =
      await this.imageService.upload(file);
    
      const newImage = await this.imageService.create({
      imageUrl,
      publicId,
      productId: newProduct.id,
    });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    /*  const existingProduct = await this.getProductById(id);

    if (data.salePrice || data.purchasePrice) {
      const salePrice = parseFloat(data.salePrice || existingProduct.salePrice);
      const purchasePrice = parseFloat(
        data.purchasePrice || existingProduct.purchasePrice,
      );

      this.validatePrices(salePrice, purchasePrice);
    } */

    return { id: 1 };
  }

  async deleteProduct(id: number) {
    await this.getProductById(id);
    return { od: 1 };
  }
  // category
  async createCategory(data: any) {}

  async getAllCategories() {}

  async getCategoryId() {}

  async updateCategory() {}

  async deleteCategory() {}
  // supplier
  async createSupplier(data: any) {}

  async getAllSuppliers() {}

  async getSupplierId() {}

  async updateSupplier() {}

  async deleteSupplier() {}
}
