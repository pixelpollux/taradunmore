import { ArrowRight } from "lucide-react";
import { LinkCard } from "@/app/ui/Card";
import Avatar from "@/app/ui/Avatar";
import CoverImage from "@/app/ui/CoverImage";
import DateDisplay from "@/app/ui/DateDisplay";
import Headline from "@/app/ui/Headline";
import MetaLine from "@/app/ui/MetaLine";
import type { Ink } from "@/app/ui/DotShadow";

export const BYLINE_SUBTITLE = "Front end developer";

/** The newest post, wide: cover left, text right (stacks on mobile). */
export function LatestPost({ post }: { post: any }) {
	return (
		<LinkCard href={`/blog/${post.slug}`} accent='lime'>
			<div className='flex flex-col md:flex-row'>
				<div className='md:flex-[3] md:shadow-divider'>
					<CoverImage
						url={post.coverImage?.url}
						radius='0'
						aspect='auto'
						className='h-full min-h-[240px] border-0 md:min-h-[320px]'
						sizes='(min-width: 768px) 700px, 100vw'
						priority
					/>
				</div>
				<div className='flex flex-col gap-4 p-6 max-md:border-t-4 max-md:border-plum md:flex-[2] md:p-8'>
					<MetaLine date={post.date} minutes={post.readingMinutes} />
					<Headline variant='feature' level='h3'>
						{post.title}
					</Headline>
					<p className='text-lead'>{post.excerpt}</p>
					{post.author && (
						<div className='mt-auto pt-2'>
							<Avatar
								name={post.author.name}
								picture={post.author.picture}
								subtitle={BYLINE_SUBTITLE}
							/>
						</div>
					)}
				</div>
			</div>
		</LinkCard>
	);
}

/** One of the "More posts" cards: cover, date and read time, title, excerpt. */
export function PostCard({ post, accent }: { post: any; accent: Ink }) {
	return (
		<LinkCard href={`/blog/${post.slug}`} accent={accent} className='h-full'>
			<div className='flex h-full flex-col'>
				<div className='shadow-divider'>
					<CoverImage
						url={post.coverImage?.url}
						radius='0'
						className='border-0'
						sizes='(min-width: 768px) 480px, 100vw'
					/>
				</div>
				<div className='flex flex-1 flex-col gap-3 p-5'>
					<MetaLine date={post.date} minutes={post.readingMinutes} />
					<Headline variant='card' level='h3'>
						{post.title}
					</Headline>
					<p className='text-small text-plum-muted'>{post.excerpt}</p>
				</div>
			</div>
		</LinkCard>
	);
}

/** A row in "Earlier posts": date | title and excerpt | read time | arrow. */
export function PostRow({ post, accent }: { post: any; accent: Ink }) {
	return (
		<LinkCard href={`/blog/${post.slug}`} accent={accent}>
			<div className='flex flex-col gap-3 p-5 md:grid md:grid-cols-[130px_1fr_auto_44px] md:items-center md:gap-6 md:px-6'>
				<p className='text-label uppercase'>
					<DateDisplay dateString={post.date} />
				</p>
				<div>
					<Headline variant='card' level='h3'>
						{post.title}
					</Headline>
					<p className='mt-1 text-small text-plum-muted'>{post.excerpt}</p>
				</div>
				<p className='text-small font-bold'>
					{post.readingMinutes} min read
				</p>
				<span
					aria-hidden='true'
					className='flex size-11 items-center justify-center rounded-full border-chip border-plum bg-lime-100 max-md:hidden'
				>
					<ArrowRight className='size-5' strokeWidth={3} />
				</span>
			</div>
		</LinkCard>
	);
}
