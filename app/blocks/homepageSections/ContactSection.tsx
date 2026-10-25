import Headline from "@/app/ui/Headline";
import { StaticCard } from "@/app/ui/Card";
import ContactLink from "@/app/ui/ContactLink";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/app/ui/BrandIcons";

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

// Transitional: the gradient tile and the contact form arrive in Phase 3.
export default async function ContactSection() {
	return (
		<section className='container--outer py-10 lg:py-20'>
			<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
				<StaticCard id='contact-section' ink='amber' shape='panel' offset={14}>
					<div className='flex flex-col gap-6'>
						<Headline
							id='contact-section-title'
							className='scroll-mt-[var(--nav-height)]'
						>
							let's connect!
						</Headline>
						<p>
							I'd love to hear from you. Whether you have a project
							in mind, want to collaborate, or just want to say hi,
							feel free to reach out.
						</p>
						<div className='flex flex-wrap gap-4'>
							{socials.map((social) => (
								<ContactLink key={social.label} {...social} />
							))}
						</div>
					</div>
				</StaticCard>
			</div>
		</section>
	);
}
