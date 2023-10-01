<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { currentRequest, requestPaneSize, type ContentType } from '$lib/stores';
	import { html } from '@codemirror/lang-html';
	import { json } from '@codemirror/lang-json';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { onMount } from 'svelte';
	import CodeMirror from 'svelte-codemirror-editor';

	type SelectOption<T> = {
		label?: string;
		value: T;
	};

	let height = 0;
	let mounted = false;

	onMount(() => {
		height = Math.round((window.innerHeight - 48) * ($requestPaneSize / 100) - 48 - 36 - 26 - 45);
		mounted = true;
	});

	function onContentTypeChange(data: SelectOption<unknown> | undefined) {
		if (data && $currentRequest) {
			if (
				['application/x-www-form-urlencoded', 'multipart/form-data'].includes(
					data.value as ContentType
				)
			) {
				currentRequest.set({
					...$currentRequest,
					contentType: data.value as ContentType,
					body: [
						{
							key: '',
							value: ''
						}
					]
				});
			} else {
				currentRequest.set({
					...$currentRequest,
					contentType: data.value as ContentType,
					body: undefined
				});
			}
		}
	}

	function handleClearBody() {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				body: [
					{
						key: '',
						value: ''
					}
				]
			});
	}

	function handleAddBody() {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				body: Array.isArray($currentRequest.body)
					? [...$currentRequest.body, { key: '', value: '' }]
					: [{ key: '', value: '' }]
			});
	}

	function handleRemoveBody(index: number) {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				// @ts-ignore
				body: $currentRequest.body.filter((_, i) => i !== index)
			});
	}

	requestPaneSize.subscribe((value) => {
		height = Math.round((window.innerHeight - 48) * (value / 100) - 48 - 36 - 26 - 45);
	});
</script>

<div
	class="flex items-center pl-5 text-muted-foreground text-xs py-1 gap-2 font-medium border-b border-b-neutral-800"
>
	<p>Content Type</p>
	<div>
		<Select.Root
			selected={{
				value: $currentRequest?.contentType ?? 'None',
				label: $currentRequest?.contentType ?? 'None'
			}}
			onSelectedChange={onContentTypeChange}
		>
			<Select.Trigger class="text-xs min-w-[200px]">
				<Select.Value placeholder="Content-Type" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="None">None</Select.Item>
				<Select.Item value="application/json">application/json</Select.Item>
				<Select.Item value="application/ld+json">application/ld+json</Select.Item>
				<Select.Item value="application/hal+json">application/hal+json</Select.Item>
				<Select.Item value="application/vnd.api+json">application/vnd.api+json</Select.Item>
				<Select.Item value="application/x-www-form-urlencoded"
					>application/x-www-form-urlencoded</Select.Item
				>
				<Select.Item value="multipart/form-data">multipart/form-data</Select.Item>
				<Select.Item value="text/html">text/html</Select.Item>
				<Select.Item value="text/plain">text/plain</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
</div>
{#if $currentRequest}
	{#if ['application/json', 'application/ld+json', 'application/hal+json', 'application/vnd.api+json'].includes($currentRequest?.contentType)}
		{#if mounted}
			<CodeMirror
				lang={json()}
				theme={oneDark}
				bind:value={$currentRequest.body}
				styles={{
					'&': {
						backgroundColor: 'transparent',
						maxHeight: height + 'px',
						height: height + 'px'
					},
					'.cm-gutters': {
						backgroundColor: 'transparent'
					}
				}}
			/>
		{/if}
	{:else if ['application/x-www-form-urlencoded', 'multipart/form-data'].includes($currentRequest?.contentType)}
		<div
			class="flex items-center pl-5 text-muted-foreground text-xs py-1 justify-between font-medium border-b border-b-neutral-800"
		>
			<p>Request Body</p>
			<div class="flex items-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div on:click={handleClearBody} class="p-1 w-[35px] flex justify-center items-center">
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
								/><line x1="10" x2="10" y1="11" y2="17" /><line
									x1="14"
									x2="14"
									y1="11"
									y2="17"
								/></svg
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
						<div on:click={handleAddBody} class="p-1 w-[35px] flex justify-center items-center">
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
		{#if !$currentRequest || !$currentRequest?.body || !Array.isArray($currentRequest?.body) || $currentRequest?.body?.length === 0}
			<div class="pt-8 flex justify-center items-center gap-4 flex-col text-muted-foreground">
				<p class="text-xs">This request does not have a body</p>
				<Button variant="ghost" on:click={handleAddBody}>
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
					{#each $currentRequest.body as kv, index}
						<div class="w-full flex items-center h-[34px] border-b border-b-neutral-800">
							<div class="w-[calc((100%-70px)/2)] h-full border-r border-r-neutral-800">
								<input
									placeholder="Key {index + 1}"
									type="text"
									class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-full placeholder:text-muted-foreground"
									bind:value={kv.key}
								/>
							</div>
							<div class="w-[calc((100%-70px)/2)] h-full border-r border-r-neutral-800">
								<input
									placeholder="Value {index + 1}"
									type="text"
									class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-full placeholder:text-muted-foreground"
									bind:value={kv.value}
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
								on:click={() => handleRemoveBody(index)}
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
	{:else if $currentRequest?.contentType === 'text/html'}
		{#if mounted}
			<CodeMirror
				lang={html()}
				theme={oneDark}
				bind:value={$currentRequest.body}
				styles={{
					'&': {
						backgroundColor: 'transparent',
						maxHeight: height + 'px',
						height: height + 'px'
					},
					'.cm-gutters': {
						backgroundColor: 'transparent'
					}
				}}
			/>
		{/if}
	{:else if $currentRequest?.contentType === 'text/plain'}
		{#if mounted}
			<CodeMirror
				theme={oneDark}
				bind:value={$currentRequest.body}
				styles={{
					'&': {
						backgroundColor: 'transparent',
						maxHeight: height + 'px',
						height: height + 'px'
					},
					'.cm-gutters': {
						backgroundColor: 'transparent'
					}
				}}
			/>
		{/if}
	{/if}
{/if}
