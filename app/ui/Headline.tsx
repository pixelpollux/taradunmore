import React from "react";
import { cn } from "@/lib/cn";

const variants = {
	display: "text-display ghost",
	page: "text-page-title ghost",
	section: "text-section-title ghost",
	card: "text-card-title",
} as const;

const defaultLevel = {
	display: "h1",
	page: "h1",
	section: "h2",
	card: "h3",
} as const;

type Level = "h1" | "h2" | "h3" | "h4" | "decorative";

/**
 * All headings are Shrikhand. display / page / section carry the riso Ghost
 * (misregistered shadow, 32px+ only). `decorative` renders a hidden <div>
 * for purely visual display text, so a page keeps exactly one real h1.
 */
export default function Headline({
	variant = "section",
	level,
	id,
	className,
	children,
}: {
	variant?: keyof typeof variants;
	level?: Level;
	id?: string;
	className?: string;
	children: React.ReactNode;
}) {
	const resolved = level ?? defaultLevel[variant];
	const decorative = resolved === "decorative";

	return React.createElement(
		decorative ? "div" : resolved,
		{
			id: id || undefined,
			className: cn(
				"font-display font-normal text-plum",
				variants[variant],
				className,
			),
			...(decorative && { "aria-hidden": true }),
		},
		children,
	);
}
