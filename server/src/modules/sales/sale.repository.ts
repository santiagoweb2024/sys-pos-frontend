import { DB_CONNECTION } from '@/database/database.module';
import { sales } from '@/database/schemas/sales.schema';
import { saleDetails } from '@/database/schemas/saleDetails.schema';
import { Db } from '@/shared/types/database/common/database.types';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq, isNull, SQL } from 'drizzle-orm';
import { CreateSaleDto } from './dto/createSale.dto';
import { AddProductToSaleDto } from './dto/addProductToSale.dto';
import { ConfirmSaleDto } from './dto/confirmSale.dto';
import { SaleDetailInsert } from '@/shared/types/database/entities/saleDetail.types';

@Injectable()
export class SaleRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  async findAll({
    limit,
    offset,
    filter,
  }: {
    limit: number;
    offset: number;
    filter?: {
      status?: 'OPEN' | 'CLOSED';
    };
  }) {
    const deletedAtCondition: SQL<unknown> = isNull(sales.deletedAt);
    const filterConditions: SQL<unknown>[] = [];

    if (filter?.status) {
      filterConditions.push(eq(sales.status, filter.status));
    }

    const combinedConditions = and(deletedAtCondition, ...filterConditions);

    const salesQuery = this.db
      .select()
      .from(sales)
      .where(combinedConditions)
      .limit(limit)
      .offset(offset);

    const salesCountQuery = this.db
      .select({ totalCount: count() })
      .from(sales)
      .where(combinedConditions)
      .then((res) => res[0].totalCount);

    const [salesItems, totalSalesCount] = await Promise.all([
      salesQuery,
      salesCountQuery,
    ]);

    return {
      salesItems,
      totalSalesCount,
    };
  }

  async create(data: CreateSaleDto) {
    const [newSale] = await this.db.insert(sales).values(data).returning();
    return newSale;
  }

  async findById(saleId: number) {
    const sale = await this.db
      .select()
      .from(sales)
      .where(and(eq(sales.id, saleId), isNull(sales.deletedAt)))
      .then((res) => res[0]);
    return sale;
  }

  async findByIdWithDetails(saleId: number) {
    const sale = await this.db
      .select()
      .from(sales)
      .where(and(eq(sales.id, saleId), isNull(sales.deletedAt)))
      .then((res) => res[0]);

    if (!sale) return null;

    const details = await this.db
      .select()
      .from(saleDetails)
      .where(eq(saleDetails.saleId, saleId));

    return {
      ...sale,
      details,
    };
  }

  async addProductToSale(saleId: number, data: AddProductToSaleDto) {
    const saleDetailData: SaleDetailInsert = {
      saleId,
      productId: data.productId,
      quantity: data.quantity,
      unitPrice: data.unitPrice.toString(),
      subTotal: (data.quantity * data.unitPrice).toString(),
    };

    await this.db.insert(saleDetails).values(saleDetailData).returning();

    return this.findByIdWithDetails(saleId);
  }

  async confirmSale(saleId: number, data: ConfirmSaleDto) {
    await this.db
      .update(sales)
      .set({
        status: 'CLOSED',
        ...data,
      })
      .where(eq(sales.id, saleId))
      .returning();

    return this.findByIdWithDetails(saleId);
  }
}
