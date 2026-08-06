import DateDisplay from "@/app/ui/DateDisplay";

export function Default() {
	return <DateDisplay dateString="2025-07-15" />;
}

export function EndOfYear() {
	return <DateDisplay dateString="2024-12-31" />;
}
