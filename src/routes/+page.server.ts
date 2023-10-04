import { auth } from '$lib/lucia';
import { DatabaseError } from '@planetscale/database';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'Password cannot be empty')
});

const signupSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.max(255, 'Password must be at most 255 characters long')
});

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const body = {
			email,
			password
		};

		const parsedBody = loginSchema.safeParse(body);

		if (!parsedBody.success)
			return fail(400, {
				message: parsedBody.error.errors[0].message ?? 'Invalid request'
			});

		try {
			const key = await auth.useKey(
				'email',
				parsedBody.data.email.toLowerCase(),
				parsedBody.data.password
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {
					email: parsedBody.data.email
				}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: 'Incorrect email or password'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	},
	signup: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const body = { email, password };

		const parsedBody = signupSchema.safeParse(body);

		if (!parsedBody.success)
			return fail(400, {
				message: parsedBody.error.errors[0].message ?? 'Invalid request'
			});

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: parsedBody.data.email.toLowerCase(),
					password: parsedBody.data.password
				},
				attributes: {
					email: parsedBody.data.email
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {
					email: parsedBody.data.email
				}
			});
			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof DatabaseError) {
				return fail(403, {
					message: 'Email already in use'
				});
			}

			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	},
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			throw redirect(302, '/');
		}
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie

		throw redirect(302, '/');
	}
};
