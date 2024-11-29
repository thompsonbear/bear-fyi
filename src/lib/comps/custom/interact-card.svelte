<script lang="ts">
	import type { Point } from '$lib/types';
	import { clearAnimations, getDistance } from '$lib/utils';

	let card: HTMLDivElement;
	let cursor: HTMLSpanElement;
	let showCursor: boolean = $state(false);
	let rect: DOMRect;
	let center: Point;
	let maxDistance: number;
	let leaveTimeout: number | undefined = undefined;

	let { mousePos = $bindable(), children } = $props();

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
		const relativePos = getRelativePos(mousePos, rect);
		const percentDistance = getPercentDistance(center, relativePos, maxDistance);

		cursor.animate(
			{
				translate: `${relativePos.x}px ${relativePos.y}px`,
				scale: `${percentDistance}`
			},
			{ duration: 1000, fill: 'forwards' }
		);
	}

	function handleMouseEnter() {
		// Clear the existing timeout from the leave handler if it is still running - need to clear the animations to avoid jumping
		if (leaveTimeout) {
			clearTimeout(leaveTimeout);
			clearAnimations(cursor);
		}

		// Set styles immediately at time of mouse enter
		const relativePos = getRelativePos(mousePos, rect);
		const percentDistance = getPercentDistance(center, relativePos, maxDistance);
		cursor.style.translate = `${relativePos.x}px ${relativePos.y}px`;
		cursor.style.scale = `${percentDistance}`;

		showCursor = true;
	}

	function handleMouseLeave() {
		cursor.animate({ scale: 0 }, { duration: 300 });
		leaveTimeout = setTimeout(() => {
			clearAnimations(cursor);
			showCursor = false;
		}, 250);
	}

	function handleResize() {
		rect = card.getBoundingClientRect();
		center = { x: rect.width / 2, y: rect.height / 2 };
		maxDistance = getDistance({ x: 0, y: 0 }, { x: center.x, y: center.y });
	}

	function handleScroll() {
		rect = card.getBoundingClientRect();
	}

	$effect(() => {
		handleResize();
	});
</script>

<svelte:window onscroll={handleScroll} onresize={handleResize} />

<div
	bind:this={card}
	class="relative overflow-clip rounded bg-secondary bg-noise"
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
	<span class="relative z-10">
		{@render children()}
	</span>
</div>
