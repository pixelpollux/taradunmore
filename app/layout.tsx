import "./globals.css";
import { Fredoka } from "next/font/google";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import Button from "@/app/ui/Button";

export const metadata = {
	title: `TaraDunmore.com`,
	description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const fredoka = Fredoka({
	variable: "--font-Fredoka",
	subsets: ["latin"],
	display: "swap",
});

function Footer() {
	return (
		<footer className='bg-accent-1 border-t border-accent-2'>
			<div className='container mx-auto px-5'>
				<div className='py-28 flex flex-col lg:flex-row items-center'>
					<h3 className='text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2'>
						Footer
					</h3>
					<div className='flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2'>
						<Button
							text='Read Documentation'
							href='https://nextjs.org/docs'
						/>
						<Button
							text='View on GitHub'
							buttonVariant='secondary'
							href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
}

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
				<section className='min-h-screen'>
					<main>{children}</main>
					<Footer />
				</section>
			</body>
		</html>
	);
}
