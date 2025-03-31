<script lang="ts">
    const {domain, record_type = "A", error_message = "Lookup failure"} = $props();

    async function fetchDomainRecord() {
        let url = `https://dns.google/resolve?name=${domain}`
        if(record_type){
            url += `&type=${record_type}`
        }
        const res = await fetch(url)

        if (res.ok) {
			return res.json();
		} else {
			return "";
		}
    }

    const promise = fetchDomainRecord()
</script>


<code>
    {#await promise}
        <span>Resolving Record</span>
    {:then pip}
        <span>{pip.Answer[0].data}</span>
    {:catch}
        <span>{error_message}</span>
    {/await}
</code>