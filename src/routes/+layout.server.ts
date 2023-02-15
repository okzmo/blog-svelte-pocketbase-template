import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const fetchYourGithubData = async () => {
        try {
            const resp = await fetch('https://api.github.com/users/Mind-thatsall/repos');
            const data = await resp.json();
            return data;
        } catch(err) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
    }

    return {
        userRepos: fetchYourGithubData()
    }
}