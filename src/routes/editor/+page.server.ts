import type { Actions } from "@sveltejs/kit";
import {z} from 'zod';

const postSchema = z.object({
    content: z.string().min(64).trim(),
    author: z.string().min(6).max(48).trim(),
    picture: z.string().optional(),
})

export const actions: Actions = {
    default: async ({locals, request}) => {
        const data = Object.fromEntries(await request.formData());

        const result = postSchema.parse({
            content: data.content,
            author: locals.user?.name
        });

        console.log(result);

    }
};
