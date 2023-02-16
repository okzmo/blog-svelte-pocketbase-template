import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const actions: Actions = {
    default: async function({locals, request}) {
        const data = Object.fromEntries(await request.formData()) as {
            name: string;
        };

        try {
            await locals.pb.collection('users').update(locals.user?.id as string, {
                name: data.name
            });
        } catch (err) {
            console.error(err);
            throw err;
        }

        throw redirect(303, '/');
    }
}

export const load = (async ({ locals }) => {

    const fetchPosts = async () => {
        try {
            const records = structuredClone(await locals.pb.collection('posts').getFullList(50, {
                sort: '-created', 
            }))
            return records;
        } catch(err) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
    }

    return {
        posts: fetchPosts(),
    }
}) satisfies PageServerLoad