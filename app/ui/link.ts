/**
 * Link recipes. Reading links (prose, "All work", the Button `text` variant)
 * are bold link-blue with a 2px underline that thickens on hover. Nav links
 * (header, footer) hide the underline until hover and tint it per surface:
 * add `hover:decoration-<ink>` and any padding where you use `navLink`.
 */
export const textLink =
	"font-bold text-link underline decoration-2 underline-offset-4 hover:decoration-4";

export const navLink =
	"inline-flex min-h-tap items-center font-bold underline decoration-transparent decoration-2 underline-offset-4";
