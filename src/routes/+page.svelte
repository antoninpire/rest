<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import RequestPane from './RequestPane.svelte';

	let leftPaneSize = 20;
	let requestPaneSize = 50;
	let resultPaneSize = 50;

	onMount(() => {
		const storedLeftPaneSize = localStorage.getItem('leftPaneSize');
		if (storedLeftPaneSize) {
			const value = parseInt(storedLeftPaneSize);
			if (!isNaN(value)) leftPaneSize = value;
		}
		const storedRequestPaneSize = localStorage.getItem('requestPaneSize');
		if (storedRequestPaneSize) {
			const value = parseInt(storedRequestPaneSize);
			if (!isNaN(value)) requestPaneSize = value;
		}
		const storedResultPaneSize = localStorage.getItem('resultPaneSize');
		if (storedResultPaneSize) {
			const value = parseInt(storedResultPaneSize);
			if (!isNaN(value)) resultPaneSize = value;
		}
	});

	$: {
		if (browser) {
			if (leftPaneSize && leftPaneSize !== 20)
				localStorage.setItem('leftPaneSize', Math.round(leftPaneSize).toString());
			if (requestPaneSize && requestPaneSize !== 50)
				localStorage.setItem('requestPaneSize', Math.round(requestPaneSize).toString());
			if (resultPaneSize && resultPaneSize !== 50)
				localStorage.setItem('resultPaneSize', Math.round(resultPaneSize).toString());
		}
	}
</script>

<Splitpanes>
	<Pane minSize={20} bind:size={leftPaneSize}
		>1<br /><em class="specs">I have a min width of 20%</em></Pane
	>
	<Pane minSize={60} size={80}>
		<Splitpanes horizontal={true}>
			<RequestPane bind:size={requestPaneSize} />
			<Pane bind:size={resultPaneSize} minSize={30}>3</Pane>
		</Splitpanes>
	</Pane>
</Splitpanes>

<svelte:head>
	<title>REST</title>
</svelte:head>
