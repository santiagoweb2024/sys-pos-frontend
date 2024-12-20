import { drizzle } from 'drizzle-orm/node-postgres';

// El tipo viene de drizzle directamente
export type Db = ReturnType<typeof drizzle>;
