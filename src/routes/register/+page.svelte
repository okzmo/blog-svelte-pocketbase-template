<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import { page } from '$app/stores';

	type registerType = {
		data: {
			email: string;
		};
		errors: {
			email: string;
			password: string;
			passwordConfirm: string;
		};
	};

	export let form: registerType;
</script>

<div class="flex items-center justify-center h-screen">
	<form
		method="POST"
		class="flex flex-col justify-center bg-slate-700 p-6 items-center w-2/5 h-2/5"
		use:enhance={({ form }) => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);

				if (result.data.errors) {
					form.password.value = '';
					form.passwordConfirm.value = '';
				}
			};
		}}
	>
		{#if form?.errors?.email}
			<span>{form?.errors?.email[0]}</span>
		{/if}
		<label for="email">Email</label>
		<input type="email" name="email" class="w-2/3 mb-4 p-2" value={form?.data?.email ?? ''} />
		{#if form?.errors?.password}
			<span>{form?.errors?.password[0]}</span>
		{/if}
		<label for="password">Password</label>
		<input type="password" name="password" class="w-2/3 mb-4 p-2" value="" />
		{#if form?.errors?.passwordConfirm}
			<span>{form?.errors?.passwordConfirm[0]}</span>
		{/if}
		<label for="passwordConfirm">Verify password</label>
		<input type="password" name="passwordConfirm" class="w-2/3 mb-4 p-2" value="" />
		<button type="submit" class="w-1/5 rounded-md bg-slate-500 p-2">Login</button>
	</form>
</div>
