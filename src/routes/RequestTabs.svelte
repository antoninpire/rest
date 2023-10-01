<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { createDefaultRequest, currentRequest, requests } from '$lib/stores';
	import RequestTab from './RequestTab.svelte';

	function handleAddTab() {
		const request = createDefaultRequest();
		requests.update((requests) => [...requests, request]);
		currentRequest.set(request);
	}
</script>

<div class="flex items-center w-full bg-[#1C1C1E]">
	<div
		class="max-w-full h-12 overflow-x-auto overflow-y-hidden border-y border-y-neutral-900 whitespace-nowrap"
	>
		{#each $requests as request}
			<RequestTab {request} />
		{/each}
	</div>

	<Tooltip.Root>
		<Tooltip.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'p-0 ml-2' })}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:click={handleAddTab} class="p-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg
				>
			</div>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>New tab</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
