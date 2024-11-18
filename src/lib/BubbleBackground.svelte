<script lang="ts">
	const rows = 10;
	const cols = 15;
</script>

<div class="relative bottom-0 right-1/2 flex justify-center">
	<div
		class="relative grid min-h-screen w-[2200px] translate-x-[1100px] place-items-center"
		style="grid-template-rows: repeat({rows}, minmax(0, 1fr)); grid-template-columns: repeat({cols}, minmax(0, 1fr));"
	>
		{#each Array(rows) as _, r}
			{#each Array(cols) as _, c}
				{#if c < cols / 2}
					<div
						class="grid place-items-center rounded-full bg-orange-500"
						style="height: {r}rem; width: {r}rem; opacity: {((c + 1) / (cols / 2) - 0.2) *
							(r / 7)};"
					></div>
				{:else}
					<div
						class="grid place-items-center rounded-full bg-orange-500"
						style="height: {r}rem; width: {r}rem; opacity: {((cols - c) / (cols / 2) - 0.2) *
							(r / 7)};"
					></div>
				{/if}
			{/each}
		{/each}
	</div>
</div>
