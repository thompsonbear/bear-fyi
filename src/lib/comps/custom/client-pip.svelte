<script lang="ts">
    import 'iconify-icon';

    let client_public_ip = $state("");
    let show_ip = $state(false);

    async function fetchPIP() {
        const res = await fetch("https://ifconfig.me/ip")

        if (res.ok) {
			return res.text();
			
		} else {
			return "";
		}
    }

    const promise = fetchPIP()
    
</script>


<code>
    {#await promise}
        <span>Checking IP</span>
    {:then pip}
    <button class="relative" onclick={() => {show_ip = !show_ip}}>
        {#if !show_ip}
        <span class="absolute w-full flex items-center justify-center gap-1.5">
            <iconify-icon
            class="text-lg"
            icon="mingcute:eye-2-line"
        ></iconify-icon>
            Show IP
        </span>
        {/if}
        <span class="{show_ip ? '' : 'blur'}">{pip}</span>
    </button>
    {/await}
</code>