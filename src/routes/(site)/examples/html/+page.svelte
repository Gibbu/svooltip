<script>
	import { tooltip } from '$lib';
</script>

<button
	use:tooltip={{
		content: `<h1 class="text-white text-3xl line-through">Hi there</h1> <strong class="font-bold">This is using a HTML string</strong>`,
		html: true
	}}
>
	HTML Content
</button>
