# SVooltip

A basic Svelte tooltip directive. Powered by [Floating UI](https://floating-ui.com/).

## Usage

```svelte
<script>
	import { tooltip } from 'svooltip';
	import 'svooltip/styles.css'; // Include default styling
</script>

<button
	class="btn"
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
```

## Docs

View more information at: https://svooltip.vercel.app

## Licence

See the [LICENSE](https://github.com/Gibbu/svooltip/blob/main/LICENSE) file for license rights and limitations (MIT).
