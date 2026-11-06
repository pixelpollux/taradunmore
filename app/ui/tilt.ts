import type { CSSProperties } from "react";

/**
 * The tilt recipe shared by DotShadow, Disclosure and LinkCard: rotate the
 * wrapper so a shadow layer tilts with the box, and tag it `tilt` so
 * globals.css zeroes the rotation below 768px. Spread the result, or merge
 * `className` with `cn()` when the element has its own classes.
 */
export function tiltProps(deg = 0): {
	className?: string;
	style?: CSSProperties;
} {
	return deg
		? { className: "tilt", style: { transform: `rotate(${deg}deg)` } }
		: {};
}
