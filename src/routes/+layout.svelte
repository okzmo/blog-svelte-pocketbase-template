<script>
	import { applyAction, enhance } from '$app/forms';
	import '../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
	console.log($currentUser);
</script>

{#if $currentUser}
	<form
		action="/logout"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.clear();
				await applyAction(result);
			};
		}}
	>
		<button>Log Out</button>
	</form>
{:else}
	<a href="/login">Log In</a>
	<a href="/register">Register</a>
{/if}

<slot />
