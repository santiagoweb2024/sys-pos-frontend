import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Esta función solo existe para propósitos de tipado
export const createDrizzle = () => drizzle({ client: new Pool() });
