import { DatabaseConfig } from '../database/config/database.config';
import { config } from '@/config/config';
export async function withDb<T>(
  operation: (db: ReturnType<typeof DatabaseConfig.getDrizzle>) => Promise<T>,
): Promise<T> {
  const url = config.database.url;
  if (!url) {
    console.error('DATABASE_URL environment variable is not defined');
    process.exit(1);
  }
  DatabaseConfig.setConnectionString(url);
  return await operation(DatabaseConfig.getDrizzle());
}
