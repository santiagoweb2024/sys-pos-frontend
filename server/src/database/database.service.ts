import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { Db } from '@/shared/types/database/common/database.types';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@/shared/services/logger.service';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool | null = null;
  public readonly database: Db | null = null;

  constructor(
    private configService: ConfigService,
    private logger: LoggerService,
  ) {
    this.logger.log('DatabaseService constructor called');
  }

  async onModuleInit() {
    this.logger.log('DatabaseService initializing...');
    const connectionString = this.configService.get('database.url');
    if (!connectionString) {
      this.logger.error('Database URL is not defined');
      throw new Error('Database URL is not defined');
    }
    this.pool = new Pool({ connectionString });
    (this as any).database = drizzle({ client: this.pool });
    this.logger.log('DatabaseService initialized successfully');
  }

  async onModuleDestroy() {
    this.logger.log('DatabaseService destroying...');
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      (this as any).database = null;
    }
    this.logger.log('DatabaseService destroyed successfully');
  }

  getDrizzle(): Db {
    if (!this.database) {
      this.logger.error('Database not initialized');
      throw new Error('Database not initialized');
    }
    return this.database;
  }

  // Para uso en seeders y scripts
  static async withDb<T>(
    connectionString: string,
    operation: (db: Db) => Promise<T>,
  ): Promise<T> {
    if (!connectionString) {
      throw new Error('Connection string is required');
    }

    const pool = new Pool({ connectionString });
    const db = drizzle({ client: pool });

    try {
      return await operation(db);
    } finally {
      await pool.end();
    }
  }
}
