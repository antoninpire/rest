<script lang="ts">
	import AuthDialog from '$lib/components/AuthDialog.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Session } from 'lucia';

	export let session: Session | null = null;
</script>

<header
	class="h-12 w-screen bg-background border-b border-b-neutral-800 px-4 flex items-center justify-end"
>
	<a href="https://github.com/antoninpire">
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="sm">
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
						class="lucide lucide-github"
						><path
							d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
						/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
					>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>View source code</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</a>
	{#if !session}
		<AuthDialog />
	{:else}
		<form method="post" action="/?/logout">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm" type="submit" class="-mr-3">
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
							class="lucide lucide-log-out"
							><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
								points="16 17 21 12 16 7"
							/><line x1="21" x2="9" y1="12" y2="12" /></svg
						>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Logout</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</form>
	{/if}
</header>
