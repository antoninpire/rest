<script lang="ts">
	import ResponseTabHeaders from './ResponseTabHeaders.svelte';
	import ResponseTabJson from './ResponseTabJson.svelte';
	import ResponseTabRaw from './ResponseTabRaw.svelte';

	type ResponseTab = 'JSON' | 'Raw' | 'Headers';
	export let currentResponseTab: ResponseTab;
</script>

{#if currentResponseTab === 'JSON'}
	<ResponseTabJson />
{:else if currentResponseTab === 'Raw'}
	<ResponseTabRaw />
{:else if currentResponseTab === 'Headers'}
	<ResponseTabHeaders />
{/if}
