<script lang="ts">
	import type { Point } from '$lib/types';

	let mousePos: Point = $state({ x: 0, y: 0 });
	let style = $state('translate: 0 0; scale: 0');
	let card: HTMLAnchorElement;
	let rect: DOMRect;
	let center: Point;
	let relativePos: Point;
	let maxDistance: number;

	// TODO: Need to rate limit this, probably
	function handleMouseMove(e: MouseEvent) {
		mousePos = { x: e.clientX, y: e.clientY };
		relativePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };

		let pixelDist = getDistance(center, relativePos);
		let percentDistFromCenter = 1 - pixelDist / maxDistance;

		style = `translate: ${relativePos.x}px ${relativePos.y}px; scale: ${percentDistFromCenter};`;
	}

	function handleResize() {
		getRect();
		center = { x: rect.width / 2, y: rect.height / 2 };
		maxDistance = getDistance({ x: 0, y: 0 }, { x: center.x, y: center.y });
	}

	function getDistance(first: Point, second: Point) {
		return Math.sqrt((second.x - first.x) ** 2 + (second.y - first.y) ** 2);
	}

	function getRect() {
		rect = card.getBoundingClientRect();
	}

	$effect(() => {
		handleResize();
	});
</script>

<svelte:window onscroll={getRect} onresize={handleResize} />

<a
	href="https://thompsonbear.com"
	bind:this={card}
	class="relative grid h-52 w-52 place-items-center overflow-clip bg-secondary bg-noise"
	onmousemove={(e) => handleMouseMove(e)}
>
	<span
		class="absolute -left-1/2 -top-1/2 aspect-square w-full rounded-full bg-primary bg-noise"
		{style}
	></span>
	<span class="z-10">x: {mousePos.x}, y: {mousePos.y}</span>
</a>
