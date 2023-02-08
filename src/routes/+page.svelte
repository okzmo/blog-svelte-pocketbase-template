<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pocketbase';
	import '../app.postcss';

	export let data: any;
	console.log(data.posts);
</script>

<main class="flex flex-col lg:flex-row overflow-hidden border-[0.5vh] border-black lg:h-screen">
	<section
		class="w-full lg:w-1/2 h-fit lg:h-full lg:border-r-[0.5vh] border-black flex flex-col z-[2]"
	>
		<div
			class="h-fit lg:h-[15vh] border-b-[0.5vh] border-black flex justify-center lg:justify-start items-center bg-[#d6d1b7]"
		>
			<h1 class="text-[13vw] md:text-[10vw] lg:text-[5vw] lg:pl-[2.5vh] font-bold z-[2]">
				{#if $currentUser}
					Hey, {$currentUser.username}
				{:else}
					HELLO, THERE!
				{/if}
			</h1>
		</div>
		<div class="h-fit lg:h-[85vh] flex">
			<div class="hidden w-1/3 border-r-[0.5vh] border-black lg:flex items-end justify-center">
				<p class="md:text-[4.5vw] font-bold">ART.01</p>
			</div>
			<div class="w-full lg:w-2/3 overflow-auto">
				{#if data.posts.length === 0}
					<h1>NO POST AVAILABLE</h1>
				{:else}
					<div class="flex flex-col border-b-[0.5vh] border-black h-fit lg:h-full">
						<div class="h-fit sm:h-[90%]">
							<img
								src={`http://127.0.0.1:8090/api/files/${data.posts[5].collectionId}/${data.posts[5].id}/${data.posts[5].picture}`}
								alt=""
								class="h-[40vh] lg:h-[38vh] w-full mb-5 lg:mb-[1.4vh] px-4 pt-4 lg:px-[1.2vw] lg:pt-[1.2vw]"
							/>
							<div class="px-5 pb-5 lg:px-[1.2vw] lg:pb-[1.2vw]">
								<h2 class="text-3xl md:text-[3.5vw] lg:leading-[3vw] mb-4 lg:mb-[1.2vh] font-bold">
									What's new in TailwindCSS V2
								</h2>
								<span class="flex justify-between mb-3 lg:mb-[1vh]">
									<p class="md:text-[0.86vw]">By <span class="font-bold">Mathieu Rossi</span></p>
									<p class="md:text-[0.86vw]">5 min Read</p>
								</span>
								<p class="text-md lg:text-[1.73vw] xl:text-[2.4vh] font-regular">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur sapiente
									reiciendis voluptatum assumenda, quae iure! Placeat neque corporis asperiores
									ducimus non nam facilis reprehenderit, tempore, commodi, iste nostrum a
									distinctio!
								</p>
							</div>
						</div>
						<div
							class="hidden lg:flex justify-end items-center border-t-[0.5vh] border-black h-[10%]"
						>
							<a href="/article" class="text-[2.2vh] px-[1.2vw]">Read More</a>
						</div>
					</div>
				{/if}

				<div class="flex flex-col border-b-[0.5vh] border-black h-fit lg:h-full">
					<div class="h-fit sm:h-[90%]">
						<img
							src="https://images.unsplash.com/photo-1675430420657-72694b2f66be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
							alt=""
							class="h-[40vh] lg:h-[38vh] w-full mb-5 lg:mb-[1.4vh] px-4 pt-4 lg:px-[1.2vw] lg:pt-[1.2vw]"
						/>
						<div class="px-5 pb-5 lg:px-[1.2vw] lg:pb-[1.2vw]">
							<h2 class="text-3xl md:text-[3.5vw] lg:leading-[3vw] mb-4 lg:mb-[1.2vh] font-bold">
								What's new in TailwindCSS V2
							</h2>
							<span class="flex justify-between mb-3 lg:mb-[1vh]">
								<p class="md:text-[0.86vw]">By <span class="font-bold">Mathieu Rossi</span></p>
								<p class="md:text-[0.86vw]">5 min Read</p>
							</span>
							<p class="text-md lg:text-[1.2vw] font-regular">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur sapiente
								reiciendis voluptatum assumenda, quae iure! Placeat neque corporis asperiores
								ducimus non nam facilis reprehenderit, tempore, commodi, iste nostrum a distinctio!
							</p>
						</div>
					</div>
					<div
						class="hidden lg:flex justify-end items-center border-t-[0.5vh] border-black h-[10%]"
					>
						<a href="/article" class="text-[2.2vh] px-[1.2vw]">Read More</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="w-full lg:w-1/2 flex flex-col">
		<div
			class="hidden lg:flex h-[8vh] gap-2 justify-end items-center border-b-[0.5vh] border-black py-4 lg:py-[2vh] px-6 lg:px-[2vh]"
		>
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
					class="border-[0.5vh] border-black bg-black text-[#d6d1b7] px-8 py-3 lg:px-[2.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-[#d6d1b7] hover:text-black transition"
					>LOGIN</a
				>
				<a
					href="/register"
					class="border-[0.5vh] border-black px-8 py-3 lg:px-[2.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-black hover:text-[#d6d1b7] transition"
					>REGISTER</a
				>
			{/if}
		</div>
		<div class="h-fit lg:h-[30vh] flex flex-col pt-6 border-b-[0.5vh] border-black justify-between">
			<div class="bg-black text-[#d6d1b7] text-[3vh] py-[0.5vh] whitespace-nowrap hidden lg:flex">
				<div class="txt ">
					New Article - New Article - New Article - New Article - New Article - New Article -&nbsp;
				</div>
				<div class="txt">
					New Article - New Article - New Article - New Article - New Article - New Article -&nbsp;
				</div>
			</div>
			<h3>Latest Projects</h3>
		</div>
		<div class="lg:h-[62vh]">
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
