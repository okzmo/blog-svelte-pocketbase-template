<script lang="ts">
	import type { postType } from '../types/types';

	export let post: postType;

	function readingTime() {
		const text = post.content;
		const wpm = 225;
		const words = text.trim().split(/\s+/).length;
		const time = Math.ceil(words / wpm);

        return time;
	}
</script>

<div class="flex flex-col border-b-[0.5vh] border-black h-fit lg:h-full">
	<div class="h-fit sm:h-[90%]">
		<img
			src={`http://127.0.0.1:8090/api/files/${post.collectionId}/${post.id}/${post.picture}`}
			alt=""
			class="h-[40vh] lg:h-[38vh] w-full mb-5 lg:mb-[1.4vh] px-4 pt-4 lg:px-[1.2vw] lg:pt-[1.2vw]"
		/>
		<div class="px-5 pb-5 lg:px-[1.2vw] lg:pb-[1.2vw]">
			<h2 class="text-3xl md:text-[3.5vw] lg:leading-[3vw] mb-4 lg:mb-[1.2vh] font-bold">
				{post.title}
			</h2>
			<span class="flex justify-between mb-3 lg:mb-[1vh]">
				<p class="md:text-[0.86vw]">By <span class="font-bold">{post.author}</span></p>
				<p class="md:text-[0.86vw]">{readingTime()} min Read</p>
			</span>
			<p class="text-md lg:text-[1.73vw] xl:text-[2.4vh] font-regular">
				{post.content.split(' ').slice(0, 36).join(' ')}
			</p>
		</div>
	</div>
	<div class="hidden lg:flex justify-end items-center border-t-[0.5vh] border-black h-[10%]">
		<a href="/article" class="text-[2.2vh] px-[1.2vw]">Read More</a>
	</div>
</div>
