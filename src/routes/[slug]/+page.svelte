<script lang="ts">
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import { formatDate } from '$lib/utils';

	let { data } = $props();
	import 'iconify-icon';
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<div class="mb-14 mt-10 space-y-8">
		<div class="flex justify-between">
			<div class="flex flex-wrap gap-2">
				{#each data.meta.categories as category}
					<Badge variant="outline" class="h-fit">{category}</Badge>
				{/each}
			</div>
			<p class="flex gap-4 opacity-50">
				<span class="flex items-center gap-1"
					><iconify-icon icon="mingcute:git-merge-line"></iconify-icon>{formatDate(
						data.meta.published
					)}</span
				>
				{#if data.meta.updated}
					<span class="flex items-center gap-1"
						><iconify-icon icon="mingcute:git-compare-line"></iconify-icon>{formatDate(
							data.meta.updated
						)}</span
					>
				{/if}
			</p>
		</div>

		<h1 class="font-title text-4xl !leading-[1.2] md:text-6xl">{data.meta.title}</h1>
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>
