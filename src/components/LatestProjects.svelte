<script lang='ts'>
    import { applyAction, enhance } from '$app/forms';
    import { pb, currentUser } from '$lib/pocketbase';

    export let projects: Array<Object>;
    console.log(projects);
</script>

<section class="w-full lg:w-1/2 flex flex-col">
    <div
        class="hidden lg:flex h-[8vh] gap-2 justify-end items-center border-b-[0.5vh] border-black py-4 lg:py-[2vh] px-6 lg:px-[2vh]"
    >
        {#if $currentUser}
            {#if $currentUser.role === 'admin' || $currentUser.role === 'editor' }
            <a href="/editor" class="border-[0.5vh] border-black bg-black text-[#9fa8b6] px-8 py-3 lg:px-[1.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-[#9fa8b6] hover:text-black transition">NEW POST</a>
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
                <button class="border-[0.5vh] border-black px-8 py-3 lg:px-[2.2vw] lg:py-[1.2vh] text-sm lg:text-[0.8vw] lg:leading-[2vh] hover:bg-black hover:text-[#9fa8b6] transition">Log Out</button>
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
        <h3 class="text-[3.5vh] pl-[1vh] pb-[0.5vh]">GitHub Repositories</h3>
    </div>
    <div class="lg:h-[62vh] overflow-auto">
        {#each projects as project}
            <div class="w-full h-[3vh] border-b-[0.5vh] border-black py-[4vh] pl-[3vh] flex items-center text-[2vh]">
                {project.name}
            </div>
        {/each}
    </div>
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
</style>