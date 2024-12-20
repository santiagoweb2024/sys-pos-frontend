import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import type { Product } from '@/shared/types/database/entities/product.types';
import {
  PaginatedResponse,
  PaginationOptions,
} from '@/shared/types/http/response.types';
import { LoggerService } from '@/shared/services/logger.service';

@Injectable()
export class ProductsService {
  private readonly logger = new LoggerService(ProductsService.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(createProductDto);
  }

  async findAll(
    options: PaginationOptions,
  ): Promise<PaginatedResponse<Product>> {
    return await this.productsRepository.findAll(options);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.remove(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async findByUpc(upc: string): Promise<Product> {
    const product = await this.productsRepository.findByUpc(upc);
    if (!product) {
      throw new NotFoundException(`Product with UPC ${upc} not found`);
    }
    return product;
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.productsRepository.updateStock(id, quantity);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
