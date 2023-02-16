<script lang="ts">
	import LatestProjects from '../../../components/LatestProjects.svelte';
    import { marked } from 'marked';
	import type { postType, Repo } from '../../../types/types';
	import { currentUser } from '$lib/pocketbase';

	export let data: any;
	const userRepos: Repo[] = data.userRepos;
	const post: postType = data.post;
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
		<div class="flex flex-col items-center overflow-auto">
			<p class="prose prose-neutral lg:prose-xl prose-p:after:content-[''] prose-p:before:content-[''] prose-blockquote:border-l-black prose-h2:mt-3 prose-code:h-20 h-fit py-[2.5vh] lg:py-[5vh] px-[3vh] lg:px-[8vh] max-w-full">
				{@html marked.parse(post.content)}
			</p>
			<div class="w-full lg:px-[8vh]">
				<div class="flex flex-col gap-[0.2vh] w-full border-[0.3vh] border-black p-[2vh] mb-[2vh]">
					<span class="text-[1.8vh] font-semibold">Jean Michel</span>
					<p>Ouah super article, continue comme ça pls.</p>
				</div>
				<div class="flex flex-col gap-[0.2vh] w-full border-[0.3vh] border-black p-[2vh] mb-[2vh]">
					<span class="text-[1.8vh] font-semibold">Maddy Bitch</span>
					<p><span class="bg-[#848b97] px-[0.3vh] font-medium">@Jean Michel</span> pTdR T ki.</p>
				</div>
				{#if $currentUser}
				<input type="text" name="comment" id="comment"  class="w-full border-[0.3vh] border-black py-[1vh] px-[1.6vh] my-[2vh] bg-transparent focus-visible:outline-none"/>
				{/if}
			</div>
		</div>
	</section>
	<LatestProjects {userRepos}/>
</main>
