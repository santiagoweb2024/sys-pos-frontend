import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { Db } from '@/shared/types/database/common/database.types';
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool | null = null;
  private _database: Db | null = null;

  constructor(private readonly configService: ConfigService) {}

  get database(): Db {
    if (!this._database) {
      const connectionString = this.configService.get('database.url');
      if (!connectionString) {
        throw new Error('Database URL is not defined in configuration');
      }
      this.pool = new Pool({ connectionString });
      this._database = drizzle({ client: this.pool });
    }
    return this._database;
  }

  async onModuleDestroy() {
    try {
      if (this.pool) {
        this.logger.log('Closing database connections...');
        await this.pool.end();
        this._database = null;
        this.pool = null;
        this.logger.log('Database connections closed successfully');
      }
    } catch (error) {
      this.logger.error('Error closing database connections:', error);
      throw error; // Re-throw para que NestJS sepa que hubo un error
    }
  }

  // Para uso en seeders y scripts fuera de NestJS
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
