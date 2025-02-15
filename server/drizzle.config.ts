import { defineConfig } from 'drizzle-kit';
import { appConfig } from '@/config/app/env.loader';

export default defineConfig({
  schema: './src/database/schemas',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: appConfig.DB_POSTGRES_URL,
  },
});
