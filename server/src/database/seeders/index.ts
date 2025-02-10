import { promisify } from 'node:util';
import { exec } from 'child_process';
import { DatabaseService } from '../database.service';
import type { Db } from '@/shared/types/database/common/database.types';

import { seedRoles } from './roles.seeder';
import { seedBrands } from './brands.seeder';
import { seedCategories } from './categories.seeder';
import { seedCurrencies } from './currencies.seeder';
import { seedCustomers } from './customers.seeder';
import { seedSuppliers } from './suppliers.seeder';
import { seedProductStatus } from './productStatus.seeder';
import { seedUnitsOfMeasurement } from './unitsOfMeasurement.seeder';
import { seedPaymentMethods } from './paymentMethods.seeder';
import { seedUsers } from './users.seeder';
import { seedBusinessInfo } from './businessInfo.seeder';
import { seedProducts } from './products.seeder';
import { seedCashRegisters } from './cashRegisters.seeder';
import { seedCashSessions } from './cashSessions.seeder';
import { seedCashMovements } from './cashMovements.seeder';
import { seedSales } from './sales.seeder';
import { seedExpenses } from './expenses.seeder';
import { seedSaleDetails } from './saleDetails.seeder';
import { seedInventories } from './inventories.seeder';
import { seedProductsByBatches } from './productsByBatches.seeder';
import { seedProductImages } from './productImages.seeder';
import { config } from '@/shared/config/config';

const execAsync = promisify(exec);

async function seed(db: Db) {
  try {
    console.log('🌱 Iniciando seeders...');

    // Primer nivel - Sin dependencias
    console.log('📊 Seeders de primer nivel...');
    await seedRoles(db);
    await seedBrands(db);
    await seedCategories(db);
    await seedCurrencies(db);
    await seedCustomers(db);
    await seedSuppliers(db);
    await seedProductStatus(db);
    await seedUnitsOfMeasurement(db);
    await seedPaymentMethods(db);

    // Segundo nivel - Dependencias simples
    console.log('📊 Seeders de segundo nivel...');
    await seedUsers(db); // Depende de roles
    await seedBusinessInfo(db); // Depende de currencies
    await seedProducts(db); // Depende de varias tablas
    await seedCashRegisters(db); // Sin dependencias directas

    // Tercer nivel - Múltiples dependencias
    console.log('📊 Seeders de tercer nivel...');
    await seedCashSessions(db); // Depende de users y cashRegisters
    await seedCashMovements(db); // Depende de users y cashRegisters
    await seedSales(db); // Depende de users, customers, paymentMethods
    await seedExpenses(db); // Depende de paymentMethods

    // Último nivel - Dependencias de nivel superior
    console.log('📊 Seeders de último nivel...');
    await seedSaleDetails(db); // Depende de sales y products
    await seedInventories(db); // Depende de products
    await seedProductsByBatches(db); // Depende de products
    await seedProductImages(db); // Depende de products

    console.log('✅ Seeders completados exitosamente');
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
    throw error;
  }
}

async function main() {
  const connectionString = config.database.url;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  await DatabaseService.withDb(connectionString, async (db) => {
    console.log('Running migrations...');
    await execAsync('drizzle-kit push');

    console.log('Seeding database...');
    await seed(db);
    console.log('Database seeded successfully!');
  });
}

main().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
