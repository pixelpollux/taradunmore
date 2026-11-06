"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/ui/Button";
import Disclosure from "@/app/ui/Disclosure";
import FilterChip from "@/app/ui/FilterChip";
import Headline from "@/app/ui/Headline";
import type { Ink } from "@/app/ui/DotShadow";
import ProjectCard from "./ProjectCard";

const ALL = "All";
const dots: Ink[] = ["lime", "orchid", "amber"];

type Props = { items: any[]; tags: string[] };

/**
 * Work index: filter chips (md and up) or a drawer (below md) over a grid of
 * project cards. The active tag lives in the URL (`/work?tag=React`), so
 * Back, refresh and shared links keep the filter. A live status line
 * announces the count.
 *
 * useSearchParams needs a Suspense boundary on a static page; the fallback
 * is the unfiltered grid, which is what the prerendered HTML shows.
 */
export default function WorkGrid(props: Props) {
	return (
		<Suspense fallback={<WorkGridView {...props} active={ALL} onChoose={() => {}} />}>
			<UrlFilteredWorkGrid {...props} />
		</Suspense>
	);
}

function UrlFilteredWorkGrid({ items, tags }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// An unknown ?tag= (a stale link) falls back to showing everything.
	const requested = searchParams.get("tag");
	const active = requested && tags.includes(requested) ? requested : ALL;

	const onChoose = (tag: string) => {
		const next = new URLSearchParams(searchParams.toString());
		if (tag === ALL) next.delete("tag");
		else next.set("tag", tag);
		const query = next.toString();
		router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
	};

	return <WorkGridView items={items} tags={tags} active={active} onChoose={onChoose} />;
}

function WorkGridView({
	items,
	tags,
	active,
	onChoose,
}: Props & { active: string; onChoose: (tag: string) => void }) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const options = [ALL, ...tags];

	const shown =
		active === ALL
			? items
			: items.filter((item) => item.techTags?.includes(active));

	const choose = (tag: string) => {
		onChoose(tag);
		setDrawerOpen(false);
	};

	return (
		<div>
			{tags.length > 0 && (
				<>
					<div
						role='group'
						aria-label='Filter by tech'
						className='flex flex-wrap gap-3 max-md:hidden'
					>
						{options.map((tag) => (
							<FilterChip
								key={tag}
								pressed={active === tag}
								onClick={() => choose(tag)}
							>
								{tag}
							</FilterChip>
						))}
					</div>

					<div className='md:hidden'>
						<Disclosure
							ink='orchid'
							open={drawerOpen}
							onOpenChange={setDrawerOpen}
							summary={
								<span className='block'>
									<span className='block text-label uppercase'>
										Filter by tech
									</span>
									<span className='block font-bold'>{active}</span>
								</span>
							}
						>
							<div
								role='group'
								aria-label='Filter by tech'
								className='grid grid-cols-2 gap-3'
							>
								{options.map((tag) => (
									<FilterChip
										key={tag}
										size='tile'
										pressed={active === tag}
										onClick={() => choose(tag)}
									>
										{tag}
									</FilterChip>
								))}
							</div>
						</Disclosure>
					</div>
				</>
			)}

			<p role='status' className='mb-10 mt-8 text-small font-bold'>
				Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
			</p>

			{shown.length > 0 ? (
				<ul className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-x-10 gap-y-14 max-md:grid-cols-1 md:[&>li:nth-child(even)]:mt-5'>
					{shown.map((item, index) => (
						<li key={item.slug}>
							<ProjectCard
								item={item}
								titleLevel='h2'
								ink={dots[index % dots.length]}
								tilt={index % 2 ? 0.8 : -0.8}
							/>
						</li>
					))}
				</ul>
			) : (
				<div className='rounded-card border border-dashed border-plum bg-surface p-10 text-center'>
					<Headline variant='card' level='h2'>
						Nothing printed in that ink yet.
					</Headline>
					<p className='mx-auto mt-3 max-w-md text-plum-muted'>
						No projects match this filter.
					</p>
					{active !== ALL && (
						<div className='mt-6'>
							<Button variant='secondary' onClick={() => choose(ALL)}>
								Show all work
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
