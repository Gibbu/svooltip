<script>
	let hovered = false;
</script>

<button
	class:hovered
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
>
	<slot />
</button>

<style>
	button {
		background: rgb(50, 56, 179);
	}
	.hovered {
		background: rgb(179, 50, 95);
	}
</style>
