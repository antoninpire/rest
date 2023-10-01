<script lang="ts">
	import { browser } from '$app/environment';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { currentRequest, resultPaneSize } from '$lib/stores';
	import { onMount } from 'svelte';

	let height = 0;

	onMount(() => {
		height = Math.round((window.innerHeight - 48) * ($resultPaneSize / 100) - 56 - 26 - 48);
	});

	resultPaneSize.subscribe((value) => {
		if (browser) height = Math.round((window.innerHeight - 48) * (value / 100) - 56 - 26 - 48);
	});

	$: headers = $currentRequest?.response?.headers
		? Object.entries($currentRequest.response.headers)
				.filter(([key]) => key !== 'request-duration')
				.map(([key, value]) => ({ key, value }))
		: [];
</script>

<div
	class="w-full flex items-center py-3 pl-5 text-xs text-muted-foreground justify-between border-b border-b-neutral-800"
>
	<p>Header List</p>
	<div class="flex items-center">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click={() => {}} class="p-1 w-[35px] flex justify-center items-center">
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
						class="lucide lucide-copy hover:text-white"
						><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
							d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
						/></svg
					>
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Copy</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
</div>
<div class="flex flex-col overflow-auto" style="height: {height}px">
	{#each headers as header}
		<div
			class="flex w-full items-center border-b border-b-neutral-800 text-xs text-muted-foreground font-semibold"
		>
			<div class="w-1/2 px-5 py-3 flex items-center border-r border-r-neutral-800">
				{header.key}
			</div>
			<div class="w-1/2 px-5 py-3 flex items-center">
				{header.value}
			</div>
		</div>
	{/each}
</div>
