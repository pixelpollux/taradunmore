"use client";

import { useEffect, useState } from "react";
import { StaticCard } from "@/app/ui/Card";
import { cn } from "@/lib/cn";

/**
 * "On this page" rail for the case study: links to each h2, with the section
 * currently in view marked aria-current="location" and a filled lime dot (so
 * the current section is never shown by color alone: the text goes bold too).
 */
export default function OnThisPage({
	headings,
}: {
	headings: Array<{ id: string; text: string }>;
}) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const elements = headings
			.map((heading) => document.getElementById(heading.id))
			.filter((element): element is HTMLElement => element !== null);
		if (!elements.length) return;

		// The active heading is the last one that has scrolled past the nav.
		const update = () => {
			let current: string | null = null;
			for (const element of elements) {
				if (element.getBoundingClientRect().top <= 140) current = element.id;
			}
			setActive(current);
		};

		const observer = new IntersectionObserver(update, {
			rootMargin: "0px 0px -50% 0px",
			threshold: [0, 1],
		});
		elements.forEach((element) => observer.observe(element));
		window.addEventListener("scroll", update, { passive: true });
		update();

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", update);
		};
	}, [headings]);

	return (
		<nav aria-label='On this page' className='md:sticky md:top-[120px]'>
			<StaticCard ink='amber' offset={12} pad='md'>
				<p className='mb-4 text-label uppercase'>On this page</p>
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
			</StaticCard>
		</nav>
	);
}
