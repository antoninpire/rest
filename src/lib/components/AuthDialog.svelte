<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';

	let open = false;
	let loading = false;
	let currentTab: 'login' | 'signup' = 'login';
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}>Login</Dialog.Trigger>
	<Dialog.Content class="px-10">
		<div class="flex items-center gap-3 justify-center">
			<button
				on:click={() => {
					currentTab = 'login';
				}}
			>
				<h1
					class="text-lg text-center font-bold my-5 pb-2 transition-all border-b {currentTab ===
					'login'
						? 'border-b-primary'
						: 'text-neutral-400 hover:text-white border-b-transparent'}"
				>
					login
				</h1>
			</button>
			<button
				on:click={() => {
					currentTab = 'signup';
				}}
			>
				<h1
					class="text-lg text-center font-bold my-5 pb-2 transition-all border-b {currentTab ===
					'signup'
						? 'border-b-primary'
						: 'text-neutral-400 hover:text-white border-b-transparent'}"
				>
					sign up
				</h1>
			</button>
		</div>
		<form
			method="post"
			use:enhance={() => {
				loading = true;
				return async ({ result, formElement }) => {
					loading = false;
					if (result.type === 'error' || result.type === 'failure')
						toast.error(
							// @ts-ignore
							result.data?.message ??
								(currentTab === 'login' ? 'Failed to login' : 'Failed to sign up')
						);
					else if (result.type === 'success') {
						formElement.reset();
						open = false;
					}
					applyAction(result);
				};
			}}
			action="/?/{currentTab}"
			class="flex flex-col gap-5 pb-5"
		>
			<fieldset class="flex flex-col gap-2 min-w-[300px]">
				<Label class="font-semibold" for="email">Email</Label>
				<Input id="email" name="email" type="email" class="border-neutral-700" />
			</fieldset>
			<fieldset class="flex flex-col gap-2">
				<Label class="font-semibold" for="password">Password</Label>
				<Input id="password" name="password" type="password" class="border-neutral-700" />
			</fieldset>
			<Button disabled={loading} type="submit">
				{#if loading}
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
						class="lucide lucide-loader-2 animate-spin mr-2"
						><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
					>
				{/if}
				{#if currentTab === 'login'}
					Sign in
				{:else}
					Create account
				{/if}
			</Button>
			{#if currentTab === 'login'}
				<p class="text-center text-sm mt-5">
					Don't have an account? <button
						on:click={() => {
							currentTab = 'signup';
						}}
						class="text-purple-500">Create an account</button
					>
				</p>
			{:else}
				<p class="text-center text-sm mt-5">
					Already have an account? <button
						on:click={() => {
							currentTab = 'login';
						}}
						class="text-purple-500">Login</button
					>
				</p>
			{/if}
		</form>
	</Dialog.Content>
</Dialog.Root>
