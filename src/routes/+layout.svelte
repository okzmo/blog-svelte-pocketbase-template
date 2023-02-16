<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import '../app.postcss';
</script>

<Toaster />
<slot />

<style>
	:global(body) {
		background-color: #9fa8b6;
	}

	:global(::-webkit-scrollbar) {
		width: 5px; /* for vertical scrollbars */
		height: 5px; /* for horizontal scrollbars */
	}

	:global(::-webkit-scrollbar-track) {
		background: rgba(255, 255, 255, 0.1);
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(255, 255, 255, 0.3);
	}
</style>
