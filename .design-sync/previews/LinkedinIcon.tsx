import { LinkedinIcon } from "@/app/ui/BrandIcons";

export function Default() {
	return <LinkedinIcon />;
}

export function Sized() {
	return <LinkedinIcon width={40} height={40} className="text-plum" />;
}

export function InBadge() {
	// Mirrors the real composition: the icon in a round badge (see ContactLink).
	return (
		<span className="inline-flex size-10 items-center justify-center rounded-full border-chip border-plum bg-lime">
			<LinkedinIcon />
		</span>
	);
}
