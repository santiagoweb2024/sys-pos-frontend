import { DB_CONNECTION } from '@/common/constants';
import { Database } from '@/common/types/database.type';
import { NewImage, productImages } from '@/database/schemas/productImages.schema';
import { Inject, Injectable } from '@nestjs/common';
import { count, eq, ilike } from 'drizzle-orm';

@Injectable()
export class ImageRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Database) {}
  async createImage(data: NewImage) {
    const image = await this.db.insert(productImages).values(data).returning();
    return image[0];
  }
}
