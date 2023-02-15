<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import Post from '../components/Post.svelte';
	import LatestProjects from '../components/LatestProjects.svelte';
	import type { postType, Repo } from '../types/types';

	export let data: any;
	const posts: postType[] = data.posts;
	const userRepos: Repo[] = data.userRepos;
</script>

<main class="flex flex-col lg:flex-row overflow-hidden border-[0.5vh] border-black lg:h-screen">
	<section
		class="w-full lg:w-1/2 h-fit lg:h-full lg:border-r-[0.5vh] border-black flex flex-col z-[2]"
	>
		<div
			class="h-fit lg:h-[15vh] border-b-[0.5vh] border-black flex justify-center lg:justify-start items-center bg-[rgb(124, 138, 160)]"
		>
			<h1 class="text-[12vw] md:text-[10vw] lg:text-[5vw] lg:pl-[2.5vh] font-bold z-[2]">
				{#if $currentUser}
					Hey, {$currentUser.username}
				{:else}
					HELLO, THERE!
				{/if}
			</h1>
		</div>
		<div class="h-fit lg:h-[85vh] flex">
			<div class="hidden w-1/3 border-r-[0.5vh] border-black xl:flex items-end justify-center">
				<p class="md:text-[4.5vw] font-bold">ART.01</p>
			</div>
			<div class="w-full xl:w-2/3 overflow-auto">
				{#if posts.length === 0}
					<h1>NO POST AVAILABLE</h1>
				{:else}
					{#each posts as post}
						<Post {post} />
					{/each}
				{/if}
			</div>
		</div>
	</section>
	<LatestProjects {userRepos}/>
</main>

<style>

	::-webkit-scrollbar {
		width: 5px; /* for vertical scrollbars */
		height: 5px; /* for horizontal scrollbars */
	}

	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
	}

	::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
