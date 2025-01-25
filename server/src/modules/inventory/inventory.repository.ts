import { Inject, Injectable } from '@nestjs/common';
import { Db } from '@/shared/types/database/common/database.types';
import { inventories } from '@/database/schemas/inventories.schema';
import { products } from '@/database/schemas/products.schema';
import { and, desc, eq, gte, lte } from 'drizzle-orm';
import { DB_CONNECTION } from '@/database/database.module';

interface PaginationParams {
  limit: number;
  offset: number;
}

interface FilterParams {
  productId: number;
  type: 'IN' | 'OUT';
  startDate: string;
  endDate: string;
}

@Injectable()
export class InventoryRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  async getAllMovements(
    paginationParams: PaginationParams,
    filterParams: Partial<FilterParams>,
  ) {
    const { limit, offset } = paginationParams;
    const { productId, type, startDate, endDate } = filterParams;
    console.log('filter params', filterParams);
    const query = this.db
      .select()
      .from(inventories)
      .limit(limit)
      .offset(offset);
    const [items] = await Promise.all([query]);
    return items;
  }
}
