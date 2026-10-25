import ContentfulImage from "@/lib/contentful-image";
import Button from "@/app/ui/Button";
import DotShadow from "@/app/ui/DotShadow";

/** One half of the name: a gradient block with a plum border, Ghost, and its own dot shadow. */
function NameBlock({
	children,
	gradient,
	ink,
	tilt,
}: {
	children: string;
	gradient: string;
	ink: "lime" | "orchid";
	tilt: number;
}) {
	return (
		<DotShadow
			as='span'
			ink={ink}
			offset={12}
			radius='28px'
			tilt={tilt}
			className='inline-block'
		>
			<span
				className={`ghost block rounded-[28px] border border-plum px-6 pb-2 pt-1 font-display text-display ${gradient}`}
			>
				{children}
			</span>
		</DotShadow>
	);
}

export default function Hero() {
	return (
		<section id='top' className='relative scroll-mt-[110px] overflow-x-clip'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -right-32 -top-40 size-[640px] rounded-full bg-[radial-gradient(circle,var(--amber)_0%,transparent_65%)] opacity-30'
			/>
			<div className='relative mx-auto flex max-w-page flex-wrap items-center gap-x-16 gap-y-14 px-5 pt-10 md:pt-16'>
				<div className='flex-[1_1_480px] max-md:order-2'>
					<p className='mb-5 text-xl font-bold'>Hey there, I&apos;m</p>
					<h1
						aria-label='Tara Dunmore'
						className='flex flex-col items-start gap-8'
					>
						<NameBlock gradient='bg-grad-lime-amber' ink='orchid' tilt={-2}>
							Tara
						</NameBlock>
						<NameBlock gradient='bg-grad-orchid-lime' ink='lime' tilt={2}>
							Dunmore
						</NameBlock>
					</h1>
					<p className='mt-12 max-w-[34rem] text-lead'>
						I&apos;ve got design roots, developer instincts. Self-taught,
						self-driven, systems-minded, building the{" "}
						<span className='bg-[linear-gradient(transparent_55%,var(--lime-100)_55%)] px-1'>
							bridge between design and code.
						</span>
					</p>
					<div className='mt-8 flex flex-wrap gap-4'>
						<Button href='/#work'>See my work</Button>
						<Button variant='secondary' href='/#contact'>
							Get in touch
						</Button>
					</div>
				</div>

				<div className='mx-auto w-full max-w-[400px] flex-[1_1_320px] max-md:order-1'>
					<DotShadow ink='lime' offset={16} radius='20px' tilt={4}>
						<div className='relative rounded-[20px] border border-plum bg-surface p-4 pb-[60px]'>
							<div className='overflow-hidden rounded-[12px] border border-plum'>
								<ContentfulImage
									src='/assets/imgs/headshot-4x5.jpg'
									alt='Tara Dunmore'
									width={800}
									height={1000}
									sizes='(min-width: 768px) 400px, 90vw'
									priority
									className='aspect-[4/5] w-full object-cover object-[50%_30%]'
								/>
							</div>
							<p className='absolute inset-x-0 bottom-3 text-center font-display text-[26px] leading-none'>
								that&apos;s me!
							</p>
						</div>
					</DotShadow>
				</div>
			</div>
		</section>
	);
}
