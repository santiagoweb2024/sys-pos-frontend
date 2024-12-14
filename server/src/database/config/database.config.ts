import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DatabaseConfig {
  private static pool: Pool | null = null;

  static setConnectionString(connectionString: string) {
    if (this.pool) {
      console.warn('Database pool already exists. Closing existing pool...');
      this.closePool();
    }
    this.pool = new Pool({ connectionString });
  }

  static getDrizzle() {
    if (!this.pool) {
      throw new Error(
        'Database pool not initialized. Call setConnectionString first.',
      );
    }
    return drizzle(this.pool);
  }

  static async closePool() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
