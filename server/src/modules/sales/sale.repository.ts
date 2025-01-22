import { DB_CONNECTION } from '@/database/database.module';
import { sales } from '@/database/schemas/sales.schema';
import { saleDetails } from '@/database/schemas/saleDetails.schema';
import { Db } from '@/shared/types/database/common/database.types';
import { Inject, Injectable } from '@nestjs/common';
import { and, count, eq, isNull, SQL } from 'drizzle-orm';
import { CreateSaleDto } from './dto/createSale.dto';
import {
  SaleDetailInsert,
  UpdateSaleDetailData,
} from '@/shared/types/database/entities/saleDetail.types';
import { SaleConfirm } from '@/shared/types/database/entities/sale.types';

@Injectable()
export class SaleRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  async getAllSales({
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

  async getSaleById(saleId: number) {
    const sale = await this.db
      .select()
      .from(sales)
      .where(and(eq(sales.id, saleId), isNull(sales.deletedAt)))
      .then((res) => res[0]);
    return sale;
  }

  async getSaleWithDetails(saleId: number) {
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

  async createSale(data: CreateSaleDto) {
    const [newSale] = await this.db.insert(sales).values(data).returning();
    return newSale;
  }

  async addProductToSale(data: SaleDetailInsert) {
    const [saleDetail] = await this.db
      .insert(saleDetails)
      .values(data)
      .returning();

    return this.getSaleWithDetails(saleDetail.saleId);
  }

  async confirmSale(data: SaleConfirm) {
    const { id, paymentMethodId, status } = data;
    const [updatedSale] = await this.db
      .update(sales)
      .set({ status, paymentMethodId })
      .where(eq(sales.id, id))
      .returning();

    return updatedSale;
  }

  async removeProductFromSale(data: { saleId: number; productId: number }) {
    const { saleId, productId } = data;
    const [removedDetail] = await this.db
      .update(saleDetails)
      .set({
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(saleDetails.saleId, saleId),
          eq(saleDetails.productId, productId),
          isNull(saleDetails.deletedAt),
        ),
      )
      .returning();

    return removedDetail;
  }

  async getSaleDetailById(id: number) {
    const detail = await this.db
      .select()
      .from(saleDetails)
      .where(and(eq(saleDetails.id, id), isNull(saleDetails.deletedAt)))
      .then((res) => res[0] || null);

    return detail;
  }

  async updateProductInSale(data: UpdateSaleDetailData, subTotal: string) {
    const { id, quantity } = data;

    const [updatedDetail] = await this.db
      .update(saleDetails)
      .set({
        quantity,
        subTotal,
      })
      .where(and(eq(saleDetails.id, id), isNull(saleDetails.deletedAt)))
      .returning();

    return updatedDetail;
  }
}
