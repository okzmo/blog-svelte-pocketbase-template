import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { serialize } from 'object-to-formdata'; 
import { validateData } from '$lib/utils';
import { fail } from '@sveltejs/kit';

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp'
]

const postSchema = z.object({
	content: z
		.string({ required_error: 'Your post need content to be posted.' })
		.min(64, { message: 'Your post must be at least 64 characters.' })
		.trim(),
	author: z.string({ required_error: 'You need to be connected.' }),
	picture: z.instanceof(Blob).superRefine((val, ctx) => {
		if(val) {
			if(val.size > 5242880) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Banner must be less than 5MB'
				})
			}

			if(!imageTypes.includes(val.type)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Your image type is not supported. Supported formats : jpeg, jpg, png, webp'
				})
			}
		}
	})
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const body = await request.formData();
		
		const { formData, errors } = await validateData(body, postSchema);
		const { image, ...rest } = formData;

		if(errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			})
		}

		console.log(body);

		try {
			await locals.pb.collection('posts').create(serialize(formData));
		} catch (err) {
			const { fieldErrors: errors } = err;
			console.log(err.data)

			return {
				errors
			};
		}
	}
};
