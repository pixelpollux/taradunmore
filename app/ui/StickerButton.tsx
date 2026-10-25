import type { ReactNode } from "react";
import { Download } from "lucide-react";

/**
 * The round "Download PDF" sticker. One per page. The rotation sits on the
 * outer link and the hover lift on the inner circle, so the lift never
 * resets the tilt.
 */
export default function StickerButton({
	href,
	download,
	children,
}: {
	href: string;
	download?: boolean;
	children: ReactNode;
}) {
	return (
		<a
			href={href}
			download={download ? "" : undefined}
			className='inline-block rotate-[8deg]'
		>
			<span className='lift relative block size-[220px]'>
				<span
					aria-hidden='true'
					className='multiply absolute inset-0 translate-x-[12px] translate-y-[10px] rounded-full bg-orchid'
				/>
				<span
					aria-hidden='true'
					className='multiply absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--lime),var(--amber))]'
				/>
				<span
					aria-hidden='true'
					className='absolute inset-0 rounded-full border border-plum'
				/>
				<span className='relative z-10 flex h-full flex-col items-center justify-center gap-2 px-6 text-center font-display text-[30px] leading-[1.05] text-plum'>
					{children}
					<Download aria-hidden='true' className='size-7' strokeWidth={3} />
				</span>
			</span>
		</a>
	);
}
