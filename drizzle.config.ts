import { type Config } from 'drizzle-kit';

export default {
	schema: './src/lib/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.TURSO_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
} satisfies Config;
