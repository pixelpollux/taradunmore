import type { Metadata } from "next";
import Headline from "@/app/ui/Headline";
import Shapes from "@/app/ui/Shapes";
import CtaBanner from "@/app/blocks/CtaBanner";
import WorkGrid from "@/app/blocks/WorkGrid";
import { getWorkItemList } from "@/lib/api";

const DESCRIPTION =
	"Case studies and side projects from Tara Dunmore: design systems, front-end builds and a few things made just because.";

// A route's openGraph replaces the root layout's wholesale (nothing is merged
// field by field), so each route restates everything it wants shared.
export const metadata: Metadata = {
	title: "Work",
	description: DESCRIPTION,
	openGraph: {
		type: "website",
		siteName: "TaraDunmore.com",
		title: "Work",
		description: DESCRIPTION,
		url: "/work",
	},
	alternates: { canonical: "/work" },
};

export default async function WorkPage() {
	// Tags come from an editor field: trim stray spaces so " SCSS/Sass" matches "SCSS/Sass".
	const items = (await getWorkItemList()).map((item: any) => ({
		...item,
		techTags: (item.techTags ?? []).map((tag: string) => tag.trim()),
	}));

	// Unique tech tags, alphabetical, for the filter chips.
	const tags: string[] = Array.from(
		new Set(items.flatMap((item: any) => item.techTags ?? [])),
	).sort((a: any, b: any) => a.localeCompare(b, undefined, { sensitivity: "base" })) as string[];

	return (
		<>
			<header className='mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 pt-10'>
				<div>
					<Headline variant='page' level='h1'>
						All work
					</Headline>
					<p className='mt-4 max-w-[36rem] text-lead'>
						Case studies and side projects, from design systems to things I
						just wanted to exist.
					</p>
				</div>
				<Shapes variant='trio' />
			</header>

			<div className='mx-auto mt-14 max-w-page px-5'>
				<WorkGrid items={items} tags={tags} />
			</div>

			<div className='mt-template'>
				<CtaBanner />
			</div>
		</>
	);
}
