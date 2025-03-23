<script lang="ts">
    let { domain = $bindable() } = $props();

    let domainArr = $derived(domain.split('.'))
    let tld = $derived(domainArr[domainArr.length-1])
    let sld = $derived(domainArr[domainArr.length-2])
    let subs = $derived(getSubdomains(domainArr))

    function getSubdomains(domainArr: string[]){
        if(domainArr.length < 2){
            return [];
        } else {
            let subdomains: string[] = [];
            for(let x=0; x< domainArr.length - 2; x++){
                subdomains = [...subdomains, domainArr[x]]
            }
            return subdomains;
        }
    }

    $effect(() => {
        domain = domain.replace(/[^a-zA-Z0-9.-]/g, '');
    })
    
</script>

{#snippet dot()}
<span class="w-2 h-2 inline-block bg-primary translate-y-5 rounded-full"></span>
{/snippet}

{#snippet domain_part(long_label: string, short_label: string, break_length: number, text: string)}
<div>
    <div>
        <span class="text-2xl font-bold font-title tracking-wider">{text}</span>
    </div>
    <div class="flex flex-col justify-center items-center relative w-full mb-4">
        <span class="w-full border-x-2 border-b-2 border-primary block h-2"></span>
        <span class="h-2 bg-primary w-0.5 mb-0.5"></span>
        <span class="text-xs !text-primary font-semibold tracking-wide text-center top-4 absolute">{text.length < break_length ? short_label : long_label}</span>
    </div>
</div>
{/snippet}

<div class="flex gap-1 m-6 min-h-20">
    {#each subs as sub}
        {#if sub}
        {@render domain_part("subdomain", "sub", 4, sub)}
        {@render dot()}
        {/if}
    {/each}
    {#if sld}
        {@render domain_part("second level domain", "SLD", 5, sld)}
        {@render dot()}
    {/if}
    {#if tld}
        {@render domain_part("top level domain","TLD", 4, tld)}
    {/if}
</div>


