"use client";

import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Card from "@/app/ui/Card";
import Button from "@/app/ui/Button";
import Headline from "@/app/ui/Headline";

const richTextOptions = {
	renderNode: {
		[BLOCKS.UL_LIST]: (node: any, children: any) => (
			<ul className='list-disc pl-5 mt-2 space-y-1'>{children}</ul>
		),
		[BLOCKS.LIST_ITEM]: (node: any, children: any) => (
			<li className='marker:text-[var(--accent)]'>{children}</li>
		),
		[BLOCKS.TABLE]: (node: any, children: any) => (
			<table className='table table-auto m-4 sm:mx-6 sm:mr-10 border-collapse'>
				<tbody>{children}</tbody>
			</table>
		),
		[BLOCKS.TABLE_ROW]: (node: any, children: any) => (
			<tr className='flex flex-col sm:table-row border-b text-center border-[var(--accent)] '>
				{children}
			</tr>
		),
		[BLOCKS.TABLE_HEADER_CELL]: (node: any, children: any) => (
			<th className='border-b border-b-[var(--accent)] p-2 first-of-type:text-left hidden sm:table-cell bg-[color-mix(in_oklch,var(--accent)_10%,transparent)]'>
				{children}
			</th>
		),
		[BLOCKS.TABLE_CELL]: (node: any, children: any) => (
			<td className='sm:border-b border-b-[var(--accent)]  p-1 sm:p-2 sm:first-of-type:text-left'>
				{children}
			</td>
		),
		[BLOCKS.PARAGRAPH]: (node: any, children: any) => <>{children}</>,
		// Some versions of @contentful/rich-text-types include BLOCKS.BREAK_LINE in TS
		// types but don't define it at runtime, so it never matches. Use the literal
		// node type string instead.
		"break-line": () => <br />,
	},
};

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
	const [isOpen, setIsOpen] = useState(false);
	const groupedItems = groupAndSortByCategory(items);

	return (
		<section className='container--outer bg-[color-mix(in_oklch,var(--accent-secondary)_70%,transparent)] py-10 lg:py-20'>
			<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
				<Card id='resume-section'>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center justify-center sm:justify-between flex-wrap gap-x-12 gap-4'>
							<Headline
								text='resume'
								headlineVariant='highlighter'
								className='scroll-mt-[var(--nav-height)] text-center sm:text-left'
								id='resume-section-title'
							/>
							<div className='flex flex-col sm:flex-row lg:flex-row gap-1 md:gap-2'>
								<Button
									text={
										isOpen ? "Hide Resume" : "View Resume"
									}
									onClick={() => setIsOpen((open) => !open)}
									buttonVariant={
										isOpen ? "secondary" : "primary"
									}
								/>
								{/* <Button
									buttonVariant='secondary'
									text='Download Resume'
									href='/resume.pdf'
								/> */}
							</div>
						</div>
					</div>
					{isOpen && (
						<div className='flex flex-col gap-10 pt-6 lg:pt-8'>
							{groupedItems.map(({ category, items }) => (
								<div key={category}>
									<h3 className='font-bold text-2xl mb-6 border-b-2 border-[var(--accent)]'>
										{category}
									</h3>

									<ol className='flex flex-col gap-8'>
										{items.map((item: any) => (
											<li
												className='flex flex-col'
												key={`${item.companyName}-${item.roleStartDate}`}
											>
												<div className='flex justify-between flex-wrap gap-2'>
													<h4 className='font-bold text-xl'>
														{item.role} ·{" "}
														<span className='text-[var(--accent)]'>
															{item.companyName}
														</span>
													</h4>
													<span>
														{formatDate(
															item.roleStartDate,
														)}{" "}
														—{" "}
														{formatDate(
															item.roleEndDate,
														)}
													</span>
												</div>
												{item.roleDescription?.json &&
													documentToReactComponents(
														item.roleDescription
															.json,
														richTextOptions,
													)}
											</li>
										))}
									</ol>
								</div>
							))}
						</div>
					)}
				</Card>
			</div>
		</section>
	);
}
