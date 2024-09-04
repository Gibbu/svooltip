import {
	computePosition,
	flip as floatingFlip,
	shift as floatingShift,
	offset as floatingOffset,
	arrow as floatingArrow,
	autoUpdate
} from '@floating-ui/dom';
import { animate, wait, ID } from './utils.js';
import { DEFAULTS } from './defaults.js';

import type { Options } from './types';

export default (node: HTMLElement, options?: Options) => {
	let Config = {
		...DEFAULTS,
		...options
	};

	let currentDelay: ReturnType<typeof setTimeout> | undefined;
	let content: string = node.title || Config.content;

	let visible = false;
	let hovering = false;
	let wasDestroyed = false;
	let cleanUpPosition: VoidFunction | null = null;

	let Tooltip: HTMLElement | null = null;
	let TooltipContent: HTMLElement | null = null;
	let TooltipArrow: HTMLElement | null = null;

	const targetElement =
		typeof Config.target === 'string' ? document.querySelector(Config.target) : Config.target;
	const parseDelay = {
		in: typeof Config.delay === 'number' ? Config.delay : Config.delay[0],
		out: typeof Config.delay === 'number' ? Config.delay : Config.delay[1]
	};
	const UID = `svooltip-${ID()}`;

	if (node.title) node.removeAttribute('title');

	const handleKeys = (e: KeyboardEvent) => {
		if (e.key === 'Escape') removeTooltip();
	};

	const createTooltip = () => {
		if (Tooltip || visible) return;

		Tooltip = document.createElement('div');
		Tooltip.setAttribute('id', UID);
		Tooltip.setAttribute('role', 'tooltip');
		Tooltip.setAttribute('data-placement', Config.placement);
		Tooltip.setAttribute('class', Config.classes.container);

		TooltipContent = document.createElement('span');
		TooltipContent.setAttribute('class', Config.classes.content);
		TooltipContent[Config.html ? 'innerHTML' : 'textContent'] = content;

		TooltipArrow = document.createElement('div');
		TooltipArrow.setAttribute('class', Config.classes.arrow);

		Tooltip.append(TooltipArrow);
		Tooltip.append(TooltipContent);

		if (!targetElement) {
			document.body.append(Tooltip);
		} else {
			targetElement.append(Tooltip);
		}
	};
	const mountTooltip = async () => {
		if (!Tooltip && Config.visibility) {
			if (parseDelay.in) {
				await wait(parseDelay.in, currentDelay);
				if (wasDestroyed || !hovering || visible || Tooltip) return;
			}

			node.setAttribute('aria-describedby', UID);

			createTooltip();

			if (!Tooltip) throw new Error(`[SVooltip] Tooltip has not been created.`);

			cleanUpPosition = autoUpdate(node, Tooltip!, () => {
				if (!Tooltip || !TooltipArrow) return;

				computePosition(node, Tooltip!, {
					placement: Config.placement,
					middleware: [
						floatingOffset(Config.offset),
						floatingFlip(),
						floatingShift({ padding: Config.shiftPadding }),
						floatingArrow({ element: TooltipArrow! }),
						...Config.middleware
					]
				}).then(({ x, y, placement, middlewareData }) => {
					Tooltip!.style.left = `${x}px`;
					Tooltip!.style.top = `${y}px`;

					const { x: arrowX, y: arrowY } = middlewareData.arrow!;
					const arrowSize = (TooltipArrow!.getBoundingClientRect().width / 3).toFixed();

					const side = {
						top: 'bottom',
						right: 'left',
						bottom: 'top',
						left: 'right'
					}[placement.split('-')[0]]!;

					Object.assign(TooltipArrow!.style, {
						left: arrowX != null ? `${arrowX}px` : '',
						top: arrowY != null ? `${arrowY}px` : '',
						right: '',
						bottom: '',
						[side]: `-${arrowSize}px`
					});

					Tooltip?.setAttribute('data-placement', placement);
				});
			});

			await animate(Config.classes.animationEnter, Config.classes.animationLeave, Tooltip);

			visible = true;
			Config.onMount?.();
		}
	};
	const removeTooltip = async () => {
		if (Tooltip || visible) {
			if (parseDelay.out) {
				await wait(parseDelay.out, currentDelay);
			}

			await animate(Config.classes.animationLeave, Config.classes.animationEnter, Tooltip);

			if (cleanUpPosition) cleanUpPosition();

			if (Tooltip) {
				node.removeAttribute('aria-describedby');
				visible = false;
				Tooltip.remove();
				Tooltip = null;

				Config.onDestroy?.();
			}

			cleanUpPosition?.();
		}
	};

	if (Config.constant) {
		mountTooltip();
	} else {
		node.addEventListener('mouseenter', mountTooltip);
		node.addEventListener('mouseenter', () => (hovering = true));
		node.addEventListener('focus', mountTooltip);

		node.addEventListener('mouseleave', removeTooltip);
		node.addEventListener('mouseleave', () => (hovering = false));
		node.addEventListener('blur', removeTooltip);

		window.addEventListener('keydown', handleKeys);

		return {
			update(options: Options) {
				content = options.content;
				Config.html = options.html || false;

				if (Tooltip && TooltipContent) {
					TooltipContent[Config.html ? 'innerHTML' : 'textContent'] = content;
				}
			},
			destroy() {
				removeTooltip();

				window.removeEventListener('keydown', handleKeys);

				wasDestroyed = true;
			}
		};
	}
};
