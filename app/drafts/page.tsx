import Headline from "@/app/ui/Headline";
import Button from "@/app/ui/Button";

const drafts = [
	{
		href: "/drafts/a",
		label: "A · Sticker Sheet, tightened",
		note: "Today's hero, sharpened: one h1, CTAs on every screen size, stack chips, work moved up.",
	},
	{
		href: "/drafts/b",
		label: "B · Two Halves",
		note: "The tagline as layout: design roots on lime, developer instincts on eggplant, headshot on the seam.",
	},
	{
		href: "/drafts/c",
		label: "C · The Index",
		note: "Built for skimmers: a short-version card plus big numbered doors into each section.",
	},
];

export default function DraftsIndex() {
	return (
		<div className='container lg:max-w-7xl mx-auto px-8 lg:px-12 py-10 lg:py-20'>
			<Headline
				text='homepage drafts'
				headlineVariant='highlighter'
				headlineLevel='h1'
			/>
			<ul className='mt-8 flex flex-col gap-6'>
				{drafts.map((draft) => (
					<li
						key={draft.href}
						className='flex flex-col gap-3 rounded-3xl border-2 border-[var(--accent)] p-6'
					>
						<h2 className='text-2xl font-bold'>{draft.label}</h2>
						<p>{draft.note}</p>
						<div>
							<Button text='open draft' href={draft.href} />
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
