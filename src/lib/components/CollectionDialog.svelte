<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { collectionDialogOpen } from '$lib/stores';
	import Label from './ui/label/label.svelte';
</script>

<Dialog.Root
	bind:open={$collectionDialogOpen}
	onOpenChange={(o) => {
		if (o !== undefined) collectionDialogOpen.set(o);
	}}
>
	<Dialog.Content>
		<Dialog.Title>Create a collection</Dialog.Title>
		<Label for="label">Label</Label>
		<Input name="label" id="label" />
		<Dialog.Footer class="mt-3">
			<Button variant="secondary">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
