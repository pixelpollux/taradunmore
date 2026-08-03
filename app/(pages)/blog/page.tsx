import Link from "next/link";
// import HeroPost from "@/components/hero-post";

import { draftMode } from "next/headers";

import { getAllPosts } from "@/lib/api";
import CoverImage from "../../blocks/cover-image";
import MoreStories from "../../blocks/more-stories";
import Avatar from "../../blocks/avatar";
import Card from "@/app/ui/Card";

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
	return (
		<section>
			{" "}
			<Card
				cardVariant='tight'
				className='flex flex-col md:flex-row gap-6 md:items-center'
				isClickable={true}
			>
				{" "}
				<Link href={`/blog/${slug}`} className='hover:underline'>
					<div className=''>
						<CoverImage
							title={title}
							slug={slug}
							url={coverImage?.url}
						/>
					</div>
					<div className='md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8  p-6 md:p-10'>
						<div>
							<h3 className='mb-4 text-4xl lg:text-6xl leading-tight'>
								{" "}
								{title}
							</h3>
							<div className='mb-4 md:mb-0 text-lg'>
								<time dateTime={date}>
									{new Date(date).toLocaleDateString()}
								</time>
							</div>
						</div>

						<div>
							<p className='text-lg leading-relaxed mb-4'>
								{excerpt}
							</p>
							{author && (
								<Avatar
									name={author.name}
									picture={author.picture}
								/>
							)}
						</div>
					</div>{" "}
				</Link>
			</Card>
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
								<div className='absolute -inset-3 -rotate-3 rounded-[2rem] border-2 border-[var(--text)] z-[5]'></div>
								<div className='absolute -inset-3 rotate-2 rounded-[2rem] border-2 border-[var(--accent-secondary)] z-0'></div>
							</div>
						</div>
					</div>
				</div> */}
				{/* <MoreStories morePosts={morePosts} /> */}
			</div>
		</>
	);
}
