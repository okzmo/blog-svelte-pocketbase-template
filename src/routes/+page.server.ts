import { redirect, type Actions } from "@sveltejs/kit";

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