import type { Metadata } from "next";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false },
};

export default function NotFound() {
	return (
		<div className='mx-auto flex max-w-page flex-col items-start gap-6 px-5 pt-16 md:pt-24'>
			<p className='text-label uppercase'>404</p>
			<Headline variant='page' level='h1' className='max-w-[14ch]'>
				This page didn&apos;t make it through the press.
			</Headline>
			<p className='max-w-[36rem] text-lead'>
				The link may be old, or the page may have moved. Let&apos;s get you
				back to somewhere that exists.
			</p>
			<div className='flex flex-wrap gap-4'>
				<Button href='/'>Back home</Button>
				<Button variant='secondary' href='/work'>
					See my work
				</Button>
			</div>
		</div>
	);
}
