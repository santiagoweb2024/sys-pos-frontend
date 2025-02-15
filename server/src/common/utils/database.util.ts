import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Database } from '../types/database.type';
import { appConfig } from '@/config/app/env.loader';

export async function withDb<T>(fn: (db: Database) => Promise<T>): Promise<T> {
  const pool = new Pool({
    connectionString: appConfig.DB_POSTGRES_URL,
  });

  const db = drizzle(pool);

  try {
    return await fn(db);
  } finally {
    await pool.end();
  }
}
