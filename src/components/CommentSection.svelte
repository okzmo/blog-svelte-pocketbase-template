<script lang="ts">
    import { currentUser, pb } from '$lib/pocketbase';
    import { onMount, onDestroy } from 'svelte';
    import type { commentType } from '../types/types';
    import DOMPurify from 'isomorphic-dompurify';

    export let postId: string;

    let newComment: string;
	let comments: any = [];

	onMount(async () => {
		const results = await pb.collection('comments').getList(1, 50, {
			sort: 'created',
			expand: 'user',
			filter: `(post='${postId}')`
		});

		comments = results.items;

		// If you want realtime comments, uncomment those lines and comment the lines I indicated in sendComment function
		/*pb.collection('comments').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				const user = await pb.collection('users').getOne(record.user);
				record.expand = { user };
				comments = [...comments, record];

				const article = document.querySelector('#article');
				setTimeout(() => {
					article?.scrollTo(0, article.scrollHeight);
				})
			}

			if (action === 'delete') {
				comments = comments.filter((c: commentType) => c.id !== record.id);
			}
		});*/
	});

	async function sendComment() {
		const data = {
			comment: DOMPurify.sanitize(newComment, { USE_PROFILES: { html: false } }),
			user: $currentUser?.id,
			post: postId
		};

		const createdComment = await pb.collection('comments').create(data);
		//If you want realtime comments please comment these lines
		const user = await pb.collection('users').getOne(createdComment.user);
		createdComment.expand = { user };
		comments = [...comments, createdComment];

		const chatbox = document.querySelector('#chatbox');
		setTimeout(() => {
			chatbox?.scrollTo(0, chatbox.scrollHeight);
		});
		//

		newComment = '';
	}

	// Uncomment only if you use the real time comments
	/* onDestroy(() => {
		pb.collection('comments').unsubscribe();
	}) */
</script>

<h1 class="self-start border-y-[0.5vh] w-full border-black mb-[2vh] p-[2vh] text-3xl font-bold">
	Comments
</h1>

<div class="w-full px-[1vh] lg:px-[2vh]">
    <div id="chatbox" class="h-[201px] overflow-auto lg:h-[45vh]">
        {#if comments.length > 0}
        {#each comments as comment (comment.id)}
            <div
                class="flex flex-col gap-[0.2vh] w-full border-[0.3vh] border-black p-[2vh] mb-[2vh]"
            >
                <span class="text-[1.8vh] font-bold"
                    >{comment.expand?.user?.name}
                    <span class="font-normal text-[1.4vh]">@{comment.expand?.user?.username}</span
                    ></span
                >
                <p>
                    {@html comment.comment.replace(
                        '@' + $currentUser?.username,
                        `<div style='background-color: rgba(255, 164, 3, 0.7); font-weight: bold; display: inline-block; padding: 0.18vh 0.8vh; border-radius: 0.6vh; margin: 0 0.3vw'>@${$currentUser?.username}</div>`
                    )}
                </p>
            </div>
        {/each}
        {:else}
            <div class="w-full h-full flex justify-center items-center">
                <h2 class="text-[4vh] font-bold">No new comments on this article</h2>
            </div>	
        {/if}
    </div>
    {#if $currentUser}
        <form action="" on:submit|preventDefault={sendComment}>
            <div class="flex gap-[1vh]">
                <input
                    type="text"
                    name="comment"
                    id="comment"
                    autocomplete="off"
                    placeholder="Please enter a comment..."
                    class="w-full border-[0.3vh] border-black py-[1vh] px-[1.6vh] my-[2vh] bg-transparent focus-visible:outline-none placeholder:text-black/60"
                    bind:value={newComment}
                />
                <button
                    type="submit"
                    class="border-[0.3vh] border-black py-[1vh] px-[1.6vh] my-[2vh] hover:bg-black hover:text-[#9fa8b6] transition"
                    >Send</button
                >
            </div>
        </form>
    {/if}
</div>

<style>
	#chatbox::-webkit-scrollbar {
		width: 0; /* for vertical scrollbars */
		height: 0; /* for horizontal scrollbars */
	}
</style>


