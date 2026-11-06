"use client";

import { useEffect, useState } from "react";
import { StaticCard } from "@/app/ui/Card";
import Disclosure from "@/app/ui/Disclosure";
import { cn } from "@/lib/cn";

type Heading = { id: string; text: string };

/** How far below the top of the page a heading counts as "passed" (clears the nav). */
const PASSED_AT = 140;

/**
 * The id of the last heading that has scrolled past the nav, or null above
 * the first one. One scroll listener, one measurement per frame.
 */
function useActiveHeading(headings: Heading[]) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const elements = headings
			.map((heading) => document.getElementById(heading.id))
			.filter((element): element is HTMLElement => element !== null);
		if (!elements.length) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			let current: string | null = null;
			for (const element of elements) {
				if (element.getBoundingClientRect().top <= PASSED_AT) {
					current = element.id;
				}
			}
			setActive(current);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		update();

		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [headings]);

	return active;
}

function HeadingList({
	headings,
	active,
}: {
	headings: Heading[];
	active: string | null;
}) {
	return (
		<ol className='flex flex-col gap-1'>
			{headings.map((heading) => {
				const isCurrent = heading.id === active;
				return (
					<li key={heading.id}>
						<a
							href={`#${heading.id}`}
							aria-current={isCurrent ? "location" : undefined}
							className={cn(
								"flex min-h-tap items-center gap-3 py-1 leading-snug",
								isCurrent ? "font-bold" : "font-medium hover:underline",
							)}
						>
							<span
								aria-hidden='true'
								className={cn(
									"size-3 flex-none rounded-full border-2 border-plum",
									isCurrent ? "bg-lime" : "bg-transparent",
								)}
							/>
							{heading.text}
						</a>
					</li>
				);
			})}
		</ol>
	);
}

/**
 * "On this page" for the case study: links to each h2, with the section in
 * view marked aria-current="location" and a filled lime dot (so the current
 * section is never shown by color alone: the text goes bold too).
 *
 * From lg up it is a sticky card beside the article. Below that it sits above
 * the article, so it collapses into a closed disclosure instead of pushing
 * the story a full card down the page.
 */
export default function OnThisPage({ headings }: { headings: Heading[] }) {
	const active = useActiveHeading(headings);

	return (
		<nav aria-label='On this page' className='lg:sticky lg:top-[120px]'>
			<div className='lg:hidden'>
				<Disclosure
					ink='amber'
					offset={8}
					summary={<span className='text-label uppercase'>On this page</span>}
				>
					<HeadingList headings={headings} active={active} />
				</Disclosure>
			</div>
			<div className='max-lg:hidden'>
				<StaticCard ink='amber' offset={12} pad='md'>
					<p className='mb-4 text-label uppercase'>On this page</p>
					<HeadingList headings={headings} active={active} />
				</StaticCard>
			</div>
		</nav>
	);
}
