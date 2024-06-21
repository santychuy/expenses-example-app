import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const migrationClient = postgres(process.env.POSTGRES_URL, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' });
console.log('Migration Complete!');

process.exit(0);
