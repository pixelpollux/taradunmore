import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Button from "@/app/ui/Button";
import Tag, { toneAt } from "@/app/ui/Tag";
import CoverImage from "@/app/ui/CoverImage";
import { getWorkItemList, getWorkItemBySlug } from "@/lib/api";
import { renderRichText } from "@/lib/richText";

export async function generateStaticParams() {
	const workItems: Array<{ slug: string }> = await getWorkItemList(false);

	return workItems.map((workItem) => ({
		slug: workItem.slug,
	}));
}

// Transitional markup: the v2 case study template (header, rail, previous/next,
// CTA banner) lands in Phase 5. The body already runs on the shared renderer.
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

	return (
		<div className='mx-auto max-w-page px-5'>
			<article>
				<h1 className='mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl'>
					{workItem.title}
				</h1>
				{workItem.coverImage?.url && (
					<div className='mb-8 sm:mx-0 md:mb-16'>
						<CoverImage
							url={workItem.coverImage.url}
							alt={workItem.coverImage.description || ""}
							priority
						/>
					</div>
				)}
				<div className='mx-auto max-w-measure'>
					{renderRichText(workItem.fullDescription, { variant: "prose" })}
					{workItem.techTags?.length > 0 && (
						<ul className='my-8 flex flex-wrap gap-2'>
							{workItem.techTags.map((tag: string, index: number) => (
								<li key={tag}>
									<Tag tone={toneAt(index)}>{tag}</Tag>
								</li>
							))}
						</ul>
					)}
					<div className='flex flex-wrap gap-4'>
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
				</div>
			</article>
		</div>
	);
}
