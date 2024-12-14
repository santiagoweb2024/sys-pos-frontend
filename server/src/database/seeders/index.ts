import { seedUsers } from './user.seeder';
import { seedRoles } from './role.seeder';
import { seedBrands } from './brand.seeder';
import { DatabaseConfig } from '../config/database.config';
import { promisify } from 'node:util';
import { exec } from 'child_process';
import { seedCategories } from './category.seeder';
import { withDb } from '@/utils/database.util';
import { seedUnitsOfMeasurement } from './unitOfMeasurement.seeder';
const execPromise = promisify(exec);

async function checkAndCreateTables() {
  try {
    console.log('Checking if tables exist...');
    const { stdout, stderr } = await execPromise('drizzle-kit push');
    console.log('Tables created or already exist:', stdout);
    if (stderr) {
      console.error('stderr:', stderr);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Failed to create tables');
  }
}

async function bootstrap() {
  try {
    await withDb(async (db) => {
      await checkAndCreateTables();
      await seedRoles(db);
      await seedUsers(db);
      await seedBrands(db);
      await seedCategories(db);
      await seedUnitsOfMeasurement(db);
    });
    console.log('All seeders executed successfully');
  } catch (error) {
    console.error('Error executing seeders:', error);
    process.exit(1);
  } finally {
    await DatabaseConfig.closePool();
    process.exit(0);
  }
}

bootstrap();
