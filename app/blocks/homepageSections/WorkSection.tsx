import Layout from "./Layout";
import { getAllWorkItems as getWorkItems } from "@/lib/api";
import { StaticCard } from "@/app/ui/Card";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";
import Tag, { toneAt } from "@/app/ui/Tag";
import CoverImage from "@/app/ui/CoverImage";

// Transitional: moved onto the v2 components in Phase 2. The final project
// card, featured card and "All work" button land in Phase 3.
function Actions({ item }: { item: any }) {
	return (
		<div className='mt-auto flex flex-wrap items-center gap-x-4 gap-y-2'>
			<Button href={`/work/${item.slug}`}>Case study</Button>
			{item.liveSiteUrl && (
				<Button variant='text' href={item.liveSiteUrl} external>
					Live site
				</Button>
			)}
			{item.codeRepoUrl && (
				<Button variant='text' href={item.codeRepoUrl} external>
					Code
				</Button>
			)}
		</div>
	);
}

function Tags({ tags }: { tags?: string[] }) {
	if (!tags?.length) return null;
	return (
		<div className='flex flex-wrap gap-2'>
			{tags.map((tag, index) => (
				<Tag key={tag} tone={toneAt(index)}>
					{tag}
				</Tag>
			))}
		</div>
	);
}

export default async function WorkSection() {
	const workItems = await getWorkItems();
	const [featured, ...rest] = workItems;
	const gridItems = rest.slice(0, 3);

	return (
		<Layout text='work' id='work-section'>
			<div className='flex flex-col gap-10'>
				{featured && (
					<StaticCard ink='lime' offset={16} pad='none' tilt={-0.8}>
						<div className='flex flex-col md:flex-row'>
							<div className='md:flex-[3] md:shadow-divider'>
								<CoverImage
									url={featured.coverImage?.url}
									radius='0'
									className='h-full min-h-[240px] border-0 md:min-h-[360px]'
									aspect='auto'
								/>
							</div>
							<div className='flex flex-col gap-4 p-6 md:flex-[2] md:p-8'>
								<Headline variant='card' level='h3' className='md:text-[34px]'>
									{featured.title}
								</Headline>
								<p className='text-small text-plum-muted'>
									{featured.shortBlurb}
								</p>
								<Tags tags={featured.techTags} />
								<Actions item={featured} />
							</div>
						</div>
					</StaticCard>
				)}

				<div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
					{gridItems.map((item: any, index: number) => (
						<StaticCard
							key={item.slug ?? index}
							ink={toneAt(index + 1)}
							pad='none'
							tilt={index % 2 ? 0.8 : -0.8}
							className='h-full'
						>
							<div className='flex h-full flex-col'>
								<CoverImage
									url={item.coverImage?.url}
									radius='0'
									className='border-0 border-b'
								/>
								<div className='flex flex-1 flex-col gap-3 p-5'>
									<Headline variant='card' level='h3'>
										{item.title}
									</Headline>
									<p className='text-small text-plum-muted'>
										{item.shortBlurb}
									</p>
									<Tags tags={item.techTags} />
									<Actions item={item} />
								</div>
							</div>
						</StaticCard>
					))}
				</div>
			</div>
		</Layout>
	);
}
