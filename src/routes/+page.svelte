<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/comps/layout/footer.svelte';
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import * as Card from '$lib/comps/ui/card/index.js';

	import { formatDate } from '$lib/utils';

	let { data } = $props();
</script>

<section>
	<div class="grid grid-cols-2 gap-4">
		{#each data.posts as post}
			<Card.Root
				onclick={() => goto(`/${post.slug}`)}
				class="group cursor-pointer transition-colors duration-200 hover:border-primary"
			>
				<Card.Header>
					<h1 class="font-title text-5xl transition-colors duration-200 group-hover:text-primary">
						{post.title}
					</h1>
					<p class="date">{formatDate(post.date)}</p>
				</Card.Header>
				<Card.Content>
					<p class="description">{post.description}</p>
				</Card.Content>
				<Card.Footer class="flex flex-wrap gap-2">
					{#each post.categories as category}
						<Badge variant="outline">{category}</Badge>
					{/each}
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
