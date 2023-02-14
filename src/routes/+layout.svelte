<script>
	import { Toaster } from 'svelte-french-toast';
	import '../app.postcss';
</script>

<Toaster />
<slot />

<style>
	:global(body) {
		background-color: rgb(214, 209, 183);
	}
</style>
