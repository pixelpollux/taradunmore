import { Star } from "lucide-react";
import { getContentBlock } from "@/lib/api";
import { renderRichText } from "@/lib/richText";
import DotShadow from "@/app/ui/DotShadow";
import Headline from "@/app/ui/Headline";
import Layout from "./Layout";

export default async function AboutSection() {
	const about = await getContentBlock("About");

	return (
		<Layout id='about' labelledBy='about-title'>
			<div className='flex flex-wrap items-start gap-x-12 gap-y-14'>
				<DotShadow
					ink='amber'
					offset={14}
					radius='var(--radius-panel)'
					tilt={-1}
					className='flex-[1_1_300px] md:max-w-[420px]'
				>
					<div className='relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-panel border border-plum bg-grad-orchid-lime p-7 md:p-8'>
						<div
							aria-hidden='true'
							className='multiply absolute -right-8 -top-8 size-32 rounded-full bg-amber'
						/>
						<Star
							aria-hidden='true'
							className='absolute left-7 top-7 size-8 md:left-8 md:top-8'
							strokeWidth={3}
						/>
						<Headline id='about-title' variant='section' level='h2'>
							About me
						</Headline>
					</div>
				</DotShadow>

				<DotShadow
					ink='lime'
					offset={14}
					radius='var(--radius-panel)'
					tilt={0.6}
					className='flex-[2_1_380px]'
				>
					<div className='rounded-panel border border-plum bg-surface p-7 md:p-10'>
						{renderRichText(about?.content, {
							variant: "compact",
							leadFirst: true,
						})}
					</div>
				</DotShadow>
			</div>
		</Layout>
	);
}
