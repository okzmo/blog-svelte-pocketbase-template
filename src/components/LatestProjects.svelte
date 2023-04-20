<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb, currentUser } from '$lib/pocketbase';
	import type { Repo } from '../types/types';

    export let repos: Repo[];
</script>

<section class="w-full lg:w-1/2 flex flex-col">
	<div
		class="hidden lg:flex h-[8vh] gap-2 justify-end items-center border-b-[0.5vh] border-black py-4 lg:py-[2vh] px-6 lg:px-[2vh]"
	>
		{#if $currentUser}
			{#if $currentUser.role === 'admin' || $currentUser.role === 'author'}
				<a
					href="/editor"
					class="border-[0.5vh] border-black bg-black text-[#9fa8b6] px-8 py-3 lg:px-[1.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-[#9fa8b6] hover:text-black transition"
					>NEW POST</a
				>
			{/if}
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
				<button
					class="border-[0.5vh] border-black px-8 py-3 lg:px-[2.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-black hover:text-[#9fa8b6] transition"
					>Log Out</button
				>
			</form>
		{:else}
			<a
				href="/login"
				class="border-[0.5vh] border-black bg-black text-[#9fa8b6] px-8 py-3 lg:px-[2.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-[#9fa8b6] hover:text-black transition"
				>LOGIN</a
			>
			<a
				href="/register"
				class="border-[0.5vh] border-black px-8 py-3 lg:px-[2.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-black hover:text-[#9fa8b6] transition"
				>REGISTER</a
			>
		{/if}
	</div>
	<div class="h-fit lg:h-[30vh] flex flex-col pt-6 border-b-[0.5vh] border-black justify-between">
		<div class="bg-black text-[#9fa8b6] text-[3vh] py-[0.5vh] whitespace-nowrap hidden lg:flex">
			<div class="txt ">
				Have a good day - Have a good day - Have a good day - Have a good day -&nbsp;
			</div>
			<div class="txt">
				Have a good day - Have a good day - Have a good day - Have a good day -&nbsp;
			</div>
		</div>
		<h3
			class="text-[3.5vh] font-bold lg:font-normal p-[2vh] lg:px-[1vh] lg:py-[0.5vh] border-t-[0.5vh] border-black lg:border-t-0"
		>
			GitHub Repositories
		</h3>
	</div>
  <!--This part is to add your repositories from github if you want to WARNING : ADD YOUR GITHUB TOKEN BEFORE UNCOMMENTING -->
	<!-- <div class="lg:h-[62vh] overflow-auto">
		{#each repos as repo}
            <a href={repo.html_url} target='_blank' rel="noreferrer" class="w-full h-fit border-b-[0.5vh] border-black py-[3.5vh] px-[3vh] flex items-center text-[2vh] justify-between relative repo hover:text-[#9fa8b6] transition">
                <span>
                    <p class="text-[2.5vh]">{repo.name}</p>
                    <p class="text-[1.6vh] w-full lg:w-[30vw]">{repo.description}</p>
                </span>
                <span class="hidden lg:block">{repo.stargazers_count} Stars</span>
            </a>
        {/each}
	</div> -->
</section>

<style>
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

	.repo:after {
		content: '';
		position: absolute;
		width: 0;
		height: 100%;
		background-color: #000;
		left: 0;
		z-index: -1;
		transition: width 0.2s ease-in-out;
	}

	.repo:hover:after {
		width: 100%;
	}
</style>
