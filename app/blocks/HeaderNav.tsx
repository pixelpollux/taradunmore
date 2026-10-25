"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Monogram from "@/app/ui/Monogram";
import { cn } from "@/lib/cn";

const LINKS = [
	{ href: "/#about", label: "About" },
	{ href: "/#work", label: "Work" },
	{ href: "/#skills", label: "Skills" },
	{ href: "/#resume", label: "Resume" },
	{ href: "/#contact", label: "Contact" },
];

const linkClass =
	"inline-flex min-h-tap items-center rounded-full px-4 font-bold underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-orchid";

/**
 * Floating pill nav: sticky, surface fill, 4px plum border, no shadow (it
 * scrolls over text). Below 768px the links collapse behind a Menu button.
 */
export default function HeaderNav() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const onBlog = pathname.startsWith("/blog");

	// Close the menu after navigating.
	useEffect(() => setIsOpen(false), [pathname]);

	// Escape closes the menu and hands focus back to its button.
	useEffect(() => {
		if (!isOpen) return;
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
				menuButtonRef.current?.focus();
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [isOpen]);

	const blogPill = (
		<Link
			href='/blog'
			aria-current={onBlog ? "page" : undefined}
			onClick={() => setIsOpen(false)}
			className='lift inline-flex min-h-tap items-center gap-1 rounded-full border border-plum bg-grad-amber-orchid px-5 font-bold text-plum shadow-pop-lime'
		>
			Blog
			<ArrowUpRight aria-hidden='true' className='size-4' strokeWidth={3} />
		</Link>
	);

	return (
		<header className='sticky top-4 z-50 px-4'>
			<nav aria-label='Main' className='relative mx-auto max-w-page'>
				<div className='flex min-h-[64px] items-center justify-between gap-4 rounded-full border border-plum bg-surface py-2 pl-4 pr-3 md:pr-4'>
					<Link
						href='/'
						className='flex items-center gap-2 rounded-full md:gap-3'
						onClick={() => setIsOpen(false)}
					>
						<Monogram />
						<span className='whitespace-nowrap font-display text-[20px] leading-none md:text-[22px]'>
							Tara Dunmore
						</span>
					</Link>

					<ul className='hidden items-center gap-1 lg:flex'>
						{LINKS.map((link) => (
							<li key={link.href}>
								<Link href={link.href} className={linkClass}>
									{link.label}
								</Link>
							</li>
						))}
						<li className='ml-2'>{blogPill}</li>
					</ul>

					<button
						ref={menuButtonRef}
						type='button'
						aria-expanded={isOpen}
						aria-controls='primary-nav-list'
						onClick={() => setIsOpen((open) => !open)}
						className='lift inline-flex min-h-tap items-center gap-2 rounded-full border border-plum bg-plum px-4 font-bold text-paper shadow-pop-lime focus-visible:outline-plum lg:hidden'
					>
						{isOpen ? (
							<X aria-hidden='true' className='size-5' strokeWidth={3} />
						) : (
							<Menu aria-hidden='true' className='size-5' strokeWidth={3} />
						)}
						<span>{isOpen ? "Close" : "Menu"}</span>
					</button>
				</div>

				<ul
					id='primary-nav-list'
					className={cn(
						"absolute left-0 right-0 top-[calc(100%+12px)] flex-col gap-1 rounded-card border border-plum bg-surface p-4 lg:hidden",
						isOpen ? "flex" : "hidden",
					)}
				>
					{LINKS.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={cn(linkClass, "w-full")}
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</Link>
						</li>
					))}
					<li className='pt-2'>{blogPill}</li>
				</ul>
			</nav>
		</header>
	);
}
