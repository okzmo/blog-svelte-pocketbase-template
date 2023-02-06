import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';

const postSchema = z.object({
	content: z
		.string({ required_error: 'Your post need content to be posted.' })
		.min(64, { message: 'Your post must be at least 64 characters.' })
		.trim(),
	author: z.string({ required_error: 'You need to be connected.' }),
	picture: z.string().optional(),
	author_id: z.string({ required_error: 'You need to be connected.' })
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const result = postSchema.parse({
				content: data.content,
				author: await locals.user?.name,
				author_id: locals.user?.id
			});

			await locals.pb.collection('posts').create(result);
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();

			return {
				errors
			};
		}
	}
};
