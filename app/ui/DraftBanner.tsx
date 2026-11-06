import { draftMode } from "next/headers";

/**
 * Shown only while Draft Mode is on (an editor previewing unpublished
 * Contentful content). Fixed to the bottom so it never covers the nav, with a
 * link that turns Draft Mode off and returns to the same page.
 */
export default async function DraftBanner() {
	const { isEnabled } = await draftMode();
	if (!isEnabled) return null;

	return (
		<div
			role='status'
			className='fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-xl flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-full border border-plum bg-amber px-6 py-3 text-small font-bold text-plum'
		>
			<span>Draft mode: you&apos;re seeing unpublished content.</span>
			{/* A plain <a>: the route has to run on the server to clear the cookie. */}
			<a
				href='/api/disable-draft'
				className='inline-flex min-h-tap items-center underline decoration-2 underline-offset-4 hover:decoration-4'
			>
				Exit draft mode
			</a>
		</div>
	);
}
