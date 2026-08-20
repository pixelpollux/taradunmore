import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/app/ui/BrandIcons";

const NAV_LINKS = [
	{ href: "/#about-section", label: "about" },
	{ href: "/#skills-section", label: "skills" },
	{ href: "/#work-section", label: "work" },
	{ href: "/#resume-section", label: "resume" },
	{ href: "/blog", label: "blog" },
	{ href: "/#contact-section", label: "contact" },
];

const SOCIAL_LINKS = [
	{
		label: "GitHub",
		href: "https://github.com/pixelpollux",
		icon: GithubIcon,
	},
	{
		label: "LinkedIn",
		href: "https://linkedin.com/in/tarajdunmore",
		icon: LinkedinIcon,
	},
	{
		label: "Email",
		href: "mailto:me@taradunmore.com",
		icon: Mail,
	},
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className='border-t-[.15rem] border-t-[var(--text)] bg-[color-mix(in_oklch,var(--accent-secondary)_15%,var(--bg))]'>
			<div className='container mx-auto px-8 lg:max-w-7xl lg:px-12 py-12 lg:py-16'>
				<div className='flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between'>
					<div className='flex flex-col items-center gap-2 text-center lg:items-start lg:text-left lg:w-1/3'>
						<a
							href='/'
							className='nav__home-link font-display text-[1.25rem] lg:text-[1.5rem] font-bold text-[var(--text)]'
						>
							TaraDunmore
							<span className='nav__home-accent text-[var(--text)]'>
								.com
							</span>
						</a>
						<p className='text-sm text-[var(--grey)] max-w-xs'>
							Design roots, developer instincts — building the
							bridge between design and code.
						</p>
					</div>

					<ul className='flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-bold lg:justify-center'>
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									className='hover:text-[var(--accent)] transition-colors duration-200'
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>

					<div className='flex items-center justify-center gap-3 lg:justify-end lg:w-1/3'>
						{SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target='_blank'
								rel='noreferrer noopener'
								aria-label={label}
							>
								<span className='inline-flex size-11 items-center justify-center rounded-full border-2 border-[var(--text)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors duration-200'>
									<Icon />
								</span>
							</a>
						))}
					</div>
				</div>

				<div className='mt-10 flex flex-col-reverse items-center gap-4 border-t border-[var(--accent)] pt-6 lg:flex-row lg:justify-between'>
					<p className='text-sm text-[var(--grey)]'>
						© {year} Tara Dunmore. All rights reserved.
					</p>
					<a
						href='#top'
						className='inline-flex items-center gap-1 text-sm font-bold hover:text-[var(--accent)] transition-colors duration-200'
					>
						back to top <ArrowUp className='size-4' />
					</a>
				</div>
			</div>
		</footer>
	);
}
