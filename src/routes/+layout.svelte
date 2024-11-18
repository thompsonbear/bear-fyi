<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();

	import Header from '$lib/comps/layout/header.svelte';
	import Footer from '$lib/comps/layout/footer.svelte';

	// import BubbleBackground from '$lib/BubbleBackground.svelte';
</script>

<ModeWatcher />
<div class="bg-noise relative flex w-full flex-col items-center bg-opacity-10">
	<Header />
	<div class="min-h-[calc(100vh-3.5rem)] w-full max-w-[1000px] p-4">
		{@render children()}
	</div>
</div>
<Footer />

<!-- <BubbleBackground /> -->
