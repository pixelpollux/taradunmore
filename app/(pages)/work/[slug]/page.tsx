import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Button from "../../../ui/Button";

import CoverImage from "../../../blocks/cover-image";
import ContentfulImage from "@/lib/contentful-image";

import { getAllWorkItems, getWorkItemBySlug } from "@/lib/api";

function getRichTextOptions(links: any) {
	const assetMap = new Map<string, { url: string; description?: string }>(
		(links?.assets?.block ?? []).map((asset: any) => [asset.sys.id, asset]),
	);
	const entryHyperlinkMap = new Map<string, { url?: string; title?: string }>(
		(links?.entries?.hyperlink ?? []).map((entry: any) => [
			entry.sys.id,
			entry,
		]),
	);

	return {
		renderNode: {
			[BLOCKS.UL_LIST]: (node: any, children: any) => (
				<ul className='list-disc pl-5 mt-2 space-y-1'>{children}</ul>
			),
			[BLOCKS.OL_LIST]: (node: any, children: any) => (
				<ol className='list-decimal pl-5 mt-2 space-y-1'>{children}</ol>
			),
			[BLOCKS.LIST_ITEM]: (node: any, children: any) => (
				<li className='marker:text-[var(--accent)]'>{children}</li>
			),
			// TODO: paragraph and list item spacing is off, need to fix
			[BLOCKS.PARAGRAPH]: (node: any, children: any) => (
				<p className='mb-2 mt-4 last:mb-0'>{children}</p>
			),
			[INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
				const targetId = node?.data?.target?.sys?.id;
				const linkedEntry = targetId
					? entryHyperlinkMap.get(targetId)
					: undefined;
				const href =
					linkedEntry?.url ?? node?.data?.target?.fields?.url;
				const fallbackText =
					linkedEntry?.title ??
					node?.data?.target?.fields?.title ??
					"link";

				if (!href) {
					return (
						<a
							className='underline decoration-[2px] underline-offset-2 font-semibold tracking-wide cursor-pointer hover:text-[var(--accent)] hover:cursor-pointer'
							href=''
						>
							{children?.length ? children : fallbackText}
						</a>
					);
				}

				return (
					<a
						href={href}
						target='_blank'
						rel='noopener noreferrer'
						className='underline hover:opacity-80'
					>
						{children?.length ? children : fallbackText}
					</a>
				);
			},
			[BLOCKS.HEADING_2]: (node: any, children: any) => (
				<h2 className='mt-12 mb-4 last:mb-0 font-bold text-4xl'>
					{children}
				</h2>
			),
			[BLOCKS.EMBEDDED_ASSET]: (node: any) => {
				const asset = assetMap.get(node.data.target.sys.id);
				if (!asset?.url) return null;
				return (
					<ContentfulImage
						src={asset.url}
						alt={asset.description || ""}
						width={640}
						height={400}
						className='rounded-t-3xl border-b-2 border-b-[var(--text)]'
					/>
				);
			},
		},
	};
}

export async function generateStaticParams() {
	const allWorkItems: Array<{ slug: string }> = await getAllWorkItems(false);

	return allWorkItems.map((workItem) => ({
		slug: workItem.slug,
	}));
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

	return (
		<div className='container mx-auto px-5'>
			<article>
				<h1 className='mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl'>
					{workItem.title}
				</h1>
				{workItem.coverImage?.url && (
					<div className='mb-8 sm:mx-0 md:mb-16'>
						<CoverImage
							title={workItem.title}
							url={workItem.coverImage.url}
							priority
						/>
					</div>
				)}
				<div className='work-item__description mx-auto max-w-7xl'>
					{workItem.fullDescription?.json && (
						<div className='mb-8 text-lg'>
							{documentToReactComponents(
								workItem.fullDescription.json,
								getRichTextOptions(
									workItem.fullDescription.links,
								),
							)}
						</div>
					)}
					{workItem.techTags?.length > 0 && (
						<div className='mb-8 flex flex-wrap gap-2'>
							<div className='flex flex-wrap gap-2 mt-auto'>
								{workItem.techTags.map((tag: string) => (
									<Button
										key={tag}
										text={tag}
										className='tag'
										buttonVariant='disabledPill'
										buttonSize='xs'
									/>
								))}
							</div>
						</div>
					)}
					<div className='flex flex-wrap gap-3'>
						{workItem.liveSiteUrl && (
							<a
								href={workItem.liveSiteUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='tag hover:opacity-80'
							>
								Visit Site
							</a>
						)}
						{workItem.codeRepoUrl && (
							<a
								href={workItem.codeRepoUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='tag hover:opacity-80'
							>
								View Code
							</a>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}
