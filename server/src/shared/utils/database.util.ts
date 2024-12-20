import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { Db } from '@/shared/types/database/common/database.types';

export async function withDb<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    return await fn(db);
  } finally {
    await pool.end();
  }
}
