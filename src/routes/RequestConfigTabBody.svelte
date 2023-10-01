<script lang="ts">
	import * as Select from '$lib/components/ui/select';
</script>

<div
	class="flex items-center pl-5 text-muted-foreground text-xs py-1 gap-2 font-medium border-b border-b-neutral-800"
>
	<p>Content Type</p>
	<div>
		<Select.Root>
			<Select.Trigger class="text-xs">
				<Select.Value placeholder="Content-Type" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="None">None</Select.Item>
				<Select.Item value="application/json">application/json</Select.Item>
				<Select.Item value="application/ld+json">application/ld+json</Select.Item>
				<Select.Item value="application/hal+json">application/hal+json</Select.Item>
				<Select.Item value="application/vnd.api+json">application/vnd.api+json</Select.Item>
				<Select.Item value="application/x-www-form-urlencoded"
					>application/x-www-form-urlencoded</Select.Item
				>
				<Select.Item value="multipart/form-data">multipart/form-data</Select.Item>
				<Select.Item value="text/html">text/html</Select.Item>
				<Select.Item value="text/plain">text/plain</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
</div>
