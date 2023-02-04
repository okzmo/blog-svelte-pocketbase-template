<script>
	import { applyAction, enhance } from '$app/forms';
	import '../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
</script>

<main class="flex flex-col lg:flex-row overflow-hidden">
	<section class="w-full lg:w-1/2 h-screen border-r-2 border-black flex flex-col z-[2]">
		<div class="h-1/6 border-b-2 border-black flex items-center">
			<h1 class="text-6xl md:text-[10vw] lg:text-[5vw] pl-6 font-bold bg-[#d6d1b7] z-[2]">
				<span>MORE</span>
				<span class="ml-2">DESIGN</span>
			</h1>
		</div>
		<div class="h-5/6 flex">
			<div class="hidden w-1/3 border-r-2 border-black lg:flex items-end justify-center">
				<p class="md:text-[4.5vw] font-bold">ART.01</p>
			</div>
			<div class="w-full lg:w-2/3 flex flex-col">
				<img
					src="https://images.unsplash.com/photo-1675430420657-72694b2f66be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
					alt=""
					class="h-[45vh] lg:h-[20vw] w-full mb-5 px-[1.2vw] pt-[1.2vw]"
				/>
				<div class="px-6 pb-6">
					<h2 class="text-3xl xl:text-5xl mb-4 font-medium">What's new in TailwindCSS V2</h2>
					<span class="flex justify-between mb-3">
						<p>By <span class="font-bold">Mathieu Rossi</span></p>
						<p>5 min Read</p>
					</span>
					<p class="text-md xl:text-[1.3vw] font-light">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur sapiente
						reiciendis voluptatum assumenda, quae iure! Placeat neque corporis asperiores ducimus
						non nam facilis reprehenderit, tempore, commodi, iste nostrum a distinctio!
					</p>
				</div>
				<div class="hidden lg:flex justify-end items-center border-t-2 border-black">
					<a href="/article" class="text-2xl px-6 py-4">Read More</a>
				</div>
			</div>
		</div>
	</section>
	<section class="w-full lg:w-1/2 flex flex-col">
		<div class="flex gap-2 justify-end items-center border-b-2 border-black py-4 px-6">
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
				<a
					href="/login"
					class="border-2 border-black bg-black text-[#d6d1b7] px-8 py-3 text-sm hover:bg-[#d6d1b7] hover:text-black transition"
					>LOGIN</a
				>
				<a
					href="/register"
					class="border-2 border-black px-8 py-3 text-sm hover:bg-black hover:text-[#d6d1b7] transition"
					>REGISTER</a
				>
			{/if}
		</div>
		<div class="h-2/5 flex flex-col pt-6 border-b-2 border-black justify-between">
			<div class="bg-black text-[#d6d1b7] text-2xl whitespace-nowrap flex">
				<div class="txt text-3xl">
					New Article - New Article - New Article - New Article - New Article - New Article -&nbsp;
				</div>
				<div class="txt text-3xl">
					New Article - New Article - New Article - New Article - New Article - New Article -&nbsp;
				</div>
			</div>
			<h3>New Videos</h3>
		</div>
		<div class="h-3/5">
			<h2>How did I make this blog using Svelte and Pocketbase</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error velit sint, officiis atque
				impedit quae.
			</p>
			<div>
				<p>12.06.2023</p>
				<p>12 views</p>
			</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		background-color: rgb(214, 209, 183);
	}

	.txt {
		animation: scrollTxt 15s linear infinite;
	}

	@keyframes scrollTxt {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(-100%, 0);
		}
	}
</style>
