<script lang="ts">
	import LatestProjects from '../../../components/LatestProjects.svelte';
	import { marked } from 'marked';
	import type { commentType, postType, Repo } from '../../../types/types';
	import { currentUser, pb } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';

	export let data: any;
	const userRepos: Repo[] = data.userRepos;
	const post: postType = data.post;

	let newComment: string;
	let comments: any = [];
	let unsubscribe: () => void;

	onMount(async () => {
		const results = await pb.collection('comments').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});

		comments = results.items;

		// If you want realtime comments, uncomment those lines and comment the two lines I indicate in sendComment function
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
			comment: newComment,
			user: $currentUser?.id,
			post: post.id
		};

		
		const createdComment = await pb.collection('comments').create(data);
		//If you want realtime comments please comment these lines
		const user = await pb.collection('users').getOne(createdComment.user);
		createdComment.expand = { user };
		comments = [...comments, createdComment];
		//

		newComment = '';
	}

	// Uncomment only if you use the real time comments
	/* onDestroy(() => {
		pb.collection('comments').unsubscribe();
	}) */
</script>

<main class="flex flex-col lg:flex-row overflow-hidden border-[0.5vh] border-black lg:h-screen">
	<section
		class="w-full lg:w-1/2 h-fit lg:h-full lg:border-r-[0.5vh] border-black flex flex-col z-[2]"
	>
		<div class="w-full h-1/3 relative">
			<img
				src={`http://127.0.0.1:8090/api/files/${post.collectionId}/${post.id}/${post.picture}`}
				alt=""
				class="w-full h-full object-cover"
			/>
			<h1 class="absolute bottom-3.5 left-3.5 text-3xl font-bold text-white">{post.title}</h1>
		</div>
		<div id="article" class="flex flex-col items-center overflow-auto">
			<p
				class="prose prose-neutral lg:prose-xl prose-p:after:content-[''] prose-p:before:content-[''] prose-blockquote:border-l-black prose-h2:mt-3 prose-code:h-20 h-fit py-[2.5vh] lg:py-[5vh] px-[3vh] lg:px-[8vh] max-w-full"
			>
				{@html marked.parse(post.content)}
			</p>
			<div class="w-full lg:px-[8vh]">
				{#each comments as comment (comment.id)}
					<div
						class="flex flex-col gap-[0.2vh] w-full border-[0.3vh] border-black p-[2vh] mb-[2vh]"
					>
						<span class="text-[1.8vh] font-semibold"
							>{comment.expand?.user?.name}
							<span class="font-normal text-[1.4vh]">@{comment.expand?.user?.username}</span></span
						>
						<p>{comment.comment}</p>
					</div>
				{/each}
				{#if $currentUser}
					<form action="" on:submit|preventDefault={sendComment}>
						<div class="flex gap-[1vh]">
							<input
								type="text"
								name="comment"
								id="comment"
								autocomplete="off"
								class="w-full border-[0.3vh] border-black py-[1vh] px-[1.6vh] my-[2vh] bg-transparent focus-visible:outline-none"
								bind:value={newComment}
							/>
							<button type="submit" class="border-[0.3vh] border-black py-[1vh] px-[1.6vh] my-[2vh]"
								>Send</button
							>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>
	<LatestProjects {userRepos} />
</main>
