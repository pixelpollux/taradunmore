import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Avatar from "@/app/ui/Avatar";
import BackLink from "@/app/ui/BackLink";
import Button from "@/app/ui/Button";
import CoverImage from "@/app/ui/CoverImage";
import Headline from "@/app/ui/Headline";
import MetaLine from "@/app/ui/MetaLine";
import type { Ink } from "@/app/ui/DotShadow";
import { BYLINE_SUBTITLE, PostCard } from "@/app/blocks/PostCards";
import { renderRichText } from "@/lib/richText";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
	const allPosts = await getAllPosts(false);
	return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	// Same draft-mode flag as the page, so previews get their own title and
	// unpublished posts get metadata instead of the site default.
	const { isEnabled } = await draftMode();
	const { post } = await getPostAndMorePosts(slug, isEnabled);
	if (!post) return {};
	const image = post.coverImage?.url
		? [{ url: `${post.coverImage.url}?w=1200` }]
		: undefined;
	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			type: "article",
			siteName: "TaraDunmore.com",
			title: post.title,
			description: post.excerpt,
			url: `/blog/${slug}`,
			publishedTime: post.date,
			images: image,
		},
		alternates: { canonical: `/blog/${slug}` },
	};
}

const cardInks: Ink[] = ["orchid", "amber"];

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { isEnabled } = await draftMode();
	const { post, morePosts } = await getPostAndMorePosts(slug, isEnabled);

	if (!post) {
		notFound();
	}

	return (
		<article>
			<header className='mx-auto max-w-[1000px] px-5 pb-14 pt-10'>
				<BackLink href='/blog'>All posts</BackLink>
				<MetaLine
					date={post.date}
					minutes={post.readingMinutes}
					className='mt-8'
				/>
				<Headline variant='pageDetail' level='h1' className='mt-4'>
					{post.title}
				</Headline>
				{post.excerpt && (
					<p className='mt-6 max-w-[44rem] text-lead'>{post.excerpt}</p>
				)}
				{post.author && (
					<div className='mt-8'>
						<Avatar
							name={post.author.name}
							picture={post.author.picture}
							subtitle={BYLINE_SUBTITLE}
						/>
					</div>
				)}
			</header>

			{post.coverImage?.url && (
				<div className='mx-auto max-w-[1000px] px-5'>
					<CoverImage
						url={post.coverImage.url}
						aspect='16 / 9'
						radius='32px'
						ink='amber'
						offset={16}
						tilt={0.6}
						priority
						sizes='(min-width: 1000px) 960px, 100vw'
					/>
				</div>
			)}

			<div className='mx-auto mt-template max-w-measure px-5'>
				{renderRichText(post.content, { variant: "prose", dropCap: true })}
			</div>

			{morePosts.length > 0 && (
				<section
					aria-labelledby='more-posts-title'
					className='mx-auto mt-template max-w-page px-5'
				>
					<div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
						<Headline
							id='more-posts-title'
							variant='section'
							level='h2'
							className='md:text-[48px] md:leading-[1.05]'
						>
							More posts
						</Headline>
						<Button variant='secondary' href='/blog'>
							All posts
						</Button>
					</div>
					<ul className='grid grid-cols-1 gap-10 md:grid-cols-2'>
						{morePosts.map((more: any, index: number) => (
							<li key={more.slug}>
								<PostCard
									post={more}
									accent={cardInks[index % cardInks.length]}
								/>
							</li>
						))}
					</ul>
				</section>
			)}
		</article>
	);
}
