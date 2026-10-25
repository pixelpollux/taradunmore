import type { ReactNode } from "react";
import {
	documentToReactComponents,
	type RenderNode,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import ContentfulImage from "@/lib/contentful-image";
import DotShadow from "@/app/ui/DotShadow";
import { makeSlugger } from "@/lib/slugify";

type RichContent = { json: any; links?: any } | null | undefined;

type Options = {
	/** `prose` for case studies and posts, `compact` for About and resume rows. */
	variant?: "prose" | "compact";
	/** Render the first paragraph at lead size (About). */
	leadFirst?: boolean;
	/** Open the first paragraph with a Shrikhand drop cap (blog posts). */
	dropCap?: boolean;
};

const LINK =
	"font-bold text-link underline decoration-2 underline-offset-4 hover:decoration-4";

function nodeText(node: any): string {
	if (!node) return "";
	if (node.nodeType === "text") return node.value ?? "";
	return (node.content ?? []).map(nodeText).join("");
}

/**
 * The one shared Contentful rich-text renderer (DESIGN.md "Rich text").
 * Every node style lives here so About, resume rows, case studies and posts
 * stay consistent.
 */
export function renderRichText(
	content: RichContent,
	{ variant = "compact", leadFirst = false, dropCap = false }: Options = {},
): ReactNode {
	if (!content?.json) return null;

	const links = content.links;
	const assets = new Map<string, any>(
		(links?.assets?.block ?? []).map((asset: any) => [asset.sys.id, asset]),
	);
	const entries = new Map<string, any>(
		(links?.entries?.hyperlink ?? []).map((entry: any) => [
			entry.sys.id,
			entry,
		]),
	);
	const slug = makeSlugger();
	let paragraphIndex = 0;

	const paragraph =
		variant === "prose"
			? "mb-[1.1em] text-prose max-md:text-[18px]"
			: "mb-[1em] text-body";

	const renderNode: RenderNode = {
			[BLOCKS.PARAGRAPH]: (_node, children) => {
				const index = paragraphIndex++;
				const isLead = leadFirst && index === 0;
				const isDropCap = dropCap && index === 0;
				return (
					<p
						className={[
							isLead ? "mb-6 text-lead" : paragraph,
							"last:mb-0",
							isDropCap
								? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2em] first-letter:leading-[0.8] first-letter:ghost"
								: "",
						].join(" ")}
					>
						{children}
					</p>
				);
			},
			[BLOCKS.HEADING_2]: (node, children) => (
				<h2
					id={slug(nodeText(node))}
					className='ghost mb-4 mt-12 scroll-mt-[120px] font-display text-[32px] font-normal leading-[1.1] md:text-[40px]'
				>
					{children}
				</h2>
			),
			[BLOCKS.HEADING_3]: (_node, children) => (
				<h3 className='mb-3 mt-8 text-[24px] font-bold leading-[1.3]'>
					{children}
				</h3>
			),
			[BLOCKS.UL_LIST]: (_node, children) => (
				<ul className="my-4 space-y-2 [&>li]:relative [&>li]:pl-[30px] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.55em] [&>li]:before:size-3 [&>li]:before:rounded-full [&>li]:before:border-2 [&>li]:before:border-plum [&>li]:before:bg-lime [&>li]:before:content-[''] [&_p]:mb-0">
					{children}
				</ul>
			),
			[BLOCKS.OL_LIST]: (_node, children) => (
				<ol className='my-4 list-decimal space-y-2 pl-8 marker:font-bold marker:text-orchid-800 [&_p]:mb-0'>
					{children}
				</ol>
			),
			[BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
			[BLOCKS.QUOTE]: (_node, children) => (
				<blockquote className='my-8 rounded-figure border border-plum bg-orchid-100 px-6 py-5 text-[22px] font-medium leading-[1.4] [&_p]:mb-0 [&_p]:text-[22px]'>
					{children}
				</blockquote>
			),
			[BLOCKS.HR]: () => (
				<hr
					aria-hidden='true'
					className='my-10 h-[14px] border-0 bg-dot-orchid bg-dot bg-repeat-x'
				/>
			),
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const asset = assets.get(node.data.target.sys.id);
				if (!asset?.url) return null;
				return (
					<figure className='my-10'>
						<DotShadow ink='amber' offset={12} radius='24px'>
							<div className='overflow-hidden rounded-figure border border-plum bg-surface'>
								<ContentfulImage
									src={asset.url}
									alt={asset.description || ""}
									width={1200}
									height={800}
									className='h-auto w-full'
								/>
							</div>
						</DotShadow>
						{asset.description && (
							<figcaption className='mt-5 text-small text-plum-muted'>
								{asset.description}
							</figcaption>
						)}
					</figure>
				);
			},
			[BLOCKS.TABLE]: (_node, children) => (
				<div className='my-8 overflow-x-auto rounded-[20px] border border-plum'>
					<table className='w-full border-collapse text-left'>
						<tbody>{children}</tbody>
					</table>
				</div>
			),
			[BLOCKS.TABLE_ROW]: (_node, children) => (
				<tr className='border-b border-rule last:border-b-0'>{children}</tr>
			),
			// An empty header cell (a corner cell, say) is not a valid <th>: keep the
			// lime fill but make it a plain cell.
			[BLOCKS.TABLE_HEADER_CELL]: (node, children) =>
				nodeText(node).trim() ? (
					<th className='bg-lime-100 px-4 py-3 text-left font-bold [&_p]:mb-0'>
						{children}
					</th>
				) : (
					<td className='bg-lime-100 px-4 py-3' />
				),
			[BLOCKS.TABLE_CELL]: (_node, children) => (
				<td className='px-4 py-3 align-top [&_p]:mb-0'>{children}</td>
			),
			[INLINES.HYPERLINK]: (node, children) => {
				const href: string = node.data.uri;
				const external = /^https?:\/\//i.test(href);
				return (
					<a
						href={href}
						className={LINK}
						{...(external && {
							target: "_blank",
							rel: "noopener noreferrer",
						})}
					>
						{children}
						{external && <span className='sr-only'> (opens in new tab)</span>}
					</a>
				);
			},
			[INLINES.ENTRY_HYPERLINK]: (node, children) => {
				const target = entries.get(node?.data?.target?.sys?.id);
				const href = target?.url ?? node?.data?.target?.fields?.url;
				if (!href) return <>{children}</>;
				const external = /^https?:\/\//i.test(href);
				return (
					<a
						href={href}
						className={LINK}
						{...(external && {
							target: "_blank",
							rel: "noopener noreferrer",
						})}
					>
						{children}
						{external && <span className='sr-only'> (opens in new tab)</span>}
					</a>
				);
			},
			// BLOCKS.BREAK_LINE is in the types but not defined at runtime in this
			// version, so match the literal node type.
			"break-line": () => <br />,
	};

	return documentToReactComponents(content.json, {
		renderNode,
		renderMark: {
			[MARKS.BOLD]: (text) => <strong className='font-bold'>{text}</strong>,
			[MARKS.ITALIC]: (text) => <em className='italic'>{text}</em>,
			[MARKS.CODE]: (text) => (
				<code className='whitespace-nowrap rounded-lg border-2 border-plum bg-lime-100 px-[0.35em] py-[0.05em] text-[0.86em]'>
					{text}
				</code>
			),
		},
	});
}

/**
 * The h2 headings of a document, in order, with the same ids `renderRichText`
 * gives them (same slugger, same walk order). Feeds the case study's
 * "On this page" rail.
 */
export function getHeadings(
	content: RichContent,
): Array<{ id: string; text: string }> {
	if (!content?.json) return [];
	const slug = makeSlugger();
	const headings: Array<{ id: string; text: string }> = [];

	const walk = (node: any) => {
		if (node?.nodeType === BLOCKS.HEADING_2) {
			const text = nodeText(node).trim();
			headings.push({ id: slug(nodeText(node)), text });
			return;
		}
		(node?.content ?? []).forEach(walk);
	};
	walk(content.json);
	return headings;
}
