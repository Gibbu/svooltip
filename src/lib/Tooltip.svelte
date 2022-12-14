<script lang="ts">
	import tooltip from './tooltip';
	import { DEFAULTS as D } from './defaults';
	import type { Props, Options } from './types';

	/** The text content of the tooltip. */
	export let content: Options['content'] = null;

	/** Allow HTML strings in the tooltip. */
	export let html: Props['html'] = D.html;

	/**
	 * The HTML element to place the tooltip.
	 *
	 * Default = `body`
	 */
	export let target: Props['target'] = D.target;

	/**
	 * The placement of the tooltip.
	 *
	 * Default = `top`
	 */
	export let placement: Props['placement'] = D.placement;

	/**
	 * Padding for the `shift` middleware.
	 *
	 * Default = `0`
	 */
	export let shiftPadding: Props['shiftPadding'] = D.shiftPadding;

	/**
	 * Offset of the tooltip.
	 *
	 * Default = `10`
	 */
	export let offset: Props['offset'] = D.offset;

	/**
	 * Delay for showing and hiding the tooltip.\
	 * A `number` will apply on both in and out delays.\
	 * A `array` will apply on in and out delays separately.
	 */
	export let delay: Props['delay'] = D.delay;

	/** Always display the tooltip. */
	export let constant: Props['constant'] = D.constant;

	/** Classes used for the tooltip, arrow, entering/leaving classes. */
	export let classes: Props['classes'] = D.classes;

	/**
	 * Floating UI middleware.
	 *
	 * `flip`, `shift`, `offset`, and `arrow` are already included.
	 */
	export let middleware: Props['middleware'] = D.middleware;

	/** Hook function that fires when the tooltip has been mounted to the DOM. */
	export let onMount: Props['onMount'] = () => {};

	/** Hook function that fires when the tooltip has been removed to the DOM. */
	export let onDestroy: Props['onDestroy'] = () => {};

	/** Sets the wrapper to `display: block`. */
	export let block: boolean = false;
</script>

<div
	class="svooltip-wrapper"
	class:block
	use:tooltip={{
		content,
		html,
		target,
		placement,
		shiftPadding,
		offset,
		delay,
		constant,
		classes,
		middleware,
		onMount,
		onDestroy
	}}
>
	<slot />
</div>
