import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';

const registerSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(64, { message: 'Password must be less than 64 characters' })
		.trim(),
	passwordConfirm: z
		.string({ required_error: 'Confirm Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(64, { message: 'Password must be less than 64 characters' })
		.trim()
}).superRefine(({password, passwordConfirm}, ctx) => {
    if(password !== passwordConfirm) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and Confirm Password must match!',
            path: ['password']
        })
        ctx.addIssue({
            code: 'custom',
            message: 'Password and Confirm Password must match!',
            path: ['passwordConfirm']
        })
    }
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());

		try {
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
			})
		}

		throw redirect(303, '/');
	}
};
