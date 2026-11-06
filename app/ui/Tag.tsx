import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { inkClass, type Ink } from "./ink";

/** Static tint chip. No shadow, no hover: tags are not interactive. */
export default function Tag({
	tone = "lime",
	className,
	children,
}: {
	tone?: Ink;
	className?: string;
	children: ReactNode;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border-chip border-plum px-3 py-1 text-small font-bold leading-tight text-plum",
				inkClass[tone].tint,
				className,
			)}
		>
			{children}
		</span>
	);
}
