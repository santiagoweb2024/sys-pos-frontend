import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from '@/database/database.module';
import { products } from '@/database/schemas/products.schema';
import type { Db } from '@/shared/types/database/common/database.types';
import {
  and,
  count,
  eq,
  getTableColumns,
  ilike,
  isNull,
  sql,
} from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';
import { productImages } from '@/database/schemas/productImages.schema';
import { PaginationParams } from '../inventory/inventory.repository';

interface FilterParams {
  name: string;
  sku: string;
  upc: string;
}

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly db: Db,
  ) {}

  async findAll(
    paginationParams: PaginationParams,
    filterParams: {
      [key in keyof FilterParams]: Exclude<
        FilterParams[key],
        undefined | null | ''
      >;
    },
  ) {
    try {
      const { limit, offset } = paginationParams;
      const { name, sku, upc } = filterParams;
      const baseCondition: SQL<unknown> = isNull(products.deletedAt);
      const searchConditions: SQL<unknown>[] = [];

      if ('sku' in filterParams) searchConditions.push(eq(products.sku, sku));
      if ('upc' in filterParams) searchConditions.push(eq(products.upc, upc));
      if ('name' in filterParams)
        searchConditions.push(ilike(products.name, `%${name}%`));
      // Combinar todas las condiciones con AND
      const whereConditions = and(baseCondition, ...searchConditions);
      // Consulta para obtener las columnas de productos
      const productColumns = getTableColumns(products);
      // consulta para optenr todo los productos con sus imagenes segun los filtros aplicados
      const query = this.db
        .select({
          ...productColumns,
          images: sql`COALESCE(json_agg(${productImages}), '[]')`,
        })
        .from(products)
        .leftJoin(productImages, eq(productImages.productId, products.id))
        .groupBy(products.id)
        .where(whereConditions)
        .limit(limit)
        .offset(offset);
      // consulta para optenr el total de productos con sus imagenes segun los filtros aplicados
      const countQuery = this.db
        .select({ _count: count() })
        .from(products)
        .where(whereConditions)
        .then((res) => res[0]._count);
      // ejecutar las consultas
      const [items, totalCount] = await Promise.all([query, countQuery]);
      return { items, total: totalCount };
    } catch (error) {
      console.error('Error en findAll:', error);
      throw error;
    }
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(products)
      .where(and(eq(products.id, id), isNull(products.deletedAt)));
    return result[0];
  }

  async create(data: any) {
    const result = await this.db.insert(products).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await this.db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async softDelete(id: number) {
    const result = await this.db
      .update(products)
      .set({ deletedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    const result = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }
}
