<script lang="ts">
	import '@fontsource/inter';
	import { Toaster } from 'svelte-sonner';

	import CollectionDialog from '$lib/components/CollectionDialog.svelte';
	import '../app.css';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';

	export let data;
</script>

<Header session={data.session} />
<div class="flex h-[calc(100vh-3rem)] w-screen">
	<Sidebar />
	<main class="h-full w-[calc(100vw-5.5rem)]">
		<slot />
	</main>
</div>
<Toaster richColors />
<CollectionDialog />
