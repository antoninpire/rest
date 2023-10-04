import { dev } from '$app/environment';
import { connection } from '$lib/db';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: planetscale(connection, {
		key: 'rest_auth_keys',
		session: 'rest_auth_sessions',
		user: 'rest_users'
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
