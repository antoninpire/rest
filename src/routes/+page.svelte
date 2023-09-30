<script lang="ts">
	let loading = false;
	let url = '';
	let response = '';
	let method: 'GET' | 'POST' = 'GET';

	async function handleClick() {
		loading = true;
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: 'tech@tcheker.fr',
				password: 'demo'
			}),
			headers: {
				'Content-type': 'application/json'
			}
		});
		const json = await res.json();
		response = JSON.stringify(json, null, 2);
		loading = false;
	}
</script>

<input type="text" bind:value={url} class="bg-black border-white border min-w-[450px]" />
<select bind:value={method} class="text-white bg-black">
	<option value="GET">GET</option>
	<option value="POST">POST</option>
</select>
<button disabled={loading} on:click={handleClick}>{!loading ? 'Send' : 'Sending...'}</button>
<br />
<pre>{response}</pre>

<!-- local to local WORKS -->
<!-- cloud to local WORKS -->
<!-- local to cloud WORKS -->
<!-- cloud to cloud ??? -->
