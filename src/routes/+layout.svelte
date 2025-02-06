<script>
	import '../app.scss';

	let {children} = $props();
</script>

<svelte:head>
	<title>SVooltip</title>
</svelte:head>

{@render children()}
