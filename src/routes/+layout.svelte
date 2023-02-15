<script lang='ts'>
	import { Toaster } from 'svelte-french-toast';
	import '../app.postcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	console.log(data);
</script>

<Toaster />
<slot />

<style>
	:global(body) {
		background-color: #9fa8b6;
	}
</style>
