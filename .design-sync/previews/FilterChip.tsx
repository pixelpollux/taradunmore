import FilterChip from "@/app/ui/FilterChip";

export function OffAndOn() {
	return (
		<div className="flex flex-wrap gap-3">
			<FilterChip pressed onClick={() => {}}>
				All
			</FilterChip>
			<FilterChip pressed={false} onClick={() => {}}>
				Next.js
			</FilterChip>
			<FilterChip pressed={false} onClick={() => {}}>
				React
			</FilterChip>
		</div>
	);
}

export function DrawerTiles() {
	return (
		<div className="grid max-w-xs grid-cols-2 gap-3">
			<FilterChip size="tile" pressed onClick={() => {}}>
				All
			</FilterChip>
			<FilterChip size="tile" pressed={false} onClick={() => {}}>
				GraphQL
			</FilterChip>
			<FilterChip size="tile" pressed={false} onClick={() => {}}>
				Contentful
			</FilterChip>
			<FilterChip size="tile" pressed={false} onClick={() => {}}>
				TypeScript
			</FilterChip>
		</div>
	);
}
