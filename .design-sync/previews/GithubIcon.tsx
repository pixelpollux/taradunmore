import { GithubIcon } from "@/app/ui/BrandIcons";

export function Default() {
	return <GithubIcon width={24} height={24} />;
}

export function Sized() {
	return <GithubIcon width={40} height={40} className="text-[var(--accent)]" />;
}

export function InBadge() {
	// Mirrors the real composition in ContactSection.tsx: the icon in a
	// rounded accent badge. The site itself doesn't pass width/height to
	// GithubIcon there — see .design-sync/NOTES.md re: unconstrained
	// intrinsic SVG size in that real usage.
	return (
		<span className="inline-flex size-12 items-center justify-center rounded-3xl bg-[color-mix(in_oklch,var(--accent)_20%,transparent)] text-[--text]">
			<GithubIcon width={24} height={24} />
		</span>
	);
}
