import { DB_CONNECTION } from '@/database/database.module';
import { products } from '@/database/schemas/products.schema';
import { inventories } from '@/database/schemas/inventories.schema';
import { Db } from '@/shared/types/database/common/database.types';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq, isNull, SQL } from 'drizzle-orm';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AdjustStockDto } from './dto/adjustStock.dto';

@Injectable()
export class InventoryRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  async findAllProducts({
    limit,
    offset,
    filter,
  }: {
    limit: number;
    offset: number;
    filter?: {
      categoryId?: number;
      brandId?: number;
      supplierId?: number;
      productStatusId?: number;
    };
  }) {
    const deletedAtCondition: SQL<unknown> = isNull(products.deletedAt);
    const filterConditions: SQL<unknown>[] = [];

    if (filter?.categoryId) {
      filterConditions.push(eq(products.categoryId, filter.categoryId));
    }
    if (filter?.brandId) {
      filterConditions.push(eq(products.brandId, filter.brandId));
    }
    if (filter?.supplierId) {
      filterConditions.push(eq(products.supplierId, filter.supplierId));
    }
    if (filter?.productStatusId) {
      filterConditions.push(
        eq(products.productStatusId, filter.productStatusId),
      );
    }

    const combinedConditions = and(deletedAtCondition, ...filterConditions);

    const productsQuery = this.db
      .select()
      .from(products)
      .where(combinedConditions)
      .limit(limit)
      .offset(offset);

    const productsCountQuery = this.db
      .select({ totalCount: count() })
      .from(products)
      .where(combinedConditions)
      .then((res) => res[0].totalCount);

    const [productsItems, totalProductsCount] = await Promise.all([
      productsQuery,
      productsCountQuery,
    ]);

    return {
      productsItems,
      totalProductsCount,
    };
  }

  async findProductById(productId: number) {
    const product = await this.db
      .select()
      .from(products)
      .where(and(eq(products.id, productId), isNull(products.deletedAt)))
      .then((res) => res[0]);
    return product;
  }

  async createProduct(data: CreateProductDto) {
    const [newProduct] = await this.db
      .insert(products)
      .values(data)
      .returning();
    return newProduct;
  }

  async updateProduct(productId: number, data: UpdateProductDto) {
    const [updatedProduct] = await this.db
      .update(products)
      .set(data)
      .where(eq(products.id, productId))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(productId: number) {
    const [deletedProduct] = await this.db
      .update(products)
      .set({ deletedAt: new Date() })
      .where(eq(products.id, productId))
      .returning();
    return deletedProduct;
  }

  async adjustStock(productId: number, data: AdjustStockDto) {
    const product = await this.findProductById(productId);
    if (!product) return null;

    const newStock =
      data.type === 'ADD'
        ? product.stock + data.quantity
        : product.stock - data.quantity;

    const [updatedProduct] = await this.db
      .update(products)
      .set({ stock: newStock })
      .where(eq(products.id, productId))
      .returning();

    // Registrar el movimiento en el inventario
    await this.db.insert(inventories).values({
      productId,
      quantity: data.quantity,
      movementType: data.type === 'ADD' ? 'IN' : 'OUT',
      description: data.reason,
    });

    return updatedProduct;
  }
}
