import {
	computePosition,
	flip,
	shift,
	offset as floatingOffset,
	arrow as floatingArrow
} from '@floating-ui/dom';	
import {ID} from './use-id.js';

import type {Props} from './types';

export default (node: HTMLElement, props: Props) => {
	const {
		content,
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
			animationLeave: 'svooltip-leaving',
		}
	} = props;

	const targetEl = typeof target === 'string' ? document.querySelector(target)! : target!;
	const getDelay = {
		in: typeof delay === 'number' ? delay : delay[0],
		out: typeof delay === 'number' ? delay : delay[1],
	}

	let tooltip: HTMLElement | null;
	let arrow: HTMLElement;
	const id: number = ID();
	let _delay: ReturnType<typeof setTimeout> | undefined;

	const globalKeys = (e: KeyboardEvent) => {
		if (e.key === 'Escape' || e.key === 'Esc') hideTooltip();
	}

	const animate = async(add: string, remove: string): Promise<void> => {
		return new Promise(resolve => {
			tooltip?.classList.add(add);
			tooltip?.classList.remove(remove);

			tooltip?.addEventListener('animationend', () => {
				tooltip?.classList.remove(add);
				resolve();
			})
		})
	}

	const wait = (time: number): Promise<void> => {
		clearWait();
		return new Promise(resolve => {
			_delay = setTimeout(() => {
				clearWait();
				resolve();
			}, time)
		})
	}
	const clearWait = () => {
		clearTimeout(_delay);
		_delay = undefined;
	}

	const constructTooltip = () => {
		// Tooltip
		tooltip = document.createElement('div')
		tooltip.setAttribute('id', `svooltip-${id}`);
		tooltip.setAttribute('role', 'tooltip');
		tooltip.setAttribute('data-placement', placement);
		tooltip.setAttribute('class', classes.container!);
		
		// Content
		const contentDiv = document.createElement('span');
		contentDiv.setAttribute('class', 'svooltip-content');
		contentDiv.textContent = content;

		// Arrow
		arrow = document.createElement('div');
		arrow.setAttribute('class', classes.arrow!);

		// Append to tooltip
		tooltip.append(arrow);
		tooltip.append(contentDiv);
	}

	const positionTooltip = () => {
		computePosition(node, tooltip!, {
			placement,
			middleware: [
				floatingOffset(offset),
				flip(),
				shift({padding: shiftPadding}),
				floatingArrow({element: arrow})
			]
		}).then(({x, y, placement, middlewareData}) => {
			tooltip!.style.left = `${x}px`;
			tooltip!.style.top = `${y}px`;

			const {x: arrowX, y: arrowY} = middlewareData.arrow!;

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
				[side]: '-4px',
			});
		});
	}
	
	const showTooltip = async() => {
		if (!tooltip) {

			if (getDelay.in > 0) {
				await wait(getDelay.in);
			}

			node.setAttribute('aria-describedby', `svooltip-${id}`);
	
			constructTooltip();
			positionTooltip();
	
			targetEl.append(tooltip!);
	
			await animate(classes.animationEnter!, classes.animationLeave!);
		}
	}

	const hideTooltip = async() => {
		if (tooltip) {
			if (getDelay.out > 0) {
				await wait(getDelay.out);
			}

			await animate(classes.animationLeave!, classes.animationEnter!);

			node.removeAttribute('aria-describedby');

			tooltip.remove();
			tooltip = null;
		}
	}

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
		}
	}
}