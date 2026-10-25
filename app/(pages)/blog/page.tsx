import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";
import Shapes from "@/app/ui/Shapes";
import type { Ink } from "@/app/ui/DotShadow";
import { LatestPost, PostRow } from "@/app/blocks/PostCards";
import { getAllPosts } from "@/lib/api";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Notes from Tara Dunmore on design systems, front-end craft and a career that took the long way around.",
	alternates: { canonical: "/blog" },
};

const rowInks: Ink[] = ["orchid", "amber", "lime"];

export default async function BlogPage() {
	const { isEnabled } = await draftMode();
	const posts = await getAllPosts(isEnabled);
	const [latest, ...earlier] = posts;

	return (
		<>
			<header className='mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 pt-10'>
				<div>
					<Headline variant='page' level='h1'>
						Blog
					</Headline>
					<p className='mt-4 max-w-[36rem] text-lead'>
						Notes on design systems, front-end craft, and what I&apos;m
						learning along the way.
					</p>
				</div>
				<Shapes variant='pair' />
			</header>

			{latest ? (
				<>
					<section
						aria-labelledby='latest-title'
						className='mx-auto mt-14 max-w-page px-5'
					>
						<h2 id='latest-title' className='mb-6 text-label uppercase'>
							Latest
						</h2>
						<LatestPost post={latest} />
					</section>

					{earlier.length > 0 && (
						<section
							aria-labelledby='earlier-title'
							className='mx-auto mt-template max-w-page px-5'
						>
							<h2 id='earlier-title' className='mb-6 text-label uppercase'>
								Earlier posts
							</h2>
							<ol className='flex flex-col gap-7'>
								{earlier.map((post: any, index: number) => (
									<li key={post.slug}>
										<PostRow
											post={post}
											accent={rowInks[index % rowInks.length]}
										/>
									</li>
								))}
							</ol>
						</section>
					)}
				</>
			) : (
				<div className='mx-auto mt-14 max-w-page px-5'>
					<div className='rounded-card border border-dashed border-plum bg-surface p-10 text-center md:p-14'>
						<Headline variant='feature' level='h2'>
							The first post is still on the press.
						</Headline>
						<p className='mx-auto mt-4 max-w-md text-lead'>
							Check back soon. In the meantime, here&apos;s what I&apos;ve
							been building.
						</p>
						<div className='mt-8'>
							<Button href='/work'>See my work</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
