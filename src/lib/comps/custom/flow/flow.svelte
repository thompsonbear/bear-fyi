<script lang="ts">
    import type { FlowNode } from "$lib/types";
    let { nodes, reverse = false, note = undefined }: { nodes: FlowNode[], reverse: boolean, note: string | undefined} = $props()

    let flow_nodes = nodes;
    if(reverse){
        flow_nodes.reverse()
    }
	
    import Node from "./flow-node.svelte";
</script>

<div class="py-4 gap-1 flex flex-col">
    <div class="flex items-center md:flex-row flex-col">
        {#each flow_nodes as node, i}
        <Node {node} {reverse} end={reverse ? i == 0 : i == nodes.length - 1}/>
        {/each}
    </div>
    {#if note}
    <p class="text-xs md:text-left text-center">{note}</p>
    {/if}
</div>
