import "./globals.css";
import type { Metadata } from "next";
import { Shrikhand, Work_Sans } from "next/font/google";
import HeaderNav from "@/app/blocks/HeaderNav";
import SiteFooter from "@/app/blocks/SiteFooter";
import Grain from "@/app/ui/Grain";

const SITE_DESCRIPTION =
	"Tara Dunmore is a front-end developer with design roots and developer instincts, building design systems and accessible interfaces with React, Next.js and Contentful.";

export const metadata: Metadata = {
	metadataBase: new URL("https://taradunmore.com"),
	title: {
		default: "Tara Dunmore | Front-End Developer",
		template: "%s | TaraDunmore.com",
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		type: "website",
		siteName: "TaraDunmore.com",
		title: "Tara Dunmore | Front-End Developer",
		description: SITE_DESCRIPTION,
		// No `url` here: this object is inherited by every route that does not
		// set its own openGraph, and a fixed "/" would label them all as the
		// homepage. Pages with their own metadata supply their URL.
	},
	twitter: {
		card: "summary",
		title: "Tara Dunmore | Front-End Developer",
		description: SITE_DESCRIPTION,
	},
};

const display = Shrikhand({
	variable: "--font-display",
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

// Variable font: covers 400 / 500 / 700 in one file.
const text = Work_Sans({
	variable: "--font-text",
	subsets: ["latin"],
	display: "swap",
});

// Italic only appears when an editor italicizes rich text (`font-sans-italic`),
// so it loads on demand instead of being preloaded on every page.
const textItalic = Work_Sans({
	variable: "--font-text-italic",
	style: "italic",
	subsets: ["latin"],
	display: "swap",
	preload: false,
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${display.variable} ${text.variable} ${textItalic.variable}`}>
			<body className='bg-paper text-plum font-sans text-body'>
				<a href='#main' className='skip-link'>
					Skip to content
				</a>
				<div className='flex min-h-screen flex-col'>
					<HeaderNav />
					{/* scroll-mt: the skip link lands below the sticky nav, not under it. */}
					<main
						id='main'
						tabIndex={-1}
						className='flex-1 scroll-mt-nav focus:outline-none'
					>
						{children}
					</main>
					<SiteFooter />
				</div>
				<Grain />
			</body>
		</html>
	);
}
