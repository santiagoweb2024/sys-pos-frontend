import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config/config';

export async function clearDatabase() {
  const pool = new Pool({
    connectionString: config.database.url,
  });

  const db = drizzle(pool);

  await db.execute('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');

  await pool.end();
}

console.log('Database cleared successfully');

async function main() {
  await clearDatabase();
}

main();
