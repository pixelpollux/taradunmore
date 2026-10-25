import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Toggle chip for the Work index. Off: surface + plum shadow. On: plum fill
 * + lime shadow. `pill` is the desktop chip; `tile` is the squarer mobile
 * drawer chip.
 */
export default function FilterChip({
	pressed,
	onClick,
	size = "pill",
	className,
	children,
}: {
	pressed: boolean;
	onClick: () => void;
	size?: "pill" | "tile";
	className?: string;
	children: ReactNode;
}) {
	return (
		<button
			type='button'
			aria-pressed={pressed}
			onClick={onClick}
			className={cn(
				"lift min-h-tap border font-bold leading-tight",
				size === "pill"
					? "rounded-full px-5 py-2"
					: "w-full rounded-[16px] px-4 py-2",
				pressed
					? "border-plum bg-plum text-paper shadow-pop-lime focus-visible:outline-plum"
					: "border-plum bg-surface text-plum shadow-pop-plum",
				className,
			)}
		>
			{children}
		</button>
	);
}
