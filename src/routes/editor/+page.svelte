<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { marked } from 'marked';
	import { pb } from '$lib/pocketbase';
	import { currentUser } from '$lib/pocketbase';
	import type { postType } from '../../types/types';
	import DOMPurify from 'isomorphic-dompurify';
	import toast from 'svelte-french-toast';
	import { update } from 'svelte-french-toast/core/store';

	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		breaks: true,
		sanitize: false,
		xhtml: false,
		smartypants: true
	});

	const renderer = {
		image(href: string, title: string, text: string) {
			return `
				<img src="${href}" alt="${text}" style="width: 100%; height: 300px; object-fit: cover" />
			`;
		}
	};

	marked.use({ renderer });

	let title = '';
	let content = '';

	const author = $currentUser?.name;

	function test(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		let file: File | null = target.files![0];

		const bannerImg: HTMLImageElement | null = document.querySelector('#banner-uploaded');
		let reader = new FileReader();
		reader.onload = function (e) {
			bannerImg!.style.display = 'block';
			bannerImg!.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	export let form: postType;
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="w-screen h-full">
	<form
		action=""
		method="POST"
		class="h-[92vh]"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ result, update }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);

				switch (result.type) {
					case 'success':
						await update();
						break;
					case 'failure':
						Object.values(form.errors).forEach((error) => {
							toast.error(error[0]);
						});
						await update();
						break;
					case 'error':
						toast.error(result.error.message);
						break;
					default:
						await update();
				}
			};
		}}
	>
		<div class="flex w-full h-full items-center">
			<div class="w-1/2 h-full border-r-[0.3vh] border-black flex flex-col p-[5vh]">
				<input type="text" name="title" id="title" placeholder="Enter your title here" class="py-[1vh] text-[4vh] font-black text-black placeholder:text-black/70 bg-[#d6d1b7] focus-visible:outline-none leading-none mb-[4vh]" bind:value={title}  autocomplete="off"/>
				<textarea name="content" id="content" placeholder="Enter your content here (Markdown supported)" class="placeholder:text-black/60 resize-none text-[1.6vh] overflow-auto bg-[#d6d1b7] focus-visible:outline-none h-full" bind:value={content} />
			</div>
			<div class="w-1/2 h-full resize-none p-[5vh] overflow-auto relative prose prose-neutral max-w-full">
				<div id="file-upload-pos">
					<label for="picture" class="custom-picture"> Choose a banner for your post </label>
					<input id="picture" name="picture" accept="image/*" type="file" on:change={test} />
				</div>
				<img src="" alt="" id="banner-uploaded" />
				<h1 class="py-[1vh]">{title}</h1>
				{@html DOMPurify.sanitize(
					marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))
				)}
			</div>
		</div>

		<div class="h-[8vh] w-full border-t-2 border-black flex justify-end items-center pr-[1.5vh]">
			<button type="submit">Post</button>
		</div>

		<input type="text" name="author" hidden value={author} />
	</form>
</div>

<style>

	:global(body) {
		background-color: #d6d1b7;
	}

	button {
		padding: 1.2vh 3vh;
		background-color: #d6d1b7;
		border: 2px solid black;
		transition: background-color 0.15s ease;
		font-size: 2vh;
	}

	button:hover {
		background-color: black;
		color: #d6d1b7;
		cursor: pointer;
	}

	button:active {
		background-color: #d6d1b7;
		color: #000;
		cursor: pointer;
	}

	input[type='file'] {
		display: none;
	}
	.custom-picture {
		border: 2px solid #000;
		display: inline-block;
		padding: 6px 12px;
		cursor: pointer;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.custom-picture:hover {
		background-color: black;
		color: #d6d1b7;
		cursor: pointer;
	}

	.custom-picture:active {
		background-color: #d6d1b7;
		color: #000;
		cursor: pointer;
	}

	#file-upload-pos {
		position: absolute;
		top: 1vh;
		left: 1vh;
	}

	#banner-uploaded {
		width: 100%;
		height: 30vh;
		object-fit: cover;
		display: none;
		margin-bottom: 2vh;
	}
</style>
