import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { env } from '$env/dynamic/private';
import * as schema from './schema';

export const tursoClient = createClient({
	url: env.TURSO_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

export const db = drizzle(tursoClient, { schema });
