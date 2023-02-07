<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { marked } from 'marked';
	import { pb } from '$lib/pocketbase';
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
			`
		}
	};

	marked.use({ renderer });

	let string = '';

	export let form: postType;
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	{#if form?.errors?.content}
		<p>{form?.errors?.content}</p>
	{/if}
	<form
		action=""
		method="POST"
		class="markdownContainer"
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

				{@html DOMPurify.sanitize(marked.parse(string.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')))
					}
			</div>
		</div>
		<div class="send">
			<button type="submit">Post</button>
		</div>
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
		justify-content: flex-end;
		align-items: center;
	}

	button {
		padding: 1.2vh 3vh;
		background-color: #d6d1b7;
		border: 2px solid black;
		margin-right: 1.5vh;
		transition: background-color 0.15s ease;
		font-size: 2vh;
	}

	button:hover {
		background-color: black;
		color: #d6d1b7;
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
	}
</style>
