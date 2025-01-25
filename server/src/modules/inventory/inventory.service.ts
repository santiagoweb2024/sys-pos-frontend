import { Injectable } from '@nestjs/common';
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
    const movements = await this.inventoryRepository.getAllMovements(
      { limit, offset },
      filters,
    );
    return movements;
  }
}
