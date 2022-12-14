<script>
	import { tooltip } from '$lib';

	const info = ['John Doe', 32, 'john@doe.com'];

	$: currentInfo = info[0];
	let html = false;
</script>

<button
	use:tooltip={{
		content: currentInfo,
		html,
		onMount() {
			console.log('wowzers');
			setTimeout(() => {
				html = true;
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
