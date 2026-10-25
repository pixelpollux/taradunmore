import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Ink = "lime" | "orchid" | "amber";

export const dotInk: Record<Ink, string> = {
	lime: "bg-dot-lime",
	orchid: "bg-dot-orchid",
	amber: "bg-dot-amber",
};

/**
 * Halftone dot shadow for STATIC containers (DESIGN.md "Shadow Rule").
 * The child must have an opaque background so dots never show through it.
 * Rotation lives on the wrapper so the dots tilt with the box; the `tilt`
 * class zeroes it below 768px. Use `as='span'` inside headings, where a
 * <div> would be invalid.
 */
export default function DotShadow({
	ink,
	offset = 12,
	radius = "var(--radius-card)",
	tilt = 0,
	as: As = "div",
	className,
	children,
}: {
	ink: Ink;
	offset?: number;
	radius?: string;
	tilt?: number;
	as?: "div" | "span";
	className?: string;
	children: ReactNode;
}) {
	return (
		<As
			className={cn(
				"relative",
				As === "span" && "block",
				tilt !== 0 && "tilt",
				className,
			)}
			style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
		>
			<As
				aria-hidden='true'
				className={cn(
					"pointer-events-none absolute inset-0 bg-dot multiply",
					As === "span" && "block",
					dotInk[ink],
				)}
				style={{
					borderRadius: radius,
					transform: `translate(${offset}px, ${offset}px)`,
				}}
			/>
			<As
				className={cn("relative h-full", As === "span" && "block")}
				style={{ borderRadius: radius }}
			>
				{children}
			</As>
		</As>
	);
}
