import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { GetProductQueryDto } from './dto/getProduct.dto';
import { PaginationHelper } from '@/shared/helpers/pagination.helper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  private buildProductFilter(name?: string, sku?: string, upc?: string) {
    const filter = {
      ...(name && { name }),
      ...(sku && { sku }),
      ...(upc && { upc }),
    };
    return Object.keys(filter).length > 0 ? filter : undefined;
  }

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

  async getAllProducts(query: GetProductQueryDto) {
    const { name, sku, upc, ...paginationQuery } = query;
    const { limit, offset } = PaginationHelper.toDatabase(paginationQuery);

    const { items, total } = await this.productRepository.findAll({
      limit,
      offset,
      filter: this.buildProductFilter(name, sku, upc),
    });

    return {
      items,
      meta: PaginationHelper.createMeta({
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
        path: 'products',
        query: { name, sku, upc },
      }),
    };
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(data: CreateProductDto) {
    const salePrice = parseFloat(data.salePrice);
    const purchasePrice = parseFloat(data.purchasePrice);

    this.validatePrices(salePrice, purchasePrice);

    return await this.productRepository.create(data);
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const existingProduct = await this.getProductById(id);

    if (data.salePrice || data.purchasePrice) {
      const salePrice = parseFloat(data.salePrice || existingProduct.salePrice);
      const purchasePrice = parseFloat(
        data.purchasePrice || existingProduct.purchasePrice,
      );

      this.validatePrices(salePrice, purchasePrice);
    }

    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id: number) {
    await this.getProductById(id);
    return await this.productRepository.delete(id);
  }
}
