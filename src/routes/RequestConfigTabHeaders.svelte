<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { currentRequest } from '$lib/stores';

	function handleClearHeaders() {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				headers: [
					{
						key: '',
						value: ''
					}
				]
			});
	}

	function handleAddHeader() {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				headers: [...$currentRequest.headers, { key: '', value: '' }]
			});
	}

	function handleRemoveHeader(index: number) {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,

				headers: $currentRequest.headers.filter((_, i) => i !== index)
			});
	}
</script>

<div
	class="flex items-center pl-5 text-muted-foreground text-xs py-1 justify-between font-medium border-b border-b-neutral-800"
>
	<p>Header List</p>
	<div class="flex items-center">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click={handleClearHeaders} class="p-1 w-[35px] flex justify-center items-center">
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
						class="lucide lucide-trash-2 hover:text-white"
						><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
							d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
						/><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg
					>
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Clear</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click={handleAddHeader} class="p-1 w-[35px] flex justify-center items-center">
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
						class="lucide lucide-plus hover:text-white"
						><path d="M5 12h14" /><path d="M12 5v14" /></svg
					>
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Add</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
</div>

{#if !$currentRequest || $currentRequest?.headers.length === 0}
	<div class="pt-8 flex justify-center items-center gap-4 flex-col text-muted-foreground">
		<p class="text-xs">This request does not have any header</p>
		<Button variant="ghost" on:click={handleAddHeader}>
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
				class="lucide lucide-plus hover:text-white mr-2"
				><path d="M5 12h14" /><path d="M12 5v14" /></svg
			>
			Add new
		</Button>
	</div>
{:else}
	<div class="overflow-y-auto">
		<div class="flex flex-col">
			{#each $currentRequest.headers as header, index}
				<div class="w-full flex items-center h-[34px] border-b border-b-neutral-800">
					<div class="w-[calc((100%-70px)/2)] h-full border-r border-r-neutral-800">
						<input
							placeholder="Header {index + 1}"
							type="text"
							class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-full placeholder:text-muted-foreground"
							bind:value={header.key}
						/>
					</div>
					<div class="w-[calc((100%-70px)/2)] h-full border-r border-r-neutral-800">
						<input
							placeholder="Value {index + 1}"
							type="text"
							class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-full placeholder:text-muted-foreground"
							bind:value={header.value}
						/>
					</div>
					<button
						class="border-r border-r-neutral-800 w-[35px] h-full flex items-center justify-center"
					>
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
							class="lucide lucide-check-circle text-emerald-700"
							><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline
								points="22 4 12 14.01 9 11.01"
							/></svg
						>
					</button>
					<button
						class="w-[35px] h-full flex justify-center items-center"
						on:click={() => handleRemoveHeader(index)}
					>
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
							class="lucide lucide-trash text-red-600"
							><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
								d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
							/></svg
						>
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
