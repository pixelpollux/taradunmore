"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { dotInk, type Ink } from "./DotShadow";

/**
 * Native <details> row with a separate chevron circle. Static container, so
 * it carries a halftone dot shadow. Closed it is a pill; open it softens to
 * 32px (28px on mobile). Used by resume rows and the mobile filter drawer.
 *
 * Uncontrolled by default; pass `open` + `onOpenChange` to control it (the
 * filter drawer closes itself when a chip is picked).
 */
export default function Disclosure({
	summary,
	children,
	ink = "lime",
	offset = 10,
	tilt = 0,
	defaultOpen = false,
	open,
	onOpenChange,
	className,
	summaryClassName,
	bodyClassName,
}: {
	summary: ReactNode;
	children: ReactNode;
	ink?: Ink;
	offset?: number;
	tilt?: number;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	className?: string;
	summaryClassName?: string;
	bodyClassName?: string;
}) {
	const [innerOpen, setInnerOpen] = useState(defaultOpen);
	const isOpen = open ?? innerOpen;
	const shape = isOpen ? "rounded-[32px] max-md:rounded-[28px]" : "rounded-full";

	return (
		<div
			className={cn("relative", tilt !== 0 && "tilt", className)}
			style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
		>
			<div
				aria-hidden='true'
				className={cn(
					"pointer-events-none absolute inset-0 bg-dot multiply",
					dotInk[ink],
					shape,
				)}
				style={{ transform: `translate(${offset}px, ${offset}px)` }}
			/>
			<details
				open={isOpen}
				onToggle={(event) => {
					const next = event.currentTarget.open;
					setInnerOpen(next);
					onOpenChange?.(next);
				}}
				className={cn("group relative border border-plum bg-surface", shape)}
			>
				<summary
					className={cn(
						"flex min-h-tap cursor-pointer items-center gap-4 px-6 py-4 max-md:px-5",
						summaryClassName,
					)}
				>
					<span className='min-w-0 flex-1'>{summary}</span>
					<span
						aria-hidden='true'
						className='flex size-10 flex-none items-center justify-center rounded-full border-chip border-plum bg-lime-100 max-md:size-9 group-open:motion-safe:rotate-180'
					>
						<ChevronDown className='size-5' strokeWidth={3} />
					</span>
				</summary>
				<div
					className={cn(
						"mx-6 border-t-[3px] border-dashed border-orchid pb-6 pt-5 max-md:mx-5",
						bodyClassName,
					)}
				>
					{children}
				</div>
			</details>
		</div>
	);
}
