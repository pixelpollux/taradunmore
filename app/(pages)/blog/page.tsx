// import HeroPost from "@/components/hero-post";

import { draftMode } from "next/headers";

import { getAllPosts } from "@/lib/api";
import CoverImage from "@/app/ui/CoverImage";
import MoreStories from "../../blocks/MoreStories";
import Avatar from "@/app/ui/Avatar";
import { LinkCard } from "@/app/ui/Card";
import Headline from "@/app/ui/Headline";
import DateDisplay from "@/app/ui/DateDisplay";

// import MoreStories from "@/components/blog/MoreStories";
function HeroPost({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}: {
	title: string;
	coverImage: any;
	date: string;
	excerpt: string;
	author: any;
	slug: string;
}) {
	// Transitional: the v2 blog index (latest card, earlier-posts list, empty state) lands in Phase 5.
	return (
		<section>
			<LinkCard
				href={`/blog/${slug}`}
				accent='lime'
				className='flex flex-col md:flex-row'
			>
				<div className='md:flex-[3]'>
					<CoverImage
						url={coverImage?.url}
						radius='0'
						className='h-full border-0'
						priority
					/>
				</div>
				<div className='flex flex-col gap-3 p-6 md:flex-[2] md:p-8'>
					<DateDisplay dateString={date} className='text-label uppercase' />
					<Headline variant='card' level='h2'>
						{title}
					</Headline>
					<p className='text-lead'>{excerpt}</p>
					{author && (
						<Avatar name={author.name} picture={author.picture} />
					)}
				</div>
			</LinkCard>
		</section>
	);
}
export default async function Page() {
	const { isEnabled } = await draftMode();
	const allPosts = await getAllPosts(isEnabled);

	const heroPost = allPosts[0];
	// const everyPost = allPosts;
	const morePosts = allPosts.slice(1);

	return (
		<>
			<div className='container mx-auto px-5'>
				{/* hero post */}
				{/* {heroPost && (
					<HeroPost
						title={heroPost.title}
						coverImage={heroPost.coverImage}
						date={heroPost.date}
						author={heroPost.author}
						slug={heroPost.slug}
						excerpt={heroPost.excerpt}
					/>
				)} */}
				{/* <h2>all posts but hero</h2> */}
				{/* {morePosts && (
					<HeroPost
						title={morePosts[0].title}
						coverImage={morePosts[0].coverImage}
						date={morePosts[0].date}
						author={morePosts[0].author}
						slug={morePosts[0].slug}
						excerpt={morePosts[0].excerpt}
					/>
				)} */}
				<HeroPost
					title={allPosts[0].title}
					coverImage={allPosts[0].coverImage}
					date={allPosts[0].date}
					author={allPosts[0].author}
					slug={allPosts[0].slug}
					excerpt={allPosts[0].excerpt}
				/>
				<h2>all posts</h2>
				<MoreStories morePosts={allPosts.slice(1)} />
				{/* <MoreStories morePosts={allPosts} /> */}

				{/* <div className='container mx-auto flex flex-col lg:flex-row  items-center gap-4 lg:gap-[5rem] mb-12 lg:mb-24  '>
					<div>
						<div>
							<div className='relative'>
								<div className='absolute -inset-3 -rotate-3 rounded-[2rem] border-2 border-plum z-[5]'></div>
								<div className='absolute -inset-3 rotate-2 rounded-[2rem] border-2 border-lime z-0'></div>
							</div>
						</div>
					</div>
				</div> */}
				{/* <MoreStories morePosts={morePosts} /> */}
			</div>
		</>
	);
}
