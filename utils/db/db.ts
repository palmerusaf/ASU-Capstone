import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { createTbleSqlRaw } from './createTbleSqlRaw';

// use separate database namespaces for production and development
const databaseName = import.meta.env.DEV ? 'dev-db' : 'prod-db';
const client = new PGlite(`idb://${databaseName}`);

// reset the dev database every dev run
if (import.meta.env.DEV) indexedDB.deleteDatabase(databaseName);

client.exec(createTbleSqlRaw);
export const db = drizzle({ client });
