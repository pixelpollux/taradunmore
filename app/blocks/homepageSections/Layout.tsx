import type { ReactNode } from "react";
import Headline from "@/app/ui/Headline";

/**
 * Homepage section shell: a plain <section> inside the 1200px container.
 * Pass `title` for the standard section header (Headline + optional actions);
 * sections with their own title tile (About, Resume, Contact) omit it.
 * Anchors land 110px below the top so the floating nav never covers them.
 */
export default function Layout({
	id,
	title,
	actions,
	children,
}: {
	id: string;
	title?: string;
	actions?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			aria-labelledby={title ? `${id}-title` : undefined}
			className='scroll-mt-[110px]'
		>
			<div className='mx-auto max-w-page px-5'>
				{title && (
					<div className='mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4'>
						<Headline id={`${id}-title`} variant='section' level='h2'>
							{title}
						</Headline>
						{actions}
					</div>
				)}
				{children}
			</div>
		</section>
	);
}
