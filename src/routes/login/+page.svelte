<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';

	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center h-screen">
	<h1>Log In</h1>
	<h2>{$page.status}</h2>
	<form
		action="/login"
		method="POST"
		class="flex flex-col justify-center bg-slate-700 p-6 items-center w-2/5 h-2/5"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
	>
		{#if $page.status === 400}
			<h2>Email or password wrong</h2>
		{/if}
		<label for="email">Email</label>
		<input type="email" name="email" class="w-2/3 mb-4 p-2" />
		<label for="password">Password</label>
		<input type="password" name="password" class="w-2/3 mb-4 p-2" />
		<button type="submit" class="w-1/5 rounded-md bg-slate-500 p-2">Login</button>
	</form>
</div>
