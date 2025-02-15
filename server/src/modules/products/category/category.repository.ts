import { DB_CONNECTION } from "@/common/constants";
import { Injectable, Inject } from "@nestjs/common";
import { categories, NewCategory, UpdateCategory } from "@/database/schemas/categories.schema";
import { Database } from "@/common/types/database.type";
import { eq, ilike, count } from "drizzle-orm";

@Injectable()
export class CategoryRepository {
    constructor(@Inject(DB_CONNECTION) private readonly db: Database) {}
    async findByname(name: string) {
    const brand = await this.db
      .select()
      .from(categories)
      .where(eq(categories.name, name));
    return brand[0];
  }
  async createCategory(data: NewCategory) {
    const brand = await this.db.insert(categories).values(data).returning();
    return brand;
  }

  async getAllcategories(limit: number, offset: number, name: string | undefined) {
    const searchCondition = name ? ilike(categories.name, `%${name}%`) : undefined;
    const categoryList = await this.db
      .select()
      .from(categories)
      .where(searchCondition)
      .limit(limit)
      .offset(offset);
      
    const totalCategories = await this.db
      .select({ count: count() })
      .from(categories)
      .where(searchCondition)
      .then((res) => res[0].count);
    return { categoryList, totalCategories };
  }


    async updateCategory(id: number, data: UpdateCategory) {
      const brand = await this.db
        .update(categories)
        .set(data)
        .where(eq(categories.id, id))
        .returning();
      return brand[0];
    }
  
    async findById(id: number) { 
      const brand = await this.db.select().from(categories).where(eq(categories.id, id));
      return brand[0];
    }
  
    async softDeleteCategory(id: number) {
      const brand = await this.db
        .update(categories)
        .set({ deletedAt: new Date() })
        .where(eq(categories.id, id))
        .returning();
      return brand[0];
    }
}