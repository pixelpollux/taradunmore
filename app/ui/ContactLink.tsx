import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { inkClass, type Ink } from "./ink";

/**
 * Contact pill: icon badge + label + handle. Below 768px it collapses to an
 * icon-only 56px circle; the aria-label always carries label and handle.
 * Pass `showHandleOnMobile` to keep the full pill on phones, so the address
 * can be read without opening anything (the email link does).
 */
export default function ContactLink({
	label,
	handle,
	href,
	icon: Icon,
	tone = "lime",
	showHandleOnMobile = false,
	className,
}: {
	label: string;
	handle: string;
	href: string;
	icon: ComponentType<{ className?: string }>;
	tone?: Ink;
	showHandleOnMobile?: boolean;
	className?: string;
}) {
	const external = !href.startsWith("mailto:");

	return (
		<a
			href={href}
			{...(external && { target: "_blank", rel: "noopener noreferrer" })}
			aria-label={`${label}, ${handle}${external ? " (opens in new tab)" : ""}`}
			className={cn(
				"lift inline-flex min-h-tap items-center gap-3 rounded-full border border-plum bg-surface p-2 pr-5 text-plum shadow-pop-plum",
				!showHandleOnMobile &&
					"max-md:size-14 max-md:justify-center max-md:p-0",
				className,
			)}
		>
			<span
				aria-hidden='true'
				className={cn(
					"flex size-10 flex-none items-center justify-center rounded-full border-chip border-plum",
					inkClass[tone].solid,
				)}
			>
				<Icon className='size-5' />
			</span>
			<span
				aria-hidden='true'
				className={cn("text-left", !showHandleOnMobile && "max-md:hidden")}
			>
				<span className='block font-bold leading-tight'>{label}</span>
				<span className='block text-small text-plum-muted'>{handle}</span>
			</span>
		</a>
	);
}
