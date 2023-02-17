import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import { SECRET_GITHUB_TOKEN } from "$env/static/private";

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
        repos: fetchYourGithubData(),
        posts: fetchPosts(),
    }
}) satisfies PageServerLoad