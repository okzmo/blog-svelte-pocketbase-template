<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';

	let string = '';
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<div class="post">
		<textarea name="markdown" id="markdown" class="markdown" bind:value={string} />
		<div class="preview">
			<Markdown source={string} />
		</div>
	</div>
	<div class="send">
		<button>Post</button>
	</div>
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
		font-size: 1.6vh;
		padding: 5vh;
	}

	.preview {
		width: 50%;
		height: 100%;
		resize: none;
		background-color: #d6d1b7;
		border: none;
		border-right: 2px solid black;
		font-size: 1.6vh;
		padding: 5vh;
	}

	.markdown:focus {
		border-color: black;
	}
</style>
