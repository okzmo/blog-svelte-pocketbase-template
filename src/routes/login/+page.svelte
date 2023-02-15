<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';

	import { page } from '$app/stores';
</script>

<div class="flex h-screen">
	<div class="w-1/2 flex flex-col justify-center items-center">
		<h1 class="text-6xl mb-12 font-bold">Log In</h1>
		<form
			action="/login"
			method="POST"
			class="flex flex-col justify-center w-3/5"
			use:enhance={() => {
				return async ({ result }) => {
					pb.authStore.loadFromCookie(document.cookie);
					await applyAction(result);
				};
			}}
		>
			<span class="flex justify-between">
				<label for="name">Email Address</label>
				{#if $page.status === 400}
					<span class="text-red-700 font-semibold">Your Email Address or Password does not match</span>
				{/if}
			</span>
			<input
				placeholder="mycoolusername@gmail.com"
				type="email"
				name="email"
				style={`outline-color: ${$page.status === 400 ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
			/>
			<label for="password">Password</label>
			<input
				placeholder="Password"
				type="password"
				name="password"
				style={`outline-color: ${$page.status === 400 ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				class="w-full rounded-lg mb-12 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
			/>
			<button
				type="submit"
				class="w-full rounded-md bg-black text-[#9fa8b6] px-5 py-3 font-semibold hover:bg-[#9fa8b6] hover:text-black self-center border-2 border-black transition"
				>Log In</button
			>
		</form>
	</div>

	<div class="w-1/2 flex justify-center items-center bg-black">
		<h1 class="text-8xl font-bold text-[#9fa8b6]">MY BLOG</h1>
	</div>
</div>
