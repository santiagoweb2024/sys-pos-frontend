import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from '@/database/database.module';
import { products } from '@/database/schemas/products.schema';
import type { Db } from '@/shared/types/database/common/database.types';
import { eq, ilike, sql } from 'drizzle-orm';

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
    filter?: { name?: string };
  }) {
    const whereClause = filter?.name
      ? ilike(products.name, `%${filter.name}%`)
      : undefined;

    const [items, totalCount] = await Promise.all([
      this.db
        .select()
        .from(products)
        .where(whereClause)
        .limit(limit)
        .offset(offset),
      this.db
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(whereClause)
        .then((result) => Number(result[0].count)),
    ]);

    return { items, total: totalCount };
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return result[0];
  }

  async create(data: any) {
    const result = await this.db.insert(products).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await this.db
      .update(products)
      .set(data)
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
