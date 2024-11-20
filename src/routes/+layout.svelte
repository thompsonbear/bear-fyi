<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();

	import Header from '$lib/comps/layout/header.svelte';
	import Footer from '$lib/comps/layout/footer.svelte';

	let navlinks: Link[] = [
		{ text: 'blog', href: '/' },
		{ text: 'about', href: '/about' }
	];
</script>

<ModeWatcher />
<div class="relative flex w-full flex-col items-center bg-opacity-10 bg-noise">
	<Header {navlinks} />
	<div class="min-h-[calc(100vh-3.5rem)] w-full max-w-[1000px] p-4">
		{@render children()}
	</div>
</div>
<Footer {navlinks} />

<!-- <BubbleBackground /> -->
