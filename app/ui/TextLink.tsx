import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { textLink } from "./link";

/**
 * Inline reading link. Site paths ("/work/x") use next/link for client-side
 * navigation; http(s) URLs open in a new tab with a screen-reader note;
 * everything else (#anchors, mailto:, tel:) is a plain <a>.
 */
export default function TextLink({
	href,
	className,
	children,
}: {
	href: string;
	className?: string;
	children: ReactNode;
}) {
	const classes = cn(textLink, className);

	if (/^https?:\/\//i.test(href)) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className={classes}
			>
				{children}
				<span className='sr-only'> (opens in new tab)</span>
			</a>
		);
	}

	if (href.startsWith("/") && !href.startsWith("//")) {
		return (
			<Link href={href} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<a href={href} className={classes}>
			{children}
		</a>
	);
}
