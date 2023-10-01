<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { currentRequest, requests, type CRequest } from '$lib/stores';

	export let request: CRequest;

	function handleDeleteTab(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		},
		id: string
	) {
		event.preventDefault();
		requests.update((requests) => requests.filter((request) => request.id !== id));
	}

	function handleSwitchTab() {
		const requestsCopy = [...$requests];
		const currentRequestIndex = requestsCopy.findIndex(
			(request) => request.id === $currentRequest?.id
		);
		if (currentRequestIndex !== -1 && $currentRequest) {
			requestsCopy[currentRequestIndex] = $currentRequest;
			requests.set(requestsCopy);
		}

		currentRequest.set(request);
	}

	$: method = request.id === $currentRequest?.id ? $currentRequest.method : request.method;
</script>

{#key request.id}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-[183px] h-full bg-[#1C1C1E] border-r border-r-neutral-900 px-4 inline-block {$currentRequest?.id ===
		request.id
			? 'bg-black/5 border-t-2 border-t-primary'
			: ''} hover:cursor-pointer"
		on:click={handleSwitchTab}
	>
		<div class="w-full h-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="text-emerald-400 text-xs uppercase">{method}</span>
				<span class="text-xs font-semibold tracking-wider">Untitled</span>
			</div>
			{#if $requests.length > 1}
				<Tooltip.Root>
					<Tooltip.Trigger
						class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'p-0 ml-2' })}
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="p-1" on:click={(event) => handleDeleteTab(event, request.id)}>
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
								class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
							>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Close</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</div>
	</div>
{/key}
