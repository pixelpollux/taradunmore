import Headline from "@/app/ui/Headline";

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
		// TODO: fine for now but need to make this more flexible for different layouts, e.g. full width, etc.
		<section className={`container--outer ${bgColor} py-10 lg:py-20`}>
			<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
				<div className='flex justify-between items-center flex-wrap gap-4 pb-4 lg:pb-8'>
					<Headline
						id={id}
						text={text}
						headlineVariant='highlighter'
						className='scroll-mt-[var(--nav-height)] text-center sm:text-left w-full'
					/>
					{headerActions}
				</div>
				{children}
			</div>
		</section>
	);
}
