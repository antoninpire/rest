<script lang="ts">
	let loading = false;

	async function handleClick() {
		loading = true;
		await fetch('http://localhost:5173/api/seed', {
			method: 'POST'
		});
		loading = false;
	}
</script>

<button disabled={loading} on:click={handleClick}>{!loading ? 'Seed' : 'Seeding...'}</button>
