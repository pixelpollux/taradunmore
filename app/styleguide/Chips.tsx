"use client";

import { useState } from "react";
import FilterChip from "@/app/ui/FilterChip";
import Disclosure from "@/app/ui/Disclosure";

const TAGS = ["All", "Next.js", "React", "WordPress"];

export default function Chips() {
	const [active, setActive] = useState("All");
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className='flex flex-col gap-8'>
			<div role='group' aria-label='Filter by tech' className='flex flex-wrap gap-3'>
				{TAGS.map((tag) => (
					<FilterChip
						key={tag}
						pressed={active === tag}
						onClick={() => setActive(tag)}
					>
						{tag}
					</FilterChip>
				))}
			</div>
			<p role='status' className='text-small'>
				Selected: {active}
			</p>

			<div className='max-w-sm'>
				<Disclosure
					ink='orchid'
					open={drawerOpen}
					onOpenChange={setDrawerOpen}
					summary={
						<span className='block'>
							<span className='block text-label uppercase'>Filter by tech</span>
							<span className='block font-bold'>{active}</span>
						</span>
					}
				>
					<div className='grid grid-cols-2 gap-3'>
						{TAGS.map((tag) => (
							<FilterChip
								key={tag}
								size='tile'
								pressed={active === tag}
								onClick={() => {
									setActive(tag);
									setDrawerOpen(false);
								}}
							>
								{tag}
							</FilterChip>
						))}
					</div>
				</Disclosure>
			</div>
		</div>
	);
}
