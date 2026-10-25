import Layout from "./Layout";
import { getWorkItemList } from "@/lib/api";
import { StaticCard } from "@/app/ui/Card";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";
import CoverImage from "@/app/ui/CoverImage";
import type { Ink } from "@/app/ui/DotShadow";
import ProjectCard, {
	ProjectActions,
	ProjectTags,
} from "@/app/blocks/ProjectCard";

const dots: Ink[] = ["orchid", "amber", "lime"];

export default async function WorkSection() {
	const workItems = await getWorkItemList();
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
								<Headline variant='feature' level='h3'>
									{featured.title}
								</Headline>
								<p className='text-small text-plum-muted'>
									{featured.shortBlurb}
								</p>
								<ProjectTags tags={featured.techTags} chips />
								<ProjectActions item={featured} textLinks={false} />
							</div>
						</div>
					</StaticCard>
				)}

				{gridItems.length > 0 && (
					<ul className='grid grid-cols-1 items-start gap-x-10 gap-y-14 md:grid-cols-3'>
						{gridItems.map((item: any, index: number) => (
							<li key={item.slug ?? index}>
								<ProjectCard
									item={item}
									ink={dots[index % dots.length]}
									tilt={index % 2 ? 0.8 : -0.8}
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</Layout>
	);
}
