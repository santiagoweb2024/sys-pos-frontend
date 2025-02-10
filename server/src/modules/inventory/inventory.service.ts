import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { PaginationHelper } from '@/shared/helpers/pagination.helper';
import { GetMovementQueryDto } from './dto/getMovement.dto';
import { buildGenericFilter } from '@/shared/utils/filterBuilder.util';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async getAllMovements(query: GetMovementQueryDto) {
    const { productId, type, startDate, endDate, ...paginationQuery } = query;
    const { limit, offset } = PaginationHelper.toDatabase(paginationQuery);
    const filters = buildGenericFilter({ productId, type, startDate, endDate });
    const { items, totalCount } =
      await this.inventoryRepository.getAllMovements(
        { limit, offset },
        filters,
      );
    return {
      items,
      meta: PaginationHelper.createMeta({
        totalItems: totalCount,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Math.floor(offset / limit) + 1,
        path: 'inventory/movements',
        query,
      }),
    };
  }

  async getProductStock(productId: number) {
    const stock = await this.inventoryRepository.getProductStock(productId);

    if (!stock) {
      throw new NotFoundException(
        `No se encontró stock para el producto ${productId}`,
      );
    }

    return stock;
  }
}
