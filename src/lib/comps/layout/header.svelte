<script lang="ts">
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/comps/ui/button/index.js';

	let navlinks: Link[] = [
		{ text: 'blog', href: '/' },
		{ text: 'about', href: '/about' }
	];
</script>

<nav class="sticky top-0 flex h-14 w-full max-w-[1200px] items-center justify-between px-4">
	<a href="/" class="flex items-end">
		<span class="font-title text-lg font-medium leading-6">bear</span>
		<span class="mb-1 mr-0.5 h-1.5 w-1.5 rounded-full bg-primary"></span><span
			class="text-lg leading-[1.35rem]">fyi</span
		>
	</a>
	<div class="flex items-center gap-2">
		{#each navlinks as link}
			<Button href={link.href} variant="ghost">
				{link.text}
			</Button>
		{/each}
		<Button onclick={toggleMode} variant="ghost" size="icon">
			<Moon
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Sun
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</nav>
