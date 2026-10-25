import DateDisplay from "./DateDisplay";
import { cn } from "@/lib/cn";

/** "Jul 18, 2026 · 3 min read", the dot being a small orchid circle. */
export default function MetaLine({
	date,
	minutes,
	className,
}: {
	date: string;
	minutes?: number;
	className?: string;
}) {
	return (
		<p className={cn("flex flex-wrap items-center gap-x-3 text-label uppercase", className)}>
			<DateDisplay dateString={date} />
			{minutes ? (
				<>
					<span
						aria-hidden='true'
						className='size-2 rounded-full bg-orchid'
					/>
					<span>{minutes} min read</span>
				</>
			) : null}
		</p>
	);
}
