import type { Props } from './types';

export const DEFAULTS: Omit<Props, 'onMount' | 'onDestroy'> = {
	html: false,
	target: 'body',
	placement: 'top',
	shiftPadding: 0,
	offset: 10,
	delay: 0,
	constant: false,
	visibility: true,
	classes: {
		container: 'svooltip',
		content: 'svooltip-content',
		arrow: 'svooltip-arrow',
		animationEnter: 'svooltip-entering',
		animationLeave: 'svooltip-leaving'
	},
	middleware: []
};
