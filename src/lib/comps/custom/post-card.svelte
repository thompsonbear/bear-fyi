<script lang="ts">
	import type { Point } from '$lib/types';
	import { clearAnimations, getDistance } from '$lib/utils';
	import { formatDate } from '$lib/utils';
	import Badge from '$lib/comps/ui/badge/badge.svelte';

	let clientWidth: number = $state(0);
	let isMobile: boolean = $state(true);
	let card: HTMLAnchorElement;
	let cursor: HTMLSpanElement;
	let showCursor: boolean = $state(false);
	let rect: DOMRect;
	let center: Point;
	let maxDistance: number;
	let leaveTimeout: number | undefined = undefined;

	let { mousePos = $bindable(), post } = $props();

	function getPercentDistance(origin: Point, current: Point, maxDistance: number) {
		// Get the pixel point distance between the center of the rect and the cursor offset location
		let pixelDist = getDistance(origin, current);
		// Convert to a percentage between 0 and 1, 1 being the center and 0 being the max distance
		return 1 - pixelDist / maxDistance;
	}

	function getRelativePos(mousePos: Point, rect: DOMRect) {
		return { x: mousePos.x - rect.left, y: mousePos.y - rect.top };
	}

	function handleMouseMove() {
		if (isMobile) return;

		const relativePos = getRelativePos(mousePos, rect);
		const percentDistance = getPercentDistance(center, relativePos, maxDistance);

		cursor.animate(
			{
				translate: `${relativePos.x}px ${relativePos.y}px`,
				scale: `${percentDistance}`
			},
			{ duration: 1000, fill: 'forwards' }
		);
		showCursor = true;
	}

	function handleMouseEnter() {
		// Clear the existing timeout from the leave handler if it is still running - need to clear the animations to avoid jumping
		if (leaveTimeout) {
			clearTimeout(leaveTimeout);
			clearAnimations(cursor);
		}

		if (isMobile) return;

		// Set styles immediately at time of mouse enter
		const relativePos = getRelativePos(mousePos, rect);
		const percentDistance = getPercentDistance(center, relativePos, maxDistance);
		cursor.style.translate = `${relativePos.x}px ${relativePos.y}px`;
		cursor.style.scale = `${percentDistance}`;

		showCursor = true;
	}

	function handleMouseLeave() {
		card.style.scale = '1';

		if (isMobile) return;

		cursor.animate({ scale: 0 }, { duration: 300 });
		leaveTimeout = setTimeout(() => {
			clearAnimations(cursor);
			showCursor = false;
		}, 250);
	}

	function handleMouseDown() {
		card.style.scale = '0.99';
	}

	function handleMouseUp() {
		card.style.scale = '1';
	}

	function handleResize() {
		rect = card.getBoundingClientRect();
		center = { x: rect.width / 2, y: rect.height / 2 };
		maxDistance = getDistance({ x: 0, y: 0 }, { x: center.x, y: center.y });
		isMobile = clientWidth < 1000;
	}

	function handleScroll() {
		rect = card.getBoundingClientRect();
	}

	$effect(() => {
		handleResize();
	});
</script>

<svelte:window onscroll={handleScroll} onresize={handleResize} bind:innerWidth={clientWidth} />

<a
	href="/{post.slug}"
	bind:this={card}
	draggable="false"
	class="border-3 relative flex flex-col gap-4 overflow-clip rounded border bg-secondary bg-noise p-4 shadow-sm"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	onmouseenter={handleMouseEnter}
	aria-hidden="true"
>
	<span
		bind:this={cursor}
		class="absolute -left-[250px] -top-[250px] aspect-square h-[500px] rounded-full bg-primary bg-noise {showCursor
			? 'block'
			: 'hidden'}"
	></span>
	<span class="relative z-10 flex flex-col gap-4">
		<div class="space-y-1">
			<p class="text-sm">{formatDate(post.date)}</p>
			<h1 class="font-title text-xl group-hover:text-primary md:text-5xl">
				{post.title}
			</h1>
		</div>
		<p class="description">{post.description}</p>
		<div class="flex gap-1">
			{#each post.categories as category}
				<Badge class="bg-foreground text-background hover:bg-secondary hover:text-foreground"
					>{category}</Badge
				>
			{/each}
		</div>
	</span>
</a>
