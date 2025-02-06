<script lang="ts">
	import tooltip from './tooltip';
	import { DEFAULTS as D } from './defaults';

	import type { Options } from './types';
	import type { Snippet } from 'svelte';

	let {
		content = null,
		target = D.target,
		placement = D.placement,
		shiftPadding = D.shiftPadding,
		offset = D.offset,
		delay = D.delay,
		constant = D.constant,
		classes = D.classes,
		middleware = D.middleware,
		onMount,
		onDestroy,
		html = D.html,
		block = false,
		children,
		as = 'div'
	}: Options & {
		/** Sets the wrapper to `display: block`. */
		block: boolean;
		children: Snippet;
		as: keyof HTMLElementTagNameMap;
	} = $props();
</script>

<svelte:element
	this={as}
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
	{@render children()}
</svelte:element>
