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
		url: "/",
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

// Variable font: covers 400 / 500 / 700 plus italic in two files.
const text = Work_Sans({
	variable: "--font-text",
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${display.variable} ${text.variable}`}>
			<body className='bg-paper text-plum font-sans text-body'>
				<a href='#main' className='skip-link'>
					Skip to content
				</a>
				<div className='flex min-h-screen flex-col'>
					<HeaderNav />
					<main id='main' tabIndex={-1} className='flex-1 focus:outline-none'>
						{children}
					</main>
					<SiteFooter />
				</div>
				<Grain />
			</body>
		</html>
	);
}
