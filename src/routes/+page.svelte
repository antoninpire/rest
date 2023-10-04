<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		collectionDialogOpen,
		currentRequest,
		leftPaneSize,
		requestPaneSize,
		requests,
		resultPaneSize
	} from '$lib/stores';
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import RequestPane from './RequestPane.svelte';
	import ResponsePane from './ResponsePane.svelte';

	function openDialog() {
		collectionDialogOpen.set(true);
	}

	onMount(() => {
		// TODO: improve
		const requestsStorage = localStorage.getItem('requests');
		if (requestsStorage) {
			requests.set(JSON.parse(requestsStorage));
		}
		const currentStorage = localStorage.getItem('current');
		if (currentStorage) {
			currentRequest.set(JSON.parse(currentStorage));
		}

		const storedLeftPaneSize = localStorage.getItem('leftPaneSize');
		if (storedLeftPaneSize) {
			const value = parseInt(storedLeftPaneSize);
			if (!isNaN(value)) leftPaneSize.set(value);
		}
		const storedRequestPaneSize = localStorage.getItem('requestPaneSize');
		if (storedRequestPaneSize) {
			const value = parseInt(storedRequestPaneSize);
			if (!isNaN(value)) requestPaneSize.set(value);
		}
		const storedResultPaneSize = localStorage.getItem('resultPaneSize');
		if (storedResultPaneSize) {
			const value = parseInt(storedResultPaneSize);
			if (!isNaN(value)) resultPaneSize.set(value);
		}
	});

	$: {
		if (browser) {
			if (leftPaneSize && $leftPaneSize !== 20)
				localStorage.setItem('leftPaneSize', Math.round($leftPaneSize).toString());
			if (requestPaneSize && $requestPaneSize !== 50)
				localStorage.setItem('requestPaneSize', Math.round($requestPaneSize).toString());
			if (resultPaneSize && $resultPaneSize !== 50)
				localStorage.setItem('resultPaneSize', Math.round($resultPaneSize).toString());
		}
	}
</script>

<Splitpanes>
	<Pane minSize={20} bind:size={$leftPaneSize}>
		<div
			class="flex items-center px-4 text-muted-foreground text-xs py-2 justify-between font-medium border-b border-b-neutral-800"
		>
			<p>Collections</p>
			<button on:click={openDialog} class="text-xs inline-flex items-center gap-1 hover:text-white">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg
				>
				Add new
			</button>
		</div>
		<input
			class="py-2 px-4 text-xs border-b border-b-neutral-800 w-full bg-transparent outline-none"
			placeholder="Search..."
		/>
		{#if true}
			<div class="py-5 flex justify-center items-center flex-col gap-3">
				<p class="text-sm">No collections yet.</p>
				<Button size="sm" variant="secondary" on:click={openDialog}>Add new</Button>
			</div>
		{/if}
	</Pane>
	<Pane minSize={60} size={80}>
		<Splitpanes horizontal={true}>
			<RequestPane bind:size={$requestPaneSize} />
			<ResponsePane bind:size={$resultPaneSize} />
		</Splitpanes>
	</Pane>
</Splitpanes>

<svelte:head>
	<title>REST</title>
</svelte:head>
