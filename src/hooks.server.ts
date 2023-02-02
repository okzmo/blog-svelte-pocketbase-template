import { pb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
    // Load the cookie if any
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    // Check if the token is valid
    if(pb.authStore.isValid) {
        try {
            await pb.collection('users').authRefresh()
        } catch(_) {
            pb.authStore.clear();
        }
    }

    // Context to pass data (to our backend handlers)
    event.locals.pb = pb;
    event.locals.user = structuredClone(pb.authStore.model);

    const response = await resolve(event);

    response.headers.set('set-cookie', pb.authStore.exportToCookie({httpOnly: false}));

    return response;
}