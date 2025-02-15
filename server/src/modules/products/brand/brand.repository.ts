import { DB_CONNECTION } from '@/common/constants';
import { Database } from '@/common/types/database.type';
import {
  Brand,
  brands,
  NewBrand,
  UpdateBrand,
} from '@/database/schemas/brands.schema';
import { Inject, Injectable } from '@nestjs/common';
import { count, eq, ilike } from 'drizzle-orm';

@Injectable()
export class BrandRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Database) {}
  async findByname(name: string) {
    const brand = await this.db
      .select()
      .from(brands)
      .where(eq(brands.name, name));
    return brand[0];
  }
  async createBrand(data: NewBrand) {
    const brand = await this.db.insert(brands).values(data).returning();
    return brand[0];
  }

  async getAllBrands(limit: number, offset: number, name: string | undefined) {
    const searchCondition = name ? ilike(brands.name, `%${name}%`) : undefined;
    const brandList = await this.db
      .select()
      .from(brands)
      .where(searchCondition)
      .limit(limit)
      .offset(offset);

    const totalBrands = await this.db
      .select({ count: count() })
      .from(brands)
      .where(searchCondition)
      .then((res) => res[0].count);
    return { brandList, totalBrands };
  }

  async updateBrand(id: number, data: UpdateBrand): Promise<Brand> {
    const brand = await this.db
      .update(brands)
      .set(data)
      .where(eq(brands.id, id))
      .returning();
    return brand[0];
  }

  async findById(id: number) {
    const brand = await this.db.select().from(brands).where(eq(brands.id, id));
    return brand[0];
  }

  async softDeleteBrand(id: number) {
    const brand = await this.db
      .update(brands)
      .set({ deletedAt: new Date() })
      .where(eq(brands.id, id))
      .returning();
    return brand[0];
  }
}
