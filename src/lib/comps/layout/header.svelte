<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/comps/ui/button/index.js';
	import 'iconify-icon';
	const { navlinks } = $props();
</script>

<header class="sticky top-0 flex w-full justify-center bg-gradient-to-b from-background">
	<nav class=" flex h-14 w-full max-w-[1200px] items-center justify-between px-4">
		<a href="/" class="flex h-12 w-fit items-end rounded-md bg-background bg-noise">
			<span class="font-title text-lg font-medium">bear</span>
			<span class="mb-1.5 mr-0.5 h-1.5 w-1.5 rounded-full bg-primary"></span><span
				class="font-title text-lg">fyi</span
			>
		</a>
		<div class="flex items-center sm:gap-2">
			{#each navlinks as link}
				<Button href={link.href} variant="link" class="text-foreground focus:ring-0">
					{link.text}
				</Button>
			{/each}
			<Button onclick={toggleMode} variant="ghost" size="icon">
				<iconify-icon
					class="rotate-0 scale-100 text-lg transition-all dark:-rotate-90 dark:scale-0"
					icon="mingcute:moon-stars-line"
				></iconify-icon>
				<iconify-icon
					class="absolute rotate-90 scale-0 text-lg transition-all dark:rotate-0 dark:scale-100"
					icon="mingcute:sun-line"
				></iconify-icon>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</nav>
</header>
