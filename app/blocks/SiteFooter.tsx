import Link from "next/link";
import { ArrowUp } from "lucide-react";
import CurrentYear from "@/app/ui/CurrentYear";
import { navLink } from "@/app/ui/link";
import { cn } from "@/lib/cn";

const LINKS = [
	{ href: "/#work", label: "Work" },
	{ href: "/blog", label: "Blog" },
	{ href: "/#resume", label: "Resume" },
	{ href: "/#contact", label: "Contact" },
];

const linkClass = cn(navLink, "py-[10px] hover:decoration-lime");

/** Plum panel, 16px in from the page edges, with a faint lime glow. */
export default function SiteFooter() {
	return (
		<footer className='mt-section px-4 pb-4'>
			<div className='relative mx-auto max-w-page overflow-hidden rounded-panel border border-plum bg-plum px-8 py-12 text-paper md:px-12'>
				<div
					aria-hidden='true'
					className='pointer-events-none absolute -right-24 -top-32 size-[460px] rounded-full bg-[radial-gradient(circle,var(--lime)_0%,transparent_65%)] opacity-25'
				/>
				<div className='relative flex flex-wrap items-start justify-between gap-x-12 gap-y-8'>
					<p className='font-display text-title-lg leading-none'>
						Tara Dunmore
					</p>
					<nav aria-label='Footer'>
						<ul className='flex flex-wrap gap-x-8'>
							{LINKS.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className={linkClass}>
										{link.label}
									</Link>
								</li>
							))}
							<li>
								<a href='#top' className={`${linkClass} gap-1`}>
									Back to top
									<ArrowUp
										aria-hidden='true'
										className='size-4'
										strokeWidth={3}
									/>
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<p className='relative mt-10 text-small'>
					© <CurrentYear buildYear={new Date().getFullYear()} /> Tara Dunmore
				</p>
			</div>
		</footer>
	);
}
