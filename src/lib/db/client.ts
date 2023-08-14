import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL not set");
}
export async function runMigrations() {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL not set");
	}

	const sql = postgres(process.env.DATABASE_URL, { max: 1 })
	const db = drizzle(sql);

	await migrate(db, {
		migrationsFolder: "migrations",
	});

}

const db = postgres(process.env.DATABASE_URL, {});
export const dbClient = drizzle(db);
