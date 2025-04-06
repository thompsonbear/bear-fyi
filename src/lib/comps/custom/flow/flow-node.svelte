<script lang="ts">
    import type { FlowNode } from "$lib/types";
    const { node, reverse = false, end }: { node: FlowNode, reverse: boolean, end: boolean } = $props()
</script>

{#snippet line(reverse: boolean, label: string | undefined)}
<span class="md:h-0.5 md:w-fit w-0.5 h-20 flex-grow bg-gradient-to-b md:bg-gradient-to-r from-primary from-0% via-25% to-50% via-primary md:bg-[length:5px] bg-[length:5px_5px] relative flex justify-center items-center { reverse ? 'animate-border-up md:animate-border-left' : 'animate-border-down md:animate-border-right' }">
    {#if label}
    <span class="absolute bg-background px-4 bg-noise border border-foreground/50 rounded-md text-center">{node.connection_label}</span>
    {/if}
</span>
{/snippet}

{#if !end && reverse}
    {@render line(true, node.connection_label)}
{/if}
<span class="px-8 py-2 md:py-4 border border-primary rounded-md flex md:flex-col md:gap-1 gap-2 justify-center items-center !text-foreground font-medium">
    {#if node.icon}
    <iconify-icon icon={node.icon} class="text-xl md:text-3xl !text-foreground"></iconify-icon>
    {/if}
    {node.label}
</span>
{#if !end && !reverse}
    {@render line(false, node.connection_label)}
{/if}