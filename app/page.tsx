import { Cherry_Bomb_One } from "next/font/google";

import { CMS_NAME, CMS_URL } from "@/lib/constants";
import AboutSection from "./blocks/homepageSections/AboutSection";
import ContactSection from "./blocks/homepageSections/ContactSection";
import ResumeSection from "./blocks/homepageSections/ResumeSection/ResumeSection";
import HeaderNav from "@/app/blocks/HeaderNav";
import ContentfulImage from "@/lib/contentful-image";
import WorkSection from "./blocks/homepageSections/WorkSection";
import Headline from "@/app/ui/Headline";
import Button from "@/app/ui/Button";
import SkillsSection from "./blocks/homepageSections/SkillsSection";
const cherry = Cherry_Bomb_One({
	variable: "--font-cherry",
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

function Intro() {
	return (
		<section className='flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12'>
			<h2 className='text-center md:text-left text-lg mt-5 md:pl-8'>
				A statically generated blog example using{" "}
				<a
					href='https://nextjs.org/'
					className='underline hover:text-success duration-200 transition-colors'
				>
					Next.js
				</a>{" "}
				and{" "}
				<a
					href={CMS_URL}
					className='underline hover:text-success duration-200 transition-colors'
				>
					{CMS_NAME}
				</a>
				.
			</h2>
		</section>
	);
}

export default async function Page() {
	const headshot = (
		<ContentfulImage
			src='/assets/imgs/headshot-4x5.png'
			alt='Tara Dunmore'
			width={300}
			height={375}
			className='rounded-[2rem] border-2 border-[var(--text)] z-[1] relative w-full'
		/>
	);

	return (
		<>
			<HeaderNav />
			<div className=' mx-auto flex '>
				<div className='flex flex-col w-full items-center gap-1 lg:gap-[2rem]'>
					<div className='flex flex-col w-full gap-1 lg:gap-[2rem] mb-12 lg:mb-12'>
						<section className='container--outer py-4 lg:py-6'>
							<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
								<div className='flex flex-col lg:flex-row gap-5 lg:gap-[5rem] items-center lg:pr-[10rem]'>
									<div className='flex lg:w-[70%] flex-col lg:flex-row gap-4 lg:gap-[5rem] items-center mb-4 lg:mb-12  '>
										<div
											id='hero__intro'
											className='flex flex-col text-center lg:text-left gap-2 lg:gap-[1rem] lg:w-[75%]'
										>
											<Headline
												headlineVariant='display'
												headlineLevel='h1'
												className={`text-center leading-[.85] mb-8 lg:mb-0 lg:-mt-[6rem] lg:leading-1 lg:text-left text-[12rem] lg:text-6xl lg:text-[14rem] -rotate-[4deg] font-cherry ${cherry.variable}`}
												text='hi!'
											/>
											<div className='text-center lg:text-left font-bold'>
												<h2 className='headline'>
													I'm{" "}
													<span className='headline--highlighter'>
														Tara
													</span>
													!
												</h2>
											</div>{" "}
											<div>
												<span className='font-[500] lg:text-[1.2rem]'>
													I've got design roots,
													developer instincts.
													Self-taught, self-driven,
													systems-minded, building the{" "}
													<span className='text-[var(--accent)]'>
														bridge between design
														and code.
													</span>
												</span>
											</div>
											<div
												id='hero__buttons'
												className='hidden lg:flex gap-4 lg:gap-[1rem] flex-col lg:flex-row justify-center lg:justify-start items-center'
											>
												<Button
													text='see my work'
													href='/#work-section'
												></Button>
												<Button
													buttonVariant='secondary'
													text='get in touch'
													href='/#contact-section'
												></Button>
											</div>
										</div>
									</div>
									<div className='flex lg:w-[40%] flex-col lg:flex-col gap-4 lg:gap-[5rem] items-center mb-12 lg:mb-12  '>
										<div
											id='headshot__container'
											className='relative w-full px-4 lg:px-0 rotate-[5deg]'
										>
											<div
												id='headshot__outline--pink'
												className='absolute -inset-3 -rotate-3 rounded-[2rem] border-2 border-[var(--accent)] z-[5] mx-4 lg:mx-0'
											></div>
											{headshot}
											<div
												id='headshot__outline--lime'
												className='absolute -inset-3 rotate-2 rounded-[2rem] border-2 border-[var(--accent-secondary)] z-0 mx-4 lg:mx-0'
											></div>
										</div>
									</div>
								</div>
							</div>
						</section>
						<AboutSection />
						<SkillsSection />
						<ResumeSection />
						<WorkSection />
						<ContactSection />
					</div>
				</div>
				{/* <MoreStories morePosts={morePosts} /> */}
			</div>
		</>
	);
}
