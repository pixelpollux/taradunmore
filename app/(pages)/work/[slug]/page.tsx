import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Button from "@/app/ui/Button";
import BackLink from "@/app/ui/BackLink";
import CoverImage from "@/app/ui/CoverImage";
import Headline from "@/app/ui/Headline";
import { LinkCard } from "@/app/ui/Card";
import CtaBanner from "@/app/blocks/CtaBanner";
import OnThisPage from "@/app/blocks/OnThisPage";
import { ProjectTags } from "@/app/blocks/ProjectCard";
import {
	getAdjacentWorkItems,
	getWorkItemBySlug,
	getWorkItemList,
} from "@/lib/api";
import { getHeadings, renderRichText } from "@/lib/richText";

export async function generateStaticParams() {
	const workItems: Array<{ slug: string }> = await getWorkItemList(false);
	return workItems.map((workItem) => ({ slug: workItem.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	// Same draft-mode flag as the page, so previews get their own title and
	// unpublished projects get metadata instead of the site default.
	const { isEnabled } = await draftMode();
	const item = await getWorkItemBySlug(slug, isEnabled);
	if (!item) return {};
	const image = item.coverImage?.url
		? [{ url: `${item.coverImage.url}?w=1200` }]
		: undefined;
	return {
		title: item.title,
		description: item.shortBlurb,
		openGraph: {
			type: "article",
			siteName: "TaraDunmore.com",
			title: item.title,
			description: item.shortBlurb,
			url: `/work/${slug}`,
			images: image,
		},
		alternates: { canonical: `/work/${slug}` },
	};
}

/** Previous / next project: 96px thumbnail, label, title. */
function AdjacentCard({
	item,
	label,
	accent,
}: {
	item: any;
	label: string;
	accent: "lime" | "orchid";
}) {
	return (
		<LinkCard href={`/work/${item.slug}`} accent={accent} pad='md'>
			<div className='flex items-center gap-5'>
				<div className='w-24 flex-none'>
					<CoverImage
						url={item.coverImage?.url}
						aspect='1 / 1'
						radius='16px'
						width={192}
						height={192}
						sizes='96px'
					/>
				</div>
				<div>
					<p className='mb-1 text-label uppercase'>{label}</p>
					<Headline variant='card' level='h3'>
						{item.title}
					</Headline>
				</div>
			</div>
		</LinkCard>
	);
}

export default async function WorkItemPage({
	params,
}: {
	params: Promise<{ slug: string }>;
	// TODO: [params: { slug: string }; ] breaks the build, but this works. i don't know why. return later.
}) {
	const { slug } = await params;
	const { isEnabled } = await draftMode();
	const workItem = await getWorkItemBySlug(slug, isEnabled);

	if (!workItem) {
		notFound();
	}

	const { previous, next } = await getAdjacentWorkItems(slug, isEnabled);
	const headings = getHeadings(workItem.fullDescription);

	return (
		<article>
			<header className='mx-auto max-w-page px-5 pb-20 pt-10'>
				<div className='flex flex-wrap items-center gap-x-6'>
					<BackLink href='/work'>All work</BackLink>
					<p className='text-label uppercase'>Case study</p>
				</div>
				<Headline variant='pageDetail' level='h1' className='mt-6'>
					{workItem.title}
				</Headline>
				<p className='mt-6 max-w-[48rem] text-lead'>{workItem.shortBlurb}</p>
				<div className='mt-6'>
					<ProjectTags tags={workItem.techTags} chips />
				</div>
				{(workItem.liveSiteUrl || workItem.codeRepoUrl) && (
					<div className='mt-8 flex flex-wrap gap-4'>
						{workItem.liveSiteUrl && (
							<Button href={workItem.liveSiteUrl} external>
								Visit live site
							</Button>
						)}
						{workItem.codeRepoUrl && (
							<Button
								variant='secondary'
								href={workItem.codeRepoUrl}
								external
							>
								View code
							</Button>
						)}
					</div>
				)}
			</header>

			{workItem.coverImage?.url && (
				<div className='relative z-10 -mt-8 mx-auto max-w-page px-5'>
					<CoverImage
						url={workItem.coverImage.url}
						alt={workItem.coverImage.description || ""}
						aspect='16 / 8'
						radius='var(--radius-panel)'
						ink='orchid'
						offset={16}
						tilt={-0.6}
						priority
						sizes='(min-width: 1200px) 1160px, 100vw'
					/>
				</div>
			)}

			<div className='mx-auto mt-template flex max-w-page flex-wrap items-start gap-x-14 gap-y-10 px-5'>
				{headings.length > 1 && (
					<div className='w-full lg:order-2 lg:w-[260px] lg:flex-none lg:self-stretch'>
						<OnThisPage headings={headings} />
					</div>
				)}
				<div
					className={`min-w-0 max-w-[740px] flex-[1_1_480px] lg:order-1 ${headings.length > 1 ? "" : "mx-auto"}`}
				>
					{renderRichText(workItem.fullDescription, { variant: "prose" })}
				</div>
			</div>

			{(previous || next) && (
				<nav
					aria-label='More work'
					className='mx-auto mt-template max-w-page px-5'
				>
					<ul className='grid grid-cols-1 gap-8 md:grid-cols-2'>
						{previous && (
							<li>
								<AdjacentCard
									item={previous}
									label='Previous project'
									accent='lime'
								/>
							</li>
						)}
						{next && (
							<li className='md:col-start-2'>
								<AdjacentCard
									item={next}
									label='Next project'
									accent='orchid'
								/>
							</li>
						)}
					</ul>
				</nav>
			)}

			<div className='mt-template'>
				<CtaBanner />
			</div>
		</article>
	);
}
