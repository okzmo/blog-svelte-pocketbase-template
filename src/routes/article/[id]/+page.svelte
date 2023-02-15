<script lang="ts">
	import LatestProjects from '../../../components/LatestProjects.svelte';
    import { marked } from 'marked';
	import type { postType, Repo } from '../../../types/types';

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
        <p class="prose prose-neutral lg:prose-xl prose-p:after:content-[''] prose-p:before:content-[''] prose-blockquote:border-l-black prose-h2:mt-3 prose-code:h-20 overflow-auto h-fit py-[2.5vh] lg:py-[5vh] px-[3vh] lg:px-[8vh] max-w-full">
            {@html marked.parse(post.content)}
        </p>
	</section>
	<LatestProjects {userRepos}/>
</main>
