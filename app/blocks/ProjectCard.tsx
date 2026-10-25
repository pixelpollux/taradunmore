import { StaticCard } from "@/app/ui/Card";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";
import Tag, { toneAt } from "@/app/ui/Tag";
import CoverImage from "@/app/ui/CoverImage";
import type { Ink } from "@/app/ui/DotShadow";

/** Tint chips (featured card, case study) or a plain "tag · tag · tag" line (grid cards). */
export function ProjectTags({
	tags,
	chips,
}: {
	tags?: string[];
	chips: boolean;
}) {
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

/** Case study (primary), then Live site and Code only when the URLs exist. */
export function ProjectActions({
	item,
	textLinks,
}: {
	item: any;
	textLinks: boolean;
}) {
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

/**
 * Project card: cover (16:10, natural photo), title, blurb, tags line,
 * actions. A static container, so dots on the card and solid shadows on the
 * buttons inside.
 */
export default function ProjectCard({
	item,
	ink,
	tilt = 0,
	titleLevel = "h3",
}: {
	item: any;
	ink: Ink;
	tilt?: number;
	/** h3 under a section heading (homepage), h2 on the Work index. */
	titleLevel?: "h2" | "h3";
}) {
	return (
		<StaticCard ink={ink} pad='none' tilt={tilt}>
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
					<Headline variant='card' level={titleLevel}>
						{item.title}
					</Headline>
					<p className='text-small text-plum-muted'>{item.shortBlurb}</p>
					<ProjectTags tags={item.techTags} chips={false} />
					<ProjectActions item={item} textLinks />
				</div>
			</div>
		</StaticCard>
	);
}
