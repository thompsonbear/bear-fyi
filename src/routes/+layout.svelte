<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import BubbleBackground from '$lib/BubbleBackground.svelte';
</script>

{@render children()}
<BubbleBackground />
