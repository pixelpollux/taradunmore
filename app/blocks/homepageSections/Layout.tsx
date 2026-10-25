import Headline from "@/app/ui/Headline";

// Transitional: the v2 section shell (plain <section>, no colored bands)
// arrives in Phase 3. This only moves it onto the new Headline.
export default function Layout({
	text,
	id,
	children,
	headerActions,
	bgColor = "bg-[var(--bg)]",
}: {
	text: string;
	id: string;
	children: React.ReactNode;
	headerActions?: React.ReactNode;
	bgColor?: string;
}) {
	return (
		<section className={`container--outer ${bgColor} py-10 lg:py-20`}>
			<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
				<div className='flex justify-between items-center flex-wrap gap-4 pb-4 lg:pb-8'>
					<Headline
						id={id}
						variant='section'
						className='scroll-mt-[var(--nav-height)] text-center sm:text-left w-full'
					>
						{text}
					</Headline>
					{headerActions}
				</div>
				{children}
			</div>
		</section>
	);
}
