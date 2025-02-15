import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Logger } from '@nestjs/common';
import { DB_CONNECTION } from '@/common/constants';
import { sql } from 'drizzle-orm';
import { appConfig } from '@/config/app/env.loader';

export const DrizzleProvider = {
  provide: DB_CONNECTION,
  useFactory: async () => {
    const logger = new Logger('DrizzleProvider');
    const connectionString = appConfig.DB_POSTGRES_URL; // Se asume que ya está validado por Zod

    try {
      // Crear el pool de conexiones
      const pool = new Pool({ connectionString });

      // Crear la instancia de Drizzle
      const db = drizzle(pool);

      // Ejecutar una consulta de prueba para validar la conexión y la base de datos
      const testQueryResult = await db.execute(sql`SELECT 1 + 1 AS result`);
      logger.debug('Test query result:', testQueryResult);

      // Validar que la consulta de prueba devuelva un resultado válido
      if (!testQueryResult || testQueryResult.rowCount === 0) {
        throw new Error('Test query failed: No result returned');
      }

      logger.log('Database connection and test query executed successfully.');
      return db;
    } catch (error) {
      logger.error('Database connection or test query failed', error);
      throw new Error(`Failed to connect to the database: ${error}`);
    }
  },
};
