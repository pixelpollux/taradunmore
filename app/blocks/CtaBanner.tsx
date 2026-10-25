import Button from "@/app/ui/Button";
import DotShadow from "@/app/ui/DotShadow";
import Headline from "@/app/ui/Headline";

/** "Like what you see?" banner closing the case study and Work index. */
export default function CtaBanner() {
	return (
		<div className='mx-auto max-w-page px-5'>
			<DotShadow
				ink='lime'
				offset={14}
				radius='var(--radius-panel)'
				tilt={-0.6}
			>
				<div className='flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-panel border border-plum bg-grad-amber-orchid p-8 md:p-12'>
					<div className='max-w-[34rem]'>
						<Headline
							variant='section'
							level='h2'
							className='md:text-[48px] md:leading-[1.05]'
						>
							Like what you see?
						</Headline>
						<p className='mt-3 text-lead'>
							I&apos;m open to full-time roles and the occasional freelance
							project. Say hi.
						</p>
					</div>
					<Button href='/#contact'>Get in touch</Button>
				</div>
			</DotShadow>
		</div>
	);
}
