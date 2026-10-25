import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

/** Text link with a left arrow, for "All work" and "All posts". */
export default function BackLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<Link
			href={href}
			className='inline-flex min-h-tap items-center gap-2 font-bold text-link underline decoration-2 underline-offset-4 hover:decoration-4'
		>
			<ArrowLeft aria-hidden='true' className='size-5' strokeWidth={3} />
			{children}
		</Link>
	);
}
