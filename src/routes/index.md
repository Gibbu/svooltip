<script>
	import Example from './_Example.svelte';
</script>

## Why?

I made this because I found other libraries had too much for what I wanted.
Including support for hovering the tooltip and clicking buttons inside and all that jazz.

This will give you a tooltip. That's it.

## Usage

```svelte
<script>
	import { tooltip } from 'svooltip';
	import 'svooltip/svooltip.css'; // Include default styling
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

<Example />

And that's it.

## API

| Prop                     | Type                                | Description                                                                                                                                                                                                        | Default             |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `content`                | `string`                            | The content of the tooltip.                                                                                                                                                                                        |                     |
| `target`                 | `(string &#124; HTMLElement)?`      | The target to append the tooltip to.                                                                                                                                                                               | `body`              |
| `placement`              | `Placement?`                        | The placement of the tooltip relative to the element.                                                                                                                                                              | `top`               |
| `shiftPadding`           | `number?`                           | Padding for the `shift` middleware.                                                                                                                                                                                | `5`                 |
| `offset`                 | `number?`                           | The offset of the tooltip in `px`.                                                                                                                                                                                 | `10`                |
| `delay`                  | `(number &#124; [number, number])?` | The delay for showing and hiding the tooltip. <br>A `number` will apply to both in and out. <br>An `array` will apply the in and out delays separately. <br>`in` being the first index and `out` being the second. | `0`                 |
| `show`                   | `boolean?`                          | Always display the tooltip.                                                                                                                                                                                        | `false`             |
| `classes.container`      | `string?`                           | The classes to be applied on the tooltip itself.                                                                                                                                                                   | `svooltip`          |
| `classes.arrow`          | `string?`                           | The classes to be applied on the tooltip arrow.                                                                                                                                                                    | `svooltip-arrow`    |
| `classes.animationEnter` | `string?`                           | The classes to be applied when the tooltip is entering.                                                                                                                                                            | `svooltip-entering` |
| `classes.animationLeave` | `string?`                           | The classes to be applied when the tooltip is leaving.                                                                                                                                                             | `svooltip-leaving`  |
| `middleware`             | `Middleware?`                       | Any Floating UI middleware you wish to add                                                                                                                                                                         | `[]`                |
| `format`                 | `(string &#124; html)?`             | What type of rendering to be used. Providing `html` will use the element `innerHTML` rather than `textContent`.                                                                                                    | `string`            |

## HTML Content

If you wish, you _can_ provide HTML inside the tooltip by setting the `format` option to `html`.

```svelte
<button
	class="bg-neutral-800 rounded px-3 py-2 text-sm text-neutral-50"
	use:tooltip={{
		content: `<h1 class="text-white text-3xl line-through">Hi there</h1> <strong class="font-bold">This is using a HTML string</strong>`,
		format: 'html',
		placement: 'top-start'
	}}
>
	HTML Content
</button>
```

<Example example={1} />

## Animation

You can animate the tooltip with css `@keyframes` and targeting the `animationEnter` and `animationLeave` classes.

The default styling includes:

```css
.svooltip-entering {
	animation: scaleIn 0.15s ease forwards;
}
.svooltip-leaving {
	animation: scaleOut 0.15s ease forwards;
}
@keyframes scaleIn {
	from {
		transform: scale(0.95);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes scaleOut {
	from {
		transform: scale(1);
		opacity: 1;
	}
	to {
		transform: scale(0.95);
		opacity: 0;
	}
}
```

### Why keyframes?

We're using `@keyframes` so we can use the `animationend` event listener on the tooltip to know when it can be removed from the DOM without causing it to disappear instantly.

### Placement param

The tooltip also contains a `[data-placement]` attribute allowing you to do specific adjustments or animations depending on the placement of the tooltip.

The default styling includes:

```css
.svooltip[data-placement='top'] {
	transform-origin: bottom center;
}
.svooltip[data-placement='top-start'] {
	transform-origin: bottom left;
}
.svooltip[data-placement='top-end'] {
	transform-origin: bottom right;
}

.svooltip[data-placement='bottom'] {
	transform-origin: top center;
}
.svooltip[data-placement='bottom-start'] {
	transform-origin: top left;
}
.svooltip[data-placement='bottom-end'] {
	transform-origin: top right;
}
```

### CSS variables

The default styling has support for CSS variables so if you want to minor adjustments you can do so:

```css
:root {
	--svooltip-bg: #fff;
	--svooltip-text: #000;
	--svooltip-padding: 6px 10px;
	--svooltip-weight: 400;
	--svooltip-text-size: 16px;
	--svooltip-shadow: 0 3px 7px rgb(0 0 0 / 0.25);
	--svooltip-arrow-size: 6px;
}
```
