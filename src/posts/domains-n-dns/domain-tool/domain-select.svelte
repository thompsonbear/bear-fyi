<script lang="ts">
    let {
        domain = $bindable(),
        domain_list,
        random_mode = true,
        random_ms = 5000
    } = $props()

    import 'iconify-icon'
	import { onDestroy } from 'svelte';

    let current_item = 0;

    var interval: NodeJS.Timeout | undefined;
    function startRandom(){
        random_mode = true;
        interval = setInterval(() => {
            domain = domain_list[current_item]
            current_item++
            if(current_item == domain_list.length){
                current_item = 0;
            }
        }, random_ms)
    }

    if(random_mode){
        startRandom()
    }

    function stopRandom(){
        random_mode = false
        clearInterval(interval)
    }

    onDestroy(() => {
        clearInterval(interval)
    })

</script>

<div class="flex gap-2 h-10">
    <button onclick={startRandom} class="px-3 flex gap-2 rounded-lg justify-center items-center h-full {random_mode ? "bg-primary bg-noise" : "hover:bg-primary/50"}" aria-label="Randomize">
        <iconify-icon class="text-xl" icon="mingcute:random-line"></iconify-icon>
        <span>Random</span>
    </button>
    <label for="domain-input" class="flex rounded-md group items-center gap-1 px-2 cursor-pointer {random_mode ? "hover:bg-primary/50" : "bg-primary bg-noise"}">
        <iconify-icon icon="mingcute:edit-2-line" class="text-xl"></iconify-icon>
        <input onfocus={stopRandom} id="domain-input" type="text" bind:value={domain} class="bg-transparent outline-none {random_mode ? "w-0" : "pl-1"}">
        <span class="{random_mode ? "inline-block" : "hidden"}">Custom</span>
    </label>
    
</div>
