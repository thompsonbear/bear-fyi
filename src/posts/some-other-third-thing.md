---
title: Some Other Third Thing
description: Spongebob Reference.
published: '11-29-2024'
updated: '11-30-2024'
categories:
  - cartoons
  - movies
visible: true
---

## Some Content That Deserves Your Attention

I like apples. They are good for your health.

```svelte
<article class="mb-20">
	<div class="my-16 space-y-4">
		<hgroup class="space-y-4">
			<h1 class="font-title text-4xl !leading-[1.2] md:text-6xl">{data.meta.title}</h1>
			{#if data.meta.description}
				<p class="text-lg text-secondary-foreground md:text-2xl">{data.meta.description}</p>
			{/if}
		</hgroup>
		<div class="flex">
			<p class="flex gap-4 text-muted-foreground">
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
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>
```
