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
			class="flex flex-col justify-center w-3/5"
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
			<span class="flex justify-between">
				<label for="name">Email Address</label>
				{#if form?.errors?.email}
					<span class="text-red-700 font-semibold">{form?.errors?.email[0]}</span>
				{/if}
			</span>
			<input
				type="email"
				name="email"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="mycoolemailaddress@gmail.com"
				style={`outline-color: ${form?.errors?.email ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				value={form?.data?.email ?? ''}
			/>
			<span class="flex justify-between">
				<label for="username">Username</label>
				{#if form?.errors?.username}
					<span class="text-red-700 font-semibold">{form?.errors?.name[0]}</span>
				{/if}
			</span>
			<input
				type="text"
				name="username"
				autocomplete="off"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="mycoolusername123"
				style={`outline-color: ${form?.errors?.username ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				value={form?.data?.username ?? ''}
			/>
			<span class="flex justify-between">
				<label for="name">Display Name</label>
				{#if form?.errors?.name}
					<span class="text-red-700 font-semibold">{form?.errors?.name[0]}</span>
				{/if}
			</span>
			<input
				type="text"
				name="name"
				autocomplete="off"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="My Cool Display Name"
				style={`outline-color: ${form?.errors?.name ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				value={form?.data?.name ?? ''}
			/>
			<span class="flex justify-between">
				<label for="password">Password</label>
				{#if form?.errors?.password}
					<span class="text-red-700 font-semibold">{form?.errors?.password[0]}</span>
				{/if}
			</span>
			<input
				type="password"
				name="password"
				class="w-full rounded-lg mb-4 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				style={`outline-color: ${form?.errors?.passwordConfirm ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				placeholder="Password"
				value=""
			/>
			<span class="flex justify-between">
				<label for="passwordConfirm">Verify password</label>
				{#if form?.errors?.passwordConfirm}
					<span class="text-red-700 font-semibold">{form?.errors?.passwordConfirm[0]}</span>
				{/if}
			</span>
			<input
				type="password"
				name="passwordConfirm"
				class="w-full rounded-lg mb-12 mt-2 px-5 py-3 bg-[#959dab] placeholder:text-black/50 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 transition-all"
				placeholder="Verify Password"
				style={`outline-color: ${form?.errors?.passwordConfirm ? 'rgb(185, 28, 28)' : ''}; outline-offset: 0`}
				value=""
			/>
			<button
				type="submit"
				class="w-full rounded-md bg-black text-[#9fa8b6] px-5 py-3 font-semibold hover:bg-[#9fa8b6] hover:text-black self-center border-2 border-black transition"
				>Sign Up</button
			>

			<input type="text" name="role" id="role" value="user" hidden />
		</form>
	</div>
	<div class="w-1/2 flex justify-center items-center bg-black">
		<h1 class="text-8xl font-bold text-[#9fa8b6]">MY BLOG</h1>
	</div>
</div>
