import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const postId = params.id.split('-')[params.id.split('-').length-1];

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
        post: fetchPost(),
    }
}) satisfies PageServerLoad