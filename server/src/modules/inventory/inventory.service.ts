import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { PaginationHelper } from '@/shared/helpers/pagination.helper';
import { GetMovementQueryDto } from './dto/getMovement.dto';

@Injectable()
export class InventoryService {
  constructor() {}

  async getMovements(filters: GetMovementQueryDto) {
    const { productId, startDate, endDate, type, ...paginationQuery } = filters;
    const { limit, offset } = PaginationHelper.toDatabase(paginationQuery);

    /*  const { items, meta } = await this.inventoryRepository.findMovements({
      productId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      movementType: type,
      limit,
      offset,
    });

    return {
      items,
      meta,
    }; */
  }
}
