import { cn } from "@/lib/cn";

/**
 * Decorative overprint shapes for page headers. Accent fills only, never
 * under text; hidden from assistive tech and below 768px.
 */
export default function Shapes({
	variant,
	className,
}: {
	variant: "trio" | "pair";
	className?: string;
}) {
	return (
		<div
			aria-hidden='true'
			className={cn(
				"pointer-events-none relative h-40 w-56 max-md:hidden",
				className,
			)}
		>
			{variant === "trio" ? (
				<>
					<span className='multiply absolute left-0 top-4 size-28 rounded-full bg-orchid' />
					<span className='multiply absolute left-20 top-0 size-24 rotate-12 rounded-[24px] bg-lime' />
					<span className='multiply absolute bottom-2 left-10 h-14 w-40 -rotate-6 rounded-full bg-amber' />
				</>
			) : (
				<>
					<span className='multiply absolute left-4 top-2 size-32 rounded-full bg-lime' />
					<span className='multiply absolute left-24 top-10 size-28 rounded-full bg-orchid' />
				</>
			)}
		</div>
	);
}
