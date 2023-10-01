<script lang="ts">
	import '@fontsource/inter';

	import '../app.css';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<Header />
<div class="flex h-[calc(100vh-3rem)] w-screen">
	<Sidebar />
	<main class="h-full w-[calc(100vw-5.5rem)]">
		<slot />
	</main>
</div>
