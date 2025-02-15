import { DB_CONNECTION } from '@/common/constants';
import { Database } from '@/common/types/database.type';
import { NewSupplier, Supplier, suppliers, UpdateSupplier } from '@/database/schemas/suppliers.schema';
import { Inject, Injectable } from '@nestjs/common';
import { count, eq, ilike } from 'drizzle-orm';

@Injectable()
export class SupplierRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Database) {}
  async findByname(name: string) {
    const supplier = await this.db
      .select()
      .from(suppliers)
      .where(eq(suppliers.name, name));
    return supplier[0];
  }
  async createSupplier(data: NewSupplier) {
    const supplier = await this.db.insert(suppliers).values(data).returning();
    return supplier[0];
  }

  async getAllSuppliers(limit: number, offset: number, name: string | undefined) {
    const searchCondition = name ? ilike(suppliers.name, `%${name}%`) : undefined;
    const supplierList = await this.db
      .select()
      .from(suppliers)
      .where(searchCondition)
      .limit(limit)
      .offset(offset);

    const totalSuppliers = await this.db
      .select({ count: count() })
      .from(suppliers)
      .where(searchCondition)
      .then((res) => res[0].count);
    return { supplierList, totalSuppliers };
  }

  async updateBrand(id: number, data: UpdateSupplier): Promise<Supplier> {
    const supplier = await this.db
      .update(suppliers)
      .set(data)
      .where(eq(suppliers.id, id))
      .returning();
    return supplier[0];
  }

  async findById(id: number) {
    const supplier = await this.db.select().from(suppliers).where(eq(suppliers.id, id));
    return supplier[0];
  }

  async softDeleteSupplier(id: number) {
    const supplier = await this.db
      .update(suppliers)
      .set({ deletedAt: new Date() })
      .where(eq(suppliers.id, id))
      .returning();
    return supplier[0];
  }
}
