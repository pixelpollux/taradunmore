import { renderRichText } from "@/lib/richText";
import Disclosure from "@/app/ui/Disclosure";
import Headline from "@/app/ui/Headline";
import StickerButton from "@/app/ui/StickerButton";
import { toneAt } from "@/app/ui/Tag";
import Layout from "../Layout";

function formatDate(dateString: string | null) {
	if (!dateString) return "Present";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		timeZone: "UTC",
	});
}

// Fixed order, matches the field's allowed values in Contentful.
// Anything with no category (or a value outside this list) falls into "Other".
const CATEGORY_ORDER = ["Professional Experience", "Volunteer Experience"];

function groupAndSortByCategory(items: any[]) {
	const groups = new Map<string, any[]>();

	for (const item of items) {
		const category = item.resumeItemCategory || "Other";
		if (!groups.has(category)) groups.set(category, []);
		groups.get(category)!.push(item);
	}

	// Sort each category's items by end date, most recent (or current/"Present") first.
	for (const categoryItems of Array.from(groups.values())) {
		categoryItems.sort((a: any, b: any) => {
			const aEnd = a.roleEndDate
				? new Date(a.roleEndDate).getTime()
				: Infinity;
			const bEnd = b.roleEndDate
				? new Date(b.roleEndDate).getTime()
				: Infinity;
			return bEnd - aEnd;
		});
	}

	// Return categories in the fixed order, then any unexpected ones after.
	const orderedCategories = [
		...CATEGORY_ORDER.filter((c) => groups.has(c)),
		...Array.from(groups.keys()).filter((c) => !CATEGORY_ORDER.includes(c)),
	];

	return orderedCategories.map((category) => ({
		category,
		items: groups.get(category)!,
	}));
}

export default function ResumeList({ items }: { items: any[] }) {
	const groupedItems = groupAndSortByCategory(items);
	let rowIndex = 0;

	return (
		<Layout id='resume'>
			<div className='flex flex-wrap items-start gap-x-16 gap-y-14'>
				<div className='min-w-0 flex-[1_1_560px]'>
					<Headline id='resume-title' variant='section' level='h2'>
						Where I&apos;ve been
					</Headline>

					{groupedItems.map(({ category, items: groupItems }) => (
						<div key={category} className='mt-12'>
							<h3 className='mb-6 text-label uppercase'>{category}</h3>
							<ol className='flex flex-col gap-8 pr-[10px]'>
								{groupItems.map((item: any) => {
									const index = rowIndex++;
									return (
										<li key={`${item.companyName}-${item.roleStartDate}`}>
											<Disclosure
												ink={toneAt(index)}
												defaultOpen={index === 0}
												summary={
													<span className='flex flex-col gap-1 md:flex-row md:flex-wrap md:items-baseline md:gap-x-4'>
														<span className='text-label uppercase'>
															{formatDate(item.roleStartDate)} to{" "}
															{formatDate(item.roleEndDate)}
														</span>
														<span className='font-display text-[22px] leading-tight'>
															{item.role}
														</span>
														<span className='text-small text-plum-muted'>
															{item.companyName}
														</span>
													</span>
												}
											>
												{renderRichText(item.roleDescription, {
													variant: "compact",
												})}
											</Disclosure>
										</li>
									);
								})}
							</ol>
						</div>
					))}
				</div>

				<div className='mx-auto flex-[0_0_240px] md:mt-28'>
					<StickerButton href='/resume.pdf' download>
						Download PDF
					</StickerButton>
				</div>
			</div>
		</Layout>
	);
}
