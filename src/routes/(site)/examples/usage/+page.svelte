<script>
	import { tooltip } from '$lib';
</script>

<button
	use:tooltip={{
		content: "You're looking beautiful today!",
		delay: [1000, 0],
		offset: 15,
		target: '#layers'
	}}
>
	Hover me for 1 second
</button>
