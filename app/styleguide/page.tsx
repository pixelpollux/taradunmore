import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import Button from "@/app/ui/Button";
import StickerButton from "@/app/ui/StickerButton";
import Tag from "@/app/ui/Tag";
import { StaticCard, LinkCard } from "@/app/ui/Card";
import Headline from "@/app/ui/Headline";
import Field from "@/app/ui/Field";
import Monogram from "@/app/ui/Monogram";
import ContactLink from "@/app/ui/ContactLink";
import Avatar from "@/app/ui/Avatar";
import DateDisplay from "@/app/ui/DateDisplay";
import CoverImage from "@/app/ui/CoverImage";
import Disclosure from "@/app/ui/Disclosure";
import { GithubIcon, LinkedinIcon } from "@/app/ui/BrandIcons";
import Chips from "./Chips";

export const metadata: Metadata = {
	title: "Styleguide",
	robots: { index: false, follow: false },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className='mb-24'>
			<h2 className='mb-8 border-b border-plum pb-2 text-label uppercase'>
				{title}
			</h2>
			{children}
		</section>
	);
}

/** Dev-only: every variant and state of the v2 components. 404s in production. */
export default function Styleguide() {
	if (process.env.NODE_ENV === "production") notFound();

	return (
		<div className='mx-auto max-w-page px-5 py-16'>
			<Headline variant='page' level='h1' className='mb-16'>
				Styleguide
			</Headline>

			<Block title='Buttons'>
				<div className='flex flex-wrap items-center gap-6'>
					<Button>Primary</Button>
					<Button variant='secondary'>Secondary</Button>
					<Button variant='text'>Text link</Button>
					<Button variant='disabled'>Disabled</Button>
					<Button href='https://example.com' external>
						External link
					</Button>
					<Button variant='secondary' href='#main'>
						Anchor
					</Button>
				</div>
				<div className='mt-12'>
					<StickerButton href='/resume.pdf' download>
						Download PDF
					</StickerButton>
				</div>
			</Block>

			<Block title='Tags'>
				<div className='flex flex-wrap gap-3'>
					<Tag tone='lime'>Next.js</Tag>
					<Tag tone='orchid'>React</Tag>
					<Tag tone='amber'>Contentful</Tag>
				</div>
			</Block>

			<Block title='Filter chips and drawer'>
				<Chips />
			</Block>

			<Block title='Disclosure rows'>
				<div className='flex max-w-2xl flex-col gap-8'>
					<Disclosure
						ink='lime'
						defaultOpen
						summary={
							<span className='block'>
								<span className='block text-label uppercase'>2021 to 2026</span>
								<span className='block font-display text-[22px] leading-tight'>
									Senior front end developer
								</span>
								<span className='block text-small text-plum-muted'>VML</span>
							</span>
						}
					>
						<p>Open by default. Native details, so it works without JavaScript.</p>
					</Disclosure>
					<Disclosure
						ink='amber'
						summary={
							<span className='block font-display text-[22px] leading-tight'>
								Closed row
							</span>
						}
					>
						<p>Opens to a softer corner radius.</p>
					</Disclosure>
				</div>
			</Block>

			<Block title='Cards'>
				<div className='grid gap-12 md:grid-cols-3'>
					<StaticCard ink='lime' tilt={-0.8}>
						<Headline variant='card' level='h3'>Static, lime</Headline>
						<p className='text-small text-plum-muted'>Dots sit still.</p>
					</StaticCard>
					<StaticCard ink='orchid' tilt={0.8}>
						<Headline variant='card' level='h3'>Static, orchid</Headline>
						<p className='text-small text-plum-muted'>Tilt alternates.</p>
					</StaticCard>
					<StaticCard ink='amber' shape='panel' offset={14}>
						<Headline variant='card' level='h3'>Panel, amber</Headline>
						<p className='text-small text-plum-muted'>36px radius.</p>
					</StaticCard>
					<LinkCard href='#main' accent='lime' pad='md'>
						<Headline variant='card' level='h3'>Link card</Headline>
						<p className='text-small text-plum-muted'>Solid ink moves.</p>
					</LinkCard>
					<LinkCard href='#main' accent='orchid' pad='md' tilt={0.6}>
						<Headline variant='card' level='h3'>Tilted link</Headline>
						<p className='text-small text-plum-muted'>Lift keeps the tilt.</p>
					</LinkCard>
					<LinkCard href='https://example.com' accent='amber' pad='md' external>
						<Headline variant='card' level='h3'>External</Headline>
						<p className='text-small text-plum-muted'>Opens in a new tab.</p>
					</LinkCard>
				</div>
			</Block>

			<Block title='Headlines'>
				<div className='flex flex-col gap-10'>
					<Headline variant='display' level='h2'>Tara</Headline>
					<Headline variant='page' level='h2'>Page title</Headline>
					<Headline variant='section' level='h2'>Section title</Headline>
					<Headline variant='card' level='h3'>Card title</Headline>
				</div>
			</Block>

			<Block title='Form fields'>
				<div className='grid max-w-xl gap-6'>
					<Field label='Name' name='name' autoComplete='name' required />
					<Field
						label='Email'
						name='email'
						type='email'
						autoComplete='email'
						defaultValue='not-an-email'
						error="That email doesn't look quite right."
					/>
					<Field label='Message' name='message' multiline />
				</div>
			</Block>

			<Block title='Contact links'>
				<div className='flex flex-wrap gap-4'>
					<ContactLink
						label='GitHub'
						handle='@pixelpollux'
						href='https://github.com/pixelpollux'
						icon={GithubIcon}
						tone='lime'
					/>
					<ContactLink
						label='LinkedIn'
						handle='in/tarajdunmore'
						href='https://linkedin.com/in/tarajdunmore'
						icon={LinkedinIcon}
						tone='orchid'
					/>
					<ContactLink
						label='Email'
						handle='me@taradunmore.com'
						href='mailto:me@taradunmore.com'
						icon={Mail}
						tone='amber'
					/>
				</div>
			</Block>

			<Block title='Monogram, avatar, date'>
				<div className='flex flex-wrap items-center gap-10'>
					<Monogram />
					<Avatar name='Tara Dunmore' subtitle='Front end developer' />
					<Avatar name='No photo' />
					<DateDisplay dateString='2026-07-18T00:00:00Z' />
				</div>
			</Block>

			<Block title='Cover image'>
				<div className='grid max-w-3xl gap-12 md:grid-cols-2'>
					<CoverImage
						url='/assets/imgs/headshot-4x5.jpg'
						aspect='16 / 10'
						ink='orchid'
						tilt={-0.6}
					/>
					<CoverImage aspect='16 / 10' ink='amber' />
				</div>
			</Block>
		</div>
	);
}
