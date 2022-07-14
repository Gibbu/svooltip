<script lang="ts">
	import { tooltip } from '$lib';

	export let example: number = 0;
</script>

{#if example === 0}
	<button
		class="bg-neutral-800 rounded px-3 py-2 text-sm text-neutral-50"
		use:tooltip={{
			content: "You're looking beautiful today!",
			placement: 'top-start',
			delay: [1000, 0],
			offset: 15,
			target: '#layers'
		}}
	>
		Hover me for 1 second
	</button>
{:else if example === 1}
	<button
		class="bg-neutral-800 rounded px-3 py-2 text-sm text-neutral-50"
		use:tooltip={{
			content: `<h1 class="text-white text-3xl line-through">Hi there</h1> <strong class="font-bold">This is using a HTML string</strong>`,
			format: 'html',
			placement: 'top-start'
		}}
	>
		HTML Content
	</button>
{/if}
