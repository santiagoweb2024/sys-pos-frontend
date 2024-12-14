import { withDb } from './database.util';
import { DatabaseConfig } from '@/database/config/database.config';
import { config } from '@/config/config';

export async function clearDatabase() {
  await withDb(async (db) => {
    await db.execute('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  });

  console.log('Database cleared successfully');
}

async function main() {
  DatabaseConfig.setConnectionString(config.database.url);
  await clearDatabase();
  await DatabaseConfig.closePool();
}

main();
