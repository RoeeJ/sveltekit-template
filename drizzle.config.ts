import type { Config } from "drizzle-kit";
import {config} from 'dotenv';
config();

if(!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL not set");
}

export default {
	schema: "./src/lib/db/**/schema.ts",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL,
	},
	out: "migrations",
} satisfies Config;
