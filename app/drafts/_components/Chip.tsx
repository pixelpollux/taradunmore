/** Outlined tag. Eggplant text and border (the grey tag style fails 4.5:1). */
export default function Chip({
	children,
	inverse = false,
}: {
	children: React.ReactNode;
	inverse?: boolean;
}) {
	return (
		<li
			className={`inline-block rounded-[30px] border-2 px-3 py-1 text-sm font-semibold tracking-[1px] ${
				inverse
					? "border-[var(--text-inverse)] text-[var(--text-inverse)]"
					: "border-[var(--text)] bg-[var(--bg)] text-[var(--text)]"
			}`}
		>
			{children}
		</li>
	);
}

export function ChipList({
	items,
	label,
	inverse = false,
}: {
	items: string[];
	label: string;
	inverse?: boolean;
}) {
	return (
		<ul aria-label={label} className='flex flex-wrap gap-2'>
			{items.map((item) => (
				<Chip key={item} inverse={inverse}>
					{item}
				</Chip>
			))}
		</ul>
	);
}
