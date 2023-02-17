import { redirect, error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { validateData } from '$lib/utils';
import { serialize } from 'object-to-formdata';
import { z } from 'zod';

const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const postSchema = z.object({
	author: z.string({ required_error: 'You need to be connected.' }),
	title: z
		.string({ required_error: 'Your must have a title to post this article.' })
		.max(48, { message: 'Your title must be less than 48 characters.' })
		.trim(),
	slug: z.string(),
	content: z
		.string({ required_error: 'Your must have content to post this article.' })
		.min(64, { message: 'Your post must be at least 64 characters.' })
		.trim(),
	picture: z.instanceof(Blob).superRefine((val, ctx) => {
		if (val && val.name !== undefined) {
            console.log(val.name);
			if (val.size > 5242880) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Banner must be less than 5MB'
				});
			}

			if (!imageTypes.includes(val.type)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Your image type is not supported. Supported formats : jpeg, jpg, png, webp'
				});
			}
		}
	})
});

export const actions: Actions = {
	default: async ({ locals, request, params }) => {
		const postId = params.id.split('-')[params.id.split('-').length - 1];
		const body = await request.formData();

		const { formData, errors } = await validateData(body, postSchema);
		const { picture, ...rest } = formData;
		console.log(formData);

		if (errors) {
			console.log(errors);
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('posts').update(postId, serialize(formData));
		} catch (err) {
			console.error('Error : ', err);

			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const postId = params.id.split('-')[params.id.split('-').length - 1];

	if (!locals.user) {
		console.log('running');
		throw redirect(303, '/');
	} else if (locals.user.role !== 'admin' && locals.user.role !== 'author') {
		throw redirect(303, '/');
	}

	const fetchPost = async () => {
		try {
			const record = structuredClone(await locals.pb.collection('posts').getOne(postId));
			return record;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		post: fetchPost()
	};
};
