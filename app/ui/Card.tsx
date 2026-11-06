import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import DotShadow from "./DotShadow";
import { inkClass, type Ink } from "./ink";
import { tiltProps } from "./tilt";

const padding = {
	none: "",
	md: "p-6 md:p-8",
	lg: "p-7 md:p-10",
} as const;

const radius = {
	card: { css: "var(--radius-card)", cls: "rounded-card" },
	panel: { css: "var(--radius-panel)", cls: "rounded-panel" },
	form: { css: "28px", cls: "rounded-[28px]" },
} as const;

/**
 * Static container: an opaque surface box over a halftone dot layer.
 * Not interactive. Links inside it keep their own solid shadows.
 */
export function StaticCard({
	ink = "lime",
	offset = 12,
	tilt = 0,
	pad = "md",
	shape = "card",
	id,
	className,
	children,
}: {
	ink?: Ink;
	offset?: number;
	tilt?: number;
	pad?: keyof typeof padding;
	shape?: keyof typeof radius;
	id?: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<DotShadow
			ink={ink}
			offset={offset}
			radius={radius[shape].css}
			tilt={tilt}
		>
			<div
				id={id}
				className={cn(
					"overflow-hidden border border-plum bg-surface",
					radius[shape].cls,
					padding[pad],
					className,
				)}
			>
				{children}
			</div>
		</DotShadow>
	);
}

/**
 * Whole-card link: one <a> with a solid shadow and lift. Never put another
 * link inside it. Tilt sits on an outer wrapper so the lift keeps it.
 */
export function LinkCard({
	href,
	accent = "lime",
	tilt = 0,
	pad = "none",
	external = false,
	className,
	children,
	...aria
}: {
	href: string;
	accent?: Ink;
	tilt?: number;
	pad?: keyof typeof padding;
	external?: boolean;
	className?: string;
	children: ReactNode;
	"aria-label"?: string;
}) {
	const classes = cn(
		"lift block overflow-hidden rounded-card border border-plum bg-surface text-plum no-underline",
		inkClass[accent].shadow,
		padding[pad],
		className,
	);
	const body = external ? (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className={classes}
			{...aria}
		>
			{children}
		</a>
	) : (
		<Link href={href} className={classes} {...aria}>
			{children}
		</Link>
	);

	return <div {...tiltProps(tilt)}>{body}</div>;
}
