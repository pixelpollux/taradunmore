"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
	{ href: "/#about-section", label: "about" },
	{ href: "/#skills-section", label: "skills" },
	{ href: "/#work-section", label: "work" },
	{ href: "/#resume-section", label: "resume" },
	{ href: "/blog", label: "blog" },
	{ href: "/#contact-section", label: "contact" },
];

const CONSTRUCTION_MESSAGE =
	"🚧 This site is under construction — thanks for your patience! 🚧";

export default function HeaderNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [isBannerPaused, setIsBannerPaused] = useState(false);
	const pathname = usePathname();
	const navRef = useRef<HTMLElement>(null);
	const bannerRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	// Escape closes the mobile menu and hands focus back to its button.
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

	useEffect(() => {
		function setHeights() {
			const navHeight = navRef.current?.offsetHeight ?? 0;
			const bannerHeight = bannerRef.current?.offsetHeight ?? 0;

			document.documentElement.style.setProperty(
				"--nav-only-height",
				`${navHeight}px`,
			);
			document.documentElement.style.setProperty(
				"--nav-height",
				`${navHeight + bannerHeight}px`,
			);
		}

		setHeights();
		window.addEventListener("resize", setHeights);
		return () => window.removeEventListener("resize", setHeights);
	}, []);

	return (
		<>
			<nav
				ref={navRef}
				aria-label='primary'
				className='flex flex-col bg-[var(--bg)] lg:flex-row justify-center items-center gap-4 lg:gap-8 text-lg lg:text-xl font-sans font-bold sticky z-[50] top-0 border-b-[var(--text)] border-b-[.15rem] px-8 py-4 lg:px-12 lg:py-7'
			>
				{" "}
				<div className='flex justify-between items-center w-full container lg:max-w-7xl mx-auto px-0 lg:px-5'>
					<a
						href='/'
						className='nav__home-link text-[1.25rem] lg:text-[1.5rem] font-bold text-[var(--text)]'
					>
						TaraDunmore
						<span className='nav__home-accent text-[var(--text)]'>
							.com
						</span>
					</a>

					<button
						ref={menuButtonRef}
						type='button'
						className='lg:hidden flex flex-col justify-center gap-1.5 w-6 h-8'
						onClick={() => setIsOpen((open) => !open)}
						aria-expanded={isOpen}
						aria-controls='primary-nav-list'
						aria-label={isOpen ? "Close menu" : "Open menu"}
					>
						<span
							className={`block h-0.5 w-full bg-[var(--text)] transition-transform duration-200 ${
								isOpen ? "rotate-45 translate-y-2" : ""
							}`}
						/>
						<span
							className={`block h-0.5 w-full bg-[var(--text)] transition-opacity duration-200 ${
								isOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`block h-0.5 w-full bg-[var(--text)] transition-transform duration-200 ${
								isOpen ? "-rotate-45 -translate-y-2" : ""
							}`}
						/>
					</button>

					<ul
						id='primary-nav-list'
						className={`${
							isOpen ? "flex" : "hidden"
						} flex-col gap-4 absolute top-full left-0 w-full bg-[var(--bg)] border-b-[var(--text)] border-b-[.15rem] px-8 py-4 lg:static lg:flex lg:flex-row lg:gap-8 lg:w-auto lg:border-none lg:p-0`}
					>
						{LINKS.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									className='nav__link'
									aria-current={
										link.href === "/blog" &&
										pathname.startsWith("/blog")
											? "page"
											: undefined
									}
									onClick={() => setIsOpen(false)}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</nav>

			<div
				ref={bannerRef}
				className='construction-banner sticky top-[var(--nav-only-height,0px)] z-[49] overflow-hidden whitespace-nowrap border-b-[.15rem] border-b-[var(--text)] bg-[color-mix(in_oklch,var(--accent-secondary)_70%,var(--white))] py-2 lg:mb-24'
			>
				{/* One calm copy for assistive tech; the scrolling copies are decoration. */}
				<p className='sr-only !mb-0'>{CONSTRUCTION_MESSAGE}</p>
				<div
					aria-hidden='true'
					className='construction-banner__track flex w-max gap-12'
					style={{
						animationPlayState: isBannerPaused ? "paused" : undefined,
					}}
				>
					{[0, 1].map((trackIndex) => (
						<span
							key={trackIndex}
							className='flex shrink-0 items-center gap-12 pr-12'
						>
							{Array.from({ length: 8 }).map((_, i) => (
								<span
									key={i}
									className='font-sans text-sm font-bold text-[var(--text)] lg:text-base'
								>
									{CONSTRUCTION_MESSAGE}
								</span>
							))}
						</span>
					))}
				</div>
				<button
					type='button'
					onClick={() => setIsBannerPaused((paused) => !paused)}
					className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--text)] bg-[var(--bg)] px-2 py-0.5 text-xs font-bold leading-none tracking-[1px] motion-reduce:hidden'
				>
					{isBannerPaused ? "play banner" : "pause banner"}
				</button>
			</div>
		</>
	);
}
