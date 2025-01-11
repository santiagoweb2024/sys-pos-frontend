import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from '@/database/database.module';
import { products } from '@/database/schemas/products.schema';
import type { Db } from '@/shared/types/database/common/database.types';
import { and, count, eq, ilike, isNull } from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly db: Db,
  ) {}

  async findAll({
    limit,
    offset,
    filter,
  }: {
    limit: number;
    offset: number;
    filter?: {
      name?: string;
      sku?: string;
      upc?: string;
    };
  }) {
    try {
      const baseCondition: SQL<unknown> = isNull(products.deletedAt);
      const searchConditions: SQL<unknown>[] = [];

      // Si hay SKU o UPC, usar búsqueda exacta por estos campos
      if (filter?.sku) {
        console.log('Buscando por SKU exacto:', filter.sku);
        searchConditions.push(eq(products.sku, filter.sku));
      }

      if (filter?.upc) {
        console.log('Buscando por UPC exacto:', filter.upc);
        searchConditions.push(eq(products.upc, filter.upc));
      }

      // Si no hay identificadores exactos, buscar por nombre
      if (!filter?.sku && !filter?.upc && filter?.name) {
        console.log('Buscando por nombre:', filter.name);
        searchConditions.push(ilike(products.name, `%${filter.name}%`));
      }

      // Combinar todas las condiciones con AND
      const whereConditions = and(baseCondition, ...searchConditions);

      const query = this.db
        .select()
        .from(products)
        .where(whereConditions)
        .limit(limit)
        .offset(offset);

      console.log('Query SQL:', query.toSQL());

      const [items, totalCount] = await Promise.all([
        query,
        this.db
          .select({ count: count() })
          .from(products)
          .where(whereConditions)
          .then((result) => Number(result[0].count)),
      ]);
      console.log('Total de resultados:', typeof totalCount);
      console.log('Resultados encontrados:', items.length);
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
