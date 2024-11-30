<script lang="ts">
	import PostCard from '$lib/comps/custom/post-card.svelte';

	let { data } = $props();

	let mousePos = $state({ x: 0, y: 0 });

	function handleMouseMove(e: MouseEvent) {
		mousePos = { x: e.clientX, y: e.clientY };
	}
</script>

<svelte:head>
	<title>bear.fyi</title>
	<meta property="description" content="Blog by Thompson Bear" />
</svelte:head>

<section
	onmousemove={(e) => handleMouseMove(e)}
	aria-hidden="true"
	class="mb-10 flex flex-col items-center justify-center p-4"
>
	<div class="my-20 flex flex-col items-center gap-4">
		<div class="flex h-20 w-fit items-end justify-center font-title text-7xl">
			<span class="font-medium">bear</span>
			<span class="mb-1 mr-2 h-5 w-5 rounded-full bg-primary"></span><span class="">fyi</span>
		</div>
		<h2 class="text-xl">
			Blog from a real <a
				href="/about"
				class="underline underline-offset-2 transition-colors duration-300 hover:text-primary"
				>Bear</a
			>
		</h2>
	</div>

	<div class="grid w-full gap-4 md:grid-cols-2">
		{#each data.posts as post}
			<PostCard bind:mousePos {post}></PostCard>
		{/each}
	</div>
</section>
