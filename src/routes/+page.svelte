<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
</script>

<Splitpanes>
	<Pane class="!bg-black" minSize={20} size={20}
		>1<br /><em class="specs">I have a min width of 20%</em></Pane
	>
	<Pane class="!bg-black" minSize={60} size={80}>
		<Splitpanes horizontal={true}>
			<Pane class="!bg-black" minSize={30}
				>2<br /><em class="specs">I have a min height of 15%</em></Pane
			>
			<Pane minSize={30}>3</Pane>
		</Splitpanes>
	</Pane>
</Splitpanes>

<svelte:head>
	<title>REST</title>
</svelte:head>
