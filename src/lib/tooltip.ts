import {
	computePosition,
	flip as floatingFlip,
	shift as floatingShift,
	offset as floatingOffset,
	arrow as floatingArrow
} from '@floating-ui/dom';
import { animate, wait, ID } from './utils.js';

import type { Props } from './types';

export default (node: HTMLElement, props: Props) => {
	let {
		content,
		format = 'string',
		target = 'body',
		placement = 'top',
		shiftPadding = 0,
		offset = 10,
		delay = 0,
		constant = false,
		classes = {
			container: 'svooltip',
			content: 'svooltip-content',
			arrow: 'svooltip-arrow',
			animationEnter: 'svooltip-entering',
			animationLeave: 'svooltip-leaving'
		},
		middleware = [],
		onMount,
		onDestroy
	} = props;

	const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
	const _delay = {
		in: typeof delay === 'number' ? delay : delay[0],
		out: typeof delay === 'number' ? delay : delay[1]
	};
	const id = `svooltip-${ID()}`;

	let _content = node.title || content!;
	node.removeAttribute('title');

	let TIP: HTMLElement | null;
	let TIPContent: HTMLElement | null;
	let TIPArrow: HTMLElement;

	let hovering: boolean = false;
	let visible: boolean = false;

	let currentDelay: ReturnType<typeof setTimeout> | undefined;

	const handleKeys = ({ key }: KeyboardEvent) => {
		if (key === 'Escape' || key === 'Esc') hide();
	};

	const create = () => {
		if (TIP || visible) return;

		// Tooltip
		TIP = document.createElement('div');
		TIP.setAttribute('id', id);
		TIP.setAttribute('role', 'tooltip');
		TIP.setAttribute('data-placement', placement);
		TIP.setAttribute('class', classes.container!);

		// Content
		TIPContent = document.createElement('span');
		TIPContent.setAttribute('class', classes.content!);
		TIPContent[format === 'string' ? 'textContent' : 'innerHTML'] = _content;

		// Arrow
		TIPArrow = document.createElement('div');
		TIPArrow.setAttribute('class', classes.arrow!);

		// Append
		TIP.append(TIPArrow);
		TIP.append(TIPContent);
	};
	const position = () => {
		if (!TIP || !TIPArrow) return;

		computePosition(node, TIP, {
			placement,
			middleware: [
				floatingOffset(offset),
				floatingFlip(),
				floatingShift({ padding: shiftPadding }),
				floatingArrow({ element: TIPArrow }),
				...middleware
			]
		}).then(({ x, y, placement, middlewareData }) => {
			TIP!.style.left = `${x}px`;
			TIP!.style.top = `${y}px`;

			const { x: arrowX, y: arrowY } = middlewareData.arrow!;

			const side = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[placement.split('-')[0]]!;

			Object.assign(TIPArrow.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[side]: '-4px'
			});
		});
	};

	const show = async () => {
		if (!TIP) {
			if (_delay.in > 0) {
				await wait(_delay.in, currentDelay);
				if (!hovering || visible || TIP) return;
			}

			node.setAttribute('aria-describedby', id);

			create();
			position();

			if (!targetEl) throw new Error(`[SVooltip] Cannot find \`${targetEl}\``);
			if (!TIP) throw new Error(`[SVooltip] Tooltip has not been created.`);

			targetEl.append(TIP);

			await animate(classes.animationEnter!, classes.animationLeave!, TIP);

			onMount?.();
			visible = true;
		}
	};

	const hide = async () => {
		if (TIP || visible) {
			if (_delay.out > 0) {
				await wait(_delay.out, currentDelay);
			}

			await animate(classes.animationLeave!, classes.animationEnter!, TIP);

			if (TIP) {
				node.removeAttribute('aria-describedby');
				visible = false;
				TIP.remove();
				TIP = null;

				onDestroy?.();
			}
		}
	};

	if (constant) {
		show();
	} else {
		node.addEventListener('mouseenter', show);
		node.addEventListener('mouseenter', () => (hovering = true));
		node.addEventListener('focus', show);

		node.addEventListener('mouseleave', hide);
		node.addEventListener('mouseleave', () => (hovering = false));
		node.addEventListener('blur', hide);

		window.addEventListener('keydown', handleKeys);

		return {
			update(props: Props) {
				content = props.content;
				format = props.format || 'string';

				if (TIP && TIPContent) {
					TIPContent[format === 'string' ? 'textContent' : 'innerHTML'] = _content;
					position();
				}
			},
			destroy() {
				window.removeEventListener('keydown', handleKeys);

				onDestroy?.();
			}
		};
	}
};
