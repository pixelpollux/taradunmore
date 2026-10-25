import { GithubIcon } from "@/app/ui/BrandIcons";

export function Default() {
	return <GithubIcon width={24} height={24} />;
}

export function Sized() {
	return <GithubIcon width={40} height={40} className="text-plum" />;
}

export function InBadge() {
	// Mirrors the real composition: the icon in a round badge (see ContactLink).
	return (
		<span className="inline-flex size-10 items-center justify-center rounded-full border-chip border-plum bg-lime">
			<GithubIcon width={24} height={24} />
		</span>
	);
}
