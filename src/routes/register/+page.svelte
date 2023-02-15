<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import type { registerType } from '../../types/types';

	export let form: registerType;
</script>

<div class="flex h-screen">
	<div class="w-1/2 flex flex-col justify-center items-center">
		<h2 class="text-6xl mb-12 font-bold">Welcome !</h2>
		<form
			method="POST"
			class="flex flex-col justify-center w-2/4"
			use:enhance={({ form }) => {
				return async ({ result }) => {
					pb.authStore.loadFromCookie(document.cookie);
					await applyAction(result);

					if (result?.type === 'failure') {
						form.password.value = '';
						form.passwordConfirm.value = '';
					}
				};
			}}
		>
			{#if form?.errors?.email}
				<span>{form?.errors?.email[0]}</span>
			{/if}
			<label for="email">Email Address</label>
			<input
				type="email"
				name="email"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="mycoolemailaddress@gmail.com"
				value={form?.data?.email ?? ''}
			/>
			{#if form?.errors?.password}
				<span>{form?.errors?.password[0]}</span>
			{/if}
			<label for="username">Username</label>
			<input
				type="text"
				name="username"
				autocomplete="off"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="mycoolusername123"
				value=""
			/>
			<label for="name">Display Name</label>
			<input
				type="text"
				name="name"
				autocomplete="off"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="My Cool Display Name"
				value=""
			/>
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="Password"
				value=""
			/>
			{#if form?.errors?.passwordConfirm}
				<span>{form?.errors?.passwordConfirm[0]}</span>
			{/if}
			<label for="passwordConfirm">Verify password</label>
			<input
				type="password"
				name="passwordConfirm"
				class="w-full rounded-lg mb-12 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="Verify Password"
				value=""
			/>
			<button type="submit" class="w-full rounded-md bg-black text-[#9fa8b6] px-5 py-3 font-semibold hover:bg-[#9fa8b6] hover:text-black self-center border-2 border-black transition">Sign Up</button>

			<input type="text" name="role" id="role" value="user" hidden />
		</form>
	</div>
	<div class="w-1/2 flex justify-center items-center bg-black">
		<h1 class="text-8xl font-bold text-[#9fa8b6]">MY BLOG</h1>
	</div>
</div>
