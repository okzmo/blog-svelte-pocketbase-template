<script lang="ts">
	import LatestProjects from '../../../components/LatestProjects.svelte';
	import { marked } from 'marked';
	import type { postType, Repo } from '../../../types/types';
	import { currentUser } from '$lib/pocketbase';
	import CommentSection from '../../../components/CommentSection.svelte';

	export let data: any;
	const repos: Repo[] = data.repos;
	const post: postType = data.post;

	const postId = post.id;
</script>

<main class="flex flex-col lg:flex-row overflow-hidden border-[0.5vh] border-black lg:h-screen">
	<section
		class="w-full lg:w-1/2 h-fit lg:h-full lg:border-r-[0.5vh] border-black flex flex-col z-[2]"
	>
		<div class="w-full h-1/3 relative">
			<img
				src={`http://127.0.0.1:8090/api/files/${post.collectionId}/${post.id}/${post.picture}`}
				alt=""
				class="w-full h-[250px] lg:h-full object-cover"
			/>
			<h1 class="absolute bottom-3.5 left-3.5 text-3xl font-bold text-white">{post.title}</h1>
			{#if post.author_id === $currentUser?.id}
				<a
					href={`/editor/${post.slug + '-' + post.id}`}
					class="border-[0.5vh] border-black bg-[#9fa8b6] text-black px-8 py-3 lg:px-[1.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-black hover:text-[#9fa8b6] transition absolute bottom-3.5 right-3.5"
					>EDIT</a
				>
			{/if}
		</div>
		<div id="article" class="flex flex-col items-center overflow-auto">
			<div
				class="prose prose-neutral lg:prose-xl prose-p:after:content-[''] prose-p:before:content-[''] prose-blockquote:border-l-black prose-h2:mt-3 prose-code:h-20 h-fit py-[2.5vh] lg:py-[5vh] px-[3vh] lg:px-[8vh] max-w-full"
			>
					{@html marked.parse(post.content)}
			</div>

			<CommentSection {postId} />
		</div>
	</section>
	<LatestProjects {repos} />
</main>
