import { Mail } from "lucide-react";
import Headline from "@/app/ui/Headline";
import DotShadow from "@/app/ui/DotShadow";
import { StaticCard } from "@/app/ui/Card";
import ContactLink from "@/app/ui/ContactLink";
import { GithubIcon, LinkedinIcon } from "@/app/ui/BrandIcons";
import ContactForm from "@/app/blocks/ContactForm";
import Layout from "./Layout";

const socials = [
	{
		label: "GitHub",
		handle: "@pixelpollux",
		href: "https://github.com/pixelpollux",
		icon: GithubIcon,
		tone: "lime",
	},
	{
		label: "LinkedIn",
		handle: "in/tarajdunmore",
		href: "https://linkedin.com/in/tarajdunmore",
		icon: LinkedinIcon,
		tone: "orchid",
	},
	{
		label: "Email",
		handle: "me@taradunmore.com",
		href: "mailto:me@taradunmore.com",
		icon: Mail,
		tone: "amber",
	},
] as const;

export default async function ContactSection() {
	return (
		<Layout id='contact'>
			<div className='flex flex-wrap items-start gap-x-12 gap-y-14'>
				<DotShadow
					ink='lime'
					offset={14}
					radius='var(--radius-panel)'
					tilt={-0.8}
					className='flex-[1_1_380px]'
				>
					<div className='relative flex flex-col gap-6 overflow-hidden rounded-panel border border-plum bg-grad-amber-orchid p-7 md:p-10'>
						<div
							aria-hidden='true'
							className='multiply absolute -bottom-10 -right-10 size-40 rounded-full bg-lime'
						/>
						<Headline id='contact-title' variant='section' level='h2'>
							Let&apos;s connect!
						</Headline>
						<p className='relative text-lead'>
							I&apos;d love to hear from you. Whether you have a project in
							mind, want to collaborate, or just want to say hi, feel free
							to reach out.
						</p>
						<ul className='relative mt-4 flex flex-wrap gap-4'>
							{socials.map((social) => (
								<li key={social.label}>
									<ContactLink {...social} />
								</li>
							))}
						</ul>
					</div>
				</DotShadow>

				<div className='flex-[1_1_340px]'>
					<StaticCard
						ink='orchid'
						shape='form'
						offset={14}
						tilt={0.6}
						pad='lg'
					>
						<ContactForm />
					</StaticCard>
				</div>
			</div>
		</Layout>
	);
}
