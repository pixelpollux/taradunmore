import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { inkClass, type Ink } from "./ink";
import { tiltProps } from "./tilt";

/**
 * Halftone dot shadow for STATIC containers (DESIGN.md "Shadow Rule").
 * The child must have an opaque background so dots never show through it.
 * Rotation lives on the wrapper so the dots tilt with the box; the `tilt`
 * class zeroes it below 768px. Use `as='span'` inside headings, where a
 * <div> would be invalid.
 *
 * Corners: `radius` is a CSS value; pass `shapeClassName` instead when the
 * shape changes by state (Disclosure), and it styles the dot layer and the
 * wrapper in place of `radius`.
 */
export default function DotShadow({
	ink,
	offset = 12,
	radius,
	shapeClassName,
	tilt = 0,
	as: As = "div",
	className,
	children,
}: {
	ink: Ink;
	offset?: number;
	radius?: string;
	shapeClassName?: string;
	tilt?: number;
	as?: "div" | "span";
	className?: string;
	children: ReactNode;
}) {
	const tiltAttrs = tiltProps(tilt);
	const corner = shapeClassName
		? undefined
		: (radius ?? "var(--radius-card)");

	return (
		<As
			className={cn(
				"relative",
				As === "span" && "block",
				tiltAttrs.className,
				className,
			)}
			style={tiltAttrs.style}
		>
			<As
				aria-hidden='true'
				className={cn(
					"pointer-events-none absolute inset-0 bg-dot multiply",
					As === "span" && "block",
					inkClass[ink].dot,
					shapeClassName,
				)}
				style={{
					borderRadius: corner,
					transform: `translate(${offset}px, ${offset}px)`,
				}}
			/>
			<As
				className={cn(
					"relative h-full",
					As === "span" && "block",
					shapeClassName,
				)}
				style={{ borderRadius: corner }}
			>
				{children}
			</As>
		</As>
	);
}
