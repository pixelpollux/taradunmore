import { Cherry_Bomb_One } from "next/font/google";

import HeaderNav from "@/app/blocks/HeaderNav";
import ContactSection from "@/app/blocks/homepageSections/ContactSection";
import Layout from "@/app/blocks/homepageSections/Layout";
import WorkSection from "@/app/blocks/homepageSections/WorkSection";
import Button from "@/app/ui/Button";
import Card from "@/app/ui/Card";
import ContentfulImage from "@/lib/contentful-image";
import Headline from "@/app/ui/Headline";

const cherry = Cherry_Bomb_One({
	variable: "--font-cherry",
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

const doors = [
	{ n: "01", label: "about me", note: "who I am and how I got here", href: "/#about-section" },
	{ n: "02", label: "skills", note: "the tools I reach for", href: "/#skills-section" },
	{ n: "03", label: "work", note: "things I've built", href: "/#work-section" },
	{ n: "04", label: "resume", note: "where I've been", href: "/#resume-section" },
	{ n: "05", label: "contact", note: "say hi", href: "/#contact-section" },
];

const link =
	"underline decoration-[var(--accent)] decoration-2 underline-offset-[.2em] hover:text-[var(--accent-text)]";

/**
 * Draft C: The Index.
 * Built for skimmers. A "short version" card answers who/what/where in five
 * seconds; numbered doors use the card pop physics to get you to the right
 * section. Work follows straight away; the rest lives behind the doors.
 */
export default function DraftC() {
	return (
		<>
			<HeaderNav />
			<section className='container--outer py-10 lg:py-16'>
				<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start'>
					<div className='flex flex-col gap-6 lg:w-3/5'>
						<Headline
							text='hi!'
							headlineVariant='display'
							headlineLevel='decorative'
							className={`-rotate-[4deg] leading-[.85] self-start font-cherry ${cherry.variable} [&_.headline--display]:!text-[7rem]`}
						/>
						<h1 className='text-5xl lg:text-7xl leading-[1.05] font-bold'>
							I&apos;m Tara.{" "}
							<span className='headline--highlighter !text-inherit !text-5xl lg:!text-7xl'>
								design roots,
							</span>{" "}
							<span className='headline--highlighter !text-inherit !text-5xl lg:!text-7xl'>
								developer instincts.
							</span>
						</h1>
						<p className='text-lg max-w-xl'>
							Front-end developer, self-taught and
							systems-minded. Pick a door below, or take the
							short version.
						</p>
						<div className='flex flex-wrap gap-4'>
							<Button text='see my work' href='/#work-section' />
							<Button
								buttonVariant='secondary'
								text='get in touch'
								href='/#contact-section'
							/>
						</div>
					</div>
					<Card
						cardVariant='slim'
						className='w-full max-w-[30rem] flex flex-col gap-5'
					>
						<div className='flex items-center gap-5'>
							<ContentfulImage
								src='/assets/imgs/headshot-4x5.jpg'
								alt='Tara Dunmore'
								width={104}
								height={130}
								className='w-[6.5rem] rotate-[5deg] rounded-3xl border-2 border-[var(--text)]'
							/>
							<div>
								<h2 className='text-2xl leading-8 font-bold'>
									the short version
								</h2>
								<p className='text-sm'>for people in a hurry</p>
							</div>
						</div>
						<dl className='grid grid-cols-[auto_1fr] gap-x-5 gap-y-3'>
							<dt className='font-bold'>role</dt>
							<dd>front-end developer</dd>
							<dt className='font-bold'>stack</dt>
							<dd>React, Next.js, TypeScript</dd>
							<dt className='font-bold'>care about</dt>
							<dd>accessibility, design systems</dd>
							<dt className='font-bold'>find me</dt>
							<dd>
								<a className={link} href='https://github.com/pixelpollux'>
									GitHub
								</a>
								,{" "}
								<a className={link} href='https://linkedin.com/in/tarajdunmore'>
									LinkedIn
								</a>
								,{" "}
								<a className={link} href='mailto:me@taradunmore.com'>
									email
								</a>
							</dd>
						</dl>
					</Card>
				</div>
			</section>

			<Layout text='where to?' id='doors'>
				<nav aria-label='Sections'>
					<ul className='flex flex-col gap-5'>
						{doors.map((door) => (
							<li key={door.n}>
								<a
									href={door.href}
									className='flex flex-wrap items-center gap-x-6 gap-y-1 rounded-[30px] border-2 border-[var(--text)] bg-[var(--bg)] px-6 py-5 no-underline transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[.5rem_.5rem_0_0_color-mix(in_oklch,var(--accent)_40%,transparent)]'
								>
									<span className='w-10 font-bold tracking-[1px]'>
										{door.n}
									</span>
									<span className='text-3xl lg:text-4xl leading-none font-bold lg:basis-48'>
										{door.label}
									</span>
									<span className='flex-1 basis-64'>
										{door.note}
									</span>
									<span
										className='ml-auto font-bold tracking-[1px]'
										aria-hidden='true'
									>
										go →
									</span>
								</a>
							</li>
						))}
					</ul>
				</nav>
			</Layout>
			<WorkSection />
			<ContactSection />
		</>
	);
}
