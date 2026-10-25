import Layout from "./Layout";
import { getAllWorkItems as getWorkItems } from "@/lib/api";
import { StaticCard } from "@/app/ui/Card";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";
import Tag, { toneAt } from "@/app/ui/Tag";
import CoverImage from "@/app/ui/CoverImage";
import type { Ink } from "@/app/ui/DotShadow";

function Actions({ item, textLinks }: { item: any; textLinks: boolean }) {
	const linkVariant = textLinks ? "text" : "secondary";
	return (
		<div className='mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2'>
			<Button href={`/work/${item.slug}`}>Case study</Button>
			{item.liveSiteUrl && (
				<Button variant={linkVariant} href={item.liveSiteUrl} external>
					Live site
				</Button>
			)}
			{item.codeRepoUrl && (
				<Button variant={linkVariant} href={item.codeRepoUrl} external>
					Code
				</Button>
			)}
		</div>
	);
}

/** Tint chips on the featured card; a plain "tag · tag · tag" line in grid cards. */
function Tags({ tags, chips }: { tags?: string[]; chips: boolean }) {
	if (!tags?.length) return null;
	if (!chips) {
		return <p className='text-small font-bold'>{tags.join(" · ")}</p>;
	}
	return (
		<ul className='flex flex-wrap gap-2'>
			{tags.map((tag, index) => (
				<li key={tag}>
					<Tag tone={toneAt(index)}>{tag}</Tag>
				</li>
			))}
		</ul>
	);
}

const dots: Ink[] = ["orchid", "amber", "lime"];

export default async function WorkSection() {
	const workItems = await getWorkItems();
	// Items arrive ordered by `order` (lowest first): the first is featured.
	const [featured, ...rest] = workItems;
	const gridItems = rest.slice(0, 3);

	return (
		<Layout
			id='work'
			title='Work'
			actions={
				<Button variant='secondary' href='/work'>
					All work
				</Button>
			}
		>
			<div className='flex flex-col gap-14'>
				{featured && (
					<StaticCard ink='lime' offset={16} pad='none' tilt={-0.8}>
						<div className='flex flex-col md:flex-row'>
							<div className='md:flex-[3] md:shadow-divider'>
								<CoverImage
									url={featured.coverImage?.url}
									alt={featured.coverImage?.description || ""}
									radius='0'
									aspect='auto'
									className='h-full min-h-[240px] border-0 md:min-h-[360px]'
									sizes='(min-width: 768px) 700px, 100vw'
								/>
							</div>
							<div className='flex flex-col gap-4 p-6 max-md:border-t-4 max-md:border-plum md:flex-[2] md:p-8'>
								<p className='text-label uppercase'>Featured project</p>
								<Headline
									variant='card'
									level='h3'
									className='md:text-[34px] md:leading-[1.1]'
								>
									{featured.title}
								</Headline>
								<p className='text-small text-plum-muted'>
									{featured.shortBlurb}
								</p>
								<Tags tags={featured.techTags} chips />
								<Actions item={featured} textLinks={false} />
							</div>
						</div>
					</StaticCard>
				)}

				{gridItems.length > 0 && (
					<ul className='grid grid-cols-1 items-start gap-x-10 gap-y-14 md:grid-cols-3'>
						{gridItems.map((item: any, index: number) => (
							<li key={item.slug ?? index}>
								<StaticCard
									ink={dots[index % dots.length]}
									pad='none'
									tilt={index % 2 ? 0.8 : -0.8}
								>
									<div className='flex flex-col'>
										<div className='shadow-divider'>
											<CoverImage
												url={item.coverImage?.url}
												alt={item.coverImage?.description || ""}
												radius='0'
												className='border-0'
												sizes='(min-width: 768px) 360px, 100vw'
											/>
										</div>
										<div className='flex flex-col gap-3 p-5'>
											<Headline variant='card' level='h3'>
												{item.title}
											</Headline>
											<p className='text-small text-plum-muted'>
												{item.shortBlurb}
											</p>
											<Tags tags={item.techTags} chips={false} />
											<Actions item={item} textLinks />
										</div>
									</div>
								</StaticCard>
							</li>
						))}
					</ul>
				)}
			</div>
		</Layout>
	);
}
