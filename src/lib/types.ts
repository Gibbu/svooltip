import type {Placement} from '@floating-ui/dom';

export interface Props {
	/**
	 * The text content of the tooltip.
	 */
	content: string,

	/**
	 * The HTML element to place the tooltip.  
	 * Default = `body`
	 */
	target?: string | HTMLElement;

	/**
	 * The placement of the tooltip.  
	 * Default = `top`
	 */
	placement?: Placement;

	/**
	 * Padding for the `shift` middleware.  
	 * Default = `0`
	 */
	shiftPadding?: number;

	/**
	 * Offset of the tooltip.  
	 * Default = `10`
	 */
	offset?: number;

	/**
	 * Delay for showing and hiding the tooltip.  
	 * A `number` will apply on both in and out delays.  
	 * A `array` will apply on in and out delays separately.
	 */
	delay?: number | [number, number];

	/**
	 * Always display the tooltip.
	 */
	show?: boolean;

	/**
	 * Classes used for the tooltip, arrow, entering/leaving classes.
	 */
	classes?: {
		/**
		 * The tooltip itself.
		 */
		container?: string;
		/**
		 * The arrow of the tooltip.
		 */
		arrow?: string;
		/**
		 * The class to be applied when the tooltip is entering.
		 */
		animationEnter?: string;
		/**
		 * The class to be applied when the tooltip is leaving.
		 */
		animationLeave?: string
	},
}