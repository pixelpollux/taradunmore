import CoverImage from "@/app/ui/CoverImage";
import { COVER_IMAGE_URL } from "./_fixtures";

export function Linked() {
	return (
		<CoverImage
			title="Building a design system sync"
			url={COVER_IMAGE_URL}
			slug="building-a-design-system-sync"
		/>
	);
}

export function Unlinked() {
	return <CoverImage title="Work item cover, no link" url={COVER_IMAGE_URL} />;
}
