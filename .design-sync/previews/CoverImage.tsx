import CoverImage from "@/app/ui/CoverImage";
import { COVER_IMAGE_URL } from "./_fixtures";

export function Plain() {
	return (
		<div className="max-w-md p-4">
			<CoverImage url={COVER_IMAGE_URL} />
		</div>
	);
}

export function WithDotShadow() {
	return (
		<div className="max-w-md p-4">
			<CoverImage url={COVER_IMAGE_URL} ink="orchid" tilt={-0.6} />
		</div>
	);
}

export function NoImage() {
	return (
		<div className="max-w-md p-4">
			<CoverImage ink="amber" />
		</div>
	);
}
