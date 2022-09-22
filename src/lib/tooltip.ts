import {
	computePosition,
	flip,
	shift,
	offset as floatingOffset,
	arrow as floatingArrow
} from '@floating-ui/dom';
import { animate, wait, ID } from './utils.js';

import type { Props } from './types';

export default (node: HTMLElement, props: Props) => {
	const {
		content,
		format = 'string',
		target = 'body',
		placement = 'top',
		shiftPadding = 0,
		offset = 10,
		delay = 0,
		show = false,
		classes = {
			container: 'svooltip',
			arrow: 'svooltip-arrow',
			animationEnter: 'svooltip-entering',
			animationLeave: 'svooltip-leaving'
		},
		middleware = []
	} = props;

	const targetEl = typeof target === 'string' ? document.querySelector(target)! : target!;
	const getDelay = {
		in: typeof delay === 'number' ? delay : delay[0],
		out: typeof delay === 'number' ? delay : delay[1]
	};
	const id: string = `svooltip-${ID()}`;

	let tooltip: HTMLElement | null;
	let arrow: HTMLElement;
	let _delay: ReturnType<typeof setTimeout> | undefined;

	const globalKeys = (e: KeyboardEvent) => {
		if (e.key === 'Escape' || e.key === 'Esc') hideTooltip();
	};

	const constructTooltip = (): void => {
		if (tooltip) return;

		// Tooltip
		tooltip = document.createElement('div');
		tooltip.setAttribute('id', id);
		tooltip.setAttribute('role', 'tooltip');
		tooltip.setAttribute('data-placement', placement);
		tooltip.setAttribute('class', classes.container!);

		// Content
		const contentDiv = document.createElement('span');
		contentDiv.setAttribute('class', 'svooltip-content');
		if (format === 'string') contentDiv.textContent = content;
		else if (format === 'html') contentDiv.innerHTML = content;

		// Arrow
		arrow = document.createElement('div');
		arrow.setAttribute('class', classes.arrow!);

		// Append to tooltip
		tooltip.append(arrow);
		tooltip.append(contentDiv);
	};

	const positionTooltip = (): void => {
		computePosition(node, tooltip!, {
			placement,
			middleware: [
				floatingOffset(offset),
				flip(),
				shift({ padding: shiftPadding }),
				floatingArrow({ element: arrow }),
				...middleware
			]
		}).then(({ x, y, placement, middlewareData }) => {
			tooltip!.style.left = `${x}px`;
			tooltip!.style.top = `${y}px`;

			const { x: arrowX, y: arrowY } = middlewareData.arrow!;

			const side = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[placement.split('-')[0]]!;

			Object.assign(arrow.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[side]: '-4px'
			});
		});
	};

	const showTooltip = async (): Promise<void> => {
		if (!tooltip) {
			if (getDelay.in > 0) {
				await wait(getDelay.in, _delay);
			}

			node.setAttribute('aria-describedby', id);

			constructTooltip();
			positionTooltip();

			targetEl.append(tooltip!);

			await animate(classes.animationEnter!, classes.animationLeave!, tooltip);
		}
	};

	const hideTooltip = async (): Promise<void> => {
		if (tooltip) {
			if (getDelay.out > 0) {
				await wait(getDelay.out, _delay);
			}

			await animate(classes.animationLeave!, classes.animationEnter!, tooltip);

			if (tooltip) {
				node.removeAttribute('aria-describedby');
				tooltip.remove();
				tooltip = null;
			}
		}
	};

	if (show) {
		showTooltip();
	} else {
		node.addEventListener('mouseenter', showTooltip);
		node.addEventListener('focus', showTooltip);

		node.addEventListener('mouseleave', hideTooltip);
		node.addEventListener('blur', hideTooltip);

		window.addEventListener('keydown', globalKeys);

		return {
			destroy() {
				window.removeEventListener('keydown', globalKeys);
			}
		};
	}
};
