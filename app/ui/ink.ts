/**
 * The three riso inks and every class that paints one. Components pick an
 * `Ink` and read the class from `inkClass`, so a new ink or a changed recipe
 * is one edit here. Class names are spelled out in full so Tailwind sees them.
 */
export type Ink = "lime" | "orchid" | "amber";

export const INKS: readonly Ink[] = ["lime", "orchid", "amber"];

/** Same rotation starting on orchid, so a list beside an INKS list differs. */
export const INKS_FROM_ORCHID: readonly Ink[] = ["orchid", "amber", "lime"];

export const inkClass: Record<
	Ink,
	{
		/** Halftone dot layer behind a static container (DotShadow). */
		dot: string;
		/** Pale fill for chips and tags. */
		tint: string;
		/** Full-strength fill for badges and dots. */
		solid: string;
		/** 5px solid shadow for whole-card links, one step bolder than a button's. */
		shadow: string;
	}
> = {
	lime: {
		dot: "bg-dot-lime",
		tint: "bg-lime-100",
		solid: "bg-lime",
		shadow: "shadow-[5px_5px_0_var(--lime)]",
	},
	orchid: {
		dot: "bg-dot-orchid",
		tint: "bg-orchid-100",
		solid: "bg-orchid",
		shadow: "shadow-[5px_5px_0_var(--orchid)]",
	},
	amber: {
		dot: "bg-dot-amber",
		tint: "bg-amber-100",
		solid: "bg-amber",
		shadow: "shadow-[5px_5px_0_var(--amber)]",
	},
};

/**
 * Rotate inks across a list. Pass a different `order` to change which ink
 * comes first; neighbouring lists start on different inks on purpose.
 */
export function inkAt(index: number, order: readonly Ink[] = INKS): Ink {
	return order[index % order.length];
}
