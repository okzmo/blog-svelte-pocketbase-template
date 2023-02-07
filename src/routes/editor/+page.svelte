<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { marked } from 'marked';
	import { pb } from '$lib/pocketbase';
	import { currentUser } from '$lib/pocketbase';
	import type { postType } from '../../types/types';
	import DOMPurify from 'isomorphic-dompurify';

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

	let string = '';

	const author = $currentUser?.id;


	function test(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		let file: File | null = target.files![0];

		const bannerImg:HTMLImageElement|null = document.querySelector("#banner-uploaded");
		let reader = new FileReader();
		reader.onload = function(e) {
				bannerImg!.style.display = "block";
				bannerImg!.src = e.target?.result as string;
		}
		reader.readAsDataURL(file)
	}


	export let form: postType;
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<form
		action=""
		method="POST"
		class="markdownContainer"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
	>
		<div class="post">
			<textarea name="content" id="content" class="markdown" bind:value={string} />
			<div class="preview">
				<div id="file-upload-pos">
					<label for="picture" class="custom-picture"> Choose a banner for your post </label>
					<input id="picture" name="picture" accept="image/*" type="file" on:change={test} />
				</div>
				<img src="" alt="" id="banner-uploaded">
				{@html DOMPurify.sanitize(
					marked.parse(string.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))
				)}
			</div>
		</div>

		<div class="send">
			{#if form?.errors?.content}
				<p class="error">{form?.errors?.content}</p>
			{/if}
			<button type="submit">Post</button>
		</div>

		<input type="text" name="author" hidden value={author}>

	</form>
</div>

<style>
	.container {
		background-color: #d6d1b7;
		height: 100vh;
		width: 100vw;
		display: flex;
		font-family: 'Outfit';
		flex-direction: column;
	}

	.markdownContainer {
		height: 92vh;
	}

	.post {
		display: flex;
		width: 100%;
		height: 100%;
	}

	:global(*) {
		margin: 0;
		box-sizing: border-box;
	}

	.send {
		height: 8vh;
		width: 100%;
		border-top: 2px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1.5vh;
	}

	.error {
		color: rgb(217, 64, 64);
		font-size: 2vh;
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

	.markdown {
		width: 50%;
		height: 100%;
		resize: none;
		background-color: #d6d1b7;
		border: none;
		border-right: 2px solid black;
		padding: 5vh;
		font-size: 1.6vh;
		overflow: auto;
	}

	.preview {
		width: 50%;
		height: 100%;
		resize: none;
		background-color: #d6d1b7;
		border: none;
		font-size: 1.6vh;
		padding: 5vh;
		overflow: auto;
		position: relative;
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
