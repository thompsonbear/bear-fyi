<script lang="ts">
    import DomainParts from './domain-parts.svelte';
    import DomainSelect from './domain-select.svelte';

    let { domain_list, domain = $bindable(domain_list[0]) } = $props();
</script>

<div class="border p-3 rounded-md overflow-x-scroll">
    <DomainSelect bind:domain {domain_list}/>
    <DomainParts bind:domain/>
</div>