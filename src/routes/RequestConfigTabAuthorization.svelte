<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { currentRequest, type AuthorizationType } from '$lib/stores';

	type SelectOption<T> = {
		label?: string;
		value: T;
	};

	let username = '';
	let password = '';

	function onAuthorizationTypeChange(data: SelectOption<unknown> | undefined) {
		if (data && $currentRequest) {
			currentRequest.set({
				...$currentRequest,
				authorization: {
					type: data.value as AuthorizationType,
					value: ''
				}
			});
		}
	}

	function handleClearAuthorization() {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				authorization: undefined
			});
	}

	function handleChangeBasicAuthValue(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		input: 'username' | 'password'
	) {
		if ($currentRequest)
			currentRequest.set({
				...$currentRequest,
				authorization: {
					type: 'Basic Auth',
					value: btoa(
						unescape(
							encodeURIComponent(
								// @ts-ignore
								(input === 'username' ? event.target?.value ?? '' : username) +
									':' +
									// @ts-ignore
									(input === 'password' ? event.target?.value ?? '' : password)
							)
						)
					)
				}
			});
	}
</script>

<div
	class="flex items-center pl-5 text-muted-foreground text-xs py-1 justify-between font-medium border-b border-b-neutral-800"
>
	<div class="flex items-center gap-2">
		<p>Authorization Type</p>
		<div>
			<Select.Root
				selected={{
					value: $currentRequest?.authorization?.type ?? 'None',
					label: $currentRequest?.authorization?.type ?? 'None'
				}}
				onSelectedChange={onAuthorizationTypeChange}
			>
				<Select.Trigger class="text-xs min-w-[200px]">
					<Select.Value placeholder="Content-Type" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="None">None</Select.Item>
					<Select.Item value="Basic Auth">Basic Auth</Select.Item>
					<Select.Item value="Bearer Token">Bearer Token</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click={handleClearAuthorization}
				class="p-1 w-[35px] flex justify-center items-center"
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
</div>
{#if $currentRequest && $currentRequest.authorization}
	{#if $currentRequest.authorization.type === 'Bearer Token'}
		<input
			placeholder="Token"
			type="text"
			class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-[34px] placeholder:text-muted-foreground border-b border-b-neutral-800"
			bind:value={$currentRequest.authorization.value}
		/>
	{:else if $currentRequest.authorization.type === 'Basic Auth'}
		<input
			placeholder="Username"
			type="text"
			class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-[34px] placeholder:text-muted-foreground border-b border-b-neutral-800"
			bind:value={username}
			on:input={(e) => handleChangeBasicAuthValue(e, 'username')}
		/>
		<input
			placeholder="Password"
			type="text"
			class="w-full font-semibold px-3 bg-transparent outline-none text-xs h-[34px] placeholder:text-muted-foreground border-b border-b-neutral-800"
			bind:value={password}
			on:input={(e) => handleChangeBasicAuthValue(e, 'password')}
		/>
	{/if}
{/if}
