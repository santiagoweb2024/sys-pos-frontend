import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { GetProductQueryDto } from './dto/getProduct.dto';
import { PaginationHelper } from '@/shared/helpers/pagination.helper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(query: GetProductQueryDto) {
    const { name, ...paginationQuery } = query;

    // Convertir parámetros de consulta a parámetros de base de datos
    const { limit, offset } = PaginationHelper.toDatabase(paginationQuery);

    // Obtener datos con paginación de la base de datos
    const { items, total } = await this.productRepository.findAll({
      limit,
      offset,
      filter: name ? { name } : undefined,
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(total / limit);

    // Crear meta información con paginación y links
    const { meta } = PaginationHelper.createMeta({
      totalItems: total,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: Math.floor(offset / limit) + 1,
      path: 'products',
      query: name ? { name } : {}, // Pasamos el name si existe
    });

    return {
      type: 'products',
      message: `Se encontraron ${items.length} productos`,
      data: items,
      meta,
    };
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findById(id);
    return {
      type: 'products',
      message: 'Producto encontrado',
      data: product,
    };
  }

  async createProduct(data: CreateProductDto) {
    const product = await this.productRepository.create(data);
    return {
      type: 'products',
      message: 'Producto creado exitosamente',
      data: product,
    };
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.productRepository.update(id, data);
    return {
      type: 'products',
      message: 'Producto actualizado exitosamente',
      data: product,
    };
  }

  async deleteProduct(id: number) {
    await this.productRepository.delete(id);
    return {
      type: 'products',
      message: 'Producto eliminado exitosamente',
      data: null,
    };
  }
}
