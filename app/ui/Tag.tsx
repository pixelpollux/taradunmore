import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Ink } from "./DotShadow";

const tones: Record<Ink, string> = {
	lime: "bg-lime-100",
	orchid: "bg-orchid-100",
	amber: "bg-amber-100",
};

const rotation: Ink[] = ["lime", "orchid", "amber"];

/** Rotate tones across a list of tags. */
export function toneAt(index: number): Ink {
	return rotation[index % rotation.length];
}

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
				"inline-flex items-center rounded-full border-chip border-plum px-3 py-1 text-[15px] font-bold leading-tight text-plum",
				tones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}
