<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { currentRequest } from '$lib/stores';
	import atom from 'svelte-highlight/styles/material-darker';
	import { Pane } from 'svelte-splitpanes';
	import ResponseTab from './ResponseTab.svelte';

	type ResponseTab = 'JSON' | 'Raw' | 'Headers';

	const responseTabs: ResponseTab[] = ['JSON', 'Raw', 'Headers'];
	let currentResponseTab: ResponseTab = 'JSON';

	export let size: number;

	function handleSwitchResponseTab(tab: ResponseTab) {
		currentResponseTab = tab;
	}

	$: color =
		$currentRequest?.response?.status.toString().startsWith('2') ||
		$currentRequest?.response?.status.toString().startsWith('9')
			? 'text-green-500'
			: 'text-red-500';

	$: headers = $currentRequest?.response?.headers
		? Object.entries($currentRequest.response.headers)
				.filter(([key]) => key !== 'request-duration')
				.map(([key, value]) => ({ key, value }))
		: [];
</script>

<Pane bind:size minSize={30}>
	{#if $currentRequest?.response}
		<div class="text-xs flex items-center gap-3 px-3 py-5">
			<p>
				Status: <span class={color}
					>{$currentRequest.response.status} - {$currentRequest.response.statusText}</span
				>
			</p>
			<p>Time: <span class={color}>{$currentRequest.response.time} ms</span></p>
			<p>Size: <span class={color}>{$currentRequest.response.size} B</span></p>
		</div>
		<div
			class="overflow-x-hidden overflow-y-auto w-full text-xs text-muted-foreground font-semibold border-b border-b-neutral-800"
		>
			<div class="px-5 flex items-center gap-5">
				{#each responseTabs as tab}
					<button
						class="pb-2 border-b {currentResponseTab === tab
							? 'border-b-primary'
							: 'border-b-transparent'}"
						on:click={() => handleSwitchResponseTab(tab)}
					>
						{tab}
						{#if tab === 'Headers' && headers.length > 0}
							<Badge variant="outline" class="ml-1 text-[0.5rem] leading-[0.75rem]">
								{headers.length}
							</Badge>
						{/if}
					</button>
				{/each}
			</div>
		</div>
		<ResponseTab {currentResponseTab} />
	{:else}
		<div class="h-full w-full flex flex-col justify-center items-center text-sm">
			Nothing to show here
		</div>
	{/if}
</Pane>

<svelte:head>
	{@html atom}
</svelte:head>
