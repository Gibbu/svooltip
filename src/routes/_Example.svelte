<script lang="ts">
	import { tooltip } from '$lib';

	export let example: number = 0;

	const info = ['John Doe', 32, 'john@doe.com'];

	$: currentInfo = info[0] as any;
	let format: 'string' | 'html' = 'string';
</script>

{#if example === 0}
	<button
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
		use:tooltip={{
			content: `<h1 class="text-white text-3xl line-through">Hi there</h1> <strong class="font-bold">This is using a HTML string</strong>`,
			format: 'html',
			placement: 'top-start'
		}}
	>
		HTML Content
	</button>
{:else if example === 2}
	<button
		use:tooltip={{
			content: currentInfo,
			format,
			onMount() {
				console.log('wowzers');
				setTimeout(() => {
					format = 'html';
					currentInfo = `
						<h1>${info[0]}</h1>
						<p>${info[1]}</p>
						<small>${info[2]}</small>
					`;
				}, 1000);
			},
			onDestroy() {
				currentInfo = info[0];
			}
		}}
	>
		User information
	</button>
{/if}
