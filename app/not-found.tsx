import { Cherry_Bomb_One } from "next/font/google";

import HeaderNav from "@/app/blocks/HeaderNav";
import Headline from "@/app/ui/Headline";
import Button from "@/app/ui/Button";

const cherry = Cherry_Bomb_One({
	variable: "--font-cherry",
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

export const metadata = {
	title: "404 · Page Not Found — TaraDunmore.com",
	description: "This page doesn't exist. Let's get you back on track.",
};

export default function NotFound() {
	return (
		<>
			<HeaderNav />
			<section className='container--outer py-16 lg:py-24'>
				<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12 flex flex-col items-center text-center gap-6 lg:gap-8'>
					<Headline
						headlineVariant='display'
						headlineLevel='h1'
						className={`leading-[.85] -rotate-[4deg] font-cherry ${cherry.variable} text-[12rem] lg:text-[14rem]`}
						text='404'
					/>
					<Headline
						headlineVariant='highlighter'
						headlineLevel='h2'
						className='text-center'
						text='well, this is awkward.'
					/>
					<p className='max-w-md'>
						The page you're looking for wandered off somewhere.
						Let's get you back to somewhere that actually exists.
					</p>
					<div className='flex flex-col sm:flex-row gap-4'>
						<Button text='take me home' href='/' />
						<Button
							buttonVariant='secondary'
							text='see my work'
							href='/#work-section'
						/>
					</div>
				</div>
			</section>
		</>
	);
}
