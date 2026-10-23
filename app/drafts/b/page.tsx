import HeaderNav from "@/app/blocks/HeaderNav";
import AboutSection from "@/app/blocks/homepageSections/AboutSection";
import ContactSection from "@/app/blocks/homepageSections/ContactSection";
import Layout from "@/app/blocks/homepageSections/Layout";
import ResumeSection from "@/app/blocks/homepageSections/ResumeSection/ResumeSection";
import WorkSection from "@/app/blocks/homepageSections/WorkSection";
import Button from "@/app/ui/Button";
import Card from "@/app/ui/Card";
import Headshot from "../_components/Headshot";
import { ChipList } from "../_components/Chip";

const designSide = [
	{ label: "UI/UX", skills: ["Figma", "Storybook"] },
	{ label: "Accessibility", skills: ["ARIA", "Semantic HTML", "WCAG"] },
];
const codeSide = [
	{
		label: "Languages/Frameworks",
		skills: [
			"CSS",
			"HTML",
			"JavaScript",
			"Next.js",
			"Node.js",
			"React",
			"Sass",
			"TypeScript",
		],
	},
	{
		label: "CMS/Platforms",
		skills: ["Adobe Experience Manager (AEM)", "Contentful", "WordPress"],
	},
];

function SkillColumn({
	title,
	groups,
}: {
	title: string;
	groups: { label: string; skills: string[] }[];
}) {
	return (
		<Card className='flex-1 flex flex-col gap-5'>
			<h3 className='text-2xl font-bold italic'>{title}</h3>
			{groups.map((group) => (
				<div key={group.label}>
					<h4 className='text-lg font-bold mb-2'>{group.label}</h4>
					<ChipList label={group.label} items={group.skills} />
				</div>
			))}
		</Card>
	);
}

/**
 * Draft B: Two Halves.
 * The tagline becomes the layout: "design roots" on lime, "developer
 * instincts" on eggplant, headshot sitting on the seam. Skills split the same
 * way. The display word is dropped; the split is the spectacle.
 */
export default function DraftB() {
	return (
		<>
			<HeaderNav />
			<section className='flex flex-col md:flex-row border-b-[.15rem] border-[var(--text)]'>
				<div className='flex-1 flex flex-col gap-5 justify-center bg-[color-mix(in_oklch,var(--accent-secondary)_70%,var(--bg))] px-8 md:px-12 lg:px-20 pt-16 pb-36'>
					<p className='font-bold tracking-[1px] text-lg'>
						hi, I&apos;m Tara!
					</p>
					<h1 className='text-5xl lg:text-[5.5rem] leading-[.95] font-bold'>
						design
						<br />
						roots,
					</h1>
					<p className='text-lg max-w-sm'>
						I start with how it looks, how it reads and who
						it&apos;s for, from type and spacing to the way a
						button feels when you touch it.
					</p>
					<ChipList
						label='Design skills'
						items={["Figma", "Storybook", "Accessibility"]}
					/>
				</div>
				<div className='flex-1 flex flex-col gap-5 justify-center bg-[var(--text)] text-[var(--text-inverse)] px-8 md:px-12 lg:px-20 pt-16 pb-36'>
					<p className='font-bold tracking-[1px] text-lg text-[var(--accent-secondary)]'>
						front-end developer
					</p>
					<h2 className='text-5xl lg:text-[5.5rem] leading-[.95] font-bold'>
						developer
						<br />
						instincts.
					</h2>
					<p className='text-lg max-w-sm'>
						Then I build it: clean, accessible, systems-minded
						code in React, Next.js and TypeScript that keeps the
						design honest.
					</p>
					<ChipList
						inverse
						label='Development skills'
						items={["React", "Next.js", "TypeScript"]}
					/>
				</div>
			</section>
			<div className='relative z-10 mx-auto -mt-24 w-[10rem] md:w-[13rem]'>
				<Headshot />
			</div>

			<section className='px-8 pt-16 pb-10 text-center'>
				<div className='mx-auto flex max-w-2xl flex-col items-center gap-6'>
					<p className='text-2xl lg:text-3xl leading-tight font-bold'>
						I&apos;m the{" "}
						<span className='headline--highlighter !text-inherit !text-2xl lg:!text-3xl'>
							bridge
						</span>{" "}
						between the two: self-taught, self-driven and happiest
						where design and code meet.
					</p>
					<div className='flex flex-wrap gap-4 justify-center'>
						<Button text='see my work' href='/#work-section' />
						<Button
							buttonVariant='secondary'
							text='get in touch'
							href='/#contact-section'
						/>
					</div>
				</div>
			</section>

			<Layout text='skills' id='skills-section'>
				<div className='flex flex-col md:flex-row gap-6'>
					<SkillColumn title='the design side' groups={designSide} />
					<SkillColumn title='the code side' groups={codeSide} />
				</div>
			</Layout>
			<WorkSection />
			<AboutSection />
			<ResumeSection />
			<ContactSection />
		</>
	);
}
