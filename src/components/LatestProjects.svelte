<script lang='ts'>
    import { applyAction, enhance } from '$app/forms';
    import { pb, currentUser } from '$lib/pocketbase';

</script>

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
                Have a good day - Have a good day - Have a good day - Have a good day -&nbsp;
            </div>
            <div class="txt">
                Have a good day - Have a good day - Have a good day - Have a good day -&nbsp;
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