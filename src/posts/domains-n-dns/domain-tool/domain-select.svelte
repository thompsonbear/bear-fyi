<script lang="ts">
    let {
        domain = $bindable(),
        domain_list,
        random_mode = true,
        random_ms = 10000
    } = $props()

    import 'iconify-icon'
	import { onDestroy } from 'svelte';

    let current_item = 0;

    var domain_interval: NodeJS.Timeout | undefined;
    var char_interval: NodeJS.Timeout | undefined;

    function startRandom(){
        random_mode = true;

        if(!domain_interval){
            current_item++
            if(current_item == domain_list.length){
                current_item = 0;
            }
            updateRandomDomain(domain_list[current_item])

            domain_interval = setInterval(() => {
                current_item++
                if(current_item == domain_list.length){
                    current_item = 0;
                }
                updateRandomDomain(domain_list[current_item])
            }, random_ms)
        }
        
    }

    // Animates domain from the current to the next
    function updateRandomDomain(new_domain: string){
        // random ms divided by the average domain length between old and new divided again by 10
        let ms = random_ms / ((domain.length + new_domain.length )/2) / 10
        let waning = true;
        char_interval = setInterval(() => {
            if(waning){
                //reduce the displayed (old) domain length by 1
                domain = domain.substring(0, domain.length - 1)
                if(domain.length == 0){ waning = false; }
            } else {
                //increase the displayed (new) domain length by 1
                if(domain.length == new_domain.length){clearInterval(char_interval)}
                else{domain = new_domain.substring(0, domain.length + 1)}
            }
           
        }, ms)
    }

    if(random_mode){
        startRandom()
    }

    function stopRandom(){
        random_mode = false
        clearInterval(domain_interval)
        clearInterval(char_interval)
    }

    onDestroy(() => {
        clearInterval(domain_interval)
        clearInterval(char_interval)
    })

    function handleVisibilityChange(e: Event) {
        if (random_mode == true){
            if(document.visibilityState == 'hidden'){
                clearInterval(domain_interval)
                clearInterval(char_interval)
            } else if(document.visibilityState == 'visible'){
                startRandom()
            }
        } 
    }

</script>

<svelte:document onvisibilitychange={(e) => handleVisibilityChange(e)}/>

<div class="flex gap-2 flex-col sm:flex-row">
    <button onclick={startRandom} class="px-3 flex gap-2 rounded-lg justify-center items-center h-10 border {random_mode ? "bg-primary bg-noise" : "hover:bg-primary/50"}" aria-label="Randomize">
        <iconify-icon class="text-xl" icon="mingcute:random-line"></iconify-icon>
        <span>Random</span>
    </button>
    <label for="domain-input" class="flex rounded-md group items-center gap-1 px-2 cursor-pointer border h-10 {random_mode ? "hover:bg-primary/50 justify-center" : "bg-primary bg-noise"}">
        <iconify-icon icon="mingcute:edit-2-line" class="text-xl"></iconify-icon>
        <input onfocus={stopRandom} id="domain-input" type="text" bind:value={domain} class="bg-transparent outline-none {random_mode ? "w-0" : "pl-1"}">
        <span class="{random_mode ? "inline-block" : "hidden"}">Custom</span>
    </label>
</div>
