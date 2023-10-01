<script lang="ts">
	import { currentConfigTab } from '$lib/stores';
	import RequestConfigTabAuthorization from './RequestConfigTabAuthorization.svelte';
	import RequestConfigTabBody from './RequestConfigTabBody.svelte';
	import RequestConfigTabHeaders from './RequestConfigTabHeaders.svelte';
	import RequestConfigTabParameters from './RequestConfigTabParameters.svelte';
</script>

{#if $currentConfigTab === 'Parameters'}
	<RequestConfigTabParameters />
{:else if $currentConfigTab === 'Body'}
	<RequestConfigTabBody />
{:else if $currentConfigTab === 'Headers'}
	<RequestConfigTabHeaders />
{:else if $currentConfigTab === 'Authorization'}
	<RequestConfigTabAuthorization />
{/if}
