import "./globals.css";
import { Fredoka } from "next/font/google";
import { CMS_NAME } from "@/lib/constants";
import Footer from "@/app/blocks/Footer";

export const metadata = {
	title: `TaraDunmore.com`,
	description: `This is a blog built with Next.js and ${CMS_NAME}.`,
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
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className='text-[var(--text)] font-sans font-normal'>
				<section className='min-h-screen flex flex-col'>
					<main className='flex-1'>{children}</main>
					<Footer />
				</section>
			</body>
		</html>
	);
}
