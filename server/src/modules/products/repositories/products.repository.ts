import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import type { Product } from '@/shared/types/database/entities/product.types';
import {
  PaginatedResponse,
  PaginationOptions,
} from '@/shared/types/http/response.types';
import { LoggerService } from '@/shared/services/logger.service';
import { eq, ilike, or, desc, asc } from 'drizzle-orm';
import { products } from '@/database/schemas/products.schema';
import type { SQL } from 'drizzle-orm';

type SortableColumns = keyof Pick<
  typeof products,
  | 'id'
  | 'sku'
  | 'name'
  | 'description'
  | 'salePrice'
  | 'purchasePrice'
  | 'stock'
  | 'createdAt'
  | 'updatedAt'
>;

@Injectable()
export class ProductsRepository {
  private readonly logger = new LoggerService(ProductsRepository.name);

  constructor(private readonly db: DatabaseService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const drizzle = this.db.getDrizzle();
    const [product] = await drizzle
      .insert(products)
      .values(createProductDto)
      .returning();
    return product;
  }

  async findAll(
    options: PaginationOptions,
  ): Promise<PaginatedResponse<Product>> {
    const drizzle = this.db.getDrizzle();
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'id' as SortableColumns,
      sortOrder = 'asc',
    } = options;
    const skip = (page - 1) * limit;

    // Construir la consulta base
    let whereClause: SQL<unknown> | undefined;
    if (search) {
      whereClause = or(
        ilike(products.name, `%${search}%`),
        ilike(products.description, `%${search}%`),
        ilike(products.sku, `%${search}%`),
        ilike(products.upc, `%${search}%`),
      );
    }

    // Consulta para obtener el total de items
    const [{ count }] = await drizzle
      .select({ count: products.id })
      .from(products)
      .where(whereClause)
      .$dynamic();

    // Consulta para obtener los items paginados
    const orderByColumn = products[sortBy as SortableColumns];
    const items = await drizzle
      .select()
      .from(products)
      .where(whereClause)
      .limit(limit)
      .offset(skip)
      .orderBy(sortOrder === 'asc' ? asc(orderByColumn) : desc(orderByColumn))
      .$dynamic();

    // Calcular metadatos de paginación
    const totalItems = Number(count);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findById(id: number): Promise<Product | null> {
    const drizzle = this.db.getDrizzle();
    const [product] = await drizzle
      .select()
      .from(products)
      .where(eq(products.id, id))
      .$dynamic();
    return product || null;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const drizzle = this.db.getDrizzle();
    const [product] = await drizzle
      .update(products)
      .set(updateProductDto)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async remove(id: number): Promise<Product> {
    const drizzle = this.db.getDrizzle();
    const [product] = await drizzle
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return product;
  }
}
