import { error, fail} from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateData } from '$lib/utils';
import { SECRET_GITHUB_TOKEN } from '$env/static/private';
import { z } from 'zod';

const commentSchema = z.object({
    name: z.string({ required_error: 'You need to be connected.' }),
    username: z.string({ required_error: 'You need to be connected.' }),
    comment: z.string().max(512, {message: 'Your comment is too long. It must be less than 512 characters.'}),
    post: z.string(),
})

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const body = await request.formData();

		const { formData, errors } = await validateData(body, commentSchema);
		console.log(formData);

		if (errors) {
			console.log(errors);
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('comments').create(formData);
		} catch (err) {
			console.error('Error : ', err);

			throw error(err.status, err.message);
		}
	}
};

export const load = (async ({ locals, params }) => {
    const postId = params.id.split('-')[params.id.split('-').length-1];

	const fetchYourGithubData = async () => {
        try {
            const resp = await fetch('https://api.github.com/users/Mind-thatsall/repos', {
                headers: { 
                    authorization: SECRET_GITHUB_TOKEN
                }
            });
            const data = await resp.json();
            return data;
        } catch (err) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
    };

    const fetchPost = async () => {
        try {
            const record = structuredClone(await locals.pb.collection('posts').getOne(postId))
            return record;
        } catch(err) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
    }

    return {
		repos: fetchYourGithubData(),
        post: fetchPost(),
    }
}) satisfies PageServerLoad