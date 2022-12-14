<script>
	import '$lib/styles.scss';
</script>

<slot />

<style>
	:global(body) {
		background: transparent;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
