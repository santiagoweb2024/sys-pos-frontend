import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AdjustStockDto } from './dto/adjustStock.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async findAllProducts({
    page = 1,
    limit = 10,
    filter,
  }: {
    page?: number;
    limit?: number;
    filter?: {
      categoryId?: number;
      brandId?: number;
      supplierId?: number;
      productStatusId?: number;
    };
  }) {
    const offset = (page - 1) * limit;
    return this.inventoryRepository.findAllProducts({ limit, offset, filter });
  }

  async findProductById(productId: number) {
    const product = await this.inventoryRepository.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(data: CreateProductDto) {
    return this.inventoryRepository.createProduct(data);
  }

  async updateProduct(productId: number, data: UpdateProductDto) {
    await this.findProductById(productId); // Verifica que el producto existe
    return this.inventoryRepository.updateProduct(productId, data);
  }

  async deleteProduct(productId: number) {
    await this.findProductById(productId); // Verifica que el producto existe
    return this.inventoryRepository.deleteProduct(productId);
  }

  async adjustStock(productId: number, data: AdjustStockDto) {
    const product = await this.findProductById(productId);
    
    // Validar que hay suficiente stock para restar
    if (data.type === 'SUBTRACT' && product.stock < data.quantity) {
      throw new Error('Insufficient stock');
    }

    const updatedProduct = await this.inventoryRepository.adjustStock(
      productId,
      data,
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }
}
