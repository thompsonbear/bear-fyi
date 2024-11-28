<script lang="ts">
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import InteractCard from '$lib/comps/custom/interact-card.svelte';

	import { formatDate } from '$lib/utils';

	let { data } = $props();
</script>

<section>
	<div class="grid gap-4 md:grid-cols-2">
		{#each data.posts as post}
			<a
				class="flex flex-col gap-4 rounded bg-secondary bg-noise p-4 transition-colors hover:bg-primary"
				href="/{post.slug}"
			>
				<div class="space-y-1">
					<h1 class="font-title text-xl group-hover:text-primary md:text-5xl">
						{post.title}
					</h1>
					<p class="text-sm">{formatDate(post.date)}</p>
				</div>
				<p class="description">{post.description}</p>
				<div class="flex gap-1">
					{#each post.categories as category}
						<Badge class="bg-foreground text-background">{category}</Badge>
					{/each}
				</div>
			</a>
		{/each}
		<InteractCard></InteractCard>
	</div>
</section>
