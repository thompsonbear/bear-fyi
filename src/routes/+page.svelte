<script lang="ts">
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import InteractCard from '$lib/comps/custom/interact-card.svelte';

	import { formatDate } from '$lib/utils';

	let { data } = $props();

	let mousePos = $state({ x: 0, y: 0 });

	function handleMouseMove(e: MouseEvent) {
		mousePos = { x: e.clientX, y: e.clientY };
	}
</script>

<section
	onmousemove={(e) => handleMouseMove(e)}
	aria-hidden="true"
	class="flex flex-col items-center justify-center p-4"
>
	<div class="my-10 flex flex-col items-center gap-4">
		<div class="flex h-20 w-fit items-end justify-center">
			<span class="font-title text-7xl font-medium">bear</span>
			<span class="mb-1 mr-2 h-5 w-5 rounded-full bg-primary"></span><span
				class="font-title text-7xl">fyi</span
			>
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
			<InteractCard bind:mousePos>
				<a class="flex flex-col gap-4 rounded p-4" href="/{post.slug}">
					<div class="space-y-1">
						<h1 class="font-title text-xl group-hover:text-primary md:text-5xl">
							{post.title}
						</h1>
						<p class="text-sm">{formatDate(post.date)}</p>
					</div>
					<p class="description">{post.description}</p>
					<div class="flex gap-1">
						{#each post.categories as category}
							<Badge class="bg-foreground text-background hover:bg-secondary hover:text-foreground"
								>{category}</Badge
							>
						{/each}
					</div>
				</a>
			</InteractCard>
		{/each}
	</div>
</section>
