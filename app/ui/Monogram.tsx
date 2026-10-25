import { cn } from "@/lib/cn";

/**
 * "td" over two overprinting circles (orchid on top, lime offset by
 * --riso-offset). Decorative: the wordmark text beside it names the site.
 */
export default function Monogram({ className }: { className?: string }) {
	return (
		<span
			aria-hidden='true'
			className={cn(
				"relative inline-block size-[47px] flex-none select-none",
				className,
			)}
		>
			<span
				className='multiply absolute bottom-0 right-0 size-[44px] rounded-full bg-lime'
			/>
			<span className='multiply absolute left-0 top-0 size-[44px] rounded-full bg-orchid' />
			<span className='absolute inset-0 flex items-center justify-center pb-[2px] font-display text-[24px] leading-none text-plum'>
				td
			</span>
		</span>
	);
}
