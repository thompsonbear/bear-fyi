<script lang="ts">
    const {domain, record_type = "A", error_message = "Lookup failure"} = $props();

    import { resolveDomainRecord } from '$lib/utils'

    const promise = resolveDomainRecord( record_type, domain )
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