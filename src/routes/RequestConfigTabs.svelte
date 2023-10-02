<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { currentConfigTab, currentRequest, type ConfigTab } from '$lib/stores';

	const configTabs: ConfigTab[] = ['Parameters', 'Body', 'Headers', 'Authorization'];

	function handleSwitchConfigTab(tab: ConfigTab) {
		currentConfigTab.set(tab);
	}
</script>

<div
	class="mt-5 overflow-x-hidden overflow-y-auto w-full text-xs text-muted-foreground font-semibold border-b border-b-neutral-800"
>
	<div class="px-5 flex items-center gap-5">
		{#each configTabs as tab}
			<button
				on:click={() => handleSwitchConfigTab(tab)}
				class="pb-2 border-b hover:text-white {$currentConfigTab === tab
					? 'border-b-primary text-white'
					: 'border-b-transparent'}"
			>
				{tab}
				{#if tab === 'Parameters' && $currentRequest && $currentRequest.parameters.filter((p) => !!p.key).length > 0}
					<Badge variant="outline" class="ml-1 text-[0.5rem] leading-[0.75rem]">
						{$currentRequest.parameters.length}
					</Badge>
				{/if}
			</button>
		{/each}
	</div>
</div>
