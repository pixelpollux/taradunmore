import { Cherry_Bomb_One } from "next/font/google";

import HeaderNav from "@/app/blocks/HeaderNav";
import AboutSection from "@/app/blocks/homepageSections/AboutSection";
import ContactSection from "@/app/blocks/homepageSections/ContactSection";
import ResumeSection from "@/app/blocks/homepageSections/ResumeSection/ResumeSection";
import SkillsSection from "@/app/blocks/homepageSections/SkillsSection";
import WorkSection from "@/app/blocks/homepageSections/WorkSection";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";
import Headshot from "../_components/Headshot";
import { ChipList } from "../_components/Chip";

const cherry = Cherry_Bomb_One({
	variable: "--font-cherry",
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

/**
 * Draft A: Sticker Sheet, tightened.
 * Same personality as today, with the rough edges fixed:
 *  - one h1 instead of a display word competing with a headline
 *  - "hi!" becomes a sticker on the headshot (the one display word)
 *  - CTAs visible on every screen size
 *  - a stack row so the role is clear without reading
 *  - work moves above about, so proof comes before backstory
 */
export default function DraftA() {
	return (
		<>
			<HeaderNav />
			<section className='container--outer py-8 lg:py-16'>
				<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
					<div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
						<div className='flex flex-col gap-6 text-center lg:text-left lg:w-3/5'>
							<h1 className='text-5xl lg:text-[5.5rem] leading-none font-bold'>
								I&apos;m{" "}
								<span className='headline--highlighter'>
									Tara
								</span>
								!
							</h1>
							<p className='text-2xl leading-8 font-bold'>
								front-end developer with design roots and
								developer instincts.
							</p>
							<p className='text-lg max-w-xl mx-auto lg:mx-0'>
								Self-taught, self-driven and systems-minded, I
								build the bridge between design and code:
								accessible interfaces, design systems and the
								small details that make a site feel
								hand-placed.
							</p>
							<div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
								<Button text='see my work' href='/#work-section' />
								<Button
									buttonVariant='secondary'
									text='get in touch'
									href='/#contact-section'
								/>
							</div>
							<div className='flex justify-center lg:justify-start'>
								<ChipList
									label='Core stack'
									items={[
										"React",
										"Next.js",
										"TypeScript",
										"Accessibility",
										"Design systems",
									]}
								/>
							</div>
						</div>
						<div className='relative w-full max-w-[22rem] lg:w-2/5 px-4 lg:px-0'>
							<Headshot />
							<Headline
								text='hi!'
								headlineVariant='display'
								headlineLevel='decorative'
								className={`absolute -left-2 -top-10 lg:-left-10 z-10 -rotate-[4deg] leading-[.85] font-cherry ${cherry.variable} [&_.headline--display]:!text-[6.5rem]`}
							/>
						</div>
					</div>
				</div>
			</section>
			<WorkSection />
			<AboutSection />
			<SkillsSection />
			<ResumeSection />
			<ContactSection />
		</>
	);
}
