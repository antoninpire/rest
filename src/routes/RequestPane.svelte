<script lang="ts">
	import { axios } from '$lib/axios';
	import { buildRequest } from '$lib/build-request';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import { currentRequest, requests } from '$lib/stores';
	import { Pane } from 'svelte-splitpanes';
	import RequestConfigTab from './RequestConfigTab.svelte';
	import RequestConfigTabs from './RequestConfigTabs.svelte';
	import RequestTabs from './RequestTabs.svelte';

	export let size: number;

	let sending = false;

	type SelectOption<T> = {
		label?: string;
		value: T;
	};

	function onMethodChange(data: SelectOption<unknown> | undefined) {
		if (data && $currentRequest)
			currentRequest.set({
				...$currentRequest,
				method: data.value as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
			});
	}

	async function handleSend() {
		// TO IMPROVE / TODO: move it at a smarter place
		localStorage.setItem('requests', JSON.stringify($requests));
		localStorage.setItem('current', JSON.stringify($currentRequest));

		if (!$currentRequest) return;
		sending = true;
		const request = buildRequest($currentRequest);
		axios(request)
			.then((response) => {
				if ($currentRequest)
					currentRequest.set({
						...$currentRequest,
						response: {
							status: response.status,
							data: response.data,
							size: +response?.headers?.['content-length'] ?? 0,
							statusText: response.statusText,
							time: response.headers['request-duration'],
							headers: response.headers
						}
					});
			})
			.catch((err) => {
				if ($currentRequest)
					currentRequest.set({
						...$currentRequest,
						response: {
							status: err.response.status,
							statusText: err.response.statusText,
							data: err.response.data,
							size: +err.response?.headers?.['content-length'] ?? 0,
							time: err.response.headers['request-duration'],
							headers: err.response.headers
						}
					});
			})
			.finally(() => {
				sending = false;
			});
	}
</script>

<Pane bind:size minSize={30}>
	<RequestTabs />
	{#if $currentRequest}
		<div class="mt-2.5 px-5 flex w-full items-center gap-2">
			<div class="flex items-center flex-grow">
				<Select.Root
					selected={{
						value: $currentRequest?.method ?? 'GET',
						label: $currentRequest?.method ?? 'GET'
					}}
					onSelectedChange={onMethodChange}
				>
					<Select.Trigger class="w-[120px] rounded-r-none outline-none shadow-none">
						<Select.Value placeholder="Method" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="GET">GET</Select.Item>
						<Select.Item value="POST">POST</Select.Item>
						<Select.Item value="DELETE">DELETE</Select.Item>
						<Select.Item value="PUT">PUT</Select.Item>
						<Select.Item value="PATCH">PATCH</Select.Item>
					</Select.Content>
				</Select.Root>
				<Input
					bind:value={$currentRequest.url}
					class="flex-grow border-l-0 rounded-l-none outline-none text-sm"
					placeholder="URL"
				/>
			</div>
			<div class="flex items-center w-[180px] gap-2">
				<Button disabled={sending} on:click={handleSend}>{sending ? 'Sending...' : 'Send'}</Button>
				<Button variant="outline">
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
						class="lucide lucide-save mr-2"
						><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline
							points="17 21 17 13 7 13 7 21"
						/><polyline points="7 3 7 8 15 8" /></svg
					>
					Save</Button
				>
			</div>
		</div>

		<RequestConfigTabs />
		<RequestConfigTab />
	{/if}
</Pane>
