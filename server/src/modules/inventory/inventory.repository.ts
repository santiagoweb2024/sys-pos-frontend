import { Injectable } from '@nestjs/common';
import type { Db } from '@/shared/types/database/common/database.types';

@Injectable()
export class InventoryRepository {
  constructor(private readonly db: Db) {}
}
