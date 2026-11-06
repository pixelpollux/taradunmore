import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { textLink } from "./link";

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
			className={cn(textLink, "inline-flex min-h-tap items-center gap-2")}
		>
			<ArrowLeft aria-hidden='true' className='size-5' strokeWidth={3} />
			{children}
		</Link>
	);
}
