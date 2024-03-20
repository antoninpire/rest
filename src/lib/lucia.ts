import { dev } from '$app/environment';
import { tursoClient } from '$lib/db';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: libsql(tursoClient, {
		key: 'auth_keys',
		session: 'auth_sessions',
		user: 'users'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			email: data.email
		};
	}
});

export type Auth = typeof auth;
