import MetaLine from "@/app/ui/MetaLine";

export function WithReadTime() {
	return <MetaLine date="2026-07-18T18:37:00.000-05:00" minutes={3} />;
}

export function DateOnly() {
	return <MetaLine date="2026-07-18T18:37:00.000-05:00" />;
}
