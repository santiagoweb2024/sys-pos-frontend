import { Injectable, Inject, Query } from '@nestjs/common';
import { DB_CONNECTION } from '@/common/constants';
import { Database } from '@/common/types/database.type';
import { brands, NewBrand } from '@/database/schemas/brands.schema';
import { eq, ilike, count } from 'drizzle-orm';
import { QueryPaginationWithSearchDto } from './brand/brand.dto';
import { NewProduct, products } from '@/database/schemas/products.schema';
@Injectable()
export class ProductRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Database) {}
  async createProduct(data: NewProduct) {
    const newProduct = await this.db.insert(products).values(data).returning();
    return newProduct[0];
  }
}
