import { Inject, Injectable } from '@nestjs/common';
import { Db } from '@/shared/types/database/common/database.types';
import { inventories } from '@/database/schemas/inventories.schema';
import { and, count, eq, gte, isNull, lte, sql, SQL, sum } from 'drizzle-orm';
import { DB_CONNECTION } from '@/database/database.module';

export interface PaginationParams {
  limit: number;
  offset: number;
}

interface FilterParams {
  productId: number;
  type: 'IN' | 'OUT';
  startDate: Date;
  endDate: Date;
}

@Injectable()
export class InventoryRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  async getAllMovements(
    paginationParams: PaginationParams,
    filterParams: {
      [key in keyof FilterParams]: Exclude<
        FilterParams[key],
        undefined | null | ''
      >;
    },
  ) {
    const { limit, offset } = paginationParams;
    const { productId, type, startDate, endDate } = filterParams;
    const baseFilters: SQL<unknown> = isNull(inventories.deletedAt);
    const filters: SQL<unknown>[] = [];
    if ('productId' in filterParams)
      filters.push(eq(inventories.productId, productId));
    if ('type' in filterParams)
      filters.push(eq(inventories.movementType, type));
    if ('startDate' in filterParams)
      filters.push(gte(inventories.createdAt, startDate));
    if ('endDate' in filterParams)
      filters.push(lte(inventories.createdAt, endDate));
    const whereConditions = and(baseFilters, ...filters);
    const query = this.db
      .select()
      .from(inventories)
      .where(whereConditions)
      .limit(limit)
      .offset(offset);
    const countQuery = this.db
      .select({ _count: count() })
      .from(inventories)
      .where(whereConditions)
      .then((res) => res[0]._count);
    const [items, totalCount] = await Promise.all([query, countQuery]);
    console.log({ totalCount });
    return {
      items,
      totalCount,
    };
  }

  async getProductStock(productId: number) {
    const result = await this.db
      .select({
        inStock: sum(
          sql<number>`CASE WHEN ${inventories.movementType} = 'IN' THEN ${inventories.quantity} ELSE 0 END`,
        ),
        outStock: sum(
          sql<number>`CASE WHEN ${inventories.movementType} = 'OUT' THEN ${inventories.quantity} ELSE 0 END`,
        ),
        lastUpdated: sql<Date>`MAX(${inventories.createdAt})`,
      })
      .from(inventories)
      .where(
        and(
          eq(inventories.productId, productId),
          isNull(inventories.deletedAt),
        ),
      );

    if (!result[0] || result[0].inStock === null) {
      return null;
    }

    const { inStock, outStock, lastUpdated } = result[0];
    const currentStock = Number(inStock || 0) - Number(outStock || 0);

    return {
      productId,
      currentStock,
      lastUpdated: lastUpdated || new Date(),
    };
  }
}
