import { LinkedinIcon } from "@/app/ui/BrandIcons";

export function Default() {
	return <LinkedinIcon />;
}

export function Sized() {
	return <LinkedinIcon width={40} height={40} className="text-[var(--accent)]" />;
}

export function InBadge() {
	// Mirrors the real composition in ContactSection.tsx.
	return (
		<span className="inline-flex size-12 items-center justify-center rounded-3xl bg-[color-mix(in_oklch,var(--accent)_20%,transparent)] text-[--text]">
			<LinkedinIcon />
		</span>
	);
}
