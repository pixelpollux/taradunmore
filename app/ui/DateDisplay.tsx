/**
 * Renders a <time> as "Jul 18, 2026". Formatted in UTC so a date stored at
 * midnight UTC does not slip back a day in US time zones.
 */
export default function DateDisplay({
	dateString,
	className,
}: {
	dateString: string;
	className?: string;
}) {
	const label = new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});

	return (
		<time dateTime={dateString} className={className}>
			{label}
		</time>
	);
}
