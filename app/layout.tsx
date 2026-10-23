import "./globals.css";
import { Fredoka } from "next/font/google";
import Footer from "@/app/blocks/Footer";
import type { Metadata } from "next";

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

const fredoka = Fredoka({
	variable: "--font-Fredoka",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${fredoka.variable} scroll-smooth`}>
			<body className='text-[var(--text)] font-sans font-normal'>
				<a href='#main' className='skip-link'>
					skip to content
				</a>
				<section className='min-h-screen flex flex-col'>
					<main id='main' tabIndex={-1} className='flex-1 focus:outline-none'>
						{children}
					</main>
					<Footer />
				</section>
			</body>
		</html>
	);
}
