import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { cleanUsername } from '$lib/utils';

const registerSchema = z
	.object({
		email: z
			.string({ required_error: 'An Email Address is required' })
			.min(1, { message: 'An Email Address is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email(),
		username: z.string({ required_error: 'A Username is required' }).min(4, {message: 'Your username must be at least 4 characters long'}).max(24, {message: 'Your username must be less than 24 characters'}),
		name: z.string({ required_error: 'A Display Name is required' }).min(3, {message: 'Your display name must be at least 3 characters long'}).max(24, {message: 'Your display name must be less than 24 characters'}),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
			.trim(),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
			.trim(),
		role: z.string()
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match!',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match!',
				path: ['passwordConfirm']
			});
		}
	});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			data.username = cleanUsername(Object.values(data)[1] as string);
			const result = registerSchema.parse(data);

			await locals.pb.collection('users').create(result);
			await locals.pb.collection('users').authWithPassword(result.email, result.password);
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();

			console.log(errors);
			// sending back data to client except passwords
			const { password, passwordConfirm, ...rest } = data;

			return fail(400, {
				data: rest,
				errors
			});
		}

		throw redirect(303, '/');
	}
};
